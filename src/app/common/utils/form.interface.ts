export interface QuestionForm {
  type: string;
  question: string;
  isRequired: boolean;
  isOther: boolean;
  optionList?: Option[];
}

export interface Option {
  [key: string]: string;
}

export interface PreviewForm {
  type: string;
  question: string;
  answer: string | string[];
}
