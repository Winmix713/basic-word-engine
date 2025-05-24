import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storeCardData, loadCardData } from '../utils/storage-utils';

// Define card type
export interface Card {
  id: string;
  type: 'obsidian' | 'figma' | 'redis' | 'terminal' | 'docker';
  title: string;
  description: string;
  delay: string;
  isActive: boolean;
  bgGradientFrom: string;
  bgGradientTo: string;
  bgOpacityFrom: string;
  bgOpacityTo: string;
  iconGradientFrom: string;
  iconGradientTo: string;
  cardImageGradientFrom: string;
  cardImageGradientVia: string;
  cardImageGradientTo: string;
  shadowColor: string;
  shadowOpacity: string;
  enableHoverEffects: boolean;
  enableAnimations: boolean;
  cardWidth?: string;
  cardWidthUnit?: string;
  cardHeight?: string;
  cardHeightUnit?: string;
  cardPadding?: string;
  cardPaddingUnit?: string;
  cardBorderWidth?: string;
  cardBorderStyle?: string;
  cardBorderColor?: string;
  cardBorderOpacity?: string;
  cardBorderRadius?: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
    unit: string;
  };
  iconBorderWidth?: string;
  iconBorderStyle?: string;
  iconBorderColor?: string;
  iconBorderOpacity?: string;
  iconSize?: string;
  iconBorderRadius?: string;
  iconBorderRadiusUnit?: string;
  cardOpacity?: number;
  zIndex?: string;
  positionType?: string;
  shadowSettings?: {
    inset: boolean;
    x: string;
    y: string;
    blur: string;
    spread: string;
  };
  shadow2Settings?: {
    inset: boolean;
    x: string;
    y: string;
    blur: string;
    spread: string;
    color: string;
    opacity: string;
  };
  iconImage?: string | null;
  contentImage?: string | null;
}

// Default card settings for each type
const defaultCardSettings: Record<string, Partial<Card>> = {
  obsidian: {
    bgGradientFrom: "#523091",
    bgGradientTo: "#1a0b33",
    bgOpacityFrom: "0.70",
    bgOpacityTo: "0.14",
    iconGradientFrom: "#7c3aed",
    iconGradientTo: "#a855f7",
    cardImageGradientFrom: "#4C1D95",
    cardImageGradientVia: "#7C3AED",
    cardImageGradientTo: "#A855F7",
    shadowColor: "#7c3aed",
    shadowOpacity: "0.3",
  },
  figma: {
    bgGradientFrom: "#192935",
    bgGradientTo: "#121922",
    bgOpacityFrom: "0.70",
    bgOpacityTo: "0.07",
    iconGradientFrom: "#1e293b",
    iconGradientTo: "#334155",
    cardImageGradientFrom: "#0f172a",
    cardImageGradientVia: "#1e293b",
    cardImageGradientTo: "#334155",
    shadowColor: "#1abcfe",
    shadowOpacity: "0.3",
  },
  redis: {
    bgGradientFrom: "#913030",
    bgGradientTo: "#330b0b",
    bgOpacityFrom: "0.70",
    bgOpacityTo: "0.14",
    iconGradientFrom: "#dc2626",
    iconGradientTo: "#ef4444",
    cardImageGradientFrom: "#7f1d1d",
    cardImageGradientVia: "#dc2626",
    cardImageGradientTo: "#ef4444",
    shadowColor: "#ed3a3a",
    shadowOpacity: "0.3",
  },
  terminal: {
    bgGradientFrom: "#404040",
    bgGradientTo: "#181818",
    bgOpacityFrom: "0.70",
    bgOpacityTo: "0.07",
    iconGradientFrom: "#374151",
    iconGradientTo: "#6b7280",
    cardImageGradientFrom: "#1f2937",
    cardImageGradientVia: "#374151",
    cardImageGradientTo: "#6b7280",
    shadowColor: "#a0a0a0",
    shadowOpacity: "0.3",
  },
  docker: {
    bgGradientFrom: "#307891",
    bgGradientTo: "#0b1e33",
    bgOpacityFrom: "0.70",
    bgOpacityTo: "0.14",
    iconGradientFrom: "#0ea5e9",
    iconGradientTo: "#3b82f6",
    cardImageGradientFrom: "#0c4a6e",
    cardImageGradientVia: "#0ea5e9",
    cardImageGradientTo: "#3b82f6",
    shadowColor: "#3abced",
    shadowOpacity: "0.3",
  }
};

