export const getType = (val: any) => {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
};

export const toFixed = (val: string | number, n: number): string => {
  return Number(val).toFixed(n);
};
