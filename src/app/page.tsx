'use client'; // Added

import Ellipse from './components/Ellipse';
import Otameshi from './components/Prototype';
import Mozaik2 from './components/Dodecahedron';
import Mozaiku from './components/Pentagon';
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
      <Otameshi />
      <Title />
      <Aggregation />
      <Mozaik2 />
      <Mozaiku />
      <Ellipse />
      <Flows />
      <Line />
      <Pop />
      <Marble />
      <Weather />
    </>
  );
}
