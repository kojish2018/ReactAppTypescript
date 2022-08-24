import React, { lazy, Suspense } from 'react';

const LazyReactFlowComponent = lazy(() => import('./ReactFlowComponent'));

const ReactFlowComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyReactFlowComponent {...props} />
  </Suspense>
);

export default ReactFlowComponent;
