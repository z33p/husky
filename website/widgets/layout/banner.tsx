import React from "react";

export default function Banner() {
  const imgUrl = "me_4_ws.jpg";

  const bannerImgStyle = {
    backgroundImage: `url(${imgUrl})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }

  return (
    <section
      className="d-flex justify-content-center align-items-center bg-primary position-relative"
      style={{ height: 100 + "vh"}}
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
          <div className="pb-5">
            <h1 className="display-3">RAPHAEL FELLIPE</h1>
            <p className="h4">
              .NET Developer {"&&"} MSSQL | Flutter {"&&"} React Enthusiast
            </p>
          </div>
        </div>
      </div>

      <div style={bannerImgStyle} className="h-100 w-100"></div>
    </section>
  );
}
