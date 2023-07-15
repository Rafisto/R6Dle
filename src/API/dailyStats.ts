export const DailyStats = async () => {
  return fetch("http://api.r6dle.tech/stats/global/", {
    method: "GET",
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
