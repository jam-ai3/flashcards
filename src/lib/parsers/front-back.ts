import { Parser } from "./parser";

declare module "./parser" {
  interface Parser {
    _frontBack(front: string, back: string): void;
  }
  interface FlashcardTypeMap {
    frontBack: true;
  }
}

Parser.prototype._frontBack = (front: string, back: string) => {
  console.log(front, back);
};
