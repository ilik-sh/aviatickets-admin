import { FC } from "react";
import { UsersTable } from "./components/users-table.comp";
import Header from "components/header.comp";
import Layout from "components/layout.comp";

const UsersPage: FC = () => {
  return (
    <>
      <Header />
      <Layout>
        <UsersTable />
      </Layout>
    </>
  );
};

export default UsersPage;
