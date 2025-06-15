import { NodeProps } from 'reactflow';

declare module 'reactflow' {
  export interface NodeData {
    label: string;
    type: 'llm_agent' | 'web_search' | 'conditional';
    config?: Record<string, any>;
  }
}

declare module 'react-dnd' {
  export interface DragSourceMonitor {
    isDragging(): boolean;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
} 