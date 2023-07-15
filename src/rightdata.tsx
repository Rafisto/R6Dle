import { IconButton, Typography } from "@mui/material";
import { KeyboardArrowDown, Clear } from "@mui/icons-material";
import { useState } from "react";

type RightDataProps = {
  text: string[];
};

const RightData = (props: RightDataProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div style={{ position: "absolute", right: "0", top: "0" }}>
      {open ? (
        <>
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{ position: "absolute", right: "0", top: "0" }}
          >
            <Clear />
          </IconButton>
          {props.text.map((line) => (
            <Typography sx={{ fontSize: "8pt", textAlign: "right" }}>
              {line}
            </Typography>
          ))}
        </>
      ) : (
        <>
          <IconButton onClick={() => setOpen(!open)}>
            <KeyboardArrowDown />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default RightData;
