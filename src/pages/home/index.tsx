import React from 'react';
import { Icon } from '@iconify/react';
import { ExtensionCard } from '../../components/extension-card';
import { CardManagerContext } from '../../context/card-manager-context';

/**
 * HomePage Component
 * 
 * Displays a grid of active extension cards with customizable styling
 * and content based on their configuration.
 */
const HomePage: React.FC = () => {
  const { cards } = React.useContext(CardManagerContext);
  
  // Memoize filtered cards to prevent unnecessary re-calculations
  const activeCards = React.useMemo(
    () => cards.filter(card => card.isActive),
    [cards]
  );

  // Early return if no active cards
  if (activeCards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-slate-400 text-lg">No active cards to display</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center p-5">
      <div className="flex flex-wrap gap-6 justify-center items-start max-w-6xl">
        {activeCards.map(card => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

/**
 * Individual Card Item Component
 * 
 * Renders a single extension card with its icon and content
 */
interface CardItemProps {
  card: any; // Replace with proper Card type when available
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  const cardIcon = React.useMemo(() => {
    if (card.iconImage) {
      return (
        <img 
          src={card.iconImage} 
          alt={`${card.title} icon`} 
          className="max-w-full max-h-full object-cover"
          loading="lazy"
        />
      );
    }
    return getDefaultIcon(card.type);
  }, [card.iconImage, card.title, card.type]);

  const cardContent = React.useMemo(() => {
    if (card.contentImage) {
      return (
        <div className="w-full h-full">
          <img 
            src={card.contentImage} 
            alt={`${card.title} content`} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      );
    }
    return getDefaultContent(card.type);
  }, [card.contentImage, card.title, card.type]);

  const cardStyles = React.useMemo(() => ({
    bgGradientFrom: card.bgGradientFrom,
    bgGradientTo: card.bgGradientTo,
    bgOpacityFrom: card.bgOpacityFrom,
    bgOpacityTo: card.bgOpacityTo,
    iconGradientFrom: card.iconGradientFrom,
    iconGradientTo: card.iconGradientTo,
    cardImageGradientFrom: card.cardImageGradientFrom,
    cardImageGradientVia: card.cardImageGradientVia,
    cardImageGradientTo: card.cardImageGradientTo,
    shadowColor: card.shadowColor,
    shadowOpacity: card.shadowOpacity,
    enableHoverEffects: card.enableHoverEffects,
    enableAnimations: card.enableAnimations,
    cardWidth: card.cardWidth,
    cardWidthUnit: card.cardWidthUnit,
    cardHeight: card.cardHeight,
    cardHeightUnit: card.cardHeightUnit,
    cardPadding: card.cardPadding,
    cardPaddingUnit: card.cardPaddingUnit,
    cardBorderWidth: card.cardBorderWidth,
    cardBorderStyle: card.cardBorderStyle,
    cardBorderColor: card.cardBorderColor,
    cardBorderOpacity: card.cardBorderOpacity,
    cardBorderRadius: card.cardBorderRadius,
    iconBorderWidth: card.iconBorderWidth,
    iconBorderStyle: card.iconBorderStyle,
    iconBorderColor: card.iconBorderColor,
    iconBorderOpacity: card.iconBorderOpacity,
    iconSize: card.iconSize,
    iconBorderRadius: card.iconBorderRadius,
    iconBorderRadiusUnit: card.iconBorderRadiusUnit,
    cardOpacity: card.cardOpacity,
    zIndex: card.zIndex,
    positionType: card.positionType,
    shadowSettings: card.shadowSettings,
    shadow2Settings: card.shadow2Settings,
  }), [card]);

  return (
    <ExtensionCard 
      type={card.type} 
      title={card.title} 
      description={card.description}
      delay={card.delay}
      icon={cardIcon}
      customContent={card.contentImage}
      cardStyles={cardStyles}
      aria-label={`${card.title} - ${card.description}`}
    >
      {cardContent}
    </ExtensionCard>
  );
};

/**
 * Default icon components based on card type
 */
const getDefaultIcon = (type: string): React.ReactNode => {
  const iconMap: Record<string, React.ReactNode> = {
    obsidian: <span className="text-2xl font-bold">O</span>,
    figma: <FigmaIcon />,
    redis: <span className="text-2xl font-bold">R</span>,
    terminal: <span className="text-xl font-bold">$</span>,
    docker: <span className="text-2xl">🐳</span>,
  };

  return iconMap[type] || <span className="text-2xl">?</span>;
};

/**
 * Figma Icon Component
 */
const FigmaIcon: React.FC = () => (
  <div className="w-7 h-7 relative transition-transform duration-300 ease-in-out group-hover:scale-110 group-active:scale-90">
    <div className="absolute w-3 h-3 bg-red-500 top-0 left-2 rounded-t-md transition-all duration-300 ease-in-out group-hover:bg-red-400 group-hover:shadow-lg group-hover:shadow-red-500/60" />
    <div className="absolute w-3 h-3 bg-orange-500 top-0 right-0 rounded-tr-md rounded-bl-md transition-all duration-300 ease-in-out group-hover:bg-orange-400 group-hover:shadow-lg group-hover:shadow-orange-500/60" />
    <div className="absolute w-3 h-3 bg-purple-500 top-2 left-0 rounded-tl-md rounded-br-md transition-all duration-300 ease-in-out group-hover:bg-purple-400 group-hover:shadow-lg group-hover:shadow-purple-500/60" />
    <div className="absolute w-3 h-3 bg-cyan-500 top-2 right-2 rounded-full transition-all duration-300 ease-in-out group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-500/60" />
    <div className="absolute w-3 h-3 bg-green-500 bottom-0 left-2 rounded-b-md transition-all duration-300 ease-in-out group-hover:bg-green-400 group-hover:shadow-lg group-hover:shadow-green-500/60" />
  </div>
);

/**
 * Default content components based on card type
 */
const getDefaultContent = (type: string): React.ReactNode => {
  const contentMap: Record<string, React.ReactNode> = {
    obsidian: <ObsidianContent />,
    figma: <FigmaContent />,
    redis: <RedisContent />,
    terminal: <TerminalContent />,
    docker: <DockerContent />,
  };

  return contentMap[type] || (
    <div className="w-full h-full flex items-center justify-center text-white/50">
      No content available
    </div>
  );
};

/**
 * Content Components for each card type
 */
const ObsidianContent: React.FC = () => (
  <div className="relative">
    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-purple-500/30 to-transparent animate-pulse" />
    <div className="w-30 h-30 relative filter drop-shadow-2xl transition-all duration-400 ease-in-out group-hover:scale-110 group-active:scale-105">
      <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-600 to-purple-800 rounded-lg animate-pulse transition-all duration-300 ease-in-out group-hover:from-purple-300 group-hover:via-purple-500 group-hover:to-purple-700 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5">
          <div className="absolute w-8 h-0.5 top-1/3 left-1/4 bg-white/20 rounded-full rotate-45 transition-all duration-300 ease-in-out group-hover:bg-white/40" />
          <div className="absolute w-6 h-0.5 top-1/2 right-1/5 bg-white/20 rounded-full -rotate-30 transition-all duration-300 ease-in-out group-hover:bg-white/40" />
          <div className="absolute w-9 h-0.5 bottom-1/3 left-1/3 bg-white/20 rounded-full rotate-15 transition-all duration-300 ease-in-out group-hover:bg-white/40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-lg transition-all duration-300 ease-in-out group-hover:from-white/50" />
      </div>
    </div>
  </div>
);

const FigmaContent: React.FC = () => (
  <div className="relative">
    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-500/20 to-transparent animate-pulse opacity-20" />
    <div className="absolute left-5 top-5 w-15 h-30">
      <div className="absolute w-10 h-5 bg-red-500 rounded-xl top-0 animate-bounce transition-all duration-300 ease-in-out group-hover:bg-red-400 group-hover:shadow-lg group-hover:shadow-red-500/60" />
      <div className="absolute w-9 h-9 bg-purple-500 top-6 -left-1 rounded-full animate-bounce delay-500 transition-all duration-300 ease-in-out group-hover:bg-purple-400 group-hover:shadow-lg group-hover:shadow-purple-500/60" />
      <div className="absolute w-6 h-6 bg-cyan-500 top-12 right-0 rounded-full animate-bounce delay-1000 transition-all duration-300 ease-in-out group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-500/60" />
      <div className="absolute w-8 h-8 bg-green-500 bottom-0 left-1 rounded-full animate-bounce delay-1500 transition-all duration-300 ease-in-out group-hover:bg-green-400 group-hover:shadow-lg group-hover:shadow-green-500/60" />
    </div>
    <div className="w-70 h-35 relative bg-slate-800/80 rounded-xl backdrop-blur-sm border border-white/10 p-4 transition-all duration-300 ease-in-out group-hover:bg-slate-700/90 group-hover:border-white/20 group-hover:scale-105">
      <div className="bg-slate-700/80 rounded-lg py-2 px-3 mb-3 flex items-center gap-2 border border-white/10 transition-all duration-300 ease-in-out group-hover:bg-slate-600/90 group-hover:border-white/20">
        <div className="w-4 h-4 bg-cyan-500 rounded-full relative transition-all duration-300 ease-in-out group-hover:bg-cyan-400">
          <div className="absolute top-0.5 left-0.5 w-3 h-3 border-2 border-white rounded-full border-b-transparent border-r-transparent" />
        </div>
        <div className="text-white/60 text-xs transition-colors duration-300 ease-in-out group-hover:text-white/80">
          Filter files by name
        </div>
      </div>
      <div className="text-white/50 text-xs mb-2 transition-colors duration-300 ease-in-out group-hover:text-white/70">
        Recent Files 3
      </div>
      <div className="bg-slate-900/80 rounded-md p-2 flex items-center justify-between border border-white/8 transition-all duration-300 ease-in-out group-hover:bg-slate-800/90 group-hover:border-white/15 group-hover:translate-x-1">
        <div className="text-white text-xs font-medium transition-colors duration-300 ease-in-out group-hover:text-slate-100">
          Design System
        </div>
        <div className="bg-green-500 text-white text-xs py-0.5 px-1.5 rounded flex items-center gap-1 transition-all duration-300 ease-in-out group-hover:bg-green-400">
          <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 ease-in-out group-hover:bg-slate-50" />
        </div>
      </div>
    </div>
  </div>
);

const RedisContent: React.FC = () => (
  <div className="relative">
    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-red-500/30 to-transparent animate-pulse" />
    <div className="w-30 h-30 relative">
      <div className="w-20 h-20 relative mx-auto my-5 animate-spin group-hover:animate-pulse" style={{ animationDuration: '4s' }}>
        <div className="absolute w-20 h-20 border-2 border-white/20 rounded-lg bg-gradient-to-br from-red-500 to-red-600 group-hover:border-white/40 group-hover:shadow-lg group-hover:shadow-red-500/30" />
        <div className="absolute w-20 h-20 border-2 border-white/20 rounded-lg bg-gradient-to-br from-red-600 to-red-700 group-hover:border-white/40 group-hover:shadow-lg group-hover:shadow-red-500/30" style={{ transform: 'rotateY(180deg) translateZ(40px)' }} />
        <div className="absolute w-20 h-20 border-2 border-white/20 rounded-lg bg-gradient-to-br from-red-700 to-red-800 group-hover:border-white/40 group-hover:shadow-lg group-hover:shadow-red-500/30" style={{ transform: 'rotateY(-90deg) translateZ(40px)' }} />
        <div className="absolute w-20 h-20 border-2 border-white/20 rounded-lg bg-gradient-to-br from-red-400 to-red-500 group-hover:border-white/40 group-hover:shadow-lg group-hover:shadow-red-500/30" style={{ transform: 'rotateY(90deg) translateZ(40px)' }} />
        <div className="absolute w-20 h-20 border-2 border-white/20 rounded-lg bg-gradient-to-br from-red-300 to-red-400 group-hover:border-white/40 group-hover:shadow-lg group-hover:shadow-red-500/30" style={{ transform: 'rotateX(90deg) translateZ(40px)' }} />
        <div className="absolute w-20 h-20 border-2 border-white/20 rounded-lg bg-gradient-to-br from-red-800 to-red-900 group-hover:border-white/40 group-hover:shadow-lg group-hover:shadow-red-500/30" style={{ transform: 'rotateX(-90deg) translateZ(40px)' }} />
      </div>
    </div>
  </div>
);

const TerminalContent: React.FC = () => (
  <div className="absolute bottom-0 left-0 w-90 h-81 opacity-0 transition-all duration-400 ease-out overflow-hidden text-sm text-slate-200 bg-white/10 backdrop-blur-lg border border-slate-500/20 rounded-xl shadow-2xl group-hover:opacity-100">
    <div className="w-70 h-35 bg-slate-800/90 rounded-xl border border-white/10 overflow-hidden font-mono text-xs backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:bg-slate-700/95 group-hover:border-white/20 group-hover:scale-105">
      <div className="h-7 bg-slate-900/80 flex items-center px-3 border-b border-white/10">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 transition-all duration-300 ease-in-out group-hover:bg-red-400 group-hover:shadow-lg group-hover:shadow-red-500/50" />
          <span className="w-3 h-3 rounded-full bg-yellow-500 transition-all duration-300 ease-in-out group-hover:bg-yellow-400 group-hover:shadow-lg group-hover:shadow-yellow-500/50" />
          <span className="w-3 h-3 rounded-full bg-green-500 transition-all duration-300 ease-in-out group-hover:bg-green-400 group-hover:shadow-lg group-hover:shadow-green-500/50" />
        </div>
      </div>
      <div className="p-3 text-slate-200">
        <div className="mb-1 flex items-center">
          <span className="text-green-500 mr-2 group-hover:text-green-400">user@mac:</span>
          <span className="text-blue-500 group-hover:text-blue-400">npm start</span>
        </div>
        <div className="mb-1">
          <span className="text-slate-400">Server running on port 3000</span>
        </div>
        <div className="flex items-center">
          <span className="text-green-500 mr-2 group-hover:text-green-400">user@mac:</span>
          <span className="text-yellow-500 animate-pulse group-hover:text-yellow-400">|</span>
        </div>
      </div>
    </div>
  </div>
);

const DockerContent: React.FC = () => (
  <div className="relative opacity-0 animate-pulse group-hover:opacity-100 transition-opacity duration-700">
    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-blue-500/30 to-transparent animate-pulse" />
    <div className="w-50 h-30 relative flex items-center justify-center">
      <div className="relative w-40 h-25">
        <div className="absolute w-35 h-6 rounded-xl flex items-center justify-center text-xs font-semibold text-white border-2 border-white/20 transition-all duration-300 ease-in-out animate-bounce bg-gradient-to-br from-blue-500 to-blue-700 top-0 z-30 group-hover:border-white/40 group-hover:from-blue-400 group-hover:to-blue-600 group-hover:translate-x-1 group-hover:shadow-lg group-hover:shadow-blue-500/40">
          app
        </div>
        <div className="absolute w-35 h-6 rounded-xl flex items-center justify-center text-xs font-semibold text-white border-2 border-white/20 transition-all duration-300 ease-in-out animate-bounce bg-gradient-to-br from-sky-500 to-sky-700 top-7 z-20 delay-500 group-hover:border-white/40 group-hover:from-sky-400 group-hover:to-sky-600 group-hover:translate-x-1 group-hover:shadow-lg group-hover:shadow-sky-500/40">
          db
        </div>
        <div className="absolute w-35 h-6 rounded-xl flex items-center justify-center text-xs font-semibold text-white border-2 border-white/20 transition-all duration-300 ease-in-out animate-bounce bg-gradient-to-br from-cyan-500 to-cyan-700 top-14 z-10 delay-1000 group-hover:border-white/40 group-hover:from-cyan-400 group-hover:to-cyan-600 group-hover:translate-x-1 group-hover:shadow-lg group-hover:shadow-cyan-500/40">
          api
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;