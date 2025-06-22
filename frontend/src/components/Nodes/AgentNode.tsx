import React, { memo, useState, useMemo } from 'react';
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
  TextField, 
  FormControl, 
  Select, 
  MenuItem,
  SelectChangeEvent,
  Slider
} from '@mui/material';
import { availableLLMs } from '../../constants';

const AgentNode = ({ data }: NodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLLM, setSelectedLLM] = useState(data.provider || '');
  const [selectedModel, setSelectedModel] = useState(data.model || '');
  const [temperature, setTemperature] = useState(data.temperature || 0.7);
  const [systemPrompt, setSystemPrompt] = useState(data.system_prompt || '');

  // Get available models for the selected LLM
  const availableModels = useMemo(() => {
    const provider = availableLLMs.find(llm => llm.name === selectedLLM);
    return provider?.models || [];
  }, [selectedLLM]);

  const handleNodeClick = () => {
    setIsDialogOpen(true);
  };

  const handleLLMChange = (event: SelectChangeEvent) => {
    const newProvider = event.target.value;
    setSelectedLLM(newProvider);
    // Reset model when provider changes
    setSelectedModel('');
  };

  const handleModelChange = (event: SelectChangeEvent) => {
    setSelectedModel(event.target.value);
  };

  const handleSave = () => {
    data.provider = selectedLLM;
    data.model = selectedModel;
    data.temperature = temperature;
    data.system_prompt = systemPrompt;
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setSelectedLLM(data.provider || '');
    setSelectedModel(data.model || '');
    setTemperature(data.temperature || 0.7);
    setSystemPrompt(data.system_prompt || '');
    setIsDialogOpen(false);
  };
  
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          minWidth: 180,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
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
              mb: 1
            }}
          >
            {data.provider ? (
              <Box>
                <div>{data.name} ({data.provider})</div>
                {data.model && (
                  <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 'normal' }}>
                    {data.model} • T: {data.temperature || 0.7}
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
            Tools
          </InputLabel>

          <Handle
            type="source"
            isConnectableStart={true}
            position={Position.Bottom}
            style={{
              background: '#555',
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
            background: '#555',
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
            background: '#555',
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
        <DialogTitle>Configure Agent</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>LLM Provider</InputLabel>
              <Select
                value={selectedLLM}
                label="LLM Provider"
                onChange={handleLLMChange}
              >
                {availableLLMs.map((llm) => (
                  <MenuItem key={llm.name} value={llm.name}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <img 
                        src={llm.icon} 
                        alt={llm.name} 
                        style={{ width: 20, height: 20, objectFit: 'contain' }}
                      />
                      {llm.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Model</InputLabel>
              <Select
                value={selectedModel}
                label="Model"
                onChange={handleModelChange}
                disabled={!selectedLLM}
              >
                {availableModels.map((model) => (
                  <MenuItem key={model.name} value={model.name}>
                    {model.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              <Typography gutterBottom>
                Temperature: {temperature}
              </Typography>
              <Slider
                value={temperature}
                onChange={(_, value) => setTemperature(value as number)}
                min={0}
                max={1}
                step={0.1}
                marks={[
                  { value: 0, label: '0' },
                  { value: 1, label: '1' },
                  { value: 2, label: '2' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>

            <TextField
              label="System Prompt"
              multiline
              rows={4}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter system prompt for the agent..."
              fullWidth
            />
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

export default memo(AgentNode); 