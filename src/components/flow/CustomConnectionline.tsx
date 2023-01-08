import { memo } from 'react';
import { ConnectionLineComponentProps, getSimpleBezierPath } from 'reactflow';

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

  return (
    <g>
      <path
        style={{
          stroke: '#3f3f46',
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
