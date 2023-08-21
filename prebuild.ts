import fs from 'fs';
import { Letter } from './interfaces';

const germanWords = fs.readFileSync('wortliste.txt', 'utf-8')
const flags = "gi"
const whitespaceRegex = new RegExp("\\s", flags)

const addVariableLetters = (counter: number) => {
    if (counter == 1) {
        return `[a-z]`;
    } else if (counter > 1) {
        return `[a-z]{${counter}}`;
    }
    return ""
}

const buildLetterPositionRegex = (known: Array<string>): string => {
    const knownLength = known.length;
    let baseRegex = "\\s";
    let counter = 0;

    for (let i = 0; i < knownLength; i++) {
        const char = known[i];

        if (char !== "*") {
            baseRegex += addVariableLetters(counter)
            counter = 0;
            baseRegex += char;
        } else {
            counter++;
        } 
    }
    baseRegex += addVariableLetters(counter)
    baseRegex += "\\s";
    return baseRegex;
};

const getFiveLetterCorrect = (known: Array<string>) => {
    const regex = new RegExp(buildLetterPositionRegex(known), flags)
    return germanWords.match(regex)?.map(word => word.replace(whitespaceRegex, '')) || []
}

const buildGeneralLetterRegex = (known: Array<string>) : RegExp => {
    let baseRegex = ""
    for (let letter of known) {
        baseRegex += `(?=\\w*${letter})`
    }
    return new RegExp(baseRegex, "gi")
} 

const getAllFittingWords = (words_to_check : Array<string>, known_letters: Array<string>) => {
    const regex = buildGeneralLetterRegex(known_letters)
    return words_to_check.filter((word) => RegExp(regex).exec(word))
}

const removeTriedLetters = (words_to_check: Array<string>, known: Array<Letter>, wrong: Array<string>) => {
    const regex = `^(?!.*[${wrong}]).*$`
    words_to_check = words_to_check.filter((word) => {
        if (!RegExp(regex).exec(word)) return false //check for wrong letters
        known.forEach(letter => {
            if (word[letter.index] === letter.char) return false
        });
        return true
    })
    return words_to_check
}

const currentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const log = (fitting_words: Array<string>, optimal_words: Array<string>, data: MetaData) => {
    const current_date = currentDate()
    const path = "./output/" + current_date
    const create = !fs.existsSync(path)
    console.log(create)

    if (create) {
        fs.mkdirSync(path)
        
        fs.mkdirSync(path + "/optimum")
        fs.mkdirSync(path + "/possibilities")
    }
    fs.writeFileSync(`${path}/optimum/${data.tried.length}_try_optimum.txt`, optimal_words.join("\n"))
    fs.writeFileSync(`${path}/possibilities/${data.tried.length}_try_possible.txt`, fitting_words.join("\n"))
    fs.writeFileSync(path + "/tries.json", JSON.stringify({
        tried: data.tried,
        known: data.known,
        wrong: data.wrong
    }, null, 2))
}  

const optimalTry = (fitting_words: Array<string>) => {
    return fitting_words.filter(word => RegExp(/^(?!.*(.).*\1)[a-zA-Z]+$/).exec(word))
}

const getMetaData = () => {
    const current_date = currentDate()
    const path = "./output/" + current_date + "/tries.json"
    const exists = fs.existsSync(path)

    if (exists) {
        return JSON.parse(fs.readFileSync(path).toString())
    }
    return {
        "tried": [],
        "known": [],
        "wrong": []
    }
}

export default {
    getFiveLetterCorrect,
    buildGeneralLetterRegex,
    buildLetterPositionRegex,
    getAllFittingWords,
    removeTriedLetters,
    log,
    optimalTry,
    getMetaData
}