import { useState } from "react";
import { Typography } from "@mui/material";
import DailyLeaderboard from "./dailyLeaderboard";

export const LinkTypographyStyle = {
  cursor: "pointer",
  color: "primary.main",
};

const Leaderboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <>
      <DailyLeaderboard open={open} handleClose={handleClose} />
      <Typography
        variant="subtitle1"
        sx={{ ...LinkTypographyStyle, position: "absolute", top:"20px" }}
        onClick={() => handleClose()}
      >
        &gt; Leaderboard
      </Typography>
    </>
  );
};

export default Leaderboard;
