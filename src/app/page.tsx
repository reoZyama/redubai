'use client'; // Added

import Kimetenai from './components/Kimetenai'; // Changed import
import Ellipse from './components/Ellipse';
import Prototype from './components/Prototype';
import Dodecahedron from './components/Dodecahedron'; // Corrected component name
import Pentagon from './components/Pentagon';
import Aggregation from './components/Aggregation';
import Title from './components/Title';
import Flows from './components/Flows';
import Line from './components/Line';
import Pop from './components/Pop';
import Marble from './components/Marble'; // Corrected import path
import Weather from './components/Weather';

export default function Home() {
  return (
    <>
      {/* <Title /> */}
      {/* <Prototype /> */}
      <Kimetenai /> 
      {/* <Weather /> */}
      {/* <Ellipse /> */}
      {/* <Aggregation /> */}
      <Dodecahedron />
      {/* <Pentagon /> */}
      <Flows />
      {/* <Line /> */}
      <Pop />
      {/* <Marble /> */}
    </>
  );
}