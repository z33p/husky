import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  style: React.CSSProperties;
}

interface Sizes {
  width: number;
  height: number;
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

            <div className="">
              <h1 className="display-3">RAPHAEL FELLIPE</h1>
              <p className="h4">
                .NET Developer {"&&"} MSSQL | Flutter {"&&"} React Enthusiast
              </p>
            </div>
        </div>
      </div>

        <Image
          src="/me_4_ws.jpg"
          alt="me"
          quality="100"
          layout="fill"
        />
    </section>
  );
}
