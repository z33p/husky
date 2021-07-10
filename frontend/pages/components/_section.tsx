import React from "react";

interface Props {
  id?: string;
  className?: string;
  title: string;
  dark?: boolean;
  applyDivider?: boolean;
  children: React.ReactNode;
}

export default function Section({ id, title, children, dark, applyDivider: divide }: Props) {
  let backgroundClass: string;
  let textColorClass: string;

  if (dark) {
    backgroundClass = "bg-primary";
    textColorClass = "text-white";
  } else {
    backgroundClass = "bg-white";
    textColorClass = "text-dark";
  }

  const sectionPadding = "px-4 py-md-2 px-md-5";

  return (
    <React.Fragment>
      {divide ? (
        <div className={sectionPadding}>
          <hr />
        </div>
      ) : undefined}

      <section
        id={id}
        className={`${backgroundClass} ${textColorClass} ${sectionPadding}`}
      >
        <h1 className="my-4">{title}</h1>
        <div className="pt-2 pt-md-3">{children}</div>
      </section>
    </React.Fragment>
  );
}
