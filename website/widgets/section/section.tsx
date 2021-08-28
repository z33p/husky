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

  const sectionPadding = "px-4 md:px-6";

  return (
    <div className="py-2 flex justify-center">
      <div className="w-full section">
        {applyDivider ? (
          <div className={sectionPadding}>
            <hr />
          </div>
        ) : undefined}

        <section
          id={id}
          className={`w-full ${
            className ?? ""
          } ${backgroundClass} ${textColorClass} ${sectionPadding}`}
          style={style}
        >
          <div className="flex jusitfy-content-center place-content-center">
            <div className="w-full lg:w-11/12 xl:w-3/4">
              <h1 className="px-0 py-2 md:py-3">{title}</h1>
              <div className="flex jusitfy-content-center place-content-center">
                {children}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
