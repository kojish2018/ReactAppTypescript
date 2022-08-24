// @ts-nocheck

import { useCallback, memo } from "react";
import { Handle, Position } from "react-flow-renderer";

import Node, { contentStyle as style } from "./nodeDesign";

const handleStyle = { left: 10 };

const CustomNode = ({ data, selected }: any) => {
  return (
    <Node
      // label={data.name}
      label={
        <div>
          <Handle
            type="target"
            position="top"
            id="i__data"
            style={{ ...style.handle, ...style.top }}
            // isValidConnection={isValidInput}
          />
          {data.label}
        </div>
      }
      selected={selected}
      color={"LightCyan"}
      content={
        <div style={style.io}>
          {/* {!data.uploaded && (
            <Handle
              type="target"
              position="top"
              id="i__data"
              style={{ ...style.handle, ...style.top }}
              // isValidConnection={isValidInput}
            />
          )} */}
          {data.contents.map((element) => {
            return <p>element</p>;
          })}
          <Handle
            type="source"
            // position="right"
            position="bottom"
            id="o__data"
            style={{ ...style.handle, ...style.right }}
            // isValidConnection={isValidOutput}
          />
        </div>
      }
    />
  );
};

export default memo(CustomNode);
