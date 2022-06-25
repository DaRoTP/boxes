import {
  Chip,
  Grid,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import React from "react";

interface HistoryEntryProps {
  locationIdentifier: string;
  activityCode: string;
  timeStamp: string;
  contactInfo: {
    email: string;
    phone1: string;
    phone2: string;
  };
}

const HistoryEntry: React.FC<HistoryEntryProps> = ({
  locationIdentifier,
  activityCode,
  timeStamp,
  contactInfo,
}) => {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <Grid container>
      <Grid item xs={4}>
        <HtmlTooltip
          placement="top-start"
          title={
            <React.Fragment>
              <Typography sx={{ fontSize: 10 }} color="GrayText" gutterBottom>
                Email:
              </Typography>
              <Typography sx={{ fontSize: 12 }} gutterBottom>
                {contactInfo?.email || "-"}
              </Typography>
              <Typography sx={{ fontSize: 10 }} color="GrayText" gutterBottom>
                Phone 1:
              </Typography>
              <Typography sx={{ fontSize: 12 }} gutterBottom>
                {contactInfo?.phone1 || "-"}
              </Typography>
              <Typography sx={{ fontSize: 10 }} color="GrayText" gutterBottom>
                Pgone 2:
              </Typography>
              <Typography sx={{ fontSize: 12 }} gutterBottom>
                {contactInfo?.phone2 || "-"}
              </Typography>
            </React.Fragment>
          }>
          <Chip label={locationIdentifier} />
        </HtmlTooltip>
      </Grid>
      <Grid item xs={3}>
        <Chip color="primary" label={activityCode} />
      </Grid>
      <Grid item xs={5}>
        <Typography>{timeStamp}</Typography>
      </Grid>
    </Grid>
  );
};

export default HistoryEntry;
