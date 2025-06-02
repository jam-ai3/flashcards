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
