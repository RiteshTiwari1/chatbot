import { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import type { Connection, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import styled from '@emotion/styled';
import TextNode from './TextNode';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import type { CustomNode, TextNodeData } from '../types';

const nodeTypes = {
  textNode: TextNode,
};

const SaveButton = styled.button`
  position: fixed;
  top: 20px;
  right: 290px;
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: #45a049;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  position: fixed;
  top: 80px;
  right: 290px;
  padding: 10px 20px;
  background: #ffebee;
  color: #c62828;
  border-radius: 4px;
  font-size: 14px;
`;

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const sourceHasEdge = edges.some(edge => edge.source === params.source);
      
      if (sourceHasEdge) {
        setError('A node can only have one outgoing connection');
        return;
      }
      
      setError(null);
      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top,
      };

      const newNode: CustomNode = {
        id: `${type}_${nodes.length + 1}`,
        type,
        position,
        data: { text: 'New message' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const onNodeDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onNodeClick = useCallback((_: React.MouseEvent, node: CustomNode) => {
    setSelectedNode(node);
  }, []);

  const onNodeUpdate = useCallback(
    (nodeId: string, newData: TextNodeData) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: { ...newData }
            };
          }
          return node;
        })
      );
      setSelectedNode((prev) => 
        prev?.id === nodeId 
          ? { ...prev, data: { ...newData } }
          : prev
      );
    },
    [setNodes]
  );

  const onDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) => eds.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ));
    },
    [setNodes, setEdges]
  );

  const closeSettingsPanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const validateFlow = useCallback(() => {
    if (nodes.length <= 1) return true;

    const nodesWithoutTargets = nodes.filter(
      (node) => !edges.some((edge) => edge.source === node.id)
    );

    return nodesWithoutTargets.length <= 1;
  }, [nodes, edges]);

  const onSave = useCallback(() => {
    if (!validateFlow()) {
      setError('Cannot save flow: More than one node has empty target handles');
      return;
    }
    setError(null);
    console.log('Flow saved:', { nodes, edges });
  }, [nodes, edges, validateFlow]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        deleteKeyCode={['Backspace', 'Delete']}
      >
        <Background />
        <Controls />
      </ReactFlow>
      
      {selectedNode ? (
        <SettingsPanel 
          selectedNode={selectedNode} 
          onNodeUpdate={onNodeUpdate}
          onClose={closeSettingsPanel}
          onDeleteNode={onDeleteNode}
        />
      ) : (
        <NodesPanel onDragStart={onNodeDragStart} />
      )}
      
      <SaveButton onClick={onSave} disabled={!validateFlow()}>
        Save Changes
      </SaveButton>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default Flow; 