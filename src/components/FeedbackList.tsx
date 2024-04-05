import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMsg from "./ErrorMsg";
import { ContainerProps } from "../lib/types";

export default function FeedbackList({
  feedbackItems,
  isLoading,
  errorMsg,
}: ContainerProps) {
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner></Spinner>}
      {errorMsg && <ErrorMsg msg={errorMsg}></ErrorMsg>}
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem
          key={feedbackItem.id}
          feedbackItem={feedbackItem}
        ></FeedbackItem>
      ))}
    </ol>
  );
}
