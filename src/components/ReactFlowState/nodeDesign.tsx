// @ts-nocheck

import React, { memo } from "react";

export const contentStyle = {
  contentHeader: {
    padding: "8px 0px",
    flexGrow: 1,
    backgroundColor: "#eee",
  },
  io: {
    position: "relative",
    padding: "8px 16px",
    flexGrow: 1,
  },
  //   left: { left: "-8px" },
  //   top: { top: "-40px" },
  textLeft: { textAlign: "left" },
  //   right: { right: "-8px" },
  textRight: { textAlign: "right" },
  handle: {
    // widht: "10px", // Does not work
    // height: "10px",
    // margin: "auto",
    // background: "#ddd",
    // borderRadius: "15px",
    // border: "5px solid #ddd",
    // boxShadow:
    //   "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px",
  },
};

const style = {
  body: {
    display: "flex",
    flexDirection: "column",
    // flexDirection: "row",
    backgroundColor: "#fff",
    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    border: "0.5px solid #000",
    // fontSize: "10pt",
    fontSize: "7pt",
    borderRadius: "5px",
    width: "150px",
    textAlign: "center",
  },
  selected: {
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  },
  title: {
    position: "relative",
    padding: "8px 24px",
    flexGrow: 1,
    backgroundColor: "#eee",
    borderRadius: "5px 5px 0 0",
  },
  contentWrapper: {
    // padding: "8px 0px",
  },
};

interface NodeProps {
  label: string;
  selected: boolean;
  color?: string;
  content: React.ReactNode;
}
const Node: React.FC<NodeProps> = ({
  label,
  selected,
  color,
  content,
}: NodeProps) => {
  let customTitle = { ...style.title };
  if (color) customTitle.backgroundColor = color;

  // Collapse contentWrapper on icon click
  return (
    <div
      style={{ ...style.body, ...(selected ? style.selected : []) }}
      class="custom-node"
    >
      <div style={customTitle}>{label}</div>
      <div style={style.contentWrapper}>{content}</div>
    </div>
  );
};

export default memo(Node);
