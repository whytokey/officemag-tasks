import React from 'react';
import { DiagramNode } from '../DiagramNode/DiagramNode';
import styles from './Diagram.module.css';

// Константы (для узлов)
const NODE_WIDTH = 200;
const NODE_HEIGHT = 41;
const NODE_HEIGHT_TALL = 62;
const GUTTER = 20;

const nodesData = [
  { id: 'allixar', name: 'Алликсаар', top: 70, left: 40, width: NODE_WIDTH, height: NODE_HEIGHT },
  { id: 'stanislav', name: 'Станислав', title: 'Клитотехнис', top: 205, left: 160, width: NODE_WIDTH, height: NODE_HEIGHT_TALL },
  { id: 'igor', name: 'Игорь Зверёк', top: 615, left: 160, width: NODE_WIDTH, height: NODE_HEIGHT },
  { id: 'anton', name: 'Антон Строй', top: 675, left: 160, width: NODE_WIDTH, height: NODE_HEIGHT },
  { id: 'ludmila', name: 'Людмила', title: 'Водолазская', top: 285, left: 280, width: NODE_WIDTH, height: NODE_HEIGHT_TALL },
  { id: 'olga', name: 'Ольга Боргдорф', top: 370, left: 280, width: NODE_WIDTH, height: NODE_HEIGHT },
  { id: 'sergey', name: 'Сергей Брус', top: 551, left: 280, width: NODE_WIDTH, height: NODE_HEIGHT },
  { id: 'duHast', name: 'Ду Хаст', title: 'Вячеславович', top: 60, left: 760, width: NODE_WIDTH, height: NODE_HEIGHT_TALL },
  { id: 'anastasia', name: 'Анастасия Ширинкина', top: 145, left: 760, width: NODE_WIDTH, height: NODE_HEIGHT },
  { id: 'alexandr', name: 'Александр Троян', top: 215, left: 760, width: NODE_WIDTH, height: NODE_HEIGHT },
  { id: 'dmitriy', name: 'Дмитрий Возигнуй', top: 370, left: 760, width: NODE_WIDTH, height: NODE_HEIGHT },
  { id: 'kristina', name: 'Кристина Болтушкина', top: 430, left: 760, width: NODE_WIDTH, height: NODE_HEIGHT },
  { id: 'maxim', name: 'Максим Висюлькин', top: 490, left: 760, width: NODE_WIDTH, height: NODE_HEIGHT },
];

type NodeSide = 'L' | 'R' | 'T' | 'B';
type NodeMap = Map<string, typeof nodesData[0]>;

/**
 * Вычисляет {x, y} координаты для указанной стороны узла
 */
const getSide = (nodes: NodeMap, id: string, side: NodeSide): { x: number, y: number } => {
  const node = nodes.get(id);
  if (!node) {
    console.error(`Node ${id} not found!`);
    return { x: 0, y: 0 };
  }

  const { top, left, width, height } = node;
  const midY = top + height / 2;
  const midX = left + width / 2;

  switch (side) {
    case 'L': return { x: left, y: midY };
    case 'R': return { x: left + width, y: midY };
    case 'T': return { x: midX, y: top };
    case 'B': return { x: midX, y: top + height };
  }
};

/**
 * Генерирует массив 'd' атрибутов для <path> на основе
 * актуальных позиций узлов.
 */
