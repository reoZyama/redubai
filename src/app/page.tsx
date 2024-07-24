'use client'; // Added

import Prototype from './components/prototype/Prototype';
// import Dodecahedron from './components/Dodecahedron'; // Corrected component name
// import Pentagon from './components/Pentagon';
// import Aggregation from './components/Aggregation';
// import Flows from './components/Flows';
// import Line from './components/Line';
// import Marble from './components/Marble'; // Corrected import path
// import Weather from './components/Weather';
// import Form from './components/Form';
import Caption from './components/Caption';
export default function Home() {
  return (
    <>
      {/* <Weather /> */}
      <Prototype />
      {/* <Line />
      <Aggregation />
      <Marble />
      <Flows />
      <Form /> */}
      <Caption />
      {/* <Dodecahedron />
      <Pentagon /> */}
    </>
  );
}
