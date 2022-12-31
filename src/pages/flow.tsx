import { ReactFlowProvider } from 'reactflow';
import { Flow } from '../components/flow/Flow';

export const FlowPage = () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
