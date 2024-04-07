import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMsg from "../ErrorMsg";
import { useFeedbackItemsContext } from "../../lib/hooks";

export default function FeedbackList() {
  const { filteredFeedbackItems, isLoading, errorMsg } =
    useFeedbackItemsContext();

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner></Spinner>}
      {errorMsg && <ErrorMsg msg={errorMsg}></ErrorMsg>}
      {filteredFeedbackItems.map((feedbackItem) => (
        <FeedbackItem
          key={feedbackItem.id}
          feedbackItem={feedbackItem}
        ></FeedbackItem>
      ))}
    </ol>
  );
}
