import React from "react";
import Table, { HeadingProps } from "components/Table";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface LocationProps {
  tableData: any;
  totalItemsCount: number;
  fetchAllLocations: (page: number, rowsPerPage: number) => void;
}

const Locations: React.FC<LocationProps> = ({ tableData, totalItemsCount, fetchAllLocations }) => {
  const tableHeaders: HeadingProps = {
    identifier: { label: "Identifier" },
    country: { label: "Country" },
    city: { label: "City" },
    street: { label: "Street" },
    number: { label: "Number" },
    postcode: { label: "Postal Code" },
  };

  const navigate = useNavigate();

  return (
    <div>
      <Stack
        sx={{ marginBottom: 2 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}>
        <Typography fontWeight="bold" variant="h5">
          <LocationOnIcon />
          Locations
        </Typography>
        <Button onClick={() => navigate("/location/create")} variant="contained" size="medium">
          Create Location
        </Button>
      </Stack>
      <Table
        headers={tableHeaders}
        data={tableData}
        totalItemsCount={totalItemsCount}
        fetchTableData={async ({ pagination, setLoading }) => {
          const { page, rowsPerPage } = pagination;
          setLoading(true);
          await fetchAllLocations(page, rowsPerPage);
          setLoading(false);
        }}
      />
    </div>
  );
};

export default Locations;
