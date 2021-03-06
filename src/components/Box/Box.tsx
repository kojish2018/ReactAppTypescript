import React, { FC } from 'react';
import styles from './Box.module.scss';

interface BoxProps {}

const Box: FC<BoxProps> = () => (
  <div className={styles.Box}>
    Box Component
  </div>
);

export default Box;
