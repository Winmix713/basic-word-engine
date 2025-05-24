import React from 'react';
import { Icon } from '@iconify/react';

// Types
export type ExtensionType = 'obsidian' | 'figma' | 'redis' | 'terminal' | 'docker';

export interface BorderRadius {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  unit: string;
}

export interface ShadowSettings {
  inset: boolean;
  x: string;
  y: string;
  blur: string;
  spread: string;
  color?: string;
  opacity?: string;
}

export interface CardStyles {
  // Background
  bgGradientFrom?: string;
  bgGradientTo?: string;
  bgOpacityFrom?: string;
  bgOpacityTo?: string;
  
  // Icon
  iconGradientFrom?: string;
  iconGradientTo?: string;
  iconSize?: string;
  iconBorderWidth?: string;
  iconBorderStyle?: string;
  iconBorderColor?: string;
  iconBorderOpacity?: string;
  iconBorderRadius?: string;
  iconBorderRadiusUnit?: string;
  
  // Card Image
  cardImageGradientFrom?: string;
  cardImageGradientVia?: string;
  cardImageGradientTo?: string;
  
  // Card Properties
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
  cardBorderRadius?: BorderRadius;
  cardOpacity?: number;
  
  // Shadow
  shadowColor?: string;
  shadowOpacity?: string;
  shadowSettings?: ShadowSettings;
  shadow2Settings?: ShadowSettings;
  
  // Layout
  zIndex?: string;
  positionType?: string;
  
  // Features
  enableHoverEffects?: boolean;
  enableAnimations?: boolean;
}

export interface ExtensionCardProps {
  type: ExtensionType;
  title: string;
  description: string;
  delay: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  customContent?: string;
  cardStyles?: CardStyles;
  onCardClick?: () => void;
}

