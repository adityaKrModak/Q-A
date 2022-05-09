import { Prisma } from "@prisma/client";

export interface FeedDataType {
  id: string;
  question: string;
  likes: number;
  comments: number;
  description: Prisma.InputJsonValue;
  date: Date;
  labels: string[];
}
export interface CommentType {
  id: string;
  comment: Prisma.InputJsonValue;
  likes: number;
  date: Date;
}

export interface QAState {
  FeedData: FeedDataType[];
  Labels: string[];
}
export const initialState: QAState = {
  FeedData: [],
  Labels: [],
};
