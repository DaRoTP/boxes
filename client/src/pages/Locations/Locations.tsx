import React, { useState } from "react";
import Table, { HeadingProps } from "components/Table";
import { Button, MenuItem, Select, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom"; 

const Locations = () => {
  const [tableHeaders, setTableHeaders] = useState<HeadingProps>({
    country: {
      label: "Country",
    },
    city: {
      label: "City",
    },
    street: {
      label: "Street",
    },
    number: {
      label: "Number",
    },
    postalCode: {
      label: "Postal Code",
    },
  });
  const [tableData, setTableData] = useState([
    { country: "col1 data 1", city: "col2 data 1", street: "col3 data 1", number: "col3 data 1", postalCode: "col3 data 1" },
    { country: "col1 data 1", city: "col2 data 1", street: "col3 data 1", number: "col3 data 1", postalCode: "col3 data 1" },
    { country: "col1 data 1", city: "col2 data 1", street: "col3 data 1", number: "col3 data 1", postalCode: "col3 data 1" },
    { country: "col1 data 1", city: "col2 data 1", street: "col3 data 1", number: "col3 data 1", postalCode: "col3 data 1" },
    { country: "col1 data 1", city: "col2 data 1", street: "col3 data 1", number: "col3 data 1", postalCode: "col3 data 1" },
    { country: "col1 data 1", city: "col2 data 1", street: "col3 data 1", number: "col3 data 1", postalCode: "col3 data 1" },
    { country: "col1 data 1", city: "col2 data 1", street: "col3 data 1", number: "col3 data 1", postalCode: "col3 data 1" },
  ]);

  const navigate = useNavigate();

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <h1>Some Table</h1>
        <Button  onClick={() => navigate("/location/create")} variant="contained" size="medium">
          Create Location
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

export default Locations;
