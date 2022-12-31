import { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { DotsVerticalIcon, PlusIcon } from '@heroicons/react/solid';

type DataType = {
  label: string;
  buttons: { id: string; label: string; type: 'link' | 'close' }[];
};

const PopupNodeBase = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
}: NodeProps<DataType>) => (
  <div className="placeholder:bg-white text-zinc-800 text-xs w-[240px] text-center rounded-sm border border-zinc-700 min-h-[120px] pb-2 bg-sky-50">
    {targetPosition !== Position.Top && (
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
        className="w-2 h-2 right-[-5px]"
      />
    )}

    <div className="flex justify-between items-center">
      <div className=" bg-zinc-700 text-white px-2 py-1 rounded-sm">
        ポップアップ
      </div>
      <DotsVerticalIcon className="w-3 h-3 text-zinc-600 mr-1" />
    </div>

    <div className="mt-1 ml-2">
      <div className="text-left mb-2 text-md">{data.label}</div>
      {data.buttons.map((b) => (
        <div
          className="rounded-l-sm border border-zinc-700 flex items-center gap-x-1 p-2 relative my-1 border-r-0"
          key={`${b.id}`}
        >
          <div className="border-r border-zinc-500 pr-1">
            {b.type === 'link' ? '●' : '×'}
          </div>
          <div className="flex-1 text-left pl-1">{b.label}</div>
          <DotsVerticalIcon className="w-3 h-3 text-zinc-600" />
          {b.type === 'link' && (
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              id={`${b.id}`}
              className="w-2 h-2 right-[-5px]"
            />
          )}
        </div>
      ))}

      <div className="flex items-center p-2 border border-blue-500 rounded-sm text-blue-500 w-fit gap-x-1 mt-2">
        <div>ボタンを追加する</div>
        <PlusIcon className="w-3 h-3" />
      </div>
    </div>
  </div>
);

PopupNodeBase.displayName = 'PopupNode';

export const PopupNode = memo(PopupNodeBase);