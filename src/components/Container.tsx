import { ContainerProps } from "../lib/types";
import FeedbackList from "./FeedbackList";
import Header from "./Header";

export default function Container({
  feedbackItems,
  isLoading,
  errorMsg,
  handleAddToList,
}: ContainerProps) {
  return (
    <div className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMsg={errorMsg}
      />
    </div>
  );
}
