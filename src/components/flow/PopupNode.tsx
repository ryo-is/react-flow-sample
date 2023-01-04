import { memo, useState } from 'react';
import {
  Handle,
  Node,
  NodeProps,
  Position,
  useReactFlow,
  useStoreApi,
} from 'reactflow';
import { DotsVerticalIcon, PlusIcon } from '@heroicons/react/solid';
import { PencilIcon, DuplicateIcon, TrashIcon } from '@heroicons/react/outline';
import { v4 as uuidv4 } from 'uuid';
import { PopupNodeButton } from './PopupNodeButton';

export type DataType = {
  label: string;
  buttons: { id: string; label: string; type: 'link' | 'close' }[];
};

const PopupNodeBase = ({
  id,
  data,
  isConnectable,
  targetPosition = Position.Top,
}: NodeProps<DataType>) => {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addButton = () => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node: Node<DataType>) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            buttons: [
              ...node.data.buttons,
              {
                id: uuidv4(),
                label: '詳しく知りたい',
                type: 'link',
              },
            ],
          };
        }

        return node;
      })
    );
  };

  return (
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
        <div className="relative">
          <button type="button" onClick={() => setIsMenuOpen((p) => !p)}>
            <DotsVerticalIcon className="w-3 h-3 text-zinc-600 mr-1" />
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
                className="p-2 w-full text-left hover:bg-sky-100 flex"
                type="button"
                onClick={() => setIsMenuOpen(false)}
              >
                <DuplicateIcon className="w-4 h-4 mr-2" />
                コピー
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
      </div>

      <div className="mt-1 ml-2">
        <div className="text-left mb-2 text-md">{data.label}</div>
        {data.buttons.map((b) => (
          <PopupNodeButton button={b} isConnectable={isConnectable} />
        ))}

        <button
          className="flex items-center p-2 border border-blue-500 rounded-sm text-blue-500 w-fit gap-x-1 mt-2 hover:bg-blue-500 hover:text-zinc-100"
          type="button"
          onClick={() => addButton()}
        >
          <div>ボタンを追加する</div>
          <PlusIcon className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

PopupNodeBase.displayName = 'PopupNode';

export const PopupNode = memo(PopupNodeBase);
