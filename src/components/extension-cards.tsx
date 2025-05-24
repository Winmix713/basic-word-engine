import React from 'react';
import { ExtensionCard } from './extension-card';
import { ErrorBoundary, ErrorMessage } from './error-boundary';

// Define the card data structure
const cards = [
  {
    id: '1',
    type: 'obsidian',
    title: 'Obsidian',
    description: 'Capture information, manage tasks and pin notes to your menu bar.',
    delay: '100ms',
    customContent: (
      <div className="w-full h-full bg-gradient-to-br from-[#4C1D95] via-[#7C3AED] to-[#A855F7]"></div>
    )
  },
  {
    id: '2',
    type: 'figma',
    title: 'Figma File Search',
    description: 'Quickly open a Figma file from anywhere on your Mac.',
    delay: '200ms',
    customContent: (
      <div className="w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] flex items-center justify-center">
        <div className="w-[280px] h-[140px] relative bg-[rgba(30,41,59,0.8)] rounded-xl backdrop-blur-[10px] border border-white/10 p-4">
          <div className="bg-[rgba(51,65,85,0.8)] rounded-lg py-2 px-3 mb-3 flex items-center gap-2 border border-white/10">
            <div className="w-4 h-4 bg-[#1abcfe] rounded-full relative">
              <div className="absolute top-0.5 left-0.5 w-3 h-3 border-2 border-white rounded-full border-b-transparent border-r-transparent"></div>
            </div>
            <div className="text-white/60 text-xs">Filter files by name</div>
          </div>
          <div className="text-white/50 text-[11px] mb-2">Recent Files 3</div>
          <div className="bg-[rgba(15,23,42,0.8)] rounded-md p-2 flex items-center justify-between border border-white/8">
            <div className="text-white text-xs font-medium">Design System</div>
            <div className="bg-[#0acf83] text-white text-[10px] py-0.5 px-1.5 rounded flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: '3',
    type: 'redis',
    title: 'Redis',
    description: 'Fast in-memory data structure store and caching solution.',
    delay: '300ms',
    customContent: (
      <div className="w-full h-full bg-gradient-to-br from-[#7f1d1d] via-[#dc2626] to-[#ef4444]"></div>
    )
  },
  {
    id: '4',
    type: 'terminal',
    title: 'Terminal',
    description: 'Powerful command-line terminal with advanced features.',
    delay: '400ms',
    customContent: (
      <div className="w-full h-full bg-gradient-to-br from-[#1f2937] via-[#374151] to-[#6b7280]"></div>
    )
  },
  {
    id: '5',
    type: 'docker',
    title: 'Docker',
    description: 'Containerize applications for consistent deployment.',
    delay: '500ms',
    customContent: (
      <div className="w-full h-full bg-gradient-to-br from-[#0c4a6e] via-[#0ea5e9] to-[#3b82f6]"></div>
    )
  }
];

// Function to render the icon based on type
const renderIcon = (type: string) => {
  switch (type) {
    case 'obsidian':
      return <div className="text-2xl font-bold text-white">O</div>;
    case 'figma':
      return (
        <div className="w-7 h-7 relative">
          <div className="absolute w-3 h-3 bg-[#ff5757] top-0 left-2 rounded-t-md"></div>
          <div className="absolute w-3 h-3 bg-[#ff8c42] top-0 right-0 rounded-tr-md rounded-br-md"></div>
          <div className="absolute w-3 h-3 bg-[#a259ff] top-2 left-0 rounded-tl-md rounded-bl-md"></div>
          <div className="absolute w-3 h-3 bg-[#1abcfe] top-2 right-2 rounded-full"></div>
          <div className="absolute w-3 h-3 bg-[#0acf83] bottom-0 left-2 rounded-b-md"></div>
        </div>
      );
    case 'redis':
      return <div className="text-2xl font-bold text-white">R</div>;
    case 'terminal':
      return <div className="text-xl font-bold text-white">$</div>;
    case 'docker':
      return <div className="text-2xl text-white">D</div>;
    default:
      return <div className="text-2xl text-white">?</div>;
  }
};

export const ExtensionCards: React.FC = () => {
  const { cards } = React.useContext(CardManager);
  const [loadError, setLoadError] = React.useState<Error | null>(null);
  
  // Filter active cards
  const activeCards = React.useMemo(() => {
    try {
      // Clear any previous errors
      setLoadError(null);
      
      if (!Array.isArray(cards)) {
        throw new Error("Cards data is not available");
      }
      
      return cards.filter(card => card.isActive);
    } catch (error) {
      console.error("Error loading cards:", error);
      setLoadError(error instanceof Error ? error : new Error("Failed to load cards"));
      return [];
    }
  }, [cards]);
  
  // If there's an error loading cards
  if (loadError) {
    return (
      <ErrorMessage 
        error={loadError} 
        message="Unable to load extension cards" 
        onRetry={() => setLoadError(null)} 
      />
    );
  }
  
  // If no active cards
  if (activeCards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/70 mb-4">No active cards to display.</p>
        <Button 
          as={RouterLink} 
          to="/editor" 
          color="primary"
          variant="flat"
          startContent={<Icon icon="lucide:plus" />}
        >
          Create a Card
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-wrap gap-6 justify-center items-start">
      {activeCards.map(card => (
        <ErrorBoundary key={card.id} fallback={
          <div className="w-80 h-[400px] rounded-2xl bg-[#1e1e2e]/50 border border-red-500/20 flex items-center justify-center">
            <div className="text-center p-4">
              <Icon icon="lucide:alert-triangle" className="text-red-500 mx-auto mb-2" width={32} />
              <p className="text-white/70">Failed to render this card</p>
            </div>
          </div>
        }>
          <ExtensionCard
            key={card.id}
            type={card.type}
            title={card.title}
            description={card.description}
            delay={card.delay}
            icon={renderIcon(card.type)}
            onCardClick={() => console.log(`Card clicked: ${card.id}`)}
          >
            {card.customContent}
          </ExtensionCard>
        </ErrorBoundary>
      ))}
    </div>
  );
};