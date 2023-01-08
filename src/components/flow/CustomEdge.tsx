import { memo } from 'react';
import { EdgeProps, getSmoothStepPath } from 'reactflow';

const CustomEdgeBase = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <g>
      <path
        id={id}
        style={{
          stroke: '#3f3f46',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </g>
  );
};

CustomEdgeBase.displayName = 'CustomEdge';

export const CustomEdge = memo(CustomEdgeBase);
