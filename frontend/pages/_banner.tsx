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
  const [sizes, setSizes] = useState<Sizes>();
  const bannerId = "banner";

  useEffect(() => {
    const banner = document.getElementById(bannerId)?.getBoundingClientRect();

    if (banner) {
      let { width, height } = banner;

      if (width > height) {
        width = height;
      }

      setSizes({
        width: width,
        height: height,
      });
    }
  }, []);

  return (
    <section
      className="d-flex justify-content-center align-items-center bg-primary position-relative"
      style={style}
    >
      <div
        id={bannerId}
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
          {!sizes ? (
            <div className="spinner-border text-info" />
          ) : (
            <div className="">
              <h1 className="display-3">RAPHAEL FELLIPE</h1>
              <p className="h4">
                .NET Developer {"&&"} MSSQL | Flutter {"&&"} React Enthusiast
              </p>
            </div>
          )}
        </div>
      </div>

      {!sizes ? undefined : (
        <Image
          src="/me.jpg"
          alt="me"
          width={sizes.width}
          height={sizes.height}
          quality="100"
        />
      )}
    </section>
  );
}
