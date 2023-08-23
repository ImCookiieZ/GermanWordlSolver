import { Letter, MetaData } from './interfaces'
import Prebuild from './prebuild'
import Meta from './meta'
import { frequencies } from "../wordlists/frequencies"
import { LANGUAGE } from '../main'

const data : MetaData = Meta.getMetaData()
let word = "*****".split('')

const getFiveLetterCorrect = (known: Array<string>) => {
    const regex = Prebuild.buildLetterPositionRegex(known)
    return Prebuild.words.match(regex)?.map(word => word.replace(Prebuild.whitespaceRegex, '').toLowerCase()) || []
}

const getAllFittingWords = (words_to_check : Array<string>, known_letters: Array<string>) => {
    const regex = Prebuild.buildGeneralLetterRegex(known_letters)
    return words_to_check.filter((word) => RegExp(regex).exec(word))
}

const removeTriedLetters = (words_to_check: Array<string>, known: Array<Letter>, wrong: Array<string>) => {
    const regex = `^(?!.*[${wrong}]).*$`
    const filtered_words = words_to_check.filter((word) => {
        if (!RegExp(regex).exec(word)) return false //check for wrong letters
        for (const letter of known) {
            if (word[letter.index] == letter.char) { return false}
        };
        return true
    })
    return filtered_words
}

const nonDublicateLetters = (fitting_words: Array<string>) => {
    return fitting_words.filter(word => RegExp(/^(?!.*(.).*\1)[a-zA-Z]+$/).exec(word))
}

const sortByOptimum = (words: Array<string>): Array<string> => {
    let score_words: Array<{word: string, score: number}> = []

    for (const word of words) {
        const letters = word.split("")
        const done_letters: Array<string> = []
        const el = {
            word: word,
            score: 0
        }
        for (const letter of letters) {
            if (!done_letters.includes(letter)) {
                if (frequencies.general[letter])  {
                    el.score += frequencies.general[letter][LANGUAGE]
                    done_letters.push(letter)       
                }
            }
        }
        if (frequencies.general[letters[0]])  {
            el.score += frequencies.starting[letters[0]] || 0
        }
        const tmp = letters[letters.length - 1]
        if (tmp) {
            el.score += frequencies.ending[tmp] || 0
        }
        score_words.push(el)
    }
    score_words = score_words.sort((a, b) => b.score - a.score)
    return score_words.map(el => el.word)
}

export const triedWord = (tried_word: string, letters: Array<Letter>) => {
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
    data.wrong = data.wrong.filter((el) => !word.includes(el))
    let correct_position_letter_words = getFiveLetterCorrect(word);
    let correct_letter_words = getAllFittingWords(correct_position_letter_words, data.known.map((letter) => letter.char))
    let fitting_words = removeTriedLetters(correct_letter_words, data.known, data.wrong) 
    console.log(fitting_words)

    let sort_fitting_optimal = sortByOptimum(fitting_words)
    let non_dublicate_tries = nonDublicateLetters(sort_fitting_optimal)
    Meta.log(sort_fitting_optimal, non_dublicate_tries, data)
}

export default {
    triedWord
}
