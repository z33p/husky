import Section from "./components/_section";
import githubResposReturn from "../data/github_repos_return.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function Portfolio() {
  return (
    <Section id="portfolio" title="Portfólio" applyDivider>
      <div className="row">
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
              className={
                "col-md-4 pb-4 px-24 " + (index < 3 ? "pb-md-4" : "pb-md-0")
              }
            />
          );
        })}
      </div>
      <div className="d-flex justify-content-end">
        <a href="https://github.com/z33p" target="_blank" rel="noreferrer">
          Ver mais
        </a>
      </div>
    </Section>
  );
}

interface Language {
  name: string;
  color: string;
}

interface CardRepositoryProps {
  className?: string;
  name: string;
  description: string | null;
  languages: Array<Language>;
  url: string;
}

function CardRepository({
  className,
  name,
  description,
  languages,
  url,
}: CardRepositoryProps) {
  return (
    <div className={className + " "}>
      <div className="card shadow" style={{ width: 22 + "rem" }}>
        <div className="card-img-top"></div>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>

          <p className="row">
            <div className="col-6">
              {languages.map((language, index) => (
                <h6 key={index} className="mb-2 text-muted d-flex">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="pt-1"
                    style={{
                      width: 1.1 + "em",
                      height: 1.1 + "em",
                      color: language.color,
                    }}
                  />
                  <span>{language.name}</span>
                </h6>
              ))}
            </div>
            <div className="col-6">
              <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <a
                  href={url}
                  target="_blank"
                  className="btn btn-primary"
                  rel="noreferrer"
                >
                  Saber mais
                </a>
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}
