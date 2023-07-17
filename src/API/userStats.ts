export const UserStats = async (token: string) => {
  return fetch("http://api.r6dle.tech/stats/user/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return {
        status: "success",
        stats: (data as { message: { [key: string]: number } }).message,
      };
    })
    .catch((error: string) => {
      console.log(error);
      return { status: "error" };
    });
};
