import React from "react";

const textStyle: React.CSSProperties = {
  fontFamily: "Kalam", // "Mali", "Merienda"
  fontWeight: "normal",
};

export default function Banner() {
  const imgUrl = "me_4_ws.jpg";

  const bannerImgStyle = {
    backgroundImage: `url(${imgUrl})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <section className="h-screen flex justify-center place-items-center bg-primary relative">
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: 1030,
        }}
        className="h-full w-full absolute flex justify-items-center"
      >
        <div className="w-full text-center flex justify-center place-items-center text-white">
          <div className="pb-2">
            <h1 className="text-8xl p-0" style={textStyle}>
              RAPHAEL FELLIPE
            </h1>
            <p className="text-lg p-0" style={textStyle}>
              .NET Developer {"&&"} MSSQL | Flutter {"&&"} React Enthusiast
            </p>
          </div>
        </div>
      </div>

      <div style={bannerImgStyle} className="h-full w-full"></div>
    </section>
  );
}
