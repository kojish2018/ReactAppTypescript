import React, { FC } from "react";
import styles from "./ArrowDiagram.module.scss";

import createEngine, {
  DefaultNodeModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import { AdvancedLinkFactory, AdvancedPortModel } from "./helpers";

import { createRoot } from "react-dom/client";
import { BodyWidget } from "../../BodyWidget";

interface NODE_TYPES_OBJECT {
  [key: string]: string;
}

interface NODE_COLORS_OBJECT {
  [key: string]: string;
}

const NODE_TYPES = {
  NODE_GENERIC: "Generic NODE",
  NODE_QUESTION: "Question NODE",
  NODE_CTA: "CTA NODE",
} as NODE_TYPES_OBJECT;

const NODE_COLORS = {
  NODE_GENERIC: "RGB(102,102,204)",
  NODE_QUESTION: "rgb(192, 155, 0)",
  NODE_CTA: "rgb(155, 0, 192)",
} as NODE_COLORS_OBJECT;

interface nodeObjects {
  [key: string]: {
    name: string;
    type: string;
    isEndNode: any;
    subNames: Array<string>;
    nextNode?: any;
    selection?: any;
  };
}

const nodes = {
  node1: {
    name: "危険因子(p.260)",
    subNames: ["欧米型の食生活", "遺伝的要因", "炎症性腸疾患"],
    type: "NODE_GENERIC",
    nextNode: "node2",
    isEndNode: false,
  },
  node2: {
    name: "直腸癌",
    subNames: ["直腸の正常粘膜の上皮細胞の癌化"],
    type: "NODE_GENERIC",
    nextNode: "node3",
    isEndNode: false,
  },
  node3: {
    name: "",
    subNames: ["癌細胞の増殖"],
    type: "NODE_QUESTION",
    isEndNode: false,
    selection: {
      node4: "node4",
      node5: "node5",
      // node11: "node11",
      // node12: "node12"
    },
  },
  node4: {
    name: "",
    subNames: ["直腸内腔の狭窄"],
    type: "NODE_GENERIC",
    isEndNode: false,
    selection: {
      node6: "node6",
      node7: "node7",
      node8: "node8",
      node9: "node9",
    },
  },
  node5: {
    name: "",
    subNames: ["粘膜下層から漿膜に向かって浸潤"],
    type: "NODE_GENERIC",
    // nextScene: "scene3",
    isEndNode: false,
  },
  node6: {
    name: "腸閉塞(病①p.152)",
    subNames: ["直腸内腔の閉塞"],
    type: "NODE_GENERIC",
    // nextScene: "scene3",
    isEndNode: false,
  },
  node7: {
    name: "",
    subNames: ["腸管内圧の上昇"],
    type: "NODE_GENERIC",
    // nextScene: "scene3",
    isEndNode: false,
  },
  node8: {
    name: "",
    subNames: ["便の通過障害"],
    type: "NODE_GENERIC",
    // nextScene: "scene3",
    isEndNode: false,
  },
  node9: {
    name: "",
    subNames: ["便柱狭小化(p.259)"],
    type: "NODE_GENERIC",
    // nextScene: "scene3",
    isEndNode: false,
  },
} as nodeObjects;
// const { firstScene, scenes } = ;
const firstNode = "node1";

const engine = createEngine();
engine.getLinkFactories().registerFactory(new AdvancedLinkFactory());
const model = new DiagramModel();

let nodeLinks: any = {};
let nodeNodes: any = {};
const HORIZONTAL_SHIFT_NEXT = 250;
// const HORIZONTAL_SHIFT_NEXT = 400;
const HORIZONTAL_SHIFT_SELECTIONS = 350;
const VERTICAL_SHIFT = 75;
let nodeX = 50;
let nodeY = window.innerHeight / 2;

// Create a node for a node
const createNodeNode = (nodeId: string) => {
  const { name, type, isEndNode, subNames } = nodes[nodeId];
  const node = new DefaultNodeModel({
    name: name,
    color: NODE_COLORS[type],
  });
  //const portIn = node.addInPort(`${NODE_TYPES[type]}`);
  //const portOut = !isEndNode && node.addOutPort("");
  const portIn = node.addPort(
    // new AdvancedPortModel(true, NODE_TYPES[type])
    new AdvancedPortModel(true, subNames[0])
  );
  if (subNames.length > 1) {
    subNames.slice(1).map((subName) => {
      node.addInPort(subName);
    });
  }
  // node.addInPort('test2')
  const portOut = node.addPort(
    new AdvancedPortModel(false, isEndNode && "End Node")
  );
  const nodeNode = {
    node,
    portIn,
    portOut,
  };
  model.addNode(nodeNode.node);
  nodeNodes[nodeId] = nodeNode;
};

// Create a link between two node nodes
const createNodeLink = (nodeId: string) => {
  const { nextNode, selection, isEndNode } = nodes[nodeId];
  let link;
  if (!isEndNode) {
    if (nextNode && !selection) {
      link = nodeNodes[nodeId].portOut.link(nodeNodes[nextNode].portIn);
      model.addLink(link);
      nodeLinks[nodeId] = link;
    } else if (!nextNode && selection) {
      let position = 0;
      for (const selectionId in selection) {
        link = nodeNodes[nodeId].portOut.link(nodeNodes[selectionId].portIn);
        // link.addLabel(
        //   `Selected [${String.fromCharCode(97 + position).toUpperCase()}]`
        // );
        position++;
        model.addLink(link);
        nodeLinks[nodeId] = link;
      }
    }
  }
};

// Create the nodes and links, then set their positions
for (const nodeId in nodes) {
  createNodeNode(nodeId);
}
for (const nodeId in nodes) {
  createNodeLink(nodeId);
}
// 1stノードの位置セット
for (const nodeId in nodes) {
  if (nodeId === firstNode) {
    nodeNodes[nodeId].node.setPosition(nodeX, nodeY);
  }

  if (nodes[nodeId].nextNode) {
    nodeX = nodeNodes[nodeId].node.position.x + HORIZONTAL_SHIFT_NEXT;
    nodeY = nodeNodes[nodeId].node.position.y;
    nodeNodes[nodes[nodeId].nextNode].node.setPosition(nodeX, nodeY);
  } else if (nodes[nodeId].selection) {
    nodeX = nodeNodes[nodeId].node.position.x + HORIZONTAL_SHIFT_SELECTIONS;
    const nodeSelections = Object.keys(nodes[nodeId].selection);
    for (let i = 0; i < nodeSelections.length; i++) {
      nodeY = nodeNodes[nodeId].node.position.y;

      let idx = i + 1;
      let verticalPosition = Math.abs(
        VERTICAL_SHIFT * (Math.floor(nodeSelections.length / 2) - i)
      );
      if (nodeSelections.length % 2 === 0) {
        if (
          idx === nodeSelections.length / 2 ||
          idx === nodeSelections.length / 2 + 1
        ) {
          verticalPosition = VERTICAL_SHIFT / 2;
        } else if (idx > nodeSelections.length / 2 + 1) {
          verticalPosition += VERTICAL_SHIFT;
        }
      } else {
        if (idx === Math.ceil(nodeSelections.length / 2)) {
          verticalPosition = 0;
        }
      }

      if (i < nodeSelections.length / 2) {
        nodeNodes[nodeSelections[i]].node.setPosition(
          nodeX,
          nodeY - verticalPosition
        );
      } else {
        nodeNodes[nodeSelections[i]].node.setPosition(
          nodeX,
          nodeY + verticalPosition
        );
      }
    }
  }
}

model.setLocked(true);
engine.setModel(model);

let loopNum = 0;

class ArrowDiagram extends React.Component {
  render() {
    return <h1>ArrowTest,</h1>;
  }

  componentDidMount() {
    if (loopNum == 0) {
      const root2 = createRoot(document.getElementById("arrow-application")!);

      root2.render(<BodyWidget engine={engine} />);
    }
    loopNum += 1;
  }
}

export default ArrowDiagram;
