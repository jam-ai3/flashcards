"use client";

import { promptFlash } from "./gemini";
import GeminiPrompts from "./prompts";

const Gemini = {
  async generateFlashcardsFromNotes(notes: string) {
    const { prompt, parser } = GeminiPrompts.flashcards.notes(notes);
    const response = await promptFlash(prompt);
    return parser(response);
  },

  async generateFlashcardsFromSyllabus(syllabus: string) {
    const { prompt, parser } = GeminiPrompts.flashcards.syllabus(syllabus);
    const response = await promptFlash(prompt);
    return parser(response);
  },

  async generateFlashcardsFromCourseInfo(school: string, course: string) {
    const { prompt, parser } = GeminiPrompts.flashcards.courseInfo(
      school,
      course
    );
    const response = await promptFlash(prompt);
    return parser(response);
  },
};

export default Gemini;
