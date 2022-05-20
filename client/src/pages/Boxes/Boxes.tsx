import React from "react";
import Table, { HeadingProps } from "components/Table";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link } from "react-router-dom";

interface BoxesProps {
  tableData: any;
  totalItemsCount: number;
  fetchBoxes: (page: number, rowsPerPage: number) => void;
}

const Boxes: React.FC<BoxesProps> = ({ tableData, totalItemsCount, fetchBoxes }) => {
  const navigate = useNavigate();
  const tableHeaders: HeadingProps = {
    trackingNumber: {
      label: "Tracking Number",
      row: (data) => <Link to={`/box/${data._id}`}>{data._id}</Link>,
    },
    origin: {
      label: "Origin",
      row: (data) => {
        if (!data.origin) {
          return <strong>-</strong>;
        }
        return (
          <div>
            <strong>{data.origin.identifier}</strong>
            <div>
              {data.origin.country} | {data.origin.city}
            </div>
          </div>
        );
      },
    },
    destination: {
      label: "Destination",
      row: (data) => {
        if (!data.destination) {
          return <strong>-</strong>;
        }
        return (
          <div>
            <strong>{data.destination.identifier}</strong>
            <div>
              {data.destination.country} | {data.destination.city}
            </div>
          </div>
        );
      },
    },
    activity: {
      label: "Activity",
      row: (data) => {
        if (!data.activity) {
          return <strong>-</strong>;
        }
        return (
          <span>
            <strong>{data.activity.code} </strong> | {data.activity.name}
          </span>
        );
      },
    },
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
          <InventoryIcon />
          Boxes
        </Typography>
        <Button onClick={() => navigate("/box/create")} variant="contained" size="medium">
          Create Box
        </Button>
      </Stack>
      <Table
        headers={tableHeaders}
        data={tableData}
        totalItemsCount={totalItemsCount}
        fetchTableData={async ({ pagination, setLoading }) => {
          setLoading(true);
          const { page, rowsPerPage } = pagination;
          await fetchBoxes(page, rowsPerPage);
          setLoading(false);
        }}
      />
    </div>
  );
};

export default Boxes;
