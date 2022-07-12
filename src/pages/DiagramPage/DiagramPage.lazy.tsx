import React, { lazy, Suspense } from 'react';

const LazyDiagramPage = lazy(() => import('./DiagramPage'));

const DiagramPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDiagramPage {...props} />
  </Suspense>
);

export default DiagramPage;
