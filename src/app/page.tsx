'use client'; // Added

import Ellipse from './components/Ellipse';
import Otameshi from './components/Otameshi';
import Mozaik2 from './components/Mozaik2';
import Mozaiku from './components/Mozaiku';
import Aggregation from './components/Aggregation';
import Title from './components/Title';

export default function Home() {
  return (
    <>
      <Title />
      <Otameshi />
      <Ellipse />
      <Mozaik2 />
      <Mozaiku />
      <Aggregation />
    </>
  );
}
