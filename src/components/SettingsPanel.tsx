import styled from '@emotion/styled';
import type { CustomNode, TextNodeData } from '../types';

const Panel = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 250px;
  z-index: 1000;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  color: #333;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 5px;
  color: #666;
  font-size: 14px;

  &:hover {
    color: #333;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  background: white;
  color: #333;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const DeleteButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: #cc0000;
  }

  &:active {
    transform: translateY(1px);
  }
`;

interface SettingsPanelProps {
  selectedNode: CustomNode | null;
  onNodeUpdate: (nodeId: string, newData: TextNodeData) => void;
  onClose: () => void;
  onDeleteNode: (nodeId: string) => void;
}

const SettingsPanel = ({ 
  selectedNode, 
  onNodeUpdate, 
  onClose,
  onDeleteNode 
}: SettingsPanelProps) => {
  if (!selectedNode) return null;

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    onNodeUpdate(selectedNode.id, { text: newText });
  };

  const handleDelete = () => {
    onDeleteNode(selectedNode.id);
    onClose();
  };

  return (
    <Panel>
      <Header>
        <BackButton onClick={onClose}>← Message</BackButton>
      </Header>
      <TextArea
        value={selectedNode.data.text || ''}
        onChange={handleTextChange}
        placeholder="Type your message here..."
        autoFocus
      />
      <DeleteButton onClick={handleDelete}>
        Delete Node
      </DeleteButton>
    </Panel>
  );
};

export default SettingsPanel; 