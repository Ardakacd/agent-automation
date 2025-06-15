import React from 'react';
import { Box } from '@mui/material';
import NodeSection from './NodeSection';

interface NodePanelProps {
  onNodeAdd: (node: { name: string; icon: string; }, type: string) => void;
}

const NodePanel: React.FC<NodePanelProps> = ({ onNodeAdd }) => {
  const availableNodes = [
    {
      label: 'Large Language Models',
      type: 'llm',
      description: 'Use a large language model to generate text',
      icon: '/images/llm-icon.jpeg',
      items: [
        { name: "OpenAI", icon: '/images/open-ai-icon.png' },
        { name: "Groq", icon: '/images/groq-icon.png' },
        { name: "Gemini", icon: '/images/gemini-icon.png' },
        { name: "Claude", icon: '/images/claude-icon.png' },
      ]
    },
    {
      label: 'Tools',
      type: 'tool',
      description: 'Tools you can use for your workflow',
      icon: '/images/tool-icon.png',
      items: [
        { name: "Web Search", icon: '/images/web-search-icon.png' },
      ],
    }
    ]
  
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