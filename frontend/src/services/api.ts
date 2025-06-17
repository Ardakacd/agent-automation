import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface Node {
  id: string;
  type: string;
  data: Record<string, any>;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  data?: Record<string, any>;
}

export interface Workflow {
  id?: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  input?: string;
  metadata?: Record<string, any>;
}

export interface WorkflowExecution {
  input: string;
}

// API calls
export const workflowService = {
  // Create a new workflow
  createWorkflow: async (workflow: Workflow) => {
    const response = await axios.post(`${API_BASE_URL}/workflows/`, workflow);
    return response.data;
  },

  // Get all workflows
  getWorkflows: async () => {
    const response = await axios.get(`${API_BASE_URL}/workflows/`);
    return response.data;
  },

  // Get a specific workflow
  getWorkflow: async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/workflows/${id}`);
    return response.data;
  },

  // Update a workflow
  updateWorkflow: async (id: string, workflow: Workflow) => {
    const response = await axios.put(`${API_BASE_URL}/workflows/${id}`, workflow);
    return response.data;
  },

  // Delete a workflow
  deleteWorkflow: async (id: string) => {
    const response = await axios.delete(`${API_BASE_URL}/workflows/${id}`);
    return response.data;
  },

  // Execute a workflow
  executeWorkflow: async (id: string, input: string) => {
    const response = await axios.post(`${API_BASE_URL}/workflows/${id}/execute`, {
      input
    });
    return response.data;
  }
};

// RAG service
export const ragService = {
  // Upload documents
  uploadDocuments: async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    const response = await axios.post(`${API_BASE_URL}/rag/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Query documents
  queryDocuments: async (query: string, k: number = 4) => {
    const response = await axios.post(`${API_BASE_URL}/rag/query`, {
      query,
      k
    });
    return response.data;
  },

  // Delete documents
  deleteDocuments: async (documentIds: string[]) => {
    const response = await axios.delete(`${API_BASE_URL}/rag/documents`, {
      data: { document_ids: documentIds }
    });
    return response.data;
  }
}; 