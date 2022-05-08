import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LinearProgress, styled, TablePagination } from "@mui/material";
import { BasicTableProps } from "./index";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const BasicTable: React.FC<BasicTableProps> = ({ headers, data, fetchTableData }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);


  useEffect(() => {
    fetchTableData({  
      pagination: { page, rowsPerPage },
      isLoading: isLoadingData,
      setLoading: setIsLoadingData,
    })
  
    return () => {
    }
  }, [page])
  

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {Object.entries(headers).map(([key, val]) => {
                return <StyledTableCell key={`header-${key}`}>{val.label}</StyledTableCell>;
              })}
         
            </TableRow>
              <TableCell style={{opacity: isLoadingData ? '1' : '0'}} padding="none" colSpan={3}>
                <LinearProgress color="inherit" />
              </TableCell>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow hover key={`row-${index}`} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                {Object.entries(headers).map(([key, value]) => (
                  <TableCell key={key} align="left">{value.row ? value.row(row) : row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default BasicTable;
