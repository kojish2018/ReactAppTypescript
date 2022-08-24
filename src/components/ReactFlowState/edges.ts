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
] as Edge[];
