import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagsList from "./hashtag/HashtagList";
import FeedbackItemsContextProvider from "./contexts/FeedbackItemsContextProvider";

export default function App() {
  return (
    <div className="app">
      <Footer />
      <FeedbackItemsContextProvider>
        <Container />
        <HashtagsList />
      </FeedbackItemsContextProvider>
    </div>
  );
}
