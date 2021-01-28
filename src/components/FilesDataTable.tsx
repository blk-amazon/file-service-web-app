import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { CircularProgress, IconButton, Toolbar, Typography } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { IFile } from '../types';
import restApi from '../utils/api';

interface Column {
  id: 'file_name' | 'owner_id' | 'size' | 'last_modified';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'file_name', label: 'File Name', minWidth: 170 },
  { id: 'owner_id', label: 'Owner ID', minWidth: 100 },
  { id: 'size', label: 'Size', minWidth: 100 },
  { id: 'last_modified', label: 'Last Modified Date', minWidth: 170 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  title: {
    flex: '1 1 100%',
  },
});

interface FilesDataTableProps {
    files: Array<Partial<IFile>>,
    loading?: boolean
};

const FilesDataTable: React.FunctionComponent<FilesDataTableProps> = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isDownloading, setIsDownloading] = React.useState<Array<string>>([]);

  const { files } = props;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Files
        </Typography>
      </Toolbar>
      <TableContainer className={classes.container}>
        {(props.files.length > 0) ? (
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {files.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .sort((a, b) => a.file_name! > b.file_name! ? 1 : -1)
            .map((file, index) => {
              const bucket_name = file.bucket_name;
              const key_name = file.key_name;

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = file[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    {key_name && isDownloading.includes(key_name) ? (
                      <CircularProgress size={25} style={{ margin: "12px" }} />
                    ) : (
                      <IconButton onClick={async () => {
                        if (bucket_name && key_name) {
                          setIsDownloading([
                            ...isDownloading,
                            key_name,
                          ]);
                          // setIsDownloading((prevState) => {
                          //   const newArray = prevState;
                          //   newArray.push(key_name);
                          //   console.log("newArray", newArray);
                          //   return newArray;
                          // });
                          restApi.downloadFile(bucket_name, key_name)
                          .then((response) => {
                            console.log("download response", response);
                            const url = response.data.result.url;
  
                            setIsDownloading((prevState) => prevState.filter((item) => {
                              return item !== key_name;
                            }));
  
                            window.open(url);
                          })
                        }
                      }}>
                        <DownloadIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        ) : (props.loading) ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
            <CircularProgress />
          </div>
        ) : (
          <Typography align="center" style={{paddingBottom: "50px"}}>
            No files found
          </Typography>
        )}
      </TableContainer>
      {props.files.length > 0 &&
      <TablePagination
        rowsPerPageOptions={[0]}
        component="div"
        count={files.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      }
    </Paper>
  );
}

export default FilesDataTable;
