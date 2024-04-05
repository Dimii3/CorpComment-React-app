import { ContainerProps } from "../lib/types";
import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Pattern from "./Pattern";

export default function Header({ handleAddToList }: ContainerProps) {
  return (
    <header>
      <Pattern></Pattern>
      <Logo></Logo>
      <PageHeading></PageHeading>
      <FeedbackForm onAddToList={handleAddToList}></FeedbackForm>
    </header>
  );
}
