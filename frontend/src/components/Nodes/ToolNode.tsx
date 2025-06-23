import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Box, Typography } from '@mui/material';

const ToolNode = ({ data }: NodeProps) => {

  return (
    <Box
      sx={{
        position: 'relative',
        width: 180,
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a1a',
        borderRadius: '12px',
        border: '2px solid #00ff9d',
        boxShadow: '0 0 20px rgba(0, 255, 157, 0.2)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 0 30px rgba(0, 255, 157, 0.4)',
          border: '2px solid #00ff9d',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00ff9d, transparent)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00ff9d, transparent)',
        },
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectableEnd={true}
        style={{
          background: '#00ff9d',
          width: 8,
          height: 8,
          border: '2px solid #1a1a1a',
        }}
      />
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 1,
        alignItems: 'center',
        p: 2,
      }}>
        {data.icon && (
          <Box sx={{ 
            position: 'relative',
            width: 32,
            height: 32,
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 255, 157, 0.1)',
            borderRadius: '6px',
            padding: '4px',
          }}>
            <img
              src={data.icon}
              alt={data.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: 0.9,
              }}
              onError={(e) => {
                console.error('Image failed to load:', data.icon);
                e.currentTarget.style.display = 'none';
              }}
            />
          </Box>
        )}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: '#00ff9d',
            textAlign: 'center',
            fontSize: '0.9rem',
            textShadow: '0 0 10px rgba(0, 255, 157, 0.5)',
            letterSpacing: '0.5px',
          }}
        >
          {data.name}
        </Typography>
      </Box>

     
    </Box>
  );
};

export default memo(ToolNode);
