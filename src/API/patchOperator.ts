export const PatchGuess = (token: string, solves: string) => {
  void fetch(`http://api.r6dle.tech/stats?solves=${solves}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
};
