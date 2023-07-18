import {
  Dialog,
  Box,
  DialogTitle,
  Typography,
  Divider,
  useMediaQuery,
  Fab,
} from "@mui/material";
import { useState } from "react";
import { LinkTypographyStyle } from "./leaderboard";
import { Person } from "@mui/icons-material";

type UserStatsDisplayProps = {
  stats: { [key: string]: string };
};

const UserStatsDisplay = ({ stats }: UserStatsDisplayProps) => {
  const mobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      {!mobile ? (
        <Typography
          variant="subtitle1"
          sx={{ ...LinkTypographyStyle, position: "absolute", top: "50px" }}
          onClick={() => handleClose()}
        >
          &gt; User Stats
        </Typography>
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
              <Person />
            </Fab>
            Personal Stats
          </div>
        </Box>
      )}

      <Dialog onClose={handleClose} open={open}>
        <Box sx={{ padding: "20px" }}>
          <DialogTitle>
            <Typography>R6dle</Typography>
            User Stats for {new Date().toJSON().slice(0, 10)}
          </DialogTitle>
          <Divider sx={{ backgroundColor: "#6f00f7", marginBottom: "10px" }} />
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
