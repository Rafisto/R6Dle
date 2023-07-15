import ReactECharts from "echarts-for-react";
import { DailyStats } from "./API/dailyStats";
import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type DailyLeaderboardProps = {
  handleClose: () => void;
  open: boolean;
};

type LeaderboardStats = {
  status: string;
  stats: { [key: string]: number };
};

const LeaderboardBarOptions = (xaxis: string[], yaxis: number[]) => {
  return {
    xAxis: {
      type: "category",
      data: xaxis,
      name: "Number of steps taken",
      nameLocation: "center",
      nameTextStyle: {
        padding: [10, 10, 10, 10],
      },
    },
    yAxis: {
      type: "value",
      name: "Number of wins",
      nameLocation: "center",
      nameTextStyle: {
        padding: [10, 10, 10, 10],
      },
    },
    series: [
      {
        data: yaxis,
        type: "bar",
      },
    ],
  };
};

const DailyLeaderboard = ({ handleClose, open }: DailyLeaderboardProps) => {
  const [update] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardStats>();

  useEffect(() => {
    const getLeaderboard = async () => {
      const leaderboard = await DailyStats();
      console.log(leaderboard);
      if (leaderboard.status == "success") {
        setLeaderboard(leaderboard as LeaderboardStats);
      }
    };
    void getLeaderboard();
  }, [update]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ padding: "20px" }}>
        <DialogTitle>
          <Typography>R6dle</Typography>
          Daily leaderboard for {new Date().toJSON().slice(0, 10)}
        </DialogTitle>
        {leaderboard != undefined && (
          <ReactECharts
            option={LeaderboardBarOptions(
              Object.keys(leaderboard.stats),
              Object.values(leaderboard.stats)
            )}
          />
        )}
      </Box>
    </Dialog>
  );
};

export default DailyLeaderboard;
