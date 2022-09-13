import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  ConnectionLineType,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";

import useStore from "./store";
import CustomNode from "./customNode";

import initialNodes from "./nodes";
import initialEdges from "./edges";

import dagre from "dagre";
import { isConstructorDeclaration } from "typescript";

const nodeTypes = {
  customNode: CustomNode,
};

const backgroundStyle: any = "lines";

// dagre positions logic

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

console.log("CustomNode:", CustomNode);

// const nodeWidth = 250;
// const nodeHeight = 80;

// const nodeElements = document.getElementsByClassName("custom-node");

const getLayoutedElements = (nodes: any, edges: any, direction = "TB") => {
  // window.onload = function () {
  console.log("direction3:", direction);

  const nodeElements = document.getElementsByClassName("custom-node");
  console.log("nodeElements", nodeElements);
  // console.log("nodeElements", nodeElements[0].clientHeight);

  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });
  console.log("direction:", direction);

  // window.onload = function () {
  nodes.forEach((node: any, index: number) => {
    // let nodeWidth = nodeElements[index].clientWidth;
    // let nodeHeight = nodeElements[index].clientHeight;
    let nodeWidth = 140;
    let nodeHeight = 120;
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    console.log(node);
    console.log(typeof node);
  });
  // };

  edges.forEach((edge: any) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  // window.onload = function () {
  nodes.forEach((node: any, index: number) => {
    // let nodeWidth = nodeElements[index].clientWidth;
    // let nodeHeight = nodeElements[index].clientHeight;
    let nodeWidth = 140;
    let nodeHeight = 120;

    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // node.data.label += isHorizontal ? "Horizontal" : "";
    console.log("isHorizontal:", isHorizontal);
    // console.log("direction:", direction);
    if (isHorizontal) {
      node.data.direction = "horizontal";
      console.log("horizontal");
    } else {
      node.data.direction = "vertical";
      const handles = Array.from(document.getElementsByClassName("topHandle"));
      console.log("vertical");
    }

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });
  // };

  // return { nodes, edges };
  // };
  return { nodes, edges };
};

const promiseGetLayoutedElements = (
  nodes: any,
  edges: any,
  direction = "TB"
) => {
  return new Promise((resolve) => {
    resolve(getLayoutedElements(nodes, edges, direction));
  });
};
const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

function Flow() {
  // const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  //   initialNodes,
  //   initialEdges,
  //   "TB"
  // );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  console.log("Flow():", nodes);

  console.log("onLayout!!");

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );
  const onLayout = useCallback(
    (direction: any) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);
      console.log("direction2:", direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  console.log("onLayout 2 !!");

  return (
    <div style={{ height: 800 }}>
      <div className="controls">
        <button onClick={() => onLayout("TB")}>vertical layout</button>
        <button onClick={() => onLayout("LR")}>horizontal layout</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        {/* <Background variant={backgroundStyle} gap={12} size={4} /> */}
      </ReactFlow>
    </div>
  );

  // const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();

  // const testEle2 = document.getElementsByClassName("custom-node");

  // original width logic

  // const sourceList: Array<string> = [];
  // edges.map((edge) => {
  //   sourceList.push(edge.source);
  // });
  // console.log(sourceList);
  // let dupSourceList = sourceList.filter(function (val, i, array) {
  //   return !(array.indexOf(val) === i);
  // });
  // const dupSourceAndTarget: any = [];
  // edges.map((edge) => {
  //   dupSourceList.map((dupSource) => {
  //     if (edge.source === dupSource) {
  //       let addObject = { [edge.target]: edge.source };
  //       dupSourceAndTarget.push(addObject);
  //     }
  //   });
  // });

  // let yNum = 25;
  // window.onload = function () {
  //   nodes.map((node: any, index) => {
  //     let lastNodeHeight = 0;
  //     if (index > 0) {
  //       lastNodeHeight = testEle2[index - 1].clientHeight;
  //     }
  //     yNum += 100 + Math.max(lastNodeHeight - 60, 0);
  //     node.position = { x: 250, y: yNum };
  //   });
  // };

  // return (
  //   <ReactFlow
  //     nodes={nodes}
  //     edges={edges}
  //     nodeTypes={nodeTypes}
  //     onNodesChange={onNodesChange}
  //     onEdgesChange={onEdgesChange}
  //     onConnect={onConnect}
  //     fitView
  //   >
  //     <Background variant={backgroundStyle} gap={12} size={4} />
  //   </ReactFlow>
  // );
}

export default Flow;
