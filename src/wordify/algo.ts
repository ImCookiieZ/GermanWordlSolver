import fs from 'fs';
const words = fs.readFileSync(`./wordlists/words-de.txt`, 'utf-8').toLowerCase()
const flags = "gi"
const whitespaceRegex = new RegExp("\\s", flags)

export type Letter_Points = {
    word: string
    points: number
}

export const wordify = (letters: string, must_have: string) => {
    const regexPattern = new RegExp(`\\s\\b[${letters.toLowerCase()}]*${must_have.toLowerCase()}[${letters.toLowerCase()}]*\\b\\s`, flags);
    console.log(regexPattern);
    let possible_words = words.match(regexPattern)?.map(word => word.replace(whitespaceRegex, '')).filter(word => word.length >= 4) || [];
    const uniqueWordsSet = new Set(possible_words);
    possible_words = [...uniqueWordsSet];
    const word_points: Array<Letter_Points> = []
    possible_words.forEach((word) => {
        let points = 0
        if (word.length == 4) {
            points = 1
        }
        else {
            points += word.length
            const lookaheadPatterns = Array.from(letters.toLowerCase() + must_have.toLowerCase()).map(letter => `(?=.*${letter})`).join('');
            const regexAll = new RegExp(`\\b${lookaheadPatterns}\\w{4,}\\b`, flags);
            if (word.match(regexAll)) {
                points += 7
            }
        }
        word_points.push({word: word, points: points})
    })
    word_points.sort((a, b) => b.points - a.points)
    const letterPointsString = word_points.map(item => `${item.word}: ${item.points}`).join('\n');
    console.log(letterPointsString);
    fs.writeFileSync("words.txt", letterPointsString)
}