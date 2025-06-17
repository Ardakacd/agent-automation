# Agent Automation Platform

A graph-based workflow automation platform for AI agents, similar to n8n or LangFlow, that enables users to create, manage, and execute AI agent workflows visually.

## Features

- Visual workflow builder with drag-and-drop interface
- Support for various AI agents (LLMs)
- Integration with multiple tools (web search, vector DBs, APIs)
- Workflow validation and orchestration using LangGraph
- Real-time workflow execution and monitoring

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- React Flow (for graph visualization)
- React DnD (for drag and drop)

### Backend
- FastAPI
- LangGraph
- LangChain
- OpenAI/Anthropic integration
- Vector database support

## Project Structure

```
.
├── frontend/           # Next.js frontend application
├── backend/           # FastAPI backend application
├── docs/             # Documentation
└── README.md         # This file
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- pip
- npm or yarn

### Installation

1. Clone the repository
2. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

## Development Roadmap

### Phase 1: Foundation
- [x] Backend setup with FastAPI
- [x] Frontend setup with Next.js
- [ ] Basic graph UI implementation
- [ ] Tool and agent registration system

### Phase 2: Workflow Engine
- [ ] LangGraph workflow integration
- [ ] Node type implementations
- [ ] RAG pipeline support
- [ ] Input validation system

### Phase 3: Usability + Extensibility
- [ ] User authentication
- [ ] Workflow import/export
- [ ] Debug view
- [ ] Plugin system

## License

MIT 