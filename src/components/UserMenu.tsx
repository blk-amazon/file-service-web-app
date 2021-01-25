import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, MenuItem, Menu, ListItemIcon } from '@material-ui/core';

import { ExpandLess, ExpandMore, ExitToApp } from '@material-ui/icons';
import { useAuth } from '../contexts/auth-context';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    menuContainer: {
      backgroundColor: "rgba(0,0,0,0.25)",
      marginRight: "25px",
      paddingRight: "0px",
      paddingTop: "0px",
      paddingBottom: "0px",
    },
    menuButton: {
      paddingRight: "25px",
    },
    menuIcon: {
      display: "flex",
      justifyItems: "right",
      backgroundColor: "rgba(0,0,0,0.25)",
      height: "60px"
    },
  }),
);

type UserMenuProps = {
  tenant: string,
  user: string,
};

const UserMenu: React.FunctionComponent<UserMenuProps> = (props) => {
  const { user } = props;

  const authState = useAuth();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div>
      <List component="nav">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          className={classes.menuContainer}
          onClick={handleClick}
        >
          <ListItemText primary={user} className={classes.menuButton} />
          {open ? <ExpandLess className={classes.menuIcon} /> : <ExpandMore className={classes.menuIcon} />}
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          dense={true}
          onClick={authState.logout}
        >
          <ListItemText
            primary="Logout"
          />
          <ListItemIcon style={{ justifyContent: "flex-end" }}>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu;