import { createContext, useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../../lib/types";

type TFeedbackItemsContext = {
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMsg: string;
  companyList: string[];
  handleSelectCompany: (company: string) => void;
  handleAddToList: (text: string) => void;
};

export const feedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);

export default function FeedbackItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");

  const companyList = useMemo(() => {
    return feedbackItems
      .map((feedbackItem) => feedbackItem.company)
      .filter((company, index, array) => {
        return array.indexOf(company) === index;
      });
  }, [feedbackItems]);

  const filteredFeedbackItems = useMemo(() => {
    return selectedCompany
      ? feedbackItems.filter(
          (feedbackItem) => feedbackItem.company === selectedCompany
        )
      : feedbackItems;
  }, [feedbackItems, selectedCompany]);

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

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
    <feedbackItemsContext.Provider
      value={{
        filteredFeedbackItems,
        handleSelectCompany,
        isLoading,
        errorMsg,
        handleAddToList,
        companyList,
      }}
    >
      {children}
    </feedbackItemsContext.Provider>
  );
}
