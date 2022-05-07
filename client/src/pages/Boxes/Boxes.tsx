import React, { useState } from "react";
import Table, { HeadingProps } from "components/Table";
import { Button, MenuItem, Select, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom"; 

const Boxes = () => {
  const [tableHeaders, setTableHeaders] = useState<HeadingProps>({
    col1: {
      label: "Column 1",
      row: (rowData) => <a href="#">{rowData.col1}</a>,
    },
    col2: {
      label: "Column 2",
      row: () => (
        <Select displayEmpty inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      ),
    },
    col3: {
      label: "Column 3",
    },
  });
  const [tableData, setTableData] = useState([
    { col1: "col1 data 1", col2: "col2 data 1", col3: "col3 data 1" },
    { col1: "col1 data 2", col2: "col2 data 2", col3: "col3 data 2" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
    { col1: "col1 data 3", col2: "col2 data 3", col3: "col3 data 3" },
  ]);

  const navigate = useNavigate();

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <h1>Some Table</h1>
        <Button  onClick={() => navigate("/box/create")} variant="contained" size="medium">
          Create Box
        </Button>
      </Stack>
      <Table
        headers={tableHeaders}
        data={tableData}
        fetchTableData={({ pagination, isLoading, setLoading }) => {
          const { page, rowsPerPage } = pagination;
        }}
      />
    </div>
  );
};

export default Boxes;
