import React from 'react';

import { CircularProgress, Box } from '@material-ui/core';

type CustomContainerProps = {
  title?: string,
  loading?: boolean,
  style?: object,
  className?: string,
  mx?: number,
  height?: number,
  width?: number
};

const CustomContainer: React.FunctionComponent<CustomContainerProps> = (props) => {
  const { loading, children, height=1, width=1, mx=1 } = props;

  return (
    <Box
      display="flex"
      height={height}
      width={width}
      mx={mx}
    >
      {loading ? (
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", ...props.style }}>
          <CircularProgress />
        </div>
      ) : (
        <div style={{ width: "100%", ...props.style }}>
          {children}
        </div>
      )}
    </Box>
  )
}

export default CustomContainer;