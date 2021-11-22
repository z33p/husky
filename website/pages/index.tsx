import { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import PinnedRepositoriesFile from "../lib/contracts/external/pinned_repositories_file";
import GitHubSyncerService from "../lib/services/github_syncer_service";
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
  const gitHubSyncer = new GitHubSyncerService();

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
      <Portfolio pinnedRepositoriesFile={props.pinnedRepositoriesFile}/>
      <Contact />
      <Curriculum />
    </Layout>
  );
}
