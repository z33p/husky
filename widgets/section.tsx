import React from "react";

interface Props {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  title: string;
  dark?: boolean;
  applyDivider?: boolean;
  children: React.ReactNode;
}

export default function Section({
  id,
  title,
  className,
  style,
  children,
  dark,
  applyDivider,
}: Props) {
  let backgroundClass: string;
  let textColorClass: string;

  if (dark) {
    backgroundClass = "bg-primary";
    textColorClass = "text-white";
  } else {
    backgroundClass = "bg-white";
    textColorClass = "text-dark";
  }

  const sectionPadding = "px-3 px-md-4 py-1";

  return (
    <React.Fragment>
      {applyDivider ? (
        <div className={sectionPadding}>
          <hr />
        </div>
      ) : undefined}

      <section
        id={id}
        className={`${
          className ?? ""
        } ${backgroundClass} ${textColorClass} ${sectionPadding}`}
        style={style}
      >
        <h1 className="pt-4">{title}</h1>
        <div className="pt-2 pt-md-3">{children}</div>
      </section>
    </React.Fragment>
  );
}
