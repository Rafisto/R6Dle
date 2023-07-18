import { useState } from "react";
import { Box, Fab, Typography, useMediaQuery } from "@mui/material";
import DailyLeaderboard from "./dailyLeaderboard";
import { Leaderboard as LeaderboardIcon } from "@mui/icons-material";

export const LinkTypographyStyle = {
  cursor: "pointer",
  color: "primary.main",
};

const Leaderboard = () => {
  const mobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <>
      <DailyLeaderboard open={open} handleClose={handleClose} />
      {!mobile ? (
        <>
          <Typography
            variant="subtitle1"
            sx={{ ...LinkTypographyStyle, position: "absolute", top: "20px" }}
            onClick={() => handleClose()}
          >
            &gt; Leaderboard
          </Typography>
        </>
      ) : (
        <Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              cursor: "pointer",
            }}
            onClick={() => handleClose()}
          >
            <Fab sx={{margin:"10px"}}>
              <LeaderboardIcon />
            </Fab>
            Leaderboard
          </div>
        </Box>
      )}
    </>
  );
};

export default Leaderboard;
