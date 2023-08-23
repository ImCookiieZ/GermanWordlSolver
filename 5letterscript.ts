import fs from "fs"

const data = fs.readFileSync("./wordlists/words-de.txt", 'utf-8')

const five_letter = data.match(RegExp("\\s[A-Z][a-z]{4}\\s", "g"))?.map(word => word.replace(new RegExp("\\s", "gi"), '').toLowerCase())
fs.writeFileSync("5letter-de.txt", five_letter?.join("\n") || "");