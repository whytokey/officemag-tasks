import React, { forwardRef } from 'react';
import styles from './ChartNode.module.css';

interface ChartNodeProps {
  name: string;
  title?: string;
  style?: React.CSSProperties;
}

const ChartNode = forwardRef<HTMLDivElement, ChartNodeProps>(
  ({ name, title, style }, ref) => {
    return (
      <div className={styles.node} style={style} ref={ref}>
        <div className={styles.nodeName}>{name}</div>
        {title && <div className={styles.nodeTitle}>{title}</div>}
      </div>
    );
  }
);

ChartNode.displayName = 'ChartNode';

export default ChartNode;