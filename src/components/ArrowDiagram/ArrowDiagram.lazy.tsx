import React, { lazy, Suspense } from 'react';

const LazyArrowDiagram = lazy(() => import('./ArrowDiagram'));

const ArrowDiagram = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyArrowDiagram {...props} />
  </Suspense>
);

export default ArrowDiagram;
