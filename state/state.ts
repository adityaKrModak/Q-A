export interface FeedDataType {
  id: string;
  question: string;
  likes: number;
  comments: number;
  description: string;
  date: Date;
  labels: string[];
}

export interface QAState {
  FeedData: FeedDataType[];
  Labels: string[];
}
export const initialState: QAState = {
  FeedData: [],
  Labels: [],
};
