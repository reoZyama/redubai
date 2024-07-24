'use client';

import Prototype from './components/prototype/Prototype';
import Dodecahedron from './components/dodecahedron/Dodecahedron';
import Pentagon from './components/pentagon/Pentagon';
import Aggregation from './components/aggregation/Aggregation';
import Flows from './components/flows/Flows';
import Line from './components/line/Line';
import Marble from './components/marble/Marble';
import Weather from './components/Weather';
import Form from './components/form/Form';
import Caption from './components/Caption';
export default function Home() {
  return (
    <>
      <Weather />

      <Form />
      <Flows />
      <Marble />
      <Aggregation />
      <Pentagon />
      <Dodecahedron />
      <Line />
      <Prototype />
      <Caption />
    </>
  );
}
