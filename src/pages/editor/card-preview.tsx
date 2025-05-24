import React from 'react';
import { Icon } from '@iconify/react';

interface BorderRadiusSettings {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  unit: string;
}

interface ShadowSettings {
  inset: boolean;
  x: string;
  y: string;
  blur: string;
  spread: string;
  color?: string;
  opacity?: string;
}

interface CardPreviewProps {
  type: 'obsidian' | 'figma' | 'redis' | 'terminal' | 'docker';
  title: string;
  description: string;
  delay: string;
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
  
  // Additional props for enhanced customization
  cardWidth: string;
  cardWidthUnit: string;
  cardHeight: string;
  cardHeightUnit: string;
  cardPadding: string;
  cardPaddingUnit: string;
  cardBorderWidth: string;
  cardBorderStyle: string;
  cardBorderColor: string;
  cardBorderOpacity: string;
  cardBorderRadius: BorderRadiusSettings;
  iconBorderWidth: string;
  iconBorderStyle: string;
  iconBorderColor: string;
  iconBorderOpacity: string;
  iconSize: string;
  iconBorderRadius: string;
  iconBorderRadiusUnit: string;
  cardOpacity: number;
  zIndex: string;
  positionType: string;
  shadowSettings: ShadowSettings;
  shadow2Settings?: ShadowSettings;
  
  // Add new props for custom images
  iconImage: string | null;
  contentImage: string | null;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  type,
  title,
  description,
  delay,
  bgGradientFrom,
  bgGradientTo,
  bgOpacityFrom,
  bgOpacityTo,
  iconGradientFrom,
  iconGradientTo,
  cardImageGradientFrom,
  cardImageGradientVia,
  cardImageGradientTo,
  shadowColor,
  shadowOpacity,
  enableHoverEffects,
  enableAnimations,
  
  // Additional destructured props
  cardWidth,
  cardWidthUnit,
  cardHeight,
  cardHeightUnit,
  cardPadding,
  cardPaddingUnit,
  cardBorderWidth,
  cardBorderStyle,
  cardBorderColor,
  cardBorderOpacity,
  cardBorderRadius,
  iconBorderWidth,
  iconBorderStyle,
  iconBorderColor,
  iconBorderOpacity,
  iconSize,
  iconBorderRadius,
  iconBorderRadiusUnit,
  cardOpacity,
  zIndex,
  positionType,
  shadowSettings,
  shadow2Settings,
  
