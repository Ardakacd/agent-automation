import React, { useState } from 'react';
import { Box, Button, Typography, LinearProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface DocumentUploadProps {
  onUploadComplete?: (response: any) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUploadComplete }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
      setError(null);
    }
  };

  const handleRemove = () => {
    setFiles([]);
    setUploading(false);
    setError(null);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select files to upload');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('http://localhost:8000/rag/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      onUploadComplete?.(result);
      setFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Upload Documents
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <input
          accept=".txt,.pdf,.doc,.docx"
          style={{ display: 'none' }}
          id="document-upload"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <label htmlFor="document-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
            disabled={uploading}
          >
            Select Files
          </Button>
        </label>
      </Box>

      {files.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            Selected files:
          </Typography>
          {files.map((file, index) => (
            <Typography key={index} variant="body2" color="text.secondary">
              {file.name}
            </Typography>
          ))}
        </Box>
      )}

      {uploading && <LinearProgress sx={{ mb: 2 }} />}
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 1 }}>

      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
      >
        Upload
      </Button>

      <Button
        variant="outlined"
        color='error'
        onClick={handleRemove}
        disabled={files.length === 0 || uploading}
      >
        Remove
      </Button>
      </Box>
    </Box>
  );
};

export default DocumentUpload; 