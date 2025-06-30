import styled from '@emotion/styled';
import type { NodesPanelProps } from '../types';

const Panel = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 250px;
`;

const DraggableNode = styled.div`
  padding: 15px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: move;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;

  &:hover {
    background: #f0f0f0;
    border-color: #999;
  }
`;

const NodesPanel = ({ onDragStart }: NodesPanelProps) => {
  return (
    <Panel>
      <h3>Message Types</h3>
      <DraggableNode
        onDragStart={(event) => onDragStart(event, 'textNode')}
        draggable
      >
        <span>📩</span>
        <span>Message</span>
      </DraggableNode>
    </Panel>
  );
};

export default NodesPanel; 