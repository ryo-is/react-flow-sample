import { memo, useState } from 'react';
import {
  Connection,
  Handle,
  NodeProps,
  Position,
  useStoreApi,
} from 'reactflow';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { PencilIcon, DuplicateIcon, TrashIcon } from '@heroicons/react/outline';
import { useSetFlowStateValue } from '../../contexts/FlowStateContext';

const LinkNodeBase = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps<{ label: string }>) => {
  const store = useStoreApi();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setFlowState = useSetFlowStateValue();

  const isValidConnection = (connection: Connection) => {
    const { nodeInternals } = store.getState();
    if (connection.source && connection.target) {
      const sourceNode = nodeInternals.get(connection.source);
      const targetNode = nodeInternals.get(connection.target);
      const isError =
        sourceNode?.type === 'link' && targetNode?.type === 'link';
      setFlowState((prev) => ({
        ...prev,
        isError,
      }));
      return !isError;
    }
    return true;
  };

  return (
    <div className="placeholder:bg-white text-zinc-800 text-xs w-[240px] text-center rounded-sm border border-zinc-700 min-h-[50px] pb-2 bg-zinc-100">
      {targetPosition !== Position.Top && (
        <Handle
          type="target"
          position={targetPosition}
          isConnectable={isConnectable}
          className="w-3 h-3 left-[-7px] border-2 border-zinc-800"
          isValidConnection={isValidConnection}
        >
          <div className="bg-zinc-100 w-full h-full rounded-full p-[2px] pointer-events-none">
            <div className="bg-zinc-800 w-full h-full rounded-full" />
          </div>
        </Handle>
      )}

      <div className="flex justify-between items-center">
        <div className=" bg-zinc-700 text-white px-2 py-1 file:rounded-sm">
          LINK
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
                Edit
              </button>
              <button
                className="p-2 w-full text-left hover:bg-sky-100 flex"
                type="button"
                onClick={() => setIsMenuOpen(false)}
              >
                <DuplicateIcon className="w-4 h-4 mr-2" />
                Copy
              </button>
              <button
                className="p-2 w-full text-left hover:bg-sky-100 flex text-red-500"
                type="button"
                onClick={() => setIsMenuOpen(false)}
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="m-2 break-words">{data.label}</div>

      {sourcePosition !== Position.Bottom && (
        <Handle
          type="source"
          position={sourcePosition}
          isConnectable={isConnectable}
          className="w-3 h-3 right-[-7px] border-2 border-zinc-800"
          isValidConnection={isValidConnection}
        >
          <div className="bg-zinc-100 w-full h-full rounded-full p-[2px] pointer-events-none">
            <div className="bg-zinc-800 w-full h-full rounded-full" />
          </div>
        </Handle>
      )}
    </div>
  );
};

LinkNodeBase.displayName = 'PopupNode';

export const LinkNode = memo(LinkNodeBase);
