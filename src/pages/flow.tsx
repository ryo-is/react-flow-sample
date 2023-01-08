import { ReactFlowProvider } from 'reactflow';
import { Flow } from '../components/flow/Flow';
import { FlowStateProvider } from '../contexts/FlowStateContext';

export const FlowPage = () => (
  <FlowStateProvider>
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  </FlowStateProvider>
);
