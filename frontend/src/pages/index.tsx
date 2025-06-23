import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  NodeTypes,
  useNodesState,
  useEdgesState,
  Connection,
  updateEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Tabs, Tab, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ToolNode from '../components/Nodes/ToolNode';
import AgentNode from '../components/Nodes/AgentNode';
import FunctionNode from '../components/Nodes/FunctionNode';
import TabContent from '../components/TabContent';
import Header from '../components/Header';
import { workflowService, Workflow } from '../services/api';

const nodeTypes: NodeTypes = {
  tool: ToolNode,
  agent: AgentNode,
  function: FunctionNode,
};

const TABS = [
  { label: 'Nodes', value: 0 },
  { label: 'RAG', value: 1 },
  { label: 'Env Variables', value: 2 },
];

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isRunDialogOpen, setIsRunDialogOpen] = useState(false);
  const [executionInput, setExecutionInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;
      
      const newEdge: Edge = {
        id: `edge-${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        label: 'Click to edit',
        labelStyle: { fill: '#555' },
        labelBgStyle: { fill: '#fff' },
        labelBgPadding: [4, 4],
        labelBgBorderRadius: 4,
        data: { label: 'Click to edit' },
      };
      setEdges((eds) => [...eds, newEdge]);
    },
    [setEdges]
  );

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      const newLabel = prompt('Enter new label:', edge.data?.label || '');
      if (newLabel !== null) {
        setEdges((eds) =>
          eds.map((e) => {
            if (e.id === edge.id) {
              return {
                ...e,
                data: { ...e.data, label: newLabel },
                label: newLabel,
              };
            }
            return e;
          })
        );
      }
    },
    [setEdges]
  );

  const handleNodeAdd = (node: { name: string; icon: string; }, type: string) => {
    const gridSize = 250;
    const row = Math.floor(nodes.length / 3);
    const col = nodes.length % 3;
    
    const newNode: Node = {
      id: `${node.name}-${nodes.length + 1}`,
      type: type,
      position: { 
        x: 100 + col * gridSize, 
        y: 100 + row * gridSize 
      },
      data: {
        [type === 'llm' ? 'provider' : 'name']: node.name,
        icon: node.icon,
      },
    }
  
    setNodes((nds) => [...nds, newNode]);
  };


  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleRunClick = () => {
    setIsRunDialogOpen(true);
  };
  const handleRunWorkflow = async () => {

    setIsExecuting(true);
    try {
      // First, save the workflow
      const workflow: Workflow = {
        name: 'Current Workflow',
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type || 'default',
          data: node.data
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: edge.type,
          data: edge.data
        })),
        input: executionInput
      };

      const savedWorkflowId = await workflowService.createWorkflow(workflow);
      
      
      const result = await workflowService.executeWorkflow(savedWorkflowId!, executionInput);
      setExecutionResult(result);
    } catch (error) {
      console.error('Error executing workflow:', error);
      setExecutionResult({ error: 'Failed to execute workflow' });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Box sx={{ flex: 1, height: '100%', position: 'relative', overflow: 'hidden' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgeClick={onEdgeClick}
            onEdgeUpdate={onEdgeUpdate}
            nodeTypes={nodeTypes}
            proOptions={{ hideAttribution: true }}
            defaultEdgeOptions={{
              type: 'default',
              style: { stroke: '#555' },
            }}
          >
            <Background color="#aaa" gap={16} />
            <Controls />
          </ReactFlow>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRunClick}
            sx={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              zIndex: 1000,
            }}
          >
            Run Workflow
          </Button>
        </Box>

        <Box sx={{ 
          width: '30%', 
          borderLeft: 1, 
          borderColor: 'divider', 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden'
        }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            {TABS.map((tab) => (
              <Tab key={tab.value} label={tab.label} />
            ))}
          </Tabs>

          <Box sx={{ 
            flex: 1, 
            overflow: 'auto',
            minHeight: 0
          }}>
            <TabContent selectedTab={selectedTab} onNodeAdd={handleNodeAdd} />
          </Box>
        </Box>
      </Box>

      <Dialog 
        open={isRunDialogOpen} 
        onClose={() => setIsRunDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Run Workflow</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Input"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={executionInput}
            onChange={(e) => setExecutionInput(e.target.value)}
            disabled={isExecuting}
          />
          {executionResult && (
            <Box 
              sx={{ 
                mt: 2, 
                p: 2, 
                bgcolor: '#f5f5f5', 
                borderRadius: 1,
                maxHeight: '400px',
                overflow: 'auto',
                '& pre': {
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  lineHeight: 1.5
                }
              }}
            >
              <pre>{typeof executionResult === 'string' ? executionResult : JSON.stringify(executionResult, null, 2)}</pre>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsRunDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleRunWorkflow} 
            disabled={isExecuting}
          >
            {isExecuting ? 'Running...' : 'Run'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}