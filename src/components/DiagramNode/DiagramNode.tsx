import React from 'react';
import styles from './DiagramNode.module.css';

interface DiagramNodeProps {
  name: string;
  title?: string;
  style: React.CSSProperties; 
}

export const DiagramNode: React.FC<DiagramNodeProps> = ({
  name,
  title,
  style,
}) => {
  return (
    <div className={styles.node} style={style}>
      <span className={styles.name}>{name}</span>
      {title && <span className={styles.title}>{title}</span>}
    </div>
  );
};