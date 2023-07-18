import { Typography } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

type CheckParameterProps = {
  parameter: string;
  correct: { [key: string]: string | string[] | number };
  check: { [key: string]: string | string[] | number };
  desc?: string
};

const CheckParameter = ({ parameter, correct, check, desc }: CheckParameterProps) => {
  if (Array.isArray(check[parameter as keyof typeof check])) {
    let counter = 0;
    let color = "#d32f2f";

    (check[parameter as keyof typeof check] as string[]).forEach((element) => {
      if ((correct[parameter] as string[]).includes(element)) {
        counter++;
      }
    });
    if (
      counter == (check[parameter as keyof typeof check] as string[]).length &&
      counter == (correct[parameter] as string[]).length
    ) {
      color = "#2e7d32";
    } else if (counter > 0) {
      color = "#ff9800";
    }

    return (
      <Typography sx={{ color: color }}>
        {(desc) ? desc + ":" : ""} {(check[parameter as keyof typeof check] as string[]).join(", ")}
      </Typography>
    );
  } else {
    let lower = 0;
    if (typeof correct[parameter] == "number") {
      if (check[parameter as keyof typeof check] < correct[parameter]) {
        lower = 0;
      } else if (check[parameter as keyof typeof check] > correct[parameter]) {
        lower = 1;
      } else {
        lower = -1;
      }
    }
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          color:
            correct[parameter] === check[parameter] ? "#2e7d32" : "#d32f2f",
        }}
      >
        <Typography>{(desc) ? desc + ":" : ""} {check[parameter as keyof typeof check]}</Typography>
        {typeof correct[parameter] == "number" &&
          lower >= 0 &&
          (lower ? <ArrowDropDown /> : <ArrowDropUp />)}
      </div>
    );
  }
};

export default CheckParameter;
