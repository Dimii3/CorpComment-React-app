export type TFeedbackItem = {
  id: number;
  upvoteCount: number;
  badgeLetter: string;
  company: string;
  text: string;
  daysAgo: number;
};

export type ContainerProps = {
  isLoading: boolean;
  feedbackItems: TFeedbackItem[];
  errorMsg: string;
  handleAddToList: (text: string) => void;
};
