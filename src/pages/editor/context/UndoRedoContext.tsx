import React from 'react';

// Define the context type
interface UndoRedoContextType {
  addToHistory: (state: any) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

// Create the context
export const UndoRedoContext = React.createContext<UndoRedoContextType>({
  addToHistory: () => {},
  undo: () => {},
  redo: () => {},
  canUndo: false,
  canRedo: false
});

// Maximum number of history states to keep
const MAX_HISTORY_SIZE = 50;

// Provider component
export const UndoRedoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for history and current position
  const [history, setHistory] = React.useState<any[]>([]);
  const [position, setPosition] = React.useState<number>(-1);
  
  // Derived state for whether undo/redo are available
  const canUndo = position > 0;
  const canRedo = position < history.length - 1;
  
  // Add a new state to the history
  const addToHistory = (state: any) => {
    // Create a deep copy of the state to avoid reference issues
    const stateCopy = JSON.parse(JSON.stringify(state));
    
    // If we're not at the end of the history, remove future states
    const newHistory = history.slice(0, position + 1);
    
    // Add the new state
    newHistory.push(stateCopy);
    
    // Limit history size
    if (newHistory.length > MAX_HISTORY_SIZE) {
      newHistory.shift();
    }
    
    // Update state
    setHistory(newHistory);
    setPosition(newHistory.length - 1);
  };
  
  // Undo to the previous state
  const undo = () => {
    if (!canUndo) return;
    setPosition(position - 1);
    return history[position - 1];
  };
  
  // Redo to the next state
  const redo = () => {
    if (!canRedo) return;
    setPosition(position + 1);
    return history[position + 1];
  };
  
  return (
    <UndoRedoContext.Provider value={{
      addToHistory,
      undo,
      redo,
      canUndo,
      canRedo
    }}>
      {children}
    </UndoRedoContext.Provider>
  );
};

// Custom hook for using the context
export const useUndoRedo = () => {
  const context = React.useContext(UndoRedoContext);
  
  if (!context) {
    throw new Error('useUndoRedo must be used within a UndoRedoProvider');
  }
  
  return context;
};