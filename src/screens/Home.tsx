import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Dropzone from 'react-dropzone';
import { mapKeys, mapValues, unionBy } from 'lodash';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { onCreateS3File, onUpdateS3File } from '../graphql/subscriptions';
import { listS3Files } from '../graphql/queries';

import CustomContainer from '../components/CustomContainer';
import FilesDataTable from '../components/FilesDataTable';

import { useAuth } from '../contexts/auth-context';
import { ViewState } from '../constants';

import logo from '../assets/images/logo-white.png';

import api from '../utils/api';
import { getResourceSubscription } from '../utils/graphql';

import { AppBar, Container, Toolbar, Typography, Box } from '@material-ui/core';
// import TenantUser from '../components/TenantUser';
import UserMenu from '../components/UserMenu';
import { IFile, IUser } from '../types';
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
    marginBottom: "20px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderStyle: "dashed",
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

  const getFiles = async () => {
    const response = await API.graphql(graphqlOperation(listS3Files));
    // console.log("getFiles", response);

    // @ts-ignore
    const { data } = response;
    const items: Array<IFile> = data.listS3Files.items.map((item: any) => {
      return item as IFile;
    });
    console.log(items);

    // const items = response.data.listS3Files.items;
    setFiles(items);
  }

  const onDrop = async (acceptedFiles: Array<File>) => {
    // Do something with the files
    console.log("File dropped!");
    const tokenResponse = await api.getNewToken("bkilgore", "tenantA");
    console.log("tokenResponse", tokenResponse);
    const { token } = tokenResponse.data.result;
    const headers = {
      "x-token": token
    };

    for (var i=0; i<acceptedFiles.length; i++) {
      api.uploadFile(acceptedFiles[i], headers)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  };

  React.useEffect(() => {
    interface SubscriptionResponse<T> {
      provider: any,
      value: { data: T }
    }

    let onCreateS3FileSubscription: any, onUpdateS3FileSubscription: any;
    
    getFiles();

    try {
      onCreateS3FileSubscription = getResourceSubscription(onCreateS3File, (response: SubscriptionResponse<OnCreateS3FileSubscription>) => {
        console.log("onCreateS3FileSubscription", response);
      });

      onUpdateS3FileSubscription = getResourceSubscription(onUpdateS3File, (response: SubscriptionResponse<OnUpdateS3FileSubscription>) => {
        console.log("onUpdateS3FileSubscription", response);

        // response.value.data.onUpdateS3File
        const { data } = response.value;
        const item: Partial<IFile> = {
          id_concat: data.onUpdateS3File?.id_concat,
          key_name: data.onUpdateS3File?.key_name,
          bucket_name: data.onUpdateS3File?.bucket_name,
          last_modified: data.onUpdateS3File?.last_modified,
          size: data.onUpdateS3File?.size,
          tenant_id: data.onUpdateS3File?.tenant_id,
          url: data.onUpdateS3File?.url,
          user_id: data.onUpdateS3File?.user_id,
        };

        const newFiles = unionBy(files, [item], 'key_name');

        setFiles(newFiles);
      });
    } catch (error) {
      console.error(error);
    }

    return () => {
      if (onCreateS3FileSubscription)
        onCreateS3FileSubscription.unsubscribe();

      if (onUpdateS3FileSubscription)
        onUpdateS3FileSubscription.unsubscribe();
    };

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
                <CustomContainer width={1}>
                  <FilesDataTable files={files} />
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