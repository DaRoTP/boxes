import React from "react";
import { Box, Button, Card, Typography, CardContent, Stack, Paper, Divider } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";

const boxDetails = {
  description:
    "thi sis Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut suscipit porro molestias maiores corrupti quidem ullam! Officia architecto libero distinctio, tenetur corporis inventore. Exercitationem tenetur repellendus debitis sint obcaecati nihil!",
  origin: {
    country: "Poland",
    city: "Sopot",
    street: "POdwale",
  },
  destination: {
    country: "Poland",
    city: "Gdansk",
    street: "POdwale",
  },
  actvity: {
    code: "TR",
    name: "Transfer",
  },
};

const boxHistory = [
  {
    timeStamp: "2022-04-02T22:21:00",
    currentLocation: {
      country: "Poland",
      city: "Gdansk",
      street: "POdwale",
    },
  },
  {
    timeStamp: "2022-04-06T22:21:00",
    currentLocation: {
      country: "Poland",
      city: "Sopot",
      street: "POdwale",
    },
  },
  {
    timeStamp: "2022-04-07T14:21:00",
    currentLocation: {
      country: "Poland",
      city: "Gdynia",
      street: "POdwale",
    },
  },
];

const BoxPage = () => {
  return (
    <Box sx={{ maxWidth: "50%", minWidth: "300px", margin: "0 auto" }}>
      <Stack spacing={2}>
        <Paper style={{ padding: "1rem" }}>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Transfer
          </Typography>
          <Stack direction="row" spacing={2}>
            <div>
              <Typography sx={{ fontSize: 10 }} gutterBottom>
                Origin
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {boxDetails.origin.city}
              </Typography>
            </div>
            <span style={{ height: "10px", flexGrow: "1", borderBottom: "dashed 2px black" }} />
            <LocalShippingIcon />
            <span style={{ height: "10px", flexGrow: "1", borderBottom: "dashed 2px black" }} />
            <ArrowForwardIosIcon />
            <div>
              <Typography sx={{ fontSize: 10 }} gutterBottom>
                Destination
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {boxDetails.destination.city}
              </Typography>
            </div>
          </Stack>
        </Paper>
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Description
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {boxDetails.description}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              History
            </Typography>
            {boxHistory.map((historyEntry) => (
              <div>
                <Divider />
                <Typography
                  sx={{ fontSize: 14, textAlign: "right" }}
                  color="text.secondary"
                  gutterBottom>
                  {moment(historyEntry.timeStamp).format('MMMM Do YYYY, h:mm:ss a')}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {historyEntry.currentLocation.city}
                </Typography>
              </div>
            ))}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default BoxPage;
