import type { Node, Edge } from 'reactflow';

export interface TextNodeData {
  text: string;
}

export type CustomNode = Node<TextNodeData>;
export type CustomEdge = Edge;

export interface NodesPanelProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export interface SettingsPanelProps {
  selectedNode: CustomNode | null;
  onNodeUpdate: (nodeId: string, newData: TextNodeData) => void;
} 