// Constants
const EXTENSION_THEMES = {
  obsidian: {
    bg: 'bg-[radial-gradient(86.88%_75.47%_at_50.00%_24.53%,rgba(82,48,145,0.70),rgba(26,11,51,0.14))]',
    bgHover: 'group-hover:bg-[radial-gradient(86.88%_75.47%_at_50.00%_24.53%,rgba(92,58,165,0.85),rgba(36,21,61,0.24))]',
    shadow: 'shadow-[0px_1px_0px_0px_rgba(255,255,255,0.10)_inset,0px_30px_50px_0px_rgba(0,0,0,0.40),0px_4px_24px_0px_rgba(51,3,129,0.09),0_0_0_1px_rgba(255,255,255,0.06)_inset]',
    shadowHover: 'group-hover:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.15)_inset,0px_50px_80px_0px_rgba(0,0,0,0.60),0px_12px_48px_0px_rgba(124,58,237,0.25),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_0_40px_rgba(124,58,237,0.3)]',
    iconBg: 'bg-gradient-to-br from-[#7c3aed] to-[#a855f7]',
    iconBgHover: 'group-hover:from-[#8b5cf6] group-hover:to-[#c084fc]',
    iconShadow: 'shadow-[0_4px_12px_rgba(124,58,237,0.3)] group-hover:shadow-[0_8px_24px_rgba(124,58,237,0.5)]',
    cardImage: 'bg-gradient-to-br from-[#4C1D95] via-[#7C3AED] to-[#A855F7]',
    cardImageHover: 'group-hover:from-[#5B21B6] group-hover:via-[#8B5CF6] group-hover:to-[#C084FC]'
  },
  figma: {
    bg: 'bg-[radial-gradient(92.33%_55.94%_at_50%_44.06%,rgba(25,41,53,0.7),rgba(18,25,34,0.07))]',
    bgHover: 'group-hover:bg-[radial-gradient(92.33%_55.94%_at_50%_44.06%,rgba(35,51,73,0.85),rgba(28,35,44,0.17))]',
    shadow: 'shadow-[0px_1px_0px_0px_rgba(255,255,255,0.10)_inset,0px_30px_50px_0px_rgba(0,0,0,0.40),0px_4px_24px_0px_rgba(3,123,129,0.09),0_0_0_1px_rgba(255,255,255,0.06)_inset]',
    shadowHover: 'group-hover:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.15)_inset,0px_50px_80px_0px_rgba(0,0,0,0.60),0px_12px_48px_0px_rgba(26,188,254,0.25),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_0_40px_rgba(26,188,254,0.2)]',
    iconBg: 'bg-gradient-to-br from-[#1e293b] to-[#334155]',
    iconBgHover: 'group-hover:from-[#334155] group-hover:to-[#475569]',
    iconShadow: 'shadow-[0_4px_12px_rgba(30,41,59,0.3)] group-hover:shadow-[0_8px_24px_rgba(30,41,59,0.5)]',
    cardImage: 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]',
    cardImageHover: 'group-hover:from-[#1e293b] group-hover:via-[#334155] group-hover:to-[#475569]'
  },
  redis: {
    bg: 'bg-[radial-gradient(86.88%_75.47%_at_50.00%_24.53%,rgba(145,48,48,0.70),rgba(51,11,11,0.14))]',
    bgHover: 'group-hover:bg-[radial-gradient(86.88%_75.47%_at_50.00%_24.53%,rgba(165,58,58,0.85),rgba(61,21,21,0.24))]',
    shadow: 'shadow-[0px_1px_0px_0px_rgba(255,255,255,0.10)_inset,0px_30px_50px_0px_rgba(0,0,0,0.40),0px_4px_24px_0px_rgba(129,3,3,0.09),0_0_0_1px_rgba(255,255,255,0.06)_inset]',
    shadowHover: 'group-hover:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.15)_inset,0px_50px_80px_0px_rgba(0,0,0,0.60),0px_12px_48px_0px_rgba(237,58,58,0.25),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_0_40px_rgba(237,58,58,0.3)]',
    iconBg: 'bg-gradient-to-br from-[#dc2626] to-[#ef4444]',
    iconBgHover: 'group-hover:from-[#ef4444] group-hover:to-[#f87171]',
    iconShadow: 'shadow-[0_4px_12px_rgba(220,38,38,0.3)] group-hover:shadow-[0_8px_24px_rgba(220,38,38,0.5)]',
    cardImage: 'bg-gradient-to-br from-[#7f1d1d] via-[#dc2626] to-[#ef4444]',
    cardImageHover: 'group-hover:from-[#991b1b] group-hover:via-[#ef4444] group-hover:to-[#f87171]'
  },
  terminal: {
    bg: 'bg-[radial-gradient(92.33%_55.94%_at_50%_44.06%,rgba(64,64,64,0.7),rgba(24,24,24,0.07))]',
    bgHover: 'group-hover:bg-[radial-gradient(92.33%_55.94%_at_50%_44.06%,rgba(84,84,84,0.85),rgba(44,44,44,0.17))]',
    shadow: 'shadow-[0px_1px_0px_0px_rgba(255,255,255,0.10)_inset,0px_30px_50px_0px_rgba(0,0,0,0.40),0px_4px_24px_0px_rgba(128,128,128,0.09),0_0_0_1px_rgba(255,255,255,0.06)_inset]',
    shadowHover: 'group-hover:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.15)_inset,0px_50px_80px_0px_rgba(0,0,0,0.60),0px_12px_48px_0px_rgba(160,160,160,0.25),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_0_40px_rgba(160,160,160,0.2)]',
    iconBg: 'bg-gradient-to-br from-[#374151] to-[#6b7280]',
    iconBgHover: 'group-hover:from-[#6b7280] group-hover:to-[#9ca3af]',
    iconShadow: 'shadow-[0_4px_12px_rgba(55,65,81,0.3)] group-hover:shadow-[0_8px_24px_rgba(55,65,81,0.5)]',
    cardImage: 'bg-gradient-to-br from-[#1f2937] via-[#374151] to-[#6b7280]',
    cardImageHover: 'group-hover:from-[#374151] group-hover:via-[#6b7280] group-hover:to-[#9ca3af]'
  },
  docker: {
    bg: 'bg-[radial-gradient(86.88%_75.47%_at_50.00%_24.53%,rgba(48,120,145,0.70),rgba(11,30,51,0.14))]',
    bgHover: 'group-hover:bg-[radial-gradient(86.88%_75.47%_at_50.00%_24.53%,rgba(58,140,165,0.85),rgba(21,40,61,0.24))]',
    shadow: 'shadow-[0px_1px_0px_0px_rgba(255,255,255,0.10)_inset,0px_30px_50px_0px_rgba(0,0,0,0.40),0px_4px_24px_0px_rgba(3,102,129,0.09),0_0_0_1px_rgba(255,255,255,0.06)_inset]',
    shadowHover: 'group-hover:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.15)_inset,0px_50px_80px_0px_rgba(0,0,0,0.60),0px_12px_48px_0px_rgba(58,188,237,0.25),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_0_40px_rgba(58,188,237,0.3)]',
    iconBg: 'bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6]',
    iconBgHover: 'group-hover:from-[#3b82f6] group-hover:to-[#60a5fa]',
    iconShadow: 'shadow-[0_4px_12px_rgba(14,165,233,0.3)] group-hover:shadow-[0_8px_24px_rgba(14,165,233,0.5)]',
    cardImage: 'bg-gradient-to-br from-[#0c4a6e] via-[#0ea5e9] to-[#3b82f6]',
    cardImageHover: 'group-hover:from-[#0369a1] group-hover:via-[#3b82f6] group-hover:to-[#60a5fa]'
  }
} as const;

