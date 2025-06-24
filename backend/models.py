from pydantic import BaseModel
from typing import Dict, Any, Optional, List

class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    type: Optional[str] = None

class Workflow(BaseModel):
    id: Optional[str] = None
    name: str
    nodes: List[Node]
    edges: List[Edge]
    input: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

class WorkflowExecution(BaseModel):
    input: str

class RAGQuery(BaseModel):
    query: str
    k: Optional[int] = 4 

class User(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: str | None = None