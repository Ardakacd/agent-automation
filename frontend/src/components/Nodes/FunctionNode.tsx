import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { 
  Box, 
  Typography, 
  Paper, 
  InputLabel, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField
} from '@mui/material';
import { availableNodes } from '../../constants';

const FunctionNode = ({ data }: NodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [parameters, setParameters] = useState(data.parameters || {});

  const handleNodeClick = () => {
    setIsDialogOpen(true);
  };

  const handleParameterChange = (key: string, value: string) => {
    setParameters((prev: Record<string, any>) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    data.parameters = parameters;
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setParameters(data.parameters || {});
    setIsDialogOpen(false);
  };

  // Get function details from availableNodes
  const functionNode = availableNodes.find((node: any) => node.type === 'function');
  const selectedFunctionDetails = functionNode?.items?.find((item: any) => item.name === data.name);
  
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          minWidth: 180,
          background: 'linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease',
          },
        }}
        onClick={handleNodeClick}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
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
                alt={data.name}
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
              color: '#1565c0',
              textAlign: 'center',
              fontSize: '0.9rem',
              mb: 1
            }}
          >
            {data.name ? (
              <Box>
                <div>{data.name}</div>
                {Object.keys(data.parameters || {}).length > 0 && (
                  <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 'normal' }}>
                    {Object.entries(data.parameters).map(([key, value]) => `${key}: ${value}`).join(', ')}
                  </div>
                )}
              </Box>
            ) : (
              'Click to configure'
            )}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <InputLabel sx={{ fontSize: '0.8rem', color: '#666', marginBottom: -1.6 }}>
            Function
          </InputLabel>

          <Handle
            type="source"
            isConnectableStart={true}
            position={Position.Bottom}
            style={{
              background: '#1565c0',
              width: 8,
              height: 8,
            }}
            id='bottom-handle'
          />
        </Box>

        <Handle
          type="source"
          isConnectableStart={true}
          position={Position.Right}
          style={{
            background: '#1565c0',
            width: 8,
            height: 8,
          }}
          id='right-handle'
        />

        <Handle
          type="target"
          position={Position.Left}
          isConnectableEnd={true}
          style={{
            background: '#1565c0',
            width: 8,
            height: 8,
          }}
        />
      </Paper>

      {/* Configuration Dialog */}
      <Dialog 
        open={isDialogOpen} 
        onClose={handleCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Configure {data.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            {selectedFunctionDetails && (selectedFunctionDetails as any).parameters && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Parameters
                </Typography>
                {(selectedFunctionDetails as any).parameters.map((param: any) => (
                  <TextField
                    key={param.name}
                    label={param.label || param.name}
                    value={parameters[param.name] || ''}
                    onChange={(e) => handleParameterChange(param.name, e.target.value)}
                    placeholder={param.placeholder || `Enter ${param.name}`}
                    fullWidth
                    margin="dense"
                    type={param.type === 'number' ? 'number' : 'text'}
                  />
                ))}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(FunctionNode); 