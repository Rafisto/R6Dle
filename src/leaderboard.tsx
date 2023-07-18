import { useState } from "react";
import { Typography, useMediaQuery } from "@mui/material";
import DailyLeaderboard from "./dailyLeaderboard";

export const LinkTypographyStyle = {
  cursor: "pointer",
  color: "primary.main",
};

const Leaderboard = () => {
  const mobile = useMediaQuery("(max-width:600px)");
  const mobileSwitcher = (mobile) ? {cursor:"pointer"} : {...LinkTypographyStyle, position: "absolute", top:"20px" }
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <>
      <DailyLeaderboard open={open} handleClose={handleClose} />
      <Typography
        variant="subtitle1"
        sx={mobileSwitcher}
        onClick={() => handleClose()}
      >
        &gt; Leaderboard
      </Typography>
    </>
  );
};

export default Leaderboard;
