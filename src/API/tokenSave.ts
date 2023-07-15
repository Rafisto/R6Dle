import { GenerateToken } from "./tokenGenerator";

export const TokenSave = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token != null) {
    return { status: "success", token: token };
  } else {
    const fetchToken = await GenerateToken();
    if (fetchToken.status === "success") {
      localStorage.setItem("token", fetchToken.token);
      return { status: "success", token: fetchToken.token };
    } else {
      return { status: "error", token: "" };
    }
  }
};
