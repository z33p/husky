import { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import PinnedRepositoriesFile from "../lib/contracts/external/pinned_repositories_file";
import GitHubSyncerBusiness from "../lib/business/github_syncer_business";
import AboutMe from "../widgets/about_me";
import Contact from "../widgets/contact/contact";
import Curriculum from "../widgets/curriculum";
import Banner from "../widgets/layout/banner";
import Layout from "../widgets/layout/layout";
import Portfolio from "../widgets/portifolio/portifolio";

interface Props {
  pinnedRepositoriesFile: PinnedRepositoriesFile;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const gitHubSyncer = new GitHubSyncerBusiness();

  const pinnedRepositoriesFile = await gitHubSyncer.getPinnedRepositories();

  return {
    props: {
      pinnedRepositoriesFile,
    },
  };
};

export default function index(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Layout>
      <Banner />
      <AboutMe />
      <Portfolio pinnedRepositoriesFile={props.pinnedRepositoriesFile} />
      <Contact />
      <Curriculum />
    </Layout>
  );
}
