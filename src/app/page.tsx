'use client'; // Added

import Ellipse from './components/Ellipse';
import Otameshi from './components/Prototype';
import Mozaik2 from './components/Dodecahedron';
import Mozaiku from './components/Pentagon';
import Aggregation from './components/Aggregation';
import Title from './components/Title';

export default function Home() {
  return (
    <>
      <Otameshi />
      <Title />
      <Aggregation />
      <Mozaik2 />
      <Mozaiku />
      <Ellipse />
    </>
  );
}
