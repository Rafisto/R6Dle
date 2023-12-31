import React from "react";
import r6ops from "./r6ops.json";
import Guesses from "./guesses";
import RightData from "./rightdata";
import NameSelect from "./nameSelect";
import Leaderboard from "./leaderboard";
import UserStatsDisplay from "./userStatsDisplay";
import { UserStats } from "./API/userStats";
import { TokenSave } from "./API/tokenSave";
import { PatchGuess } from "./API/patchOperator";
import { DailyOperator } from "./API/dailyOperator";
import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Fab,
  Switch,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { setPlayDailyCookie, getPlayDailyCookie } from "./API/playDaily";
import { Close, Menu } from "@mui/icons-material";

type R6dleLocal = {
  op: string;
  opList: string[];
  guesses: string[];
  victory: boolean;
  correct: boolean;
  selectedOp: string;
  input: boolean;
};

const R6dle = () => {
  const mobile = useMediaQuery("(max-width:600px)");
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const opList = Object.keys(r6ops);

  const [token, setToken] = useState<string>("");
  const [dailySha, setDailySha] = useState<string>("");

  const [playDaily] = useState<boolean>(getPlayDailyCookie());
  const [dailyOperator, setDailyOperator] = useState<string>("");
  const [userStats, setUserStats] = useState<{ [key: string]: string }>();

  useEffect(() => {
    const getToken = async () => {
      const tokenSave = await TokenSave();
      setToken(tokenSave.status == "success" ? tokenSave.token : "");
      if (tokenSave.status == "success") {
        const dailyOperator = await DailyOperator(
          tokenSave.status == "success" ? tokenSave.token : ""
        );
        setDailyOperator(
          dailyOperator.status == "success" ? dailyOperator.data : ""
        );
        setDailySha(dailyOperator.status == "success" ? dailyOperator.sha : "");

        const userStats = await UserStats(tokenSave.token);
        setUserStats(
          userStats.status == "success"
            ? (
                userStats as {
                  status: string;
                  stats: { [key: string]: string };
                }
              ).stats
            : {}
        );
      }
    };

    void getToken();
  }, []);

  const [localState, setLocalState] = useState<R6dleLocal>({
    op: opList[Math.floor(Math.random() * opList.length)],
    opList: opList,
    guesses: [],
    victory: false,
    correct: false,
    selectedOp: "",
    input: false,
  });

  const restartPage = () => {
    window.location.reload();
  };

  const onNameChange = (name: string) => {
    if (opList.includes(name)) {
      setLocalState({ ...localState, correct: true, selectedOp: name });
      guessOp(name);
    } else {
      setLocalState({ ...localState, correct: false });
    }
  };

  const onReturn = (name: string) => {
    guessOp(name);
  };

  const getCorrectOP = () => {
    if (playDaily) {
      return dailyOperator;
    } else {
      return localState.op;
    }
  };

  const guessOp = (name?: string) => {
    const currentState = { ...localState };
    if (name) {
      if (opList.includes(name)) {
        currentState.input = !currentState.input;
        if (name === getCorrectOP()) {
          if (playDaily) {
            PatchGuess(token, (currentState.guesses.length + 1).toString());
            setPlayDailyCookie();
          }
          currentState.victory = true;
        }
        currentState.guesses = Array.from(
          new Set([...localState.guesses, name])
        );
      }
    } else {
      currentState.selectedOp = "";
      currentState.correct = false;
      currentState.input = !currentState.input;
      if (localState.correct) {
        if (localState.selectedOp === getCorrectOP()) {
          if (playDaily) {
            PatchGuess(token, (currentState.guesses.length + 1).toString());
            setPlayDailyCookie();
          }
          currentState.victory = true;
        }
        currentState.guesses = Array.from(
          new Set([...localState.guesses, localState.selectedOp])
        );
      }
    }
    setLocalState(currentState);
  };

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  const StatsMenu = () => {
    return (
      <>
        <Leaderboard />
        {userStats ? (
          <UserStatsDisplay stats={userStats} />
        ) : (
          <Typography
            variant="subtitle1"
            sx={{ position: "absolute", top: "50px" }}
          >
            ... loading User Stats
          </Typography>
        )}
      </>
    );
  };

  return (
    <React.Fragment>
      {!mobile && (
        <>
          <StatsMenu />
          <RightData
            text={["API Debug", `token:${token}`, `sha256:${dailySha}`]}
          />
        </>
      )}
      <Typography variant={mobile ? "h3" : "h1"}>R6dle</Typography>
      <Typography variant="subtitle1">Guess the correct operator</Typography>
      {playDaily ? (
        <>
          <Switch defaultChecked disabled />
          Daily operator
        </>
      ) : (
        <>
          <Switch disabled />
          Normal Game
        </>
      )}
      <Box
        sx={{
          marginInline: mobile ? "5px" : "60px",
          marginBlock: mobile ? "20px" : "60px",
        }}
      >
        {!localState.victory ? (
          <>
            <NameSelect
              opList={opList}
              guessed={localState.guesses}
              onChange={onNameChange}
              onReturn={onReturn}
              reset={localState.input}
            />
            {localState.correct && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ margin: "15px", width: "40%" }}
                  onClick={() => guessOp()}
                >
                  <Typography>Guess</Typography>
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <img
              src={`/r6opicons/${getCorrectOP().toLowerCase()}.svg`}
              alt={getCorrectOP()}
              width="50px"
            />
            <Typography>{getCorrectOP()}</Typography>
            <br />
            <Typography>
              Congratulations, you've chosen the correct operator!
            </Typography>
            <br />
            <Button
              variant="contained"
              sx={{ margin: "15px", width: mobile ? "80%" : "10%" }}
              color="success"
              onClick={restartPage}
            >
              <Typography>One more game?</Typography>
            </Button>
          </>
        )}
      </Box>
      <Guesses
        guesses={localState.guesses}
        correct={r6ops[getCorrectOP() as keyof typeof r6ops]}
        op={getCorrectOP()}
      />
      {mobile && (
        <>
          <AppBar
            position="fixed"
            color="primary"
            sx={{ top: "auto", bottom: 0 }}
          >
            <Toolbar>
              <StyledFab color="secondary" aria-label="add">
                <Menu onClick={() => setMobileMenu(!mobileMenu)} />
              </StyledFab>
            </Toolbar>
          </AppBar>
          <Drawer
            anchor="bottom"
            open={mobileMenu}
            onClose={() => setMobileMenu(!mobileMenu)}
          >
            <div style={{ margin: "auto" }}>
              <Fab sx={{ marginTop: "10px" }}>
                <Close onClick={() => setMobileMenu(!mobileMenu)} />
              </Fab>
            </div>
            <Box
              sx={{
                paddingInline: "20px",
                paddingBlock: "10px",
                fontSize: "20pt",
              }}
            >
              <Typography sx={{ textAlign: "center", marginBottom:"20px" }}>Menu</Typography>
              <StatsMenu />
            </Box>
          </Drawer>
        </>
      )}
    </React.Fragment>
  );
};

export default R6dle;
