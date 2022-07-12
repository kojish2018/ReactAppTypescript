import React, { FC } from 'react';
import styles from './Diagram.module.scss';

import createEngine, { DefaultLinkModel, DefaultNodeModel, DiagramModel } from '@projectstorm/react-diagrams';
// import { TSCustomNodeFactory } from '../../custom-node-ts/TSCustomNodeFactory';
import { TSCustomNodeFactory } from '../../custom-node-ts/TSCustomNodeFactory';
import { TSCustomNodeModel } from '../../custom-node-ts/TSCustomNodeModel';

import { createRoot } from 'react-dom/client';

import { CanvasWidget } from "@projectstorm/react-canvas-core";

import { BodyWidget } from '../../BodyWidget';

import { AdvancedLinkFactory, AdvancedPortModel } from "./helpers";







interface DiagramProps {}




const engine = createEngine();

engine.getLinkFactories().registerFactory(new AdvancedLinkFactory());


const model = new DiagramModel();

const node1 = new DefaultNodeModel({
  name: "危険因子(p.260)"
});
node1.setPosition(100, 400);

const nodeList1 = [];
nodeList1.push("欧米型の食生活");
nodeList1.push("遺伝的要因");
// node1.addInPort(nodeList1[0]);
// node1.addInPort(nodeList1[1]);
node1.addPort(
    new AdvancedPortModel(false, nodeList1[0])
  );
node1.addPort(
    new AdvancedPortModel(false, nodeList1[1])
  );


const node2 = new DefaultNodeModel({
  name: "直腸癌"
});
node2.setPosition(300, 400);
const nodeList2 = [];
nodeList2.push("直腸の正常粘膜の上皮細胞の癌化")
node2.addOutPort(nodeList2[0]);


const node3 = new DefaultNodeModel({
  name: ""
});
node3.setPosition(300, 600);
const nodeList3 = [];
nodeList3.push("がん細胞の増殖")
node3.addInPort(nodeList3[0]);

const link1 = new DefaultLinkModel()
link1.setSourcePort(node1.getPort(nodeList1[0])!)
link1.setTargetPort(node2.getPort(nodeList2[0])!)


const link2 = new DefaultLinkModel()
link2.setSourcePort(node2.getPort(nodeList2[0])!)
link2.setTargetPort(node3.getPort(nodeList3[0])!)



model.addAll(node1, node2, node3, link1, link2);


engine.setModel(model);



let loopNum = 0;


// document.addEventListener('DOMContentLoaded', () => {
// 	const root = createRoot(document.getElementById('application')!);
// 	root.render(<BodyWidget engine={engine} />);
// });


class Diagram extends React.Component {
  render() {
    // return <h1>Hello, {this.props.name}</h1>;
    return <h1>Hello,</h1>;
    
  }

  componentDidMount(){

    console.log(document.getElementById('application'))
    console.log('test didmount')
    if(loopNum==0){
      const root = createRoot(document.getElementById('application')!);
    console.log(root);

      root.render(<BodyWidget engine={engine} />);
      // root.render(<h1 className="diagram-container">render test</h1>);
    }
    loopNum+=1;

    // ReactDOM.render(
    //   <CanvasWidget className="diagram-container"  engine={engine} />,
    //   document.querySelector("#root")
    // );
  }
}


// const Diagram: FC<DiagramProps> = () => (
//   <div className={styles.Diagram}>
//     Diagram Component
//   </div>
// );

export default Diagram;
