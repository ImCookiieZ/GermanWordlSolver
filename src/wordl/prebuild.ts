import fs from 'fs';
import { LANGUAGE } from "../../main"

const ü_regex = new RegExp("ü", 'g');
const ä_regex = new RegExp("ä", 'g');
const ö_regex = new RegExp("ö", 'g');
const words = fs.readFileSync(`./wordlists/words-${LANGUAGE}.txt`, 'utf-8').toLowerCase().replace(ä_regex, "ae").replace(ü_regex, "ue").replace(ö_regex, "oe")
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

const buildLetterPositionRegex = (known: Array<string>): RegExp => {
    const knownLength = known.length;
    let baseRegex = "\\s";
    let counter = 0;
    
    if (known[0] == "*") {
        baseRegex += "[a-z]"
    } else {
        baseRegex += known[0].toUpperCase()
    }
    for (let i = 1; i < knownLength; i++) {
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
    return new RegExp(baseRegex, flags)
};

const buildGeneralLetterRegex = (known: Array<string>) : RegExp => {
    let baseRegex = ""
    for (let letter of known) {
        baseRegex += `(?=\\w*${letter})`
    }
    return new RegExp(baseRegex, "gi")
} 




export default {
    buildGeneralLetterRegex,
    buildLetterPositionRegex,
    whitespaceRegex,
    words
}