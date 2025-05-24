import React from 'react';

// Define the state structure
interface UndoRedoState<T> {
  past: T[];
  present: T;
  future: T[];
}

// Define the context value structure
interface UndoRedoContextValue<T> {
  state: UndoRedoState<T>;
  canUndo: boolean;
  canRedo: boolean;
  setPresentState: (newPresent: T) => void;
  undo: () => void;
  redo: () => void;
  addToHistory: (state: T) => void;
  clearHistory: () => void;
}

// Create context with a default value
const UndoRedoContext = React.createContext<UndoRedoContextValue<any>>({
  state: { past: [], present: {}, future: [] },
  canUndo: false,
  canRedo: false,
  setPresentState: () => {},
  undo: () => {},
  redo: () => {},
  addToHistory: () => {},
  clearHistory: () => {},
});

interface UndoRedoProviderProps {
  children: React.ReactNode;
  initialState?: any;
  maxHistoryLength?: number;
}

export const UndoRedoProvider: React.FC<UndoRedoProviderProps> = ({
  children,
  initialState = {},
  maxHistoryLength = 50,
}) => {
  // Initialize state with the provided initial state
  const [state, setState] = React.useState<UndoRedoState<any>>({
    past: [],
    present: initialState,
    future: [],
  });

  // Derived state
  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  // Set present state (without adding to history)
  const setPresentState = React.useCallback((newPresent: any) => {
    setState((currentState) => ({
      ...currentState,
      present: newPresent,
    }));
  }, []);

  // Add current state to history and set new present
  const addToHistory = React.useCallback((currentState: any) => {
    setState((prevState) => {
      // Limit the size of the history
      const newPast = [...prevState.past, prevState.present].slice(-maxHistoryLength);
      
      return {
        past: newPast,
        present: currentState,
        future: [], // Clear future when a new action is performed
      };
    });
  }, [maxHistoryLength]);

  // Undo action
  const undo = React.useCallback(() => {
    setState((currentState) => {
      if (currentState.past.length === 0) return currentState;

      const previous = currentState.past[currentState.past.length - 1];
      const newPast = currentState.past.slice(0, currentState.past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [currentState.present, ...currentState.future],
      };
    });
  }, []);

  // Redo action
  const redo = React.useCallback(() => {
    setState((currentState) => {
      if (currentState.future.length === 0) return currentState;

      const next = currentState.future[0];
      const newFuture = currentState.future.slice(1);

      return {
        past: [...currentState.past, currentState.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  // Clear history
  const clearHistory = React.useCallback(() => {
    setState((currentState) => ({
      past: [],
      present: currentState.present,
      future: [],
    }));
  }, []);

  // Create context value
  const contextValue = React.useMemo(
    () => ({
      state,
      canUndo,
      canRedo,
      setPresentState,
      undo,
      redo,
      addToHistory,
      clearHistory,
    }),
    [state, canUndo, canRedo, setPresentState, undo, redo, addToHistory, clearHistory]
  );

  return (
    <UndoRedoContext.Provider value={contextValue}>
      {children}
    </UndoRedoContext.Provider>
  );
};

// Custom hook to use the undo-redo context
export const useUndoRedo = <T,>(): UndoRedoContextValue<T> => {
  const context = React.useContext(UndoRedoContext);
  
  if (context === undefined) {
    throw new Error('useUndoRedo must be used within an UndoRedoProvider');
  }
  
  return context as UndoRedoContextValue<T>;
};