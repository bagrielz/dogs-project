import React from "react";
import styles from "./Home.module.css";
import Feed from "../Feed/Feed";
import Head from "../Helper/Head";

const Home = () => {
  return (
    <section className="container mainContainer">
      <Head title="Feed" description="Feed de fotos da rede social Dogs." />
      <Feed />
    </section>
  );
};

export default Home;
