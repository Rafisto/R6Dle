import r6ops from "./../r6ops.json";
import { sha256 } from "js-sha256";

type Operator = {
  operator: string;
};

export const DailyOperator = async (token: string) => {
  const opList = Object.keys(r6ops);
  if (token != null) {
    return fetch("http://api.r6dle.tech/operator", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return {
          status: "success",
          data: opList.filter((q) => sha256(q) == (data as Operator).operator)[0],
          sha: (data as Operator).operator,
        };
      })
      .catch((error) => {
        console.log(error);
        return { status: "error", data: error as string, sha: "" };
      });
  } else {
    return { status: "error", data: "", sha: "" };
  }
};
