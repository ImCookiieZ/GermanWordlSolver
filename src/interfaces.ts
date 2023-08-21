export type Letter = {
    char: string;
    index: number;
    correct_position: boolean;
    correct_general: boolean;
}
export type MetaData = {
    known: Array<Letter>,
    tried: Array<string>,
    wrong: Array<string> 
}