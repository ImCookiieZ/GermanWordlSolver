// export const LANGUAGE = "de"
// export const LANGUAGE = "at"
export const LANGUAGE = "de"
// export const LANGUAGE = "test"
import Algo from "./src/algo"

Algo.triedWord("magie", [
    {char: "m", correct_general: true, correct_position: false, index: 0},
    {char: "a", correct_general: true, correct_position: false, index: 1},
    {char: "g", correct_general: false, correct_position: false, index: 2},
    {char: "i", correct_general: false, correct_position: false, index: 3},
    {char: "e", correct_general: false, correct_position: false, index: 4}
])