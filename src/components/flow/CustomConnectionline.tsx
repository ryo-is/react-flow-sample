import { memo } from 'react';
import { ConnectionLineComponentProps, getSimpleBezierPath } from 'reactflow';
import { useFlowStateValse } from '../../contexts/FlowStateContext';

const CustomConnectionlineBase = ({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
}: ConnectionLineComponentProps) => {
  const [edgePath] = getSimpleBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });
  const flowState = useFlowStateValse();

  return (
    <g>
      <path
        style={{
          stroke: flowState.isError ? '#dc2626' : '#3f3f46',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
        }}
        className="react-flow__edge-path"
        d={edgePath}
      />
    </g>
  );
};

CustomConnectionlineBase.displayName = 'CustomConnectionline';

export const CustomConnectionline = memo(CustomConnectionlineBase);
