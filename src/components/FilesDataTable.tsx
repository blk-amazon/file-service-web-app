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
import { Toolbar, Typography } from '@material-ui/core';
import { IFile } from '../types';

interface Column {
  id: 'id_concat' | 'key_name' | 'bucket_name' | 'last_modified' | 'size' | 'tenant_id' | 'user_id';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'key_name', label: 'Key Name', minWidth: 170 },
  { id: 'user_id', label: 'User ID', minWidth: 100 },
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
    files: Array<Partial<IFile>>
};

const FilesDataTable: React.FunctionComponent<FilesDataTableProps> = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        {props.files.length > 0 ? (
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
            </TableRow>
          </TableHead>
          <TableBody>
            {files.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((file, index) => {
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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