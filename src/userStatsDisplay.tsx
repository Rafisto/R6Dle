import { Dialog, Box, DialogTitle, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { LinkTypographyStyle } from "./leaderboard";

type UserStatsDisplayProps = {
  stats: { [key: string]: string };
};

const UserStatsDisplay = ({ stats }: UserStatsDisplayProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <>
      <Typography
        variant="subtitle1"
        sx={{ ...LinkTypographyStyle, position: "absolute", top: "50px" }}
        onClick={() => handleClose()}
      >
        &gt; User Stats
      </Typography>
      <Dialog onClose={handleClose} open={open}>
        <Box sx={{ padding: "20px" }}>
          <DialogTitle>
            <Typography>R6dle</Typography>
            User Stats for {new Date().toJSON().slice(0, 10)}
          </DialogTitle>
          <Divider sx={{backgroundColor:"#6f00f7",marginBottom:"10px"}}/>
          {Object.keys(stats).map((key) => (
            <Typography key={key}>
              {key}: {stats[key]}
            </Typography>
          ))}
        </Box>
      </Dialog>
    </>
  );
};

export default UserStatsDisplay;