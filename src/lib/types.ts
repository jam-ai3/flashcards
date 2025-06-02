export type InputType = "notes" | "syllabus" | "courseInfo";
export type InputFormat = "text" | "pdf" | "pptx" | "image";
export type PaymentType = "free" | "subscription";
export type Status = "success" | "error";

export type RawFlashcard = {
  front: string;
  back: string;
};

export type PaymentResult = {
  subscriptionType: "free" | "subscription" | null;
};

export type Session = {
  id: string;
  email: string;
  isAdmin: boolean;
};

export type Note = {
  id: number;
  guid: string;
  mid: number;
  mod: number;
  usn: number;
  tags: string;
  flds: string;
  sfld: string;
  cusm: number;
  flags: number;
  data: string;
};

export type Card = {
  id: number;
  nid: number;
  did: number;
  ord: number;
  mod: number;
  usn: number;
  type: number;
  queue: number;
  due: number;
  ivl: number;
  factor: number;
  reps: number;
  lapses: number;
  left: number;
  odue: number;
  odid: number;
  flags: number;
  data: string;
};
