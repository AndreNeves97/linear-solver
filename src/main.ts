import { solve } from "./linear-solver/linear-solver";
import { GEQ, LEQ, MAX, MIN } from "./linear-solver/types";

solve(
  MAX,
  [4, 8],
  [
    [3, 2, 18, LEQ],
    [1, 1, 5, LEQ],
    [1, 0, 4, LEQ],
  ]
);
