let first = "f";
let last = "l";

export const First = () => first;
export const Last = () => last;
export const Change = (n, newValue) => n == "f" ? first += newValue : last += newValue;