// Create a new card with default settings
const createDefaultCard = (type: string, title: string, description: string): Card => {
  const defaultSettings = defaultCardSettings[type] || defaultCardSettings.obsidian;
  
  return {
    id: uuidv4(),
    type: type as Card['type'],
    title,
    description,
    delay: "500ms",
    isActive: true,
    enableHoverEffects: true,
    enableAnimations: true,
    cardWidth: "320",
    cardWidthUnit: "px",
    cardHeight: "auto",
    cardHeightUnit: "px",
    cardPadding: "20",
    cardPaddingUnit: "px",
    cardBorderWidth: "0",
    cardBorderStyle: "solid",
    cardBorderColor: "#ffffff",
    cardBorderOpacity: "0.1",
    cardBorderRadius: {
      topLeft: "16",
      topRight: "16",
      bottomLeft: "16",
      bottomRight: "16",
      unit: "px"
    },
    iconBorderWidth: "0",
    iconBorderStyle: "solid",
    iconBorderColor: "#ffffff",
    iconBorderOpacity: "0.2",
    iconSize: "56",
    iconBorderRadius: "12",
    iconBorderRadiusUnit: "px",
    cardOpacity: 100,
    zIndex: "1",
    positionType: "relative",
    shadowSettings: {
      inset: false,
      x: "0",
      y: "30",
      blur: "50",
      spread: "0"
    },
    shadow2Settings: {
      inset: true,
      x: "0",
      y: "1",
      blur: "0",
      spread: "0",
      color: "#ffffff",
      opacity: "0.1"
    },
    ...defaultSettings
  };
};

// Context interface
interface CardManagerContextType {
  cards: Card[];
  activeCardId: string | null;
  setActiveCardId: (id: string) => void;
  createNewCard: (cardData: { type: Card['type'], title: string, description: string }) => void;
  updateCard: (updatedCard: Card) => void;
  deleteCard: (id: string) => void;
  toggleCardActive: (id: string) => void;
  resetCardToDefault: (id: string) => void;
}

// Create context
const CardManagerContext = createContext<CardManagerContextType | undefined>(undefined);

// Export the context so it can be imported directly
export { CardManagerContext };

// Provider component
export const CardManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  
  // Load cards from storage on mount
  useEffect(() => {
    try {
      const savedCards = loadCardData('extension_cards');
      if (savedCards && Array.isArray(savedCards) && savedCards.length > 0) {
        setCards(savedCards);
        setActiveCardId(savedCards[0].id);
      } else {
        // Initialize with default cards if none exist
        const defaultCards = [
          createDefaultCard('obsidian', 'Obsidian', 'Capture information, manage tasks and pin notes to your menu bar.'),
          createDefaultCard('figma', 'Figma File Search', 'Quickly open a Figma file from anywhere on your Mac.'),
          createDefaultCard('redis', 'Redis', 'Fast in-memory data structure store and caching solution.'),
          createDefaultCard('terminal', 'Terminal', 'Powerful command-line terminal with advanced features.'),
          createDefaultCard('docker', 'Docker', 'Containerize applications for consistent deployment.')
        ];
        setCards(defaultCards);
        setActiveCardId(defaultCards[0].id);
        storeCardData('extension_cards', defaultCards);
      }
    } catch (error) {
      console.error('Error loading cards:', error);
      // Fall back to default cards if there's an error
      const defaultCards = [
        createDefaultCard('obsidian', 'Obsidian', 'Capture information, manage tasks and pin notes to your menu bar.')
      ];
      setCards(defaultCards);
      setActiveCardId(defaultCards[0].id);
    }
  }, []);
  
  // Save cards to storage whenever they change
  useEffect(() => {
    if (cards.length > 0) {
      try {
        storeCardData('extension_cards', cards);
      } catch (error) {
        console.error('Error saving cards:', error);
      }
    }
  }, [cards]);
  
  // Create a new card
  const createNewCard = (cardData: { type: Card['type'], title: string, description: string }) => {
    const newCard = createDefaultCard(cardData.type, cardData.title, cardData.description);
    setCards(prevCards => [...prevCards, newCard]);
    setActiveCardId(newCard.id);
  };
  
  // Update an existing card
  const updateCard = (updatedCard: Card) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === updatedCard.id ? updatedCard : card
      )
    );
  };
  
  // Delete a card
  const deleteCard = (id: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
    
    // If the active card is deleted, set the first card as active
    if (activeCardId === id) {
      setActiveCardId(cards.filter(card => card.id !== id)[0]?.id || null);
    }
  };
  
  // Toggle card active state
  const toggleCardActive = (id: string) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, isActive: !card.isActive } : card
      )
    );
  };
  
  // Reset card to default settings
  const resetCardToDefault = (id: string) => {
    const cardToReset = cards.find(card => card.id === id);
    if (cardToReset) {
      const resetCard = createDefaultCard(
        cardToReset.type, 
        cardToReset.title, 
        cardToReset.description
      );
      resetCard.id = id; // Keep the same ID
      resetCard.isActive = cardToReset.isActive; // Keep active state
      
      setCards(prevCards => 
        prevCards.map(card => 
          card.id === id ? resetCard : card
        )
      );
    }
  };
  
  const value = {
    cards,
    activeCardId,
    setActiveCardId,
    createNewCard,
    updateCard,
    deleteCard,
    toggleCardActive,
    resetCardToDefault
  };
  
  return (
    <CardManagerContext.Provider value={value}>
      {children}
    </CardManagerContext.Provider>
  );
};

// Custom hook to use the card manager context
export const useCardManager = () => {
  const context = useContext(CardManagerContext);
  if (context === undefined) {
    throw new Error('useCardManager must be used within a CardManagerProvider');
  }
  return context;
};