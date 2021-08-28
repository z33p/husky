import githubResposReturn from "../../lib/data/github_repos_return.json";
import React from "react";
import Section from "../section/section";
import CardRepository from "./card_repository";

export default function Portfolio() {
  return (
    <Section id="portfolio" title="Portfólio" applyDivider>
      <div className="">
        <div className="grid lg:grid-cols-3 gap-4 items-baseline">
          {githubResposReturn.data.user.pinnedItems.edges.map((edge, index) => {
            const { node: repository } = edge;

            const languagens = repository.languages.nodes.map((language) => ({
              name: language.name,
              color: language.color,
            }));

            return (
              <CardRepository
                key={index}
                name={repository.name}
                description={repository.description}
                languages={languagens}
                url={repository.url}
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
