import React, { FC} from 'react';
import styles from './DiagramPage.module.scss';
import Diagram from '../../components/Diagram/Diagram';
import ArrowDiagram from '../../components/ArrowDiagram/ArrowDiagram'


interface DiagramPageProps {}



const DiagramPage: FC<DiagramPageProps> = () => (
  <div>
    <div className={styles.DiagramPage}>
      DiagramPage Component
      
    </div>
    {/* <CanvasWidget className="diagram-container" engine={engine} />; */}
    {/* <BodyWidget engine={engine} />; */}
    <div id="application"></div>
    <Diagram />
    <div id="arrow-application"></div>
    <ArrowDiagram />
  </div>
);



export default DiagramPage;

