import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Dropzone from 'react-dropzone';
import { unionBy } from 'lodash';

import { Auth } from 'aws-amplify';

import { onCreateS3FileMessage } from '../graphql/subscriptions';

import CustomContainer from '../components/CustomContainer';
import FilesDataTable from '../components/FilesDataTable';

import logo from '../assets/images/logo-white.png';
import logoSm from '../assets/images/logo-sm.png';

import restApi from '../utils/api';
import graphqlApi from '../utils/graphql';

import { AppBar, Container, Toolbar, Typography, Box, LinearProgress, Hidden } from '@material-ui/core';

import UserMenu from '../components/UserMenu';
import { IFile, IUser, SubscriptionResponse } from '../types';
import { OnCreateS3FileMessageSubscription } from '../utils/api.graphql';

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
  },
  logo: {
    maxHeight: "32px",
    maxWidth: "25%",
  }
}));

interface HomeScreenProps {
  user: IUser
}

const HomeScreen: React.FunctionComponent<HomeScreenProps> = (props) => {
  const classes = useStyles();

  const { user } = props;
  // console.log(user);

  const [files, setFiles] = React.useState<Array<Partial<IFile>>>([]);
  const [filesLoading, setFilesLoading] = React.useState<boolean>(false);
  const [fileUploading, setFileUploading] = React.useState<boolean>(false);

  const getFiles = async (skipLoading: boolean = false) => {
    const session = await Auth.currentSession();
    console.log("currentUserCredentials", session);

    if (!skipLoading)
      setFilesLoading(true);

    try {
      const { username, tenantId } = user;
      // console.log("user", username, tenantId);
      const user_parts = username.split("@");
      const tokenResponse = await restApi.getNewToken(user_parts[0], tenantId);
      const { token } = tokenResponse.data.result;
      
      const headers = {
        "x-token": token
      };
      const response = await restApi.getObjectList(headers);
      console.log("getFiles", response);

      const result = response.data.result;
      const items: Array<IFile> = result["Contents"].map((item: any) => {
        // console.log("item", item);
        const key_name: string = item["Key"];
        const key_parts: Array<any> = key_name ? key_name.split("/") : [];
        const file_name = key_parts.pop();
        const user_id = key_parts.pop();
        // const [ user_id, file_name ] = key_parts;

        return {
          key_name: key_name,
          file_name: file_name,
          owner_id: user_id,
          size: item["Size"],
          last_modified: item["LastModified"],
          bucket_name: result["Name"],
        }
      });
      // console.log(items);

      setFiles(items);
    } catch (error: any) {
      console.log(error);
    }

    if (!skipLoading)
      setFilesLoading(false);
  }

  const initializeSubscriptions = () => {
    graphqlApi.query(onCreateS3FileMessage,  (response: SubscriptionResponse<OnCreateS3FileMessageSubscription>) => {
      console.log("OnCreateS3FileMessageSubscription", response);
      const { data } = response.value;
      const message = data.onCreateS3FileMessage;
      const tenant_id = message?.tenant_id;

      if (tenant_id && tenant_id === user.tenantId) {
        getFiles(true);
      }
    });
  }

  const onDrop = async (acceptedFiles: Array<File>) => {
    const { username, tenantId } = user;
    // Do something with the files
    console.log("File dropped!");
    setFileUploading(true);
    const user_parts = username.split("@");
    const tokenResponse = await restApi.getNewToken(user_parts[0], tenantId);
    console.log("tokenResponse", tokenResponse);
    const { token } = tokenResponse.data.result;
    // const token1 = await authState.currentUserToken();
    
    const headers = {
      "x-token": token
    };

    for (var i=0; i<acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      restApi.putObject(file, headers)
      .then((response) => {
        console.log("file", file);
        setFiles(prevState => {
          const item: IFile = {
            id_concat: `${user.username}^${user.tenantId}`,
            key_name: `${user.tenantId}/${user.username}/${file.name}`,
            owner_id: user.username,
            tenant_id: user.tenantId,
            size: file.size,
            last_modified: new Date().toString(),
            file_name: file.name,
          }
          const newFiles = unionBy([item], prevState, 'key_name');
          return newFiles;
        });
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
    <CustomContainer>
      <CssBaseline />
      <AppBar elevation={1} position="static" style={{ backgroundColor: "#16a3b8" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Hidden mdUp>
            <img src={logoSm} style={{ height: 32 }} alt="MasterControl Logo" />
          </Hidden>
          <Hidden smDown>
            <img src={logo} style={{ height: 32 }} alt="MasterControl Logo" />
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            {user.tenantId}
          </Typography>
          <div>
            <UserMenu
              tenant={user.tenantId!}
              user={user.username!}
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