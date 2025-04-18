const regex = /(\d)\1{3}/;
const plate = "11114";
console.log(plate.match(regex)[0]);

const haiPhimPatternFunction = (digits) => {
  const [a, b, c, d, e] = digits;

  const isAABAB = a === b && a === d && c === e && a !== c;
  const isABABA = a === c && a === e && b === d && a !== b;
  const isABBAB = b === c && a === d && b === e && a !== b;
  console.log(isAABAB, isABABA, isABBAB);
  return isAABAB || isABABA || isABBAB;
};

console.log(haiPhimPatternFunction("88448"));
