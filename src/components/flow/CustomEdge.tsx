import { memo } from 'react';
import { EdgeProps, getSmoothStepPath } from 'reactflow';

export type EdgeDataType = {
  label: string;
};

const CustomEdgeBase = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}: EdgeProps<EdgeDataType>) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text>
        <textPath
          href={`#${id}`}
          style={{ fontSize: 12 }}
          startOffset="50%"
          textAnchor="middle"
        >
          {data?.label}
        </textPath>
      </text>
    </>
  );
};

CustomEdgeBase.displayName = 'CustomEdge';

export const CustomEdge = memo(CustomEdgeBase);
