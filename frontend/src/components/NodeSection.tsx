import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

interface NodeSectionProps {
  node: {
    label: string;
    type: string;
    description: string;
    icon: string;
    items: {
      name: string;
      icon: string;
    }[];
  },
  onNodeAdd: (node: { name: string; icon: string; }, type: string) => void
}

const NodeSection: React.FC<NodeSectionProps> = ({ node, onNodeAdd }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ position: 'relative', mr: 1 }}>
          <Image 
            src={node.icon} 
            alt={node.label}
            style={{  objectFit: 'contain' }}
            width={24}
            height={24}
          />
        </Box>
        <Typography variant="h6">
          {node.label}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {node.description}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: {
        xs: 'repeat(1, 1fr)',  
        sm: 'repeat(2, 1fr)',  
        md: 'repeat(3, 1fr)',   
        lg: 'repeat(4, 1fr)',
      }, gap: 1 }}>
        {node.items.map((item) => (
          <Button 
            key={item.name} 
            variant="outlined" 
            onClick={() => onNodeAdd(item, node.type)}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: 1,
              py: 1
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Image 
                src={item.icon} 
                alt={item.name}
                width={24}
                height={24}
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="body2">
              {item.name}
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default NodeSection;