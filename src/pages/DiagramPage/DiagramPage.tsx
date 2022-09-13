import React, { FC } from "react";
import styles from "./DiagramPage.module.scss";
import Diagram from "../../components/Diagram/Diagram";
import ArrowDiagram from "../../components/ArrowDiagram/ArrowDiagram";
import ReactFlowComponent from "../../components/ReactFlowComponent/ReactFlowComponent";
import ReactFlowState from "../../components/ReactFlowState/ReactFlowState";
import Flow from "../../components/ReactFlowState/ReactFlowState";

interface DiagramPageProps {}

const DiagramPage: FC<DiagramPageProps> = () => (
  <div>
    <div>ReactFlowStateWorked??</div>
    <div style={{ height: 900, width: 800 }}>{Flow()}</div>
    <div className={styles.DiagramPage}>DiagramPage Component</div>
    <div id="application-react-flow" style={{ height: 800 }}></div>
    <ReactFlowComponent />

    {/* <CanvasWidget className="diagram-container" engine={engine} />; */}
    {/* <BodyWidget engine={engine} />; */}
    <div id="application"></div>
    <Diagram />
    <div id="arrow-application"></div>
    <ArrowDiagram />
  </div>
);

export default DiagramPage;
