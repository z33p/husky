import React, { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";

export default function RestScreen() {
  const session = useSession();

  if (session)
    return <RandomStripesBackground />

  return null;
}

const colors = [
  "#1F8BC3", // Blue
  "#A2D5F2",
  "#27AE60", // Green
  "#2ECC40",
  "#FF4136", // Red
  "#E74C3C",
  "#FFDC00", // yellow
  "#F1C40F",
  "#FF851B", // Orange
  "#FF007F", // Pink
  "#E91E63",
  "#B10DC9", // Purple
  "#8E44AD",
];

const angles = [15, 30, 45, 60, 75, 90];

const numStripes = 2000;

interface StripeProps {
  color: string;
  angle: number;
  isEven: boolean;
}

const Stripe = ({ color, angle, isEven }: StripeProps) => {
  const [top, setTop] = useState<string | number>(0);
  const [left, setLeft] = useState<string | number>(0);

  useEffect(() => {
    const sign = isEven ? "-" : "";

    setTop(`${sign}${getRandomInt(window.outerHeight)}px`);
    setLeft(`${sign}${getRandomInt(window.outerWidth)}px`);
  }, [isEven]);

  return (
    <div
      className="stripe"
      title={`top ${top} left ${left}`}
      style={{
        position: "absolute",
        width: "100%",
        height: "40px",
        backgroundColor: color,
        transform: `rotate(${angle}deg)`,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        top,
        left,
      }}
    ></div>
  );
};


const RandomStripesBackground = () => {
  const [stripes, setStripes] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStripes((prevStripes) => [
        ...prevStripes,
        <Stripe
          key={prevStripes.length}
          color={colors[getRandomInt(colors.length)]}
          angle={angles[getRandomInt(angles.length)]}
          isEven={getRandomIsEven()}
        />,
      ]);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setStripes(
      Array.from({ length: numStripes }, (_, i) => (
        <Stripe
          key={i}
          color={colors[getRandomInt(colors.length)]}
          angle={angles[getRandomInt(angles.length)]}
          isEven={getRandomIsEven()}
        />
      ))
    );
  }, []);

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: "#f2f2f2",
        backgroundImage: "linear-gradient(to bottom, #f2f2f2 0%, #f2f2f2 100%)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {stripes.map(({ key, props }) => (
        <Stripe key={key} {...props} />
      ))}
    </div>
  );
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getRandomIsEven(): boolean {
  return getRandomInt(2) % 2 === 0;
}