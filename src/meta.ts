import { MetaData } from "./interfaces";
import { LANGUAGE } from "../main"
import fs from "fs"

const getMetaData = () => {
    const path = PATH + "/tries.json"
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

const currentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const current_date = currentDate()
export const PATH = "./output/" + current_date + "_" + LANGUAGE

const log = (fitting_words: Array<string>, optimal_words: Array<string>, data: MetaData) => {
    const path = PATH
    const create = !fs.existsSync(path)

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

export default {
    getMetaData,
    log
}