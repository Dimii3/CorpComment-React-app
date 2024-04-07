import HashtagItem from "./HashtagItem";

type HashTagListProps = {
  companyList: string[];
  handleSelectCompany: (company: string) => void;
};

export default function HashtagsList({
  companyList,
  handleSelectCompany,
}: HashTagListProps) {
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem
          onSelectCompany={handleSelectCompany}
          company={company}
        ></HashtagItem>
      ))}
    </ul>
  );
}
