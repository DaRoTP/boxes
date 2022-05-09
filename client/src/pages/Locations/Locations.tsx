import React, { useState } from "react";
import Table, { HeadingProps } from "components/Table";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as locationService from "service/rest/location.service";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Locations = () => {
  const [tableHeaders] = useState<HeadingProps>({
    identifier: { label: "Identifier" },
    country: { label: "Country" },
    city: { label: "City" },
    street: { label: "Street" },
    number: { label: "Number" },
    postcode: { label: "Postal Code" },
  });
  const [tableData, setTableData] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);

  const navigate = useNavigate();

  const fetchAllLocations = async (page: number, perPage: number) => {
    const { data } = await locationService.getLocations({ page, perPage });
    if (data) {
      const { totalItems, locations } = data;
      setTableData(locations);
      setTotalItemsCount(totalItems);
    }
  };

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
        fetchTableData={({ pagination, isLoading, setLoading }) => {
          const { page, rowsPerPage } = pagination;
          fetchAllLocations(page, rowsPerPage);
        }}
      />
    </div>
  );
};

export default Locations;