  // Destructure new props
  iconImage,
  contentImage
}) => {
  // Add state for actual image data
  const [actualIconImage, setActualIconImage] = React.useState<string | null>(iconImage);
  const [actualContentImage, setActualContentImage] = React.useState<string | null>(contentImage);

  // Handle placeholder images
  React.useEffect(() => {
    // For icon image
    if (iconImage === 'IMAGE_DATA_EXISTS') {
      // Try to load from session storage first (temporary storage)
      const sessionIcon = sessionStorage.getItem(`icon_${type}`);
      if (sessionIcon) {
        setActualIconImage(sessionIcon);
      } else {
        // Use a placeholder image
        setActualIconImage(`https://img.heroui.chat/image/avatar?w=200&h=200&u=${type}_icon`);
      }
    } else {
      setActualIconImage(iconImage);
    }

    // For content image
    if (contentImage === 'IMAGE_DATA_EXISTS') {
      // Try to load from session storage first
      const sessionContent = sessionStorage.getItem(`content_${type}`);
      if (sessionContent) {
        setActualContentImage(sessionContent);
      } else {
        // Use a placeholder image
        setActualContentImage(`https://img.heroui.chat/image/ai?w=800&h=600&u=${type}_content`);
      }
    } else {
      setActualContentImage(contentImage);
    }
  }, [iconImage, contentImage, type]);

  // Calculate border radius values
  const borderRadiusValue = `${cardBorderRadius.topLeft}${cardBorderRadius.unit} ${cardBorderRadius.topRight}${cardBorderRadius.unit} ${cardBorderRadius.bottomRight}${cardBorderRadius.unit} ${cardBorderRadius.bottomLeft}${cardBorderRadius.unit}`;
  
  // Calculate shadow values
  const mainShadow = `${shadowSettings.inset ? 'inset ' : ''}${shadowSettings.x}px ${shadowSettings.y}px ${shadowSettings.blur}px ${shadowSettings.spread}px rgba(${hexToRgb(shadowColor)}, ${shadowOpacity})`;
  const secondShadow = shadow2Settings 
    ? `, ${shadow2Settings.inset ? 'inset ' : ''}${shadow2Settings.x}px ${shadow2Settings.y}px ${shadow2Settings.blur}px ${shadow2Settings.spread}px rgba(${hexToRgb(shadow2Settings.color || "#ffffff")}, ${shadow2Settings.opacity || "0.1"})`
    : '';
  
  // Generate dynamic styles with enhanced properties
  const cardStyle = {
    width: `${cardWidth}${cardWidthUnit}`,
    height: cardHeight === "auto" ? "auto" : `${cardHeight}${cardHeightUnit}`,
    padding: `${cardPadding}${cardPaddingUnit}`,
    position: positionType as any,
    zIndex: zIndex,
    opacity: cardOpacity / 100,
    borderRadius: borderRadiusValue,
    border: cardBorderWidth !== "0" 
      ? `${cardBorderWidth}px ${cardBorderStyle} rgba(${hexToRgb(cardBorderColor)}, ${cardBorderOpacity})`
      : 'none',
    background: `radial-gradient(86.88% 75.47% at 50.00% 24.53%, rgba(${hexToRgb(bgGradientFrom)}, ${bgOpacityFrom}), rgba(${hexToRgb(bgGradientTo)}, ${bgOpacityTo}))`,
    boxShadow: `${mainShadow}${secondShadow}`,
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  // Enhanced hover styles
  const cardHoverStyle = enableHoverEffects ? {
    background: `radial-gradient(86.88% 75.47% at 50.00% 24.53%, rgba(${hexToRgb(bgGradientFrom)}, ${parseFloat(bgOpacityFrom) + 0.15}), rgba(${hexToRgb(bgGradientTo)}, ${parseFloat(bgOpacityTo) + 0.1}))`,
    boxShadow: `${shadowSettings.inset ? 'inset ' : ''}${shadowSettings.x}px ${parseInt(shadowSettings.y) + 20}px ${parseInt(shadowSettings.blur) + 30}px ${shadowSettings.spread}px rgba(${hexToRgb(shadowColor)}, ${parseFloat(shadowOpacity) + 0.2})${secondShadow}`,
    transform: 'translateY(-8px) scale(1.02)'
  } : {};

  // Enhanced icon styles
  const iconStyle = {
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    borderRadius: `${iconBorderRadius}${iconBorderRadiusUnit}`,
    border: iconBorderWidth !== "0"
      ? `${iconBorderWidth}px ${iconBorderStyle} rgba(${hexToRgb(iconBorderColor)}, ${iconBorderOpacity})`
      : 'none',
    background: `linear-gradient(to bottom right, ${iconGradientFrom}, ${iconGradientTo})`,
    boxShadow: `0 4px 12px rgba(${hexToRgb(iconGradientFrom)}, 0.3)`,
    transition: 'all 0.3s ease-in-out'
  };

  // Enhanced icon hover styles
  const iconHoverStyle = enableHoverEffects ? {
    background: `linear-gradient(to bottom right, ${lightenColor(iconGradientFrom, 10)}, ${lightenColor(iconGradientTo, 10)})`,
    boxShadow: `0 8px 24px rgba(${hexToRgb(iconGradientFrom)}, 0.5)`,
    transform: 'scale(1.05)'
  } : {};

  // Enhanced card image styles
  const cardImageStyle = {
    background: `linear-gradient(to bottom right, ${cardImageGradientFrom}, ${cardImageGradientVia}, ${cardImageGradientTo})`,
    transition: 'all 0.3s ease-in-out'
  };

  // Enhanced card image hover styles
  const cardImageHoverStyle = enableHoverEffects ? {
    background: `linear-gradient(to bottom right, ${lightenColor(cardImageGradientFrom, 10)}, ${lightenColor(cardImageGradientVia, 10)}, ${lightenColor(cardImageGradientTo, 10)})`,
  } : {};

  // Helper function to convert hex to rgb
  function hexToRgb(hex: string) {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }

  // Helper function to lighten a color
  function lightenColor(color: string, percent: number) {
    // Remove the # if present
    color = color.replace('#', '');
    
    // Parse the hex values
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);
    
    // Lighten each component
    r = Math.min(255, Math.floor(r * (1 + percent / 100)));
    g = Math.min(255, Math.floor(g * (1 + percent / 100)));
    b = Math.min(255, Math.floor(b * (1 + percent / 100)));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  // Get icon based on type
  const getIcon = () => {
    if (actualIconImage) {
      return (
        <div className="w-full h-full rounded-full overflow-hidden">
          <img 
            src={actualIconImage} 
            alt={`${type} icon`}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    
    // Otherwise use default icons
    switch (type) {
      case 'obsidian':
        return <span className="text-2xl font-bold">O</span>;
      case 'figma':
        return (
          <div className="w-[28px] h-[28px] relative">
            <div className="absolute w-[12px] h-[12px] bg-[#ff5757] top-0 left-[8px] rounded-[6px_6px_0_0]"></div>
            <div className="absolute w-[12px] h-[12px] bg-[#ff8c42] top-0 right-0 rounded-[6px_6px_6px_0]"></div>
            <div className="absolute w-[12px] h-[12px] bg-[#a259ff] top-[8px] left-0 rounded-[6px_0_6px_6px]"></div>
            <div className="absolute w-[12px] h-[12px] bg-[#1abcfe] top-[8px] right-[8px] rounded-full"></div>
            <div className="absolute w-[12px] h-[12px] bg-[#0acf83] bottom-0 left-[8px] rounded-[0_0_6px_6px]"></div>
          </div>
        );
      case 'redis':
        return <span className="text-2xl font-bold">R</span>;
      case 'terminal':
        return <span className="text-xl font-bold">$</span>;
      case 'docker':
        return <span className="text-2xl">🐳</span>;
    }
  };

  // Get card content based on type
  const getCardContent = () => {
    if (actualContentImage) {
      return (
        <div className="w-full h-full">
          <img 
            src={actualContentImage} 
            alt={`${type} content`}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    
    // Otherwise use default content
    switch (type) {
      case 'obsidian':
        return (
          <div className="relative">
            <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(124,58,237,0.3)_0%,transparent_70%)] ${enableAnimations ? 'animate-pulse' : ''}`}></div>
            <div className="w-[120px] h-[120px] relative">
              <div className={`w-full h-full ${enableAnimations ? 'animate-float' : ''} relative`} style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to bottom right, ${cardImageGradientFrom}, ${cardImageGradientVia}, ${cardImageGradientTo})`,
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%]">
                  <div className="absolute w-[30px] h-[2px] top-[30%] left-[25%] bg-white/10 rounded-[20px] rotate-45"></div>
                  <div className="absolute w-[25px] h-[2px] top-[45%] right-[20%] bg-white/10 rounded-[20px] -rotate-30"></div>
                  <div className="absolute w-[35px] h-[2px] bottom-[35%] left-[30%] bg-white/10 rounded-[20px] rotate-15"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}></div>
              </div>
            </div>
          </div>
        );
      case 'figma':
        return (
          <div className="relative">
            <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(26,188,254,0.2)_0%,transparent_70%)] ${enableAnimations ? 'animate-pulse' : ''} opacity-20`}></div>
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
        );
      case 'redis':
        return (
          <div className="relative">
            <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(237,58,58,0.3)_0%,transparent_70%)] ${enableAnimations ? 'animate-pulse' : ''}`}></div>
            <div className="w-[120px] h-[120px] relative">
              <div className={`w-[80px] h-[80px] relative mx-auto my-5 ${enableAnimations ? 'animate-spin-slow' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute w-[80px] h-[80px] border-2 border-white/20 rounded-lg" style={{
                  background: `linear-gradient(to bottom right, ${cardImageGradientFrom}, ${cardImageGradientTo})`,
                  transform: 'translateZ(40px)'
                }}></div>
                <div className="absolute w-[80px] h-[80px] border-2 border-white/20 rounded-lg" style={{
                  background: `linear-gradient(to bottom right, ${lightenColor(cardImageGradientFrom, -10)}, ${lightenColor(cardImageGradientTo, -10)})`,
                  transform: 'rotateY(180deg) translateZ(40px)'
                }}></div>
              </div>
            </div>
          </div>
        );
      case 'terminal':
        return (
          <div className="w-[280px] h-[140px] bg-[rgba(31,41,59,0.9)] rounded-xl border border-white/10 overflow-hidden font-mono text-[11px]">
            <div className="h-7 bg-[rgba(15,23,42,0.8)] flex items-center px-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-3 h-3 rounded-full bg-[#28ca42]"></span>
              </div>
            </div>
            <div className="p-3 text-[#e2e8f0]">
              <div className="mb-1 flex items-center">
                <span className="text-[#10b981] mr-2">user@mac:</span>
                <span className="text-[#3b82f6]">npm start</span>
              </div>
              <div className="mb-1">
                <span className="text-[#94a3b8]">Server running on port 3000</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#10b981] mr-2">user@mac:</span>
                <span className={`text-[#f59e0b] ${enableAnimations ? 'animate-blink' : ''}`}>|</span>
              </div>
            </div>
          </div>
        );
      case 'docker':
        return (
          <div className="relative">
            <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(58,188,237,0.3)_0%,transparent_70%)] ${enableAnimations ? 'animate-pulse' : ''}`}></div>
            <div className="w-[200px] h-[120px] relative flex items-center justify-center">
              <div className="relative w-[160px] h-[100px]">
                <div className={`absolute w-[140px] h-6 rounded-xl flex items-center justify-center text-[10px] font-semibold text-white border-2 border-white/20 ${enableAnimations ? 'animate-float-slow' : ''} bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] top-0 z-[3]`}>
                  <div className="text-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">app</div>
                </div>
                <div className={`absolute w-[140px] h-6 rounded-xl flex items-center justify-center text-[10px] font-semibold text-white border-2 border-white/20 ${enableAnimations ? 'animate-float-slow' : ''} bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] top-7 z-[2]`} style={{ animationDelay: '0.5s' }}>
                  <div className="text-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">db</div>
                </div>
                <div className={`absolute w-[140px] h-6 rounded-xl flex items-center justify-center text-[10px] font-semibold text-white border-2 border-white/20 ${enableAnimations ? 'animate-float-slow' : ''} bg-gradient-to-br from-[#06b6d4] to-[#0891b2] top-14 z-[1]`} style={{ animationDelay: '1s' }}>
                  <div className="text-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">api</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="group">
      <div 
        className="rounded-2xl overflow-hidden relative cursor-pointer"
        style={cardStyle}
        onMouseOver={(e) => {
          if (enableHoverEffects) {
            Object.assign(e.currentTarget.style, {...cardStyle, ...cardHoverStyle});
          }
        }}
        onMouseOut={(e) => {
          if (enableHoverEffects) {
            Object.assign(e.currentTarget.style, cardStyle);
          }
        }}
      >
        <div className="px-5 pt-5">
          <div className="flex items-start gap-3 mb-3">
            <div 
              className="flex items-center justify-center flex-shrink-0 relative"
              style={iconStyle}
              onMouseOver={(e) => {
                if (enableHoverEffects) {
                  Object.assign(e.currentTarget.style, {...iconStyle, ...iconHoverStyle});
                }
              }}
              onMouseOut={(e) => {
                if (enableHoverEffects) {
                  Object.assign(e.currentTarget.style, iconStyle);
                }
              }}
            >
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-lg font-semibold text-white mb-1 leading-tight">
                {title}
              </div>
            </div>
            <button className="w-8 h-8 rounded-lg bg-white/8 border-none flex items-center justify-center cursor-pointer transition-all duration-300 ease-cubic-bezier-custom flex-shrink-0 relative overflow-hidden hover:bg-white/15 hover:translate-x-1 hover:scale-110 hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] active:translate-x-0.5 active:scale-95 active:bg-white/20">
              <Icon icon="lucide:arrow-right" className="w-4 h-4 text-white/80" />
            </button>
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-4">
            {description}
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>
        </div>
        <div 
          className="w-full h-[180px] relative overflow-hidden flex items-center justify-center"
          style={cardImageStyle}
          onMouseOver={(e) => {
            if (enableHoverEffects) {
              Object.assign(e.currentTarget.style, {...cardImageStyle, ...cardImageHoverStyle});
            }
          }}
          onMouseOut={(e) => {
            if (enableHoverEffects) {
              Object.assign(e.currentTarget.style, cardImageStyle);
            }
          }}
        >
          {getCardContent()}
        </div>
      </div>
    </div>
  );
};