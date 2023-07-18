type Obj = {
  [key: string]: unknown;
};

export const compareObjects = (obj1: Obj, obj2: Obj, params: string[]) => {
  let counter = "";
  for (let i = 0; i < params.length; i++) {
    if (obj1[params[i]] == obj2[params[i]]) {
      counter += "🟢";
    } else {
      counter += "🔴";
    }
  }
  return counter;
};
