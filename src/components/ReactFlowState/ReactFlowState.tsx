import React from "react";
import ReactFlow, { Background } from "react-flow-renderer";

import useStore from "./store";
import CustomNode from "./customNode";

const nodeTypes = {
  customNode: CustomNode,
};

const backgroundStyle: any = "lines";

function Flow() {
  console.log("ReactFlowState Flow()?");
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background variant={backgroundStyle} gap={12} size={4} />
    </ReactFlow>
  );
}

export default Flow;
