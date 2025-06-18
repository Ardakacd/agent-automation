import React from 'react';
import { Box } from '@mui/material';
import NodePanel from './NodePanel';
import DocumentUpload from './DocumentUpload';

interface TabContentProps {
  selectedTab: number;
  onNodeAdd: (node: { name: string; icon: string }, type: string) => void;
}

const TabContent: React.FC<TabContentProps> = ({ selectedTab, onNodeAdd }) => {
  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <NodePanel onNodeAdd={onNodeAdd} />;
      case 1:
        return (
          <DocumentUpload
            onUploadComplete={(response) => {
              console.log('Upload complete:', response);
            }}
          />
        );
      case 2:
        return (
          <Box sx={{ p: 2 }}>
            <h3>Environment Variables</h3>
            {/* Add your environment variables content here */}
          </Box>
        );
      case 3:
        return (
          <Box sx={{ p: 2 }}>
            <h3>Settings</h3>
            {/* Add your settings content here */}
          </Box>
        );
      default:
        return null;
    }
  };

  return <Box>{renderContent()}</Box>;
};

export default TabContent; 