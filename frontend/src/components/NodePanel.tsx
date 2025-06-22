import React from 'react';
import { Box } from '@mui/material';
import NodeSection from './NodeSection';
import {availableNodes} from '../constants';

interface NodePanelProps {
  onNodeAdd: (node: { name: string; icon: string; }, type: string) => void;
}

const NodePanel: React.FC<NodePanelProps> = ({ onNodeAdd }) => {
  
  
  return (
    <Box sx={{ p: 2 }}>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {availableNodes.map((node) => (
          <NodeSection
            key={node.type}
            node={node}
            onNodeAdd={onNodeAdd}
          />
            
        ))}
      </Box>
    </Box>
  );
};

export default NodePanel; 