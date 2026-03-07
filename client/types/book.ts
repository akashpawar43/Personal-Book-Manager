export interface Book {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: "want_to_read" | "reading" | "completed";
}