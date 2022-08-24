import React, { FC, useState } from "react";
import styles from "./ReactFlowComponent.module.scss";
// import { useState } from "react";
import ReactFlow from "react-flow-renderer";
import { createRoot } from "react-dom/client";
import useStore from "./store";
// import nodes from "./nodes";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "react-flow-renderer";

interface ReactFlowComponentProps {}

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

let loopNum = 0;

// const [nodes, setNodes] = useState(initialNodes);
// const [edges, setEdges] = useState(initialEdges);

class ReactFlowComponent extends React.Component<
  {},
  { nodes: Array<any>; edges: Array<any> }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      nodes: initialNodes,
      edges: initialEdges,
    };
  }
  render() {
    // return <h1>Hello, {this.props.name}</h1>;
    return <h1>Hello,</h1>;
  }

  componentDidMount() {
    // const nodes = initialNodes;
    // const edges = initialEdges;

    // const [nodes, setNodes] = useState(initialNodes);
    // const [edges, setEdges] = useState(initialEdges);

    console.log("test didmount");
    console.log(this.state.nodes);
    if (loopNum == 0) {
      const root = createRoot(
        document.getElementById("application-react-flow")!
      );
      console.log(root);

      root.render(
        <ReactFlow nodes={this.state.nodes} edges={this.state.edges} fitView />
      );
      // root.render(<h1 className="diagram-container">render test</h1>);
    }
    loopNum += 1;

    // ReactDOM.render(
    //   <CanvasWidget className="diagram-container"  engine={engine} />,
    //   document.querySelector("#root")
    // );
  }

  // const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState(initialEdges);

  // return <ReactFlow nodes={nodes} edges={edges} fitView />;
}

export default ReactFlowComponent;