// Utility functions
const hexToRgb = (hex: string): string => {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

const buildBorderRadius = (radius: BorderRadius): string => {
  const { topLeft, topRight, bottomLeft, bottomRight, unit } = radius;
  return `${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit}`;
};

const buildShadow = (shadow: ShadowSettings, color: string, opacity: string): string => {
  const { inset, x, y, blur, spread } = shadow;
  const insetPrefix = inset ? 'inset ' : '';
  return `${insetPrefix}${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity})`;
};

const buildBorder = (width: string, style: string, color: string, opacity: string): string => {
  return `${width}px ${style} rgba(${hexToRgb(color)}, ${opacity})`;
};

// Custom hooks
const useCustomStyles = (cardStyles: CardStyles) => {
  const cardCustomStyles = React.useMemo(() => {
    if (!cardStyles || Object.keys(cardStyles).length === 0) return {};

    const styles: React.CSSProperties = {};

    // Dimensions
    if (cardStyles.cardWidth) {
      styles.width = `${cardStyles.cardWidth}${cardStyles.cardWidthUnit || 'px'}`;
    }
    if (cardStyles.cardHeight && cardStyles.cardHeight !== 'auto') {
      styles.height = `${cardStyles.cardHeight}${cardStyles.cardHeightUnit || 'px'}`;
    }
    if (cardStyles.cardPadding) {
      styles.padding = `${cardStyles.cardPadding}${cardStyles.cardPaddingUnit || 'px'}`;
    }

    // Position
    if (cardStyles.positionType) {
      styles.position = cardStyles.positionType as any;
    }
    if (cardStyles.zIndex) {
      styles.zIndex = cardStyles.zIndex;
    }

    // Opacity
    if (cardStyles.cardOpacity) {
      styles.opacity = cardStyles.cardOpacity / 100;
    }

    // Border radius
    if (cardStyles.cardBorderRadius) {
      styles.borderRadius = buildBorderRadius(cardStyles.cardBorderRadius);
    }

    // Border
    if (cardStyles.cardBorderWidth && cardStyles.cardBorderWidth !== '0') {
      styles.border = buildBorder(
        cardStyles.cardBorderWidth,
        cardStyles.cardBorderStyle || 'solid',
        cardStyles.cardBorderColor || '#ffffff',
        cardStyles.cardBorderOpacity || '0.1'
      );
    }

    // Background
    if (cardStyles.bgGradientFrom && cardStyles.bgGradientTo) {
      styles.background = `radial-gradient(86.88% 75.47% at 50.00% 24.53%, rgba(${hexToRgb(cardStyles.bgGradientFrom)}, ${cardStyles.bgOpacityFrom || '0.7'}), rgba(${hexToRgb(cardStyles.bgGradientTo)}, ${cardStyles.bgOpacityTo || '0.14'}))`;
    }

    // Shadow
    if (cardStyles.shadowSettings) {
      const shadows = [];
      shadows.push(buildShadow(
        cardStyles.shadowSettings,
        cardStyles.shadowColor || '#000000',
        cardStyles.shadowOpacity || '0.3'
      ));
      
      if (cardStyles.shadow2Settings) {
        shadows.push(buildShadow(
          cardStyles.shadow2Settings,
          cardStyles.shadow2Settings.color || '#ffffff',
          cardStyles.shadow2Settings.opacity || '0.1'
        ));
      }
      
      styles.boxShadow = shadows.join(', ');
    }

    styles.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    
    return styles;
  }, [cardStyles]);

  const iconCustomStyles = React.useMemo(() => {
    if (!cardStyles || Object.keys(cardStyles).length === 0) return {};

    const styles: React.CSSProperties = {};

    // Size
    if (cardStyles.iconSize) {
      styles.width = `${cardStyles.iconSize}px`;
      styles.height = `${cardStyles.iconSize}px`;
    }

    // Border radius
    if (cardStyles.iconBorderRadius) {
      styles.borderRadius = `${cardStyles.iconBorderRadius}${cardStyles.iconBorderRadiusUnit || 'px'}`;
    }

    // Border
    if (cardStyles.iconBorderWidth && cardStyles.iconBorderWidth !== '0') {
      styles.border = buildBorder(
        cardStyles.iconBorderWidth,
        cardStyles.iconBorderStyle || 'solid',
        cardStyles.iconBorderColor || '#ffffff',
        cardStyles.iconBorderOpacity || '0.2'
      );
    }

    // Background
    if (cardStyles.iconGradientFrom && cardStyles.iconGradientTo) {
      styles.background = `linear-gradient(to bottom right, ${cardStyles.iconGradientFrom}, ${cardStyles.iconGradientTo})`;
      styles.boxShadow = `0 4px 12px rgba(${hexToRgb(cardStyles.iconGradientFrom)}, 0.3)`;
    }

    styles.transition = 'all 0.3s ease-in-out';
    
    return styles;
  }, [cardStyles]);

  const cardImageCustomStyles = React.useMemo(() => {
    if (!cardStyles?.cardImageGradientFrom || !cardStyles?.cardImageGradientTo) return {};

    return {
      background: `linear-gradient(to bottom right, ${cardStyles.cardImageGradientFrom}, ${cardStyles.cardImageGradientVia || cardStyles.cardImageGradientFrom}, ${cardStyles.cardImageGradientTo})`,
      transition: 'all 0.3s ease-in-out'
    };
  }, [cardStyles]);

  return {
    cardCustomStyles,
    iconCustomStyles,
    cardImageCustomStyles
  };
};

// Main component
export const ExtensionCard: React.FC<ExtensionCardProps> = ({
  type,
  title,
  description,
  delay,
  icon,
  children,
  customContent,
  cardStyles = {},
  onCardClick
}) => {
  const theme = EXTENSION_THEMES[type];
  const hasCustomStyles = cardStyles && Object.keys(cardStyles).length > 0;
  const { cardCustomStyles, iconCustomStyles, cardImageCustomStyles } = useCustomStyles(cardStyles);

  const handleCardClick = React.useCallback(() => {
    onCardClick?.();
  }, [onCardClick]);

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  }, [handleCardClick]);

  return (
    <div 
      className="opacity-0 transform-origin-top-right animate-slide-in"
      style={{ animationDelay: delay }}
    >
      <div
        className={`
          w-80 rounded-2xl overflow-hidden relative cursor-pointer
          transition-all duration-300 ease-cubic-bezier-custom group
          hover:translate-y-[-8px] hover:scale-102
          active:translate-y-[-4px] active:scale-98 active:transition-all active:duration-100 active:ease-in-out
          focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent
          ${!hasCustomStyles ? `${theme.bg} ${theme.bgHover} ${theme.shadow} ${theme.shadowHover}` : ''}
        `}
        style={cardCustomStyles}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`${title} extension card`}
      >
        {/* Content Section */}
        <div className="px-5 pt-5">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            {/* Icon */}
            <div
              className={`
                flex items-center justify-center flex-shrink-0 relative
                transition-all duration-300 ease-in-out
                group-hover:scale-105 group-active:scale-95
                ${!hasCustomStyles ? `w-14 h-14 rounded-xl ${theme.iconBg} ${theme.iconBgHover} ${theme.iconShadow}` : ''}
              `}
              style={iconCustomStyles}
              aria-hidden="true"
            >
              {icon}
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white mb-1 leading-tight transition-all duration-300 ease-in-out">
                {title}
              </h3>
            </div>

            {/* Action Button */}
            <button
              className="
                w-8 h-8 rounded-lg bg-white/8 border-none flex items-center justify-center
                cursor-pointer transition-all duration-300 ease-cubic-bezier-custom flex-shrink-0
                relative overflow-hidden
                hover:bg-white/15 hover:translate-x-1 hover:scale-110 hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)]
                active:translate-x-0.5 active:scale-95 active:bg-white/20
                focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent
              "
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              aria-label={`Open ${title}`}
            >
              <Icon 
                icon="lucide:arrow-right" 
                className="w-4 h-4 text-white/80 transition-all duration-300 ease-in-out group-hover:text-white group-hover:translate-x-0.5" 
              />
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-white/70 leading-relaxed mb-4 transition-color duration-300 ease-in-out group-hover:text-white/85">
            {description}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4 transition-all duration-300 ease-in-out group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-white/20 group-hover:to-transparent group-hover:shadow-[0_0_8px_rgba(255,255,255,0.1)]" />
        </div>

        {/* Image/Content Section */}
        <div
          className={`
            w-full h-[180px] relative overflow-hidden flex items-center justify-center
            transition-all duration-300 ease-in-out
            ${!hasCustomStyles ? theme.cardImage + ' ' + theme.cardImageHover : ''}
          `}
          style={cardImageCustomStyles}
        >
          {customContent ? (
            <img
              src={customContent}
              alt={`${title} preview`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};