import { Edge } from "react-flow-renderer";

export default [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    markerStart: "myCustomSvgMarker",
    markerEnd: { type: "arrowclosed", color: "black" },
    // label: "test",
  },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4", type: "smoothstep" },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "black" },
  },
] as Edge[];
