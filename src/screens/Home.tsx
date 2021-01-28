import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Dropzone from 'react-dropzone';
import { concat, map, mapKeys, mapValues, union, unionBy, unionWith, uniqBy } from 'lodash';

import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import GraphQLAPI from '@aws-amplify/api-graphql';
import Observable from 'zen-observable-ts';

import { onCreateS3File, onUpdateS3File } from '../graphql/subscriptions';
import { listS3Files } from '../graphql/queries';

import CustomContainer from '../components/CustomContainer';
import FilesDataTable from '../components/FilesDataTable';

import { useAuth } from '../contexts/auth-context';
import { ViewState } from '../constants';

import logo from '../assets/images/logo-white.png';

import restApi from '../utils/api';
import graphqlApi from '../utils/graphql';

import { AppBar, Container, Toolbar, Typography, Box, LinearProgress } from '@material-ui/core';
// import TenantUser from '../components/TenantUser';
import UserMenu from '../components/UserMenu';
import { IFile, IUser, SubscriptionResponse } from '../types';
import { OnCreateS3FileSubscription, OnUpdateS3FileSubscription } from '../utils/api.graphql';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#fff",
  },
  list: {
    overflow: "auto",
    maxHeight: "700px",
    position: 'relative',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  dropzone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    // marginBottom: "20px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderStyle: "dotted",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  }
}));

interface HomeScreenProps {
  user: Partial<IUser>
}

const HomeScreen: React.FunctionComponent<HomeScreenProps> = (props) => {
  const classes = useStyles();
  const authState = useAuth();

  const { user } = props;

  const [files, setFiles] = React.useState<Array<Partial<IFile>>>([]);
  const [filesLoading, setFilesLoading] = React.useState<boolean>(false);
  const [fileUploading, setFileUploading] = React.useState<boolean>(false);

  let onCreateS3FileSubscription: Observable<object>;
  let onUpdateS3FileSubscription: Observable<object>;

  const getFiles = async () => {
    // const response = await graphqlApi.query(listS3Files);
    setFilesLoading(true);

    const tokenResponse = await restApi.getNewToken("bkilgore", "tenantA");
    const { token } = tokenResponse.data.result;
    
    const headers = {
      "x-token": token
    };
    const response = await restApi.getObjectList(headers);
    console.log("getFiles", response);

    const result = response.data.result;
    const items: Array<IFile> = result["Contents"].map((item: any) => {
      console.log("item", item);
      const key_name = item["Key"];
      const key_parts = key_name ? key_name.split("/") : [];
      const [ tenant_id, user_id, file_name ] = key_parts;

      return {
        key_name: key_name,
        file_name: file_name,
        owner_id: user_id,
        size: item["Size"],
        last_modified: item["LastModified"],
        bucket_name: result["Name"],
      }
    });
    console.log(items);

    setFiles(items);
    setFilesLoading(false);
  }

  const initializeSubscriptions = () => {
    onCreateS3FileSubscription = graphqlApi.query(onCreateS3File, (response: SubscriptionResponse<OnCreateS3FileSubscription>) => {
      console.log("onCreateS3FileSubscription", response);

      const { data } = response.value;
      const file = data.onCreateS3File!;
      const key_name = file.key_name;
      const key_parts = key_name ? key_name.split("/") : [];
      const [ tenant_id, user_id, file_name ] = key_parts;
      console.log("key_parts", key_parts);

      const item: IFile = {
        key_name: key_name,
        bucket_name: file.bucket_name,
        file_name: file_name,
        owner_id: user_id,
        last_modified: file.last_modified,
        size: file.size,
        tenant_id: tenant_id,
        url: file.url,
      };

      setFiles(prevState => {
        console.log("prevState", prevState);
        const newFiles = unionBy([item], prevState, 'key_name');
        console.log("newFiles", newFiles);
        return newFiles;
      });
    }) as Observable<object>;

    onUpdateS3FileSubscription = graphqlApi.query(onUpdateS3File, (response: SubscriptionResponse<OnUpdateS3FileSubscription>) => {
      console.log("onUpdateS3FileSubscription", response);

      const { data } = response.value;
      const file = data.onUpdateS3File!;
      const key_name = file.key_name;
      const key_parts = key_name ? key_name.split("/") : [];
      const [ tenant_id, user_id, file_name ] = key_parts;

      const item: IFile = {
        key_name: key_name,
        bucket_name: file.bucket_name,
        file_name: file_name,
        owner_id: user_id,
        last_modified: file.last_modified,
        size: file.size,
        tenant_id: tenant_id,
        url: file.url,
      };
    
      // console.log("files", files);

      setFiles(prevState => {
        console.log(prevState);
        const newFiles = unionBy([item], prevState, 'key_name');
        return newFiles;
      });
    }) as Observable<object>;
  }

  const onDrop = async (acceptedFiles: Array<File>) => {
    // Do something with the files
    console.log("File dropped!");
    setFileUploading(true);
    const tokenResponse = await restApi.getNewToken("bkilgore", "tenantA");
    console.log("tokenResponse", tokenResponse);
    const { token } = tokenResponse.data.result;
    // const token1 = await authState.currentUserToken();
    
    const headers = {
      "x-token": token
    };

    for (var i=0; i<acceptedFiles.length; i++) {
      restApi.putObject(acceptedFiles[i], headers)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
    }

    setFileUploading(false);
  };  

  React.useEffect(() => {
    getFiles();
    initializeSubscriptions();
  }, []);

  return (
    <CustomContainer loading={authState.status === ViewState.Busy}>
      <CssBaseline />
      <AppBar elevation={1} position="static" style={{ backgroundColor: "#16a3b8" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <img src={logo} style={{ height: 32 }} alt="MasterControl Logo" />
          <Typography variant="h6" className={classes.title}>
            {user.attributes?.['custom:tenant_id']}
          </Typography>
          <div>
            <UserMenu
              tenant="TenantA"
              user="bkilgore"
            />
          </div>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={2}>
          <Dropzone onDrop={onDrop}>
            {({getRootProps, getInputProps}) => (
              <section className="container">
                <div {...getRootProps({className: classes.dropzone})}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                {fileUploading && <LinearProgress />}
                <CustomContainer width={1} style={{ marginTop: '50px' }}>
                  <FilesDataTable loading={filesLoading} files={files} />
                </CustomContainer>
              </section>
            )}
          </Dropzone>
        </Box>
      </Container>
    </CustomContainer>
  );
}

export default HomeScreen;