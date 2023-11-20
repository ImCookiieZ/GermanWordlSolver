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
export type Frequencies = {
    general: {
      [key: string]: {
        [innerKey: string]: number;
      };
    };
    starting: {
      [key: string]: number;
    };
    ending: {
      [key: string]: number;
    };
  }