import React, { lazy, Suspense } from 'react';

const LazyDiagram = lazy(() => import('./Diagram'));

const Diagram = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDiagram {...props} />
  </Suspense>
);

export default Diagram;
