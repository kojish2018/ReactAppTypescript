import { Node } from "react-flow-renderer";
import CustomNode from "./customNode";

const nodeTypes = {
  customNode: CustomNode,
};

export default [
  {
    id: "1",
    type: "input",
    data: { label: "test" },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    type: "customNode",
    data: { label: "Default", contents: ["test1", "test2"] },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output" },
    position: { x: 250, y: 250 },
  },
] as Node[];
