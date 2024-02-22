import Layout from "components/layout.comp";
import { FC } from "react";
import SearchTicketsContent from "./components/search-tickets-content.comp";
import Header from "components/header.comp";

const SearchTicketsPage: FC = () => {
  return (
    <>
      <Header />
      <Layout>
        <SearchTicketsContent />
      </Layout>
    </>
  );
};

export default SearchTicketsPage;
