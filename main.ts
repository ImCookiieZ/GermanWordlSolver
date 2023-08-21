import { Letter, MetaData } from "./interfaces";
import Prebuild from "./prebuild";


let word = "*****".split('')



const data : MetaData = Prebuild.getMetaData()
console.log(data);


const triedWord = (tried_word: string, letters: Array<Letter>) => {
    data.tried.push(tried_word)
    for (let letter of letters) {
        if (letter.correct_position) {
            word[letter.index] = letter.char
        } else if (letter.correct_general) {
            data.known.push(letter)
        } else {
            data.wrong.push(letter.char)
        }
    }
}

// triedWord("fabel", [
//     {char: "f", correct_general: false, correct_position: false, index: 0},
//     {char: "a", correct_general: false, correct_position: false, index: 1},
//     {char: "b", correct_general: false, correct_position: false, index: 2},
//     {char: "e", correct_general: true, correct_position: false, index: 3},
//     {char: "l", correct_general: false, correct_position: false, index: 4}
// ])

// triedWord("junge", [
//     {char: "j", correct_general: false, correct_position: false, index: 0},
//     {char: "u", correct_general: false, correct_position: false, index: 1},
//     {char: "n", correct_general: false, correct_position: false, index: 2},
//     {char: "g", correct_general: true, correct_position: false, index: 3},
//     {char: "e", correct_general: true, correct_position: false, index: 4}
// ])

// triedWord("zwerg", [
//     {char: "z", correct_general: false, correct_position: true, index: 0},
//     {char: "w", correct_general: false, correct_position: true, index: 1},
//     {char: "e", correct_general: false, correct_position: true, index: 2},
//     {char: "r", correct_general: false, correct_position: false, index: 3},
//     {char: "g", correct_general: false, correct_position: true, index: 4}
// ])

const correct_position_letter_words = Prebuild.getFiveLetterCorrect(word);
const correct_letter_words = Prebuild.getAllFittingWords(correct_position_letter_words, data.known.map((letter) => letter.char))
const fitting_words = Prebuild.removeTriedLetters(correct_letter_words, data.known, data.wrong) 

const optimal_tries = Prebuild.optimalTry(fitting_words)

console.log(data);
Prebuild.log(fitting_words, optimal_tries, data)