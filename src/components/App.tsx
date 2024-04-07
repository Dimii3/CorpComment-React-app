import { useEffect, useMemo, useState } from "react";
import Container from "./layout/Container";
import Footer from "./layout/Footer";
import { TFeedbackItem } from "../lib/types";
import HashtagsList from "./hashtag/HashtagList";

export default function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");

  const filteredFeedbackItems = useMemo(() => {
    return selectedCompany
      ? feedbackItems.filter(
          (feedbackItem) => feedbackItem.company === selectedCompany
        )
      : feedbackItems;
  }, [feedbackItems, selectedCompany]);
  const companyList = useMemo(() => {
    return feedbackItems
      .map((feedbackItem) => feedbackItem.company)
      .filter((company, index, array) => {
        return array.indexOf(company) === index;
      });
  }, [feedbackItems]);

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word: string) => word.includes("#"))!
      .substring(1);
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };
    setFeedbackItems((prevItems) => [...prevItems, newItem]);
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        const { feedbacks } = data;
        setIsLoading(false);
        setFeedbackItems(feedbacks);
      } catch (err) {
        setIsLoading(false);
        setErrorMsg("Please try again later");
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="app">
      <Footer />
      <Container
        feedbackItems={filteredFeedbackItems}
        isLoading={isLoading}
        errorMsg={errorMsg}
        handleAddToList={handleAddToList}
      />
      <HashtagsList
        companyList={companyList}
        handleSelectCompany={handleSelectCompany}
      />
    </div>
  );
}
