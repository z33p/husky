import React from "react";

interface Props {
  style: React.CSSProperties;
}

export default function Banner({ style }: Props) {

  return (
    <section
      className="d-flex justify-content-center align-items-center bg-primary position-relative"
      style={style}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          width: "100%",
          height: "100%",
          zIndex: 1030,
        }}
        className="row align-items-center"
      >
        <div className="text-center align-middle text-white">
          <h1 className="display-3">RAPHAEL FELLIPE</h1>
          <p className="h4">
            .NET Developer {"&&"} MSSQL | Flutter {"&&"} React Enthusiast
          </p>
        </div>
      </div>
    </section>
  );
}
