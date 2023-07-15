export const GenerateToken = () => {
  return fetch("http://api.r6dle.tech/token", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return { status: "success", token: (data as { token: string }).token };
    })
    .catch((error) => {
      console.log(error);
      return { status: "error", token: error as string };
    });
};
