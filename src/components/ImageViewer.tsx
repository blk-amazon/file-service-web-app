import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, MenuItem, Menu, ListItemIcon, Modal } from '@material-ui/core';

import { ExpandLess, ExpandMore, ExitToApp } from '@material-ui/icons';

type ImageViewerProps = {
  isOpen: boolean,
  close: Function,
  imageUrl: string,
};

const ImageViewer: React.FunctionComponent<ImageViewerProps> = (props) => {
  const { isOpen, close, imageUrl } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
    close();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <img src={imageUrl} />
    </Modal>
  );
}

export default ImageViewer;