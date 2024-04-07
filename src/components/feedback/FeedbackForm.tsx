import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constans";

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState("");
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.includes("#") && text.length >= 5) {
      setShowValidIndicator(true);
      setTimeout(() => {
        setShowValidIndicator(false);
      }, 3000);
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => {
        setShowInvalidIndicator(false);
      }, 3000);
      return;
    }
    onAddToList(text);
    setText("");
  };
  const charCount = MAX_CHARACTERS - text.length;
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) return;
    setText(newText);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicator && "form--valid"} ${
        showInvalidIndicator && "form--invalid"
      }`}
    >
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder="smth"
        spellCheck={false}
      ></textarea>
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag your company
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>submit</span>
        </button>
      </div>
    </form>
  );
}
