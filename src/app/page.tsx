'use client'; // Added

import Ellipse from './components/Ellipse';
import Prototype from './components/Prototype';
import Dodecahedron from './components/Dodecahedron'; // Corrected component name
import Pentagon from './components/Pentagon';
import Aggregation from './components/Aggregation';
import Title from './components/Title';
import Flows from './components/Flows';
import Line from './components/Line';
import Marble from './components/Marble'; // Corrected import path
import Weather from './components/Weather';
import Pop from './components/Pop'; // Changed backticks to single quotes
import Tenki from './components/Tenki'
import Grass from './components/Grass'
export default function Home() {
  return (
    <>
      <Prototype />
      <Title />
      <Weather />
      <Line />
      <Aggregation />
      <Marble />
      {/* <Ellipse /> */}
      <Dodecahedron />
      <Pentagon />
      <Flows />
      {/* <Pop /> */}
      {/* <Tenki /> */}
      {/* <Grass /> */}
    </>
  );
}