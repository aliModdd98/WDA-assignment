import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import axiosInstance from "../config/axios";

function AllData() {
  const [data, setData] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axiosInstance.get("/data", {
          params: {
            page: page + 1, // Assuming page is 0-indexed and the API expects 1-indexed
            pageSize: pageSize,
          },
        });
        setData(response.data.data);
        setTotalItem(response.data.totalItem);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchData();
  }, [page, pageSize]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on page size change
  };

  return (
    <Paper sx={{ margin: "2rem auto", padding: "1rem", maxWidth: "900px" }}>
      <Typography variant="h4" sx={{ mb: 3, mt: 2 }}>
        All Data
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Sales</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="200px"
                  >
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={`${row.ORDERNUMBER}-${row.ORDERLINENUMBER}`}>
                  <TableCell>
                    {row.CONTACTFIRSTNAME} {row.CONTACTLASTNAME}
                  </TableCell>
                  <TableCell>{row.CITY}</TableCell>
                  <TableCell>{row.SALES.toFixed(2)}</TableCell>
                  <TableCell>{row.STATUS}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalItem}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default AllData;
