// export const LANGUAGE = "de"
// export const LANGUAGE = "at"
export const LANGUAGE = "de"
// export const LANGUAGE = "test"
import Algo from "./src/wordl/algo"
import { wordify } from "./src/wordify/algo"

Algo.triedWord("krise", [
    {char: "k", correct_general: true, correct_position: false, index: 0},
    {char: "r", correct_general: true, correct_position: false, index: 1},
    {char: "i", correct_general: true, correct_position: false, index: 2},
    {char: "s", correct_general: false, correct_position: false, index: 3},
    {char: "e", correct_general: false, correct_position: false, index: 4}
])

// wordify("envmra", "d")