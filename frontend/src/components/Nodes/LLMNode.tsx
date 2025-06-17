import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Box, Typography, Paper } from '@mui/material';

const CustomNode = ({ data }: NodeProps) => {
  
  return (

    
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        minWidth: 180,
        background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease',
        },
      }}
    >
      <Handle
        type="source"
        isConnectableStart={true}
        position={Position.Right}
        style={{
          background: '#555',
          width: 8,
          height: 8,
        }}
        
      />
      
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 1,
        alignItems: 'center',
      }}>
        {data.icon && (
          <Box sx={{ 
            position: 'relative',
            width: 40,
            height: 40,
            mb: 1,
            border: '1px solid #eee'
          }}>
            <img
              src={data.icon}
              alt={data.provider}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
        )}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: '#2c3e50',
            textAlign: 'center',
            fontSize: '0.9rem',
          }}
        >
          {data.provider}
        </Typography>
        
        {data.description && (
          <Typography
            variant="body2"
            sx={{
              color: '#666',
              textAlign: 'center',
              fontSize: '0.8rem',
            }}
          >
            {data.description}
          </Typography>
        )}
      </Box>

      <Handle
        type="target"
        position={Position.Left}
        isConnectableEnd={true}
        style={{
          background: '#555',
          width: 8,
          height: 8,
        }}
      />
    </Paper>
    
  );
};

export default memo(CustomNode); 