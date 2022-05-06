import React, { useState } from "react";
import Table, { HeadingProps } from "components/Table";
import { MenuItem, Select } from "@mui/material";

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

  return (
    <div>
      <h1>Some Table</h1>
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