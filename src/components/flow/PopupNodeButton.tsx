import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';

interface PopupNodeButtonProps {
  button: { id: string; label: string; type: 'link' | 'close' };
  isConnectable: boolean;
}

const PopupNodeButtonBase = ({
  button,
  isConnectable,
}: PopupNodeButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="rounded-l-sm border border-zinc-700 flex items-center gap-x-1 p-2 relative my-1 border-r-0">
      <div className="border-r border-zinc-500 pr-1">
        {button.type === 'link' ? '●' : '×'}
      </div>
      <div className="flex-1 text-left pl-1">{button.label}</div>
      <div className="relative">
        <button type="button" onClick={() => setIsMenuOpen((p) => !p)}>
          <DotsVerticalIcon className="w-3 h-3 text-zinc-600" />
        </button>
        {isMenuOpen && (
          <div className="absolute w-[120px] bg-zinc-100 shadow-lg z-50 text-zinc-800 border-zinc-300 border">
            <button
              className="p-2 w-full text-left hover:bg-sky-100 flex"
              type="button"
              onClick={() => setIsMenuOpen(false)}
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              編集
            </button>
            <button
              className="p-2 w-full text-left hover:bg-sky-100 flex text-red-500"
              type="button"
              onClick={() => setIsMenuOpen(false)}
            >
              <TrashIcon className="w-4 h-4 mr-2" />
              削除
            </button>
          </div>
        )}
      </div>
      {button.type === 'link' && (
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          id={`${button.id}`}
          className="w-2 h-2 right-[-5px]"
        />
      )}
    </div>
  );
};

PopupNodeButtonBase.displayName = 'PopupNodeButton';

export const PopupNodeButton = memo(PopupNodeButtonBase);
