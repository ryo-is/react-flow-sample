import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  Node,
  addEdge,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Position,
  updateEdge,
  useReactFlow,
  MiniMap,
  EdgeTypes,
} from 'reactflow';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';

import { PopupNode, DataType } from './PopupNode';
import { LinkNode } from './LinkNode';
import { FlowInfo } from './FlowInfo';
import { CustomEdge } from './CustomEdge';
import { CustomConnectionline } from './CustomConnectionline';

import 'reactflow/dist/style.css';
import { useSetFlowStateValue } from '../../contexts/FlowStateContext';

const panOnDrag = [1, 2];

const initialNodes: Node<DataType>[] = [
  {
    id: 'popup-1',
    type: 'popup',
    data: {
      label: 'pupup_1',
      buttons: [
        { id: 'popup-1-button-1', label: 'next popup', type: 'link' },
        { id: 'popup-1-button-2', label: 'move page', type: 'link' },
        { id: 'popup-1-button-3', label: 'close popup', type: 'close' },
      ],
    },
    position: { x: 100, y: 200 },
    sourcePosition: Position.Right,
  },
  {
    id: 'popup-2',
    type: 'popup',
    data: {
      label: 'pupup_2',
      buttons: [
        { id: 'popup-2-button-1', label: 'close popup', type: 'close' },
      ],
    },
    position: { x: 500, y: 100 },
    targetPosition: Position.Left,
  },
  {
    id: 'popup-3',
    type: 'popup',
    data: {
      label: 'pupup_3',
      buttons: [
        { id: 'popup-3-button-1', label: 'close popup', type: 'close' },
      ],
    },
    position: { x: 900, y: 200 },
    targetPosition: Position.Left,
  },
  {
    id: 'link-4',
    type: 'link',
    data: { label: 'https://example.com', buttons: [] },
    position: { x: 500, y: 450 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: 'link-5',
    type: 'link',
    data: { label: 'https://example222.com', buttons: [] },
    position: { x: 900, y: 600 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
];

const initialEdges: Edge[] = [
  {
    id: 'edge-2',
    source: 'popup-1',
    target: 'link-4',
    sourceHandle: 'popup-1-button-2',
    style: { stroke: '#3f3f46', strokeWidth: 2 },
    type: 'smoothstep',
  },
  {
    id: 'edge-3',
    source: 'link-4',
    target: 'popup-3',
    type: 'custom',
  },
];

const nodeTypes = {
  popup: PopupNode,
  link: LinkNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

export const Flow = () => {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState<DataType>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { zoomIn, zoomOut } = useReactFlow();
  const setFlowState = useSetFlowStateValue();

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((els) =>
        addEdge(
          {
            ...params,
            type: 'custom',
          },
          els
        )
      ),
    [setEdges]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onEdgeUpdateEnd = useCallback(
    (_: MouseEvent, edge: Edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }
      edgeUpdateSuccessful.current = true;
    },
    [setEdges]
  );

  const addPopupNode = () => {
    const ns = [...nodes];
    ns.push({
      id: `popup-${ns.length + 1}`,
      type: 'popup',
      data: {
        label: `popup_${ns.length + 1}`,
        buttons: [
          {
            id: `popup-${ns.length + 1}-button-1`,
            label: 'close popup',
            type: 'close',
          },
        ],
      },
      position: { x: 500, y: 500 },
      targetPosition: Position.Left,
    });
    setNodes(ns);
    setIsMenuOpen(false);
  };

  const addLinkNode = () => {
    const ns = [...nodes];
    ns.push({
      id: `link-${ns.length + 1}`,
      type: 'link',
      data: { label: 'https://example.com', buttons: [] },
      position: { x: 500, y: 500 },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
    });
    setNodes(ns);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [setNodes, setEdges]);

  return (
    <div className="border-2 w-2/3 p-4 relative">
      <div className="h-[840px]">
        <div className="absolute z-50">
          <button
            className="py-2 px-3 rounded-sm bg-sky-600 w-fit gap-x-1 text-zinc-50 cursor-pointer flex items-center"
            onClick={() => setIsMenuOpen((p) => !p)}
            type="button"
          >
            <div className="px-1">Create Node</div>
            <PlusIcon className="w-5 h-5" />
          </button>
          {isMenuOpen && (
            <div className="absolute w-[240px] bg-zinc-100 shadow-lg z-50 text-zinc-800 border-zinc-300 border">
              <button
                className="p-2 border-b border-zinc-300 w-full text-left hover:bg-sky-100"
                onClick={() => addPopupNode()}
                type="button"
              >
                Add Popup
              </button>
              <button
                className="p-2 border-b border-zinc-300 w-full text-left hover:bg-sky-100"
                onClick={() => addLinkNode()}
                type="button"
              >
                Add Link
              </button>
            </div>
          )}
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          panOnScroll
          selectionOnDrag
          panOnDrag={panOnDrag}
          connectionLineComponent={CustomConnectionline}
          onConnectStart={() => {
            setFlowState((prev) => ({ ...prev, isError: false }));
          }}
        >
          {/* <Controls /> */}
          <div className="absolute right-0 z-50 flex gap-x-2">
            <button
              className="flex items-center"
              type="button"
              onClick={() => zoomIn({ duration: 500 })}
            >
              <PlusIcon className="w-4 h-4" />
              <div className="px-2 text-sm">Expand</div>
            </button>
            <button
              className="flex items-center"
              type="button"
              onClick={() => zoomOut({ duration: 500 })}
            >
              <MinusIcon className="w-4 h-4" />
              <div className="px-2 text-sm">Shrink</div>
            </button>
          </div>
          <MiniMap />
        </ReactFlow>
      </div>
      <FlowInfo nodes={nodes} />
    </div>
  );
};
