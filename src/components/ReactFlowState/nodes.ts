import { memo } from "react";
import { Node } from "react-flow-renderer";
import CustomNode from "./customNode";

const nodeTypes = {
  customNode: CustomNode,
};

const position = { x: 0, y: 0 };

const nodes = [
  {
    id: "1",
    // type: "input",
    type: "customNode",
    data: {
      label: "危険因子",
      contents: ["欧米型の食生活", "遺伝的要因", "炎症性腸疾患"],
    },
    // position: { x: 250, y: 25 },
    position,
  },
  {
    id: "2",
    type: "customNode",
    data: { label: "直腸癌", contents: ["直腸の正常粘膜の上皮細胞の癌化"] },
    // position: { x: 100, y: 125 },
    position,
  },
  {
    id: "3",
    type: "customNode",
    data: { label: "", contents: ["がん細胞の増殖"] },
    // position: { x: 250, y: 250 },
    position,
  },
  {
    id: "4",
    type: "customNode",
    data: { label: "", contents: ["直腸内腔の狭窄"] },
    // position: { x: 50, y: 400 },
    position,
  },
  {
    id: "5",
    type: "customNode",
    data: { label: "", contents: ["粘膜下層から漿膜に向かって浸潤"] },
    // position: { x: 450, y: 400 },
    position,
  },
] as Node[];

nodes.map((node) => {
  node.data.direction = "vertical";
});

// export default [
//   {
//     id: "1",
//     // type: "input",
//     type: "customNode",
//     data: {
//       label: "危険因子",
//       contents: ["欧米型の食生活", "遺伝的要因", "炎症性腸疾患"],
//     },
//     // position: { x: 250, y: 25 },
//     position,
//   },
//   {
//     id: "2",
//     type: "customNode",
//     data: { label: "直腸癌", contents: ["直腸の正常粘膜の上皮細胞の癌化"] },
//     // position: { x: 100, y: 125 },
//     position,
//   },
//   {
//     id: "3",
//     type: "customNode",
//     data: { label: "", contents: ["がん細胞の増殖"] },
//     // position: { x: 250, y: 250 },
//     position,
//   },
//   {
//     id: "4",
//     type: "customNode",
//     data: { label: "", contents: ["直腸内腔の狭窄"] },
//     // position: { x: 50, y: 400 },
//     position,
//   },
//   {
//     id: "5",
//     type: "customNode",
//     data: { label: "", contents: ["粘膜下層から漿膜に向かって浸潤"] },
//     // position: { x: 450, y: 400 },
//     position,
//   },
// ] as Node[];

export default nodes;
