// parser.ts
export class Parser {
  static shared = new Parser();

  private constructor() {}

  parse(front: string, back: string, type: FlashcardType) {
    const fn = this[`_${type}`];
    if (!fn) throw new Error(`Unknown flashcard type: ${type}`);
    return fn(front, back);
  }
}

export interface FlashcardTypeMap {}

export type FlashcardType = keyof FlashcardTypeMap;
