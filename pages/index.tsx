import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import AddQuestionComp from "../components/AddQuestionComp";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <AddQuestionComp />
    </Layout>
  );
};

export default Home;
