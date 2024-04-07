import { useFeedbackItemsContext } from "../../lib/hooks";
import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

export default function Header() {
  const { handleAddToList } = useFeedbackItemsContext();
  return (
    <header>
      <Pattern></Pattern>
      <Logo></Logo>
      <PageHeading></PageHeading>
      <FeedbackForm onAddToList={handleAddToList}></FeedbackForm>
    </header>
  );
}
