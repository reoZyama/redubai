"use client"; // Added

import Animation from "./components/Animation";
import Otameshi from "./components/Otameshi";
import Mozaik2 from "./components/Mozaik2";
import Mozaiku from "./components/Mozaiku";
import Sisaku from "./components/Sisaku";
import { useState } from "react";
  


export default function Home() {
  const [isAnimation, setIsAnimation] = useState(false);

  const handleAnimation = () => {
    setIsAnimation(!isAnimation);
  };
  return (
    <>
      <Otameshi />
      <Animation />
      <Mozaik2 />
      <Mozaiku />
      <Sisaku />
      
        

    </>
  );
}
