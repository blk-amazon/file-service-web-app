import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, Toolbar, Typography, Box, LinearProgress, CssBaseline } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import CustomContainer from '../components/CustomContainer';

import logo from '../assets/images/logo-white.png';
import UserMenu from '../components/UserMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
      },
  }),
);

export default function FolderList() {
  const classes = useStyles();

  return (
    <CustomContainer>
      <CssBaseline />
      <AppBar elevation={1} position="static" style={{ backgroundColor: "#16a3b8" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <img src={logo} style={{ height: 32 }} alt="MasterControl Logo" />
          <Typography variant="h6" className={classes.title}>
            TenantA
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
            <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <WorkIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Work" secondary="Jan 7, 2014" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <BeachAccessIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
            </List>
        </Box>
      </Container>
    </CustomContainer>
  );
}