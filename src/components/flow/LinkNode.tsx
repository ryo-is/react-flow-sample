import { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { DotsVerticalIcon } from '@heroicons/react/solid';

const LinkNodeBase = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps<{ label: string }>) => (
  <div className="placeholder:bg-white text-zinc-800 text-xs w-[240px] text-center rounded-sm border border-zinc-700 min-h-[50px] pb-2 bg-zinc-100">
    {targetPosition !== Position.Top && (
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
        className="w-2 h-2 right-[-5px]"
      />
    )}

    <div className="flex justify-between items-center">
      <div className=" bg-zinc-700 text-white px-2 rounded-sm">画面遷移</div>
      <DotsVerticalIcon className="w-3 h-3 text-zinc-600" />
    </div>

    <div className="m-2 break-words">{data.label}</div>

    {sourcePosition !== Position.Bottom && (
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
        className="w-2 h-2 right-[-5px]"
      />
    )}
  </div>
);

LinkNodeBase.displayName = 'PopupNode';

export const LinkNode = memo(LinkNodeBase);
