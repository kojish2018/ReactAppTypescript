import React, { FC } from 'react';
import styles from './ArrowDiagram.module.scss';

import createEngine, {
  DefaultNodeModel,
  DiagramModel
} from "@projectstorm/react-diagrams";
import { AdvancedLinkFactory, AdvancedPortModel } from "./helpers";

import { createRoot } from 'react-dom/client';
import { BodyWidget } from '../../BodyWidget';


interface NODE_TYPES_OBJECT {
  [key: string]: string
}

interface NODE_COLORS_OBJECT {
  [key: string]: string
}


const NODE_TYPES = {
  "SCENE_GENERIC": "Generic Scene",
  "SCENE_QUESTION": "Question Scene",
  "SCENE_CTA": "CTA Scene"
} as NODE_TYPES_OBJECT

const  NODE_COLORS = {
  "SCENE_GENERIC": "rgb(0, 192, 155)",
  "SCENE_QUESTION": "rgb(192, 155, 0)",
  "SCENE_CTA": "rgb(155, 0, 192)"
} as NODE_COLORS_OBJECT


interface nodeObjects{
  [key: string]: {
    name: string,
    type: string,
    isEndScene: any,
    subNames: Array<string>,
    nextScene?: any,
    selection?: any
  };
}


const scenes = {
  scene1: {
    name: "危険因子",
    subNames: ["欧米型の食生活","遺伝的要因","炎症性腸疾患"],
    type: "SCENE_GENERIC",
    nextScene: "scene2",
    isEndScene: false
  },
  scene2: {
    name: "直腸癌",
    subNames: ["直腸の正常粘膜の上皮細胞の癌化"],
    type: "SCENE_GENERIC",
    nextScene: "scene3",
    isEndScene: false
  },
  scene3: {
    name: "",
    subNames: ["癌細胞の増殖"],
    type: "SCENE_QUESTION",
    isEndScene: false,
    selection: {
      scene4: "scene4",
      scene5: "scene5",
      // scene11: "scene11",
      // scene12: "scene12"
    }
  },
  scene4: {
    name: "",
    subNames: ["直腸内腔の狭窄"],
    type: "SCENE_GENERIC",
    // nextScene: "scene3",
    isEndScene: false
  },
  scene5: {
    name: "",
    subNames: ["粘膜下層から漿膜に向かって浸潤"],
    type: "SCENE_GENERIC",
    // nextScene: "scene3",
    isEndScene: false
  }
} as nodeObjects
// const { firstScene, scenes } = ;
const firstScene = "scene1"

const engine = createEngine();
engine.getLinkFactories().registerFactory(new AdvancedLinkFactory());
const model = new DiagramModel();

let sceneLinks: any = {};
let sceneNodes: any = {};
const HORIZONTAL_SHIFT_NEXT = 200;
const HORIZONTAL_SHIFT_SELECTIONS = 350;
const VERTICAL_SHIFT = 75;
let nodeX = 50;
let nodeY = window.innerHeight / 2;

// Create a node for a scene
const createSceneNode = (sceneId: string) => {
  const { name, type, isEndScene, subNames } = scenes[sceneId];
  const node = new DefaultNodeModel({
    name: name,
    color: NODE_COLORS[type]
  });
  //const portIn = node.addInPort(`${NODE_TYPES[type]}`);
  //const portOut = !isEndScene && node.addOutPort("");
  const portIn = node.addPort(
    // new AdvancedPortModel(true, NODE_TYPES[type])
    new AdvancedPortModel(true, subNames[0])
  );
  if(subNames.length > 1){
    subNames.slice(1).map(subName =>{
      node.addInPort(subName);
    })
  }
  // node.addInPort('test2')
  const portOut = node.addPort(
    new AdvancedPortModel(false, isEndScene && "End Scene")
  );
  const sceneNode = {
    node,
    portIn,
    portOut
  };
  model.addNode(sceneNode.node);
  sceneNodes[sceneId] = sceneNode;
};

// Create a link between two scene nodes
const createSceneLink = (sceneId: string) => {
  const { nextScene, selection, isEndScene } = scenes[sceneId];
  let link;
  if (!isEndScene) {
    if (nextScene && !selection) {
      link = sceneNodes[sceneId].portOut.link(sceneNodes[nextScene].portIn);
      model.addLink(link);
      sceneLinks[sceneId] = link;
    } else if (!nextScene && selection) {
      let position = 0;
      for (const selectionId in selection) {
        link = sceneNodes[sceneId].portOut.link(
          sceneNodes[selectionId].portIn
        );
        // link.addLabel(
        //   `Selected [${String.fromCharCode(97 + position).toUpperCase()}]`
        // );
        position++;
        model.addLink(link);
        sceneLinks[sceneId] = link;
      }
    }
  }
};

// Create the nodes and links, then set their positions
for (const sceneId in scenes) {
  createSceneNode(sceneId);
}
for (const sceneId in scenes) {
  createSceneLink(sceneId);
}
for (const sceneId in scenes) {
  if (sceneId === firstScene) {
    sceneNodes[sceneId].node.setPosition(nodeX, nodeY);
  }

  if (scenes[sceneId].nextScene) {
    nodeX = sceneNodes[sceneId].node.position.x + HORIZONTAL_SHIFT_NEXT;
    nodeY = sceneNodes[sceneId].node.position.y;
    sceneNodes[scenes[sceneId].nextScene].node.setPosition(nodeX, nodeY);
  } else if (scenes[sceneId].selection) {
    nodeX = sceneNodes[sceneId].node.position.x + HORIZONTAL_SHIFT_SELECTIONS;
    const sceneSelections = Object.keys(scenes[sceneId].selection);
    for (let i = 0; i < sceneSelections.length; i++) {
      nodeY = sceneNodes[sceneId].node.position.y;

      let idx = i + 1;
      let verticalPosition = Math.abs(
        VERTICAL_SHIFT * (Math.floor(sceneSelections.length / 2) - i)
      );
      if (sceneSelections.length % 2 === 0) {
        if (
          idx === sceneSelections.length / 2 ||
          idx === sceneSelections.length / 2 + 1
        ) {
          verticalPosition = VERTICAL_SHIFT / 2;
        } else if (idx > sceneSelections.length / 2 + 1) {
          verticalPosition += VERTICAL_SHIFT;
        }
      } else {
        if (idx === Math.ceil(sceneSelections.length / 2)) {
          verticalPosition = 0;
        }
      }

      if (i < sceneSelections.length / 2) {
        sceneNodes[sceneSelections[i]].node.setPosition(
          nodeX,
          nodeY - verticalPosition
        );
      } else {
        sceneNodes[sceneSelections[i]].node.setPosition(
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
  render(){
    return <h1>ArrowTest,</h1>;
  }

  componentDidMount(){

    if(loopNum==0){
      const root2 = createRoot(document.getElementById('arrow-application')!);
      

      root2.render(<BodyWidget engine={engine} />);
    }
    loopNum+=1;
  }
}


export default ArrowDiagram;
