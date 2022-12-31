import { FC } from 'react';
import { ReactFlowState, useStore, Node } from 'reactflow';

const transformSelector = (state: ReactFlowState) => state.transform;

interface FlowInfoProps {
  nodes: Node[];
}

export const FlowInfo: FC<FlowInfoProps> = ({ nodes }) => {
  const transform = useStore(transformSelector);

  return (
    <div className="mt-4">
      <div>Zoom & pan transform</div>
      <div>
        [{transform[0].toFixed(2)}, {transform[1].toFixed(2)},{' '}
        {transform[2].toFixed(2)}]
      </div>
      <div className="mt-2">Nodes</div>
      {nodes.map((node) => (
        <div key={node.id}>
          Node {node.id} - x: {node.position.x.toFixed(2)}, y:{' '}
          {node.position.y.toFixed(2)}
        </div>
      ))}
    </div>
  );
};
