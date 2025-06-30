import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import styled from '@emotion/styled';
import type { TextNodeData } from '../types';

const NodeContainer = styled.div`
  padding: 10px;
  border-radius: 8px;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  min-height: 100px;
`;

const NodeHeader = styled.div`
  padding: 8px;
  background: #e6f7f2;
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
`;

const NodeContent = styled.div`
  padding: 10px;
  font-size: 14px;
  color: #666;
  min-height: 40px;
  word-break: break-word;
  white-space: pre-wrap;
`;

interface TextNodeProps {
  data: TextNodeData;
  isConnectable: boolean;
}

const TextNode = ({ data, isConnectable }: TextNodeProps) => {
  return (
    <NodeContainer>
      <NodeHeader>
        <span>📩</span>
        <span>Send Message</span>
      </NodeHeader>
      <NodeContent>
        {data.text || 'New message'}
      </NodeContent>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{ background: '#555' }}
      />
    </NodeContainer>
  );
};

export default memo(TextNode); 