const generateLinesData = (nodes: NodeMap) => {
  const p = {
    alli: { B: getSide(nodes, 'allixar', 'B'), R: getSide(nodes, 'allixar', 'R') },
    stan: { L: getSide(nodes, 'stanislav', 'L'), R: getSide(nodes, 'stanislav', 'R'), B: getSide(nodes, 'stanislav', 'B') },
    igor: { L: getSide(nodes, 'igor', 'L') },
    anton: { L: getSide(nodes, 'anton', 'L') },
    duHast: { L: getSide(nodes, 'duHast', 'L') },
    anasta: { L: getSide(nodes, 'anastasia', 'L') },
    alex: { L: getSide(nodes, 'alexandr', 'L') },
    ludmi: { L: getSide(nodes, 'ludmila', 'L') },
    olga: { L: getSide(nodes, 'olga', 'L'), R: getSide(nodes, 'olga', 'R') },
    sergey: { L: getSide(nodes, 'sergey', 'L') },
    dmitri: { L: getSide(nodes, 'dmitriy', 'L'), R: getSide(nodes, 'dmitriy', 'R') },
    krist: { L: getSide(nodes, 'kristina', 'L') },
    maxim: { L: getSide(nodes, 'maxim', 'L'), R: getSide(nodes, 'maxim', 'R') },
  };

  // Координаты X для вертикальных "стволов"
  const junc = {
    duHastTrunkX: p.duHast.L.x - GUTTER,
    dmitriLeftTrunkX: p.dmitri.L.x - GUTTER,
    dmitriRightTrunkX: p.dmitri.R.x + GUTTER,
  };
  return [
    { id: 'l1', d: `M ${p.alli.B.x} ${p.alli.B.y} V ${p.anton.L.y}` },
    { id: 'l2', d: `M ${p.alli.B.x} ${p.igor.L.y} H ${p.igor.L.x}` },
    { id: 'l3', d: `M ${p.alli.B.x} ${p.anton.L.y} H ${p.anton.L.x}` },
    { id: 'l4', d: `M ${p.alli.B.x} ${p.stan.L.y} H ${p.stan.L.x}` },
    { id: 'l5', d: `M ${p.alli.R.x} ${p.alli.R.y} H ${junc.duHastTrunkX}` },
    { id: 'l6', d: `M ${junc.duHastTrunkX} ${p.alli.R.y} V ${p.anasta.L.y}` },
    { id: 'l7', d: `M ${junc.duHastTrunkX} ${p.duHast.L.y} H ${p.duHast.L.x}` },
    { id: 'l8', d: `M ${junc.duHastTrunkX} ${p.anasta.L.y} H ${p.anasta.L.x}` },
    { id: 'l10', d: `M ${p.stan.R.x} ${p.stan.R.y} H ${p.alex.L.x}` },
    { id: 'l15', d: `M ${p.olga.R.x} ${p.olga.R.y} H ${p.dmitri.L.x}` },
    { id: 'l16', d: `M ${junc.dmitriLeftTrunkX} ${p.dmitri.L.y} V ${p.maxim.L.y}` },
    { id: 'l17', d: `M ${junc.dmitriLeftTrunkX} ${p.dmitri.L.y} H ${p.dmitri.L.x}` },
    { id: 'l18', d: `M ${junc.dmitriLeftTrunkX} ${p.krist.L.y} H ${p.krist.L.x}` },
    { id: 'l19', d: `M ${junc.dmitriLeftTrunkX} ${p.maxim.L.y} H ${p.maxim.L.x}` },
    { id: 'l_stan_trunk', d: `M ${p.stan.B.x} ${p.stan.B.y} V ${p.sergey.L.y}` },
    { id: 'l12', d: `M ${p.stan.B.x} ${p.ludmi.L.y} H ${p.ludmi.L.x}` },
    { id: 'l13', d: `M ${p.stan.B.x} ${p.olga.L.y} H ${p.olga.L.x}` },
    { id: 'l14', d: `M ${p.stan.B.x} ${p.sergey.L.y} H ${p.sergey.L.x}` },
    { id: 'l_dmitriy_vertical_RIGHT', d: `M ${junc.dmitriRightTrunkX} ${p.dmitri.R.y} V ${p.maxim.R.y}` },
    { id: 'l17_new_RIGHT', d: `M ${p.dmitri.R.x} ${p.dmitri.R.y} H ${junc.dmitriRightTrunkX}` },
    { id: 'l19_new_RIGHT', d: `M ${p.maxim.R.x} ${p.maxim.R.y} H ${junc.dmitriRightTrunkX}` },
  ];
};

export const Diagram: React.FC = () => {
  const nodesMap = React.useMemo(() => new Map(nodesData.map(n => [n.id, n])), []);
  const linesData = React.useMemo(() => generateLinesData(nodesMap), [nodesMap]);

  return (
    <div className={styles.diagramContainer}>
      <h1 className={styles.title}>Масоны Самсона</h1>
      {nodesData.map((node) => (
        <DiagramNode
          key={node.id}
          name={node.name}
          title={node.title}
          style={{
            top: `${node.top}px`,
            left: `${node.left}px`,
            width: `${node.width}px`,
            height: `${node.height}px`,
          }}
        />
      ))}
      <svg className={styles.svgOverlay}>
        {linesData.map((line) => (
          <path
            key={line.id}
            d={line.d}
            className={styles.line}
          />
        ))}
      </svg>
    </div>
  );
};