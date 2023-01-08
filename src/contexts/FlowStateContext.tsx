import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type FlowState = {
  isError: boolean;
};

const flowStateContext = createContext<FlowState>({ isError: false });
const setFlowStateContext = createContext<Dispatch<SetStateAction<FlowState>>>(
  () => undefined
);

interface FlowStateProviderProps {
  children: ReactNode;
}

export const FlowStateProvider: FC<FlowStateProviderProps> = ({ children }) => {
  const [flowState, setFlowState] = useState<FlowState>({ isError: false });

  return (
    <flowStateContext.Provider value={flowState}>
      <setFlowStateContext.Provider value={setFlowState}>
        {children}
      </setFlowStateContext.Provider>
    </flowStateContext.Provider>
  );
};

export const useFlowStateValse = () => useContext(flowStateContext);
export const useSetFlowStateValue = () => useContext(setFlowStateContext);
