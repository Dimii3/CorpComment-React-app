import { useContext } from "react";
import { feedbackItemsContext } from "../components/contexts/FeedbackItemsContextProvider";

export const useFeedbackItemsContext = () => {
  const context = useContext(feedbackItemsContext);
  if (!context) {
    throw new Error(
      "FeedbackItemsContext is not defined in FeedbackList component"
    );
  }
  return context;
};
