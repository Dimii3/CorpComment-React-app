import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedbackItem } from "../../lib/types";
import { useState } from "react";

type FeedbackItemProps = { feedbackItem: TFeedbackItem };
export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);
  const handleUpvote = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    e.currentTarget.disabled = true;
    setUpvoteCount((prev) => prev + 1);
  };
  return (
    <li
      onClick={() => {
        setOpen(!open);
      }}
      className={`feedback ${open && "feedback--expand"}`}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon></TriangleUpIcon>
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>{feedbackItem.daysAgo === 0 ? "NEW" : feedbackItem.daysAgo + "d"}</p>
    </li>
  );
}
