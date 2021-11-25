import React from "react";
import Section from "../section/section";
import CardRepository from "./card_repository";
import PinnedRepositoriesFile from "../../lib/contracts/external/pinned_repositories_file";

interface Props {
  pinnedRepositoriesFile: PinnedRepositoriesFile;
}

export default function Portfolio({ pinnedRepositoriesFile }: Props) {
  return (
    <Section id="portfolio" title="Portfólio" applyDivider>
      <div className="">
        <div className="grid lg:grid-cols-3 gap-4 items-baseline">
          {pinnedRepositoriesFile.data.map((repo, index) => {
            const languagens = repo.languages.map((language) => ({
              name: language.name,
              color: language.color,
            }));

            return (
              <CardRepository
                key={index}
                name={repo.name}
                description={repo.description}
                languages={languagens}
                url={repo.url}
                className="pb-4"
              />
            );
          })}
        </div>
        <div className="flex justify-end p-3">
          <a
            className="inline-block hover:underline"
            href="https://github.com/z33p"
            target="_blank"
            rel="noreferrer"
          >
            Ver mais
          </a>
        </div>
      </div>
    </Section>
  );
}
