import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import r6ops from "./r6ops.json";
import CheckParameter from "./checkParameter";

type GuessesProps = {
  op: string;
  correct: { [key: string]: string | string[] | number };
  guesses: string[];
};

const Guesses = (props: GuessesProps) => {
  return (
    <TableContainer component={Paper} sx={{ width: "80%", margin: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{
            minWidth: 650,
            borderTop: `1px solid ${
              props.guesses.includes(props.op) ? "#2e7d32" : "#6f00f7"
            }`,
          }}
        >
          <TableRow>
            <TableCell>Icon</TableCell>
            <TableCell>Operator</TableCell>
            <TableCell>Sex</TableCell>
            <TableCell>Continent</TableCell>
            <TableCell>Release Year</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Speed</TableCell>
            <TableCell>Gadgets</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.guesses
            .map((_, index) => props.guesses[props.guesses.length - 1 - index])
            .map((guess) => {
              const selected_op = r6ops[guess as keyof typeof r6ops];
              return (
                <TableRow
                  key={guess}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    textAlign: "center",
                  }}
                >
                  <TableCell>
                    <img
                      src={`/r6opicons/${guess.toLowerCase()}.svg`}
                      alt={guess}
                      width="50px"
                    />
                  </TableCell>
                  <TableCell>{guess}</TableCell>
                  <TableCell>
                    <CheckParameter
                      parameter="sex"
                      correct={props.correct}
                      check={selected_op}
                    />
                  </TableCell>
                  <TableCell>
                    <CheckParameter
                      parameter="continent"
                      correct={props.correct}
                      check={selected_op}
                    />
                  </TableCell>
                  <TableCell>
                    <CheckParameter
                      parameter="release_year"
                      correct={props.correct}
                      check={selected_op}
                    />
                  </TableCell>
                  <TableCell>
                    <CheckParameter
                      parameter="role"
                      correct={props.correct}
                      check={selected_op}
                    />
                  </TableCell>
                  <TableCell>
                    <CheckParameter
                      parameter="speed"
                      correct={props.correct}
                      check={selected_op}
                    />
                  </TableCell>
                  <TableCell>
                    <CheckParameter
                      parameter="gadgets"
                      correct={props.correct}
                      check={selected_op}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Guesses;
