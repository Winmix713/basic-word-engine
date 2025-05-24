import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Define the state type
interface UndoRedoState<T> {
  past: T[];
  present: T | null;
  future: T[];
}

// Define the action types
type UndoRedoAction<T> =
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET'; payload: T }
  | { type: 'CLEAR' };

// Create the initial state
const initialState: UndoRedoState<any> = {
  past: [],
  present: null,
  future: []
};

// Create the reducer
function undoRedoReducer<T>(state: UndoRedoState<T>, action: UndoRedoAction<T>): UndoRedoState<T> {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO': {
      if (past.length === 0) return state;
      
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      
      return {
        past: newPast,
        present: previous,
        future: present ? [present, ...future] : future
      };
    }
    
    case 'REDO': {
      if (future.length === 0) return state;
      
      const next = future[0];
      const newFuture = future.slice(1);
      
      return {
        past: present ? [...past, present] : past,
        present: next,
        future: newFuture
      };
    }
    
    case 'SET': {
      if (present === action.payload) return state;
      
      return {
        past: present ? [...past, present] : past,
        present: action.payload,
        future: []
      };
    }
    
    case 'CLEAR': {
      return {
        past: [],
        present: present,
        future: []
      };
    }
    
    default:
      return state;
  }
}

// Create the context
interface UndoRedoContextType {
  state: UndoRedoState<any>;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  addToHistory: (state: any) => void;
  clearHistory: () => void;
}

const UndoRedoContext = createContext<UndoRedoContextType | undefined>(undefined);

// Export the context directly
export { UndoRedoContext };

// Create the provider component
export const UndoRedoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(undoRedoReducer, initialState);
  
  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;
  
  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: 'UNDO' });
    }
  }, [canUndo]);
  
  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [canRedo]);
  
  const addToHistory = useCallback((newState: any) => {
    dispatch({ type: 'SET', payload: newState });
  }, []);
  
  const clearHistory = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);
  
  const value = {
    state,
    canUndo,
    canRedo,
    undo,
    redo,
    addToHistory,
    clearHistory
  };
  
  return (
    <UndoRedoContext.Provider value={value}>
      {children}
    </UndoRedoContext.Provider>
  );
};

// Create a custom hook to use the context
export const useUndoRedo = () => {
  const context = useContext(UndoRedoContext);
  if (context === undefined) {
    throw new Error('useUndoRedo must be used within a UndoRedoProvider');
  }
  return context;
};