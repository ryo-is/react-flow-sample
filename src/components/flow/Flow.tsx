import { useCallback, useRef } from 'react';
import ReactFlow, {
  Node,
  addEdge,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Position,
  updateEdge,
  Background,
} from 'reactflow';

import { PopupNode } from './PopupNode';
import { LinkNode } from './LinkNode';

import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'popup-1',
    type: 'popup',
    data: {
      label: 'pupup_1',
      buttons: [
        { id: 'popup-1-button-1', label: '詳しく知りたい', type: 'link' },
        { id: 'popup-1-button-2', label: '商品詳細はこちら', type: 'link' },
        { id: 'popup-1-button-3', label: '閉じる', type: 'close' },
      ],
    },
    position: { x: 200, y: 200 },
    sourcePosition: Position.Right,
  },
  {
    id: 'popup-2',
    type: 'popup',
    data: {
      label: 'pupup_2',
      buttons: [{ id: 'popup-2-button-1', label: '閉じる', type: 'close' }],
    },
    position: { x: 550, y: 100 },
    targetPosition: Position.Left,
  },
  {
    id: 'popup-3',
    type: 'popup',
    data: {
      label: 'pupup_3',
      buttons: [{ id: 'popup-3-button-1', label: '閉じる', type: 'close' }],
    },
    position: { x: 900, y: 200 },
    targetPosition: Position.Left,
  },
  {
    id: 'link-4',
    type: 'link',
    data: { label: 'https://example.com' },
    position: { x: 550, y: 400 },
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
    style: { stroke: '#3f3f46', strokeWidth: 2 },
    type: 'smoothstep',
  },
];

const nodeTypes = {
  popup: PopupNode,
  link: LinkNode,
};

export const Flow = () => {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((els) =>
        addEdge(
          {
            ...params,
            style: { stroke: '#3f3f46', strokeWidth: 2 },
            type: 'smoothstep',
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
    const n = [...nodes];
    n.push({
      id: `popup-${n.length + 1}`,
      type: 'popup',
      data: {
        label: `popup_${n.length + 1}`,
        buttons: [
          {
            id: `popup-${n.length + 1}-button-1`,
            label: '詳しく知りたい',
            type: 'link',
          },
          {
            id: `popup-${n.length + 1}-button-2`,
            label: '閉じる',
            type: 'close',
          },
        ],
      },
      position: { x: 500, y: 500 },
      targetPosition: Position.Left,
    });
    setNodes(n);
  };

  const addLinkNode = () => {
    const n = [...nodes];
    n.push({
      id: `link-${n.length + 1}`,
      type: 'link',
      data: { label: 'https://example.com' },
      position: { x: 500, y: 500 },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
    });
    setNodes(n);
  };

  return (
    <>
      <div className="flex gap-x-2">
        <button
          className="py-2 px-4 rounded-sm bg-blue-600 w-fit gap-x-1 mt-2 text-zinc-50 cursor-pointer"
          onClick={() => addPopupNode()}
          type="button"
        >
          ポップアップを追加する
        </button>
        <button
          className="py-2 px-4 rounded-sm bg-green-700 w-fit gap-x-1 mt-2 text-zinc-50 cursor-pointer"
          onClick={() => addLinkNode()}
          type="button"
        >
          画面遷移を追加する
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        // fitView
      >
        <Background />
      </ReactFlow>
    </>
  );
};
