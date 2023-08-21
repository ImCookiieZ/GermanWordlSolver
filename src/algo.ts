import { Letter, MetaData } from './interfaces'
import Prebuild from './prebuild'
import Meta from './meta'


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

const optimalTry = (fitting_words: Array<string>) => {
    return fitting_words.filter(word => RegExp(/^(?!.*(.).*\1)[a-zA-Z]+$/).exec(word))
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

    let correct_position_letter_words = getFiveLetterCorrect(word);
    let correct_letter_words = getAllFittingWords(correct_position_letter_words, data.known.map((letter) => letter.char))
    let fitting_words = removeTriedLetters(correct_letter_words, data.known, data.wrong) 

    let optimal_tries = optimalTry(fitting_words)

    Meta.log(fitting_words, optimal_tries, data)
}

export default {
    triedWord
}
