import React from 'react';
import { Icon } from '@iconify/react';
import { 
  Card, CardBody, Input, Tabs, Tab, Button, Checkbox, 
  Select, SelectItem, Slider, Popover, PopoverTrigger, 
  PopoverContent, Tooltip, Divider, Switch, Badge, 
  Modal, ModalContent, ModalHeader, ModalBody, 
  ModalFooter, useDisclosure, Image
} from "@heroui/react";
import { CardPreview } from './card-preview';
import { ColorPicker } from './color-picker';
import { useUndoRedo } from './undo-redo-context'; // Fixed import path
import { useCardManager } from './card-manager-context'; // Fixed import path from '../context/card-manager-context' to './card-manager-context'
import { EditorSidebar } from './editor-sidebar';
import { CssCodePanel } from './css-code-panel';
import { PresetSelector } from './preset-selector';

const cardTypes = [
  { key: "obsidian", label: "Obsidian" },
  { key: "figma", label: "Figma" },
  { key: "redis", label: "Redis" },
  { key: "terminal", label: "Terminal" },
  { key: "docker", label: "Docker" }
];

export function EditorPage() {
  // Get undo/redo functionality
  const { addToHistory, undo, redo, canUndo, canRedo } = useUndoRedo();
  
  // Get card management functionality
  const { 
    cards, 
    activeCardId, 
    setActiveCardId, 
    updateCard, 
    resetCardToDefault, 
    createNewCard,
    deleteCard,
    toggleCardActive
  } = useCardManager();
  
  // Modal for save confirmation
  const { isOpen: isSaveModalOpen, onOpen: onOpenSaveModal, onClose: onCloseSaveModal } = useDisclosure();
  
  // Modal for reset confirmation
  const { isOpen: isResetModalOpen, onOpen: onOpenResetModal, onClose: onCloseResetModal } = useDisclosure();
  
  // Modal for create new card
  const { isOpen: isNewCardModalOpen, onOpen: onOpenNewCardModal, onClose: onCloseNewCardModal } = useDisclosure();
  
  // New card form state
  const [newCardType, setNewCardType] = React.useState<string>("obsidian");
  const [newCardTitle, setNewCardTitle] = React.useState<string>("");
  const [newCardDescription, setNewCardDescription] = React.useState<string>("");
  
  // Image upload states
  const [iconImage, setIconImage] = React.useState<string | null>(null);
  const [contentImage, setContentImage] = React.useState<string | null>(null);
  const [useCustomIcon, setUseCustomIcon] = React.useState<boolean>(false);
  const [useCustomContent, setUseCustomContent] = React.useState<boolean>(false);

  // State variables
  const [selectedType, setSelectedType] = React.useState<string>("obsidian");
  const [title, setTitle] = React.useState<string>("Obsidian");
  const [description, setDescription] = React.useState<string>("Capture information, manage tasks and pin notes to your menu bar.");
  const [delay, setDelay] = React.useState<string>("500ms");
  
  // Background gradient settings
  const [bgGradientFrom, setBgGradientFrom] = React.useState<string>("#523091");
  const [bgGradientTo, setBgGradientTo] = React.useState<string>("#1a0b33");
  const [bgOpacityFrom, setBgOpacityFrom] = React.useState<string>("0.70");
  const [bgOpacityTo, setBgOpacityTo] = React.useState<string>("0.14");
  
  // Icon gradient settings
  const [iconGradientFrom, setIconGradientFrom] = React.useState<string>("#7c3aed");
  const [iconGradientTo, setIconGradientTo] = React.useState<string>("#a855f7");
  
  // Card image gradient settings
  const [cardImageGradientFrom, setCardImageGradientFrom] = React.useState<string>("#4C1D95");
  const [cardImageGradientVia, setCardImageGradientVia] = React.useState<string>("#7C3AED");
  const [cardImageGradientTo, setCardImageGradientTo] = React.useState<string>("#A855F7");
  
  // Shadow settings
  const [shadowColor, setShadowColor] = React.useState<string>("#7c3aed");
  const [shadowOpacity, setShadowOpacity] = React.useState<string>("0.3");
  
  // Animation settings
  const [enableHoverEffects, setEnableHoverEffects] = React.useState<boolean>(true);
  const [enableAnimations, setEnableAnimations] = React.useState<boolean>(true);

  // Card dimensions
  const [cardWidth, setCardWidth] = React.useState<string>("320");
  const [cardWidthUnit, setCardWidthUnit] = React.useState<string>("px");
  const [cardHeight, setCardHeight] = React.useState<string>("auto");
  const [cardHeightUnit, setCardHeightUnit] = React.useState<string>("px");
  
  // Card padding
  const [cardPadding, setCardPadding] = React.useState<string>("20");
  const [cardPaddingUnit, setCardPaddingUnit] = React.useState<string>("px");
  
  // Card border
  const [cardBorderWidth, setCardBorderWidth] = React.useState<string>("0");
  const [cardBorderStyle, setCardBorderStyle] = React.useState<string>("solid");
  const [cardBorderColor, setCardBorderColor] = React.useState<string>("#ffffff");
  const [cardBorderOpacity, setCardBorderOpacity] = React.useState<string>("0.1");
  
  // Card border radius
  const [cardBorderRadiusTopLeft, setCardBorderRadiusTopLeft] = React.useState<string>("16");
  const [cardBorderRadiusTopRight, setCardBorderRadiusTopRight] = React.useState<string>("16");
  const [cardBorderRadiusBottomLeft, setCardBorderRadiusBottomLeft] = React.useState<string>("16");
  const [cardBorderRadiusBottomRight, setCardBorderRadiusBottomRight] = React.useState<string>("16");
  const [cardBorderRadiusUnit, setCardBorderRadiusUnit] = React.useState<string>("px");
  const [linkBorderRadius, setLinkBorderRadius] = React.useState<boolean>(true);
  
  // Icon border
  const [iconBorderWidth, setIconBorderWidth] = React.useState<string>("0");
  const [iconBorderStyle, setIconBorderStyle] = React.useState<string>("solid");
  const [iconBorderColor, setIconBorderColor] = React.useState<string>("#ffffff");
  const [iconBorderOpacity, setIconBorderOpacity] = React.useState<string>("0.2");
  
  // Icon dimensions
  const [iconSize, setIconSize] = React.useState<string>("56");
  const [iconBorderRadius, setIconBorderRadius] = React.useState<string>("12");
  const [iconBorderRadiusUnit, setIconBorderRadiusUnit] = React.useState<string>("px");
  
  // Opacity and z-index
  const [cardOpacity, setCardOpacity] = React.useState<number>(100);
  const [zIndex, setZIndex] = React.useState<string>("1");
  
  // Position
  const [positionType, setPositionType] = React.useState<string>("relative");
  
  // Advanced shadow settings
  const [shadowInset, setShadowInset] = React.useState<boolean>(false);
  const [shadowX, setShadowX] = React.useState<string>("0");
  const [shadowY, setShadowY] = React.useState<string>("30");
  const [shadowBlur, setShadowBlur] = React.useState<string>("50");
  const [shadowSpread, setShadowSpread] = React.useState<string>("0");
  
  // Additional shadow
  const [useSecondShadow, setUseSecondShadow] = React.useState<boolean>(true);
  const [shadow2Inset, setShadow2Inset] = React.useState<boolean>(true);
  const [shadow2X, setShadow2X] = React.useState<string>("0");
  const [shadow2Y, setShadow2Y] = React.useState<string>("1");
  const [shadow2Blur, setShadow2Blur] = React.useState<string>("0");
  const [shadow2Spread, setShadow2Spread] = React.useState<string>("0");
  const [shadow2Color, setShadow2Color] = React.useState<string>("#ffffff");
  const [shadow2Opacity, setShadow2Opacity] = React.useState<string>("0.1");
  
  // Preset styles
  const [presets] = React.useState([
    { name: "Default", id: "default" },
    { name: "Flat", id: "flat" },
    { name: "Glassmorphism", id: "glass" },
    { name: "Neumorphism", id: "neumorphism" },
    { name: "Material", id: "material" }
  ]);
  
  // CSS output settings
  const [minifyCss, setMinifyCss] = React.useState<boolean>(false);
  const [includePrefixes, setIncludePrefixes] = React.useState<boolean>(true);

  // Handle border radius linking
  const handleBorderRadiusChange = (value: string, corner: string) => {
    if (linkBorderRadius) {
      setCardBorderRadiusTopLeft(value);
      setCardBorderRadiusTopRight(value);
      setCardBorderRadiusBottomLeft(value);
      setCardBorderRadiusBottomRight(value);
    } else {
      switch (corner) {
        case "topLeft":
          setCardBorderRadiusTopLeft(value);
          break;
        case "topRight":
          setCardBorderRadiusTopRight(value);
          break;
        case "bottomLeft":
          setCardBorderRadiusBottomLeft(value);
          break;
        case "bottomRight":
          setCardBorderRadiusBottomRight(value);
          break;
      }
    }
  };

  // Apply preset styles
  const applyPreset = (presetId: string) => {
    // Save current state to history before applying preset
    addToHistory({
      cardBorderWidth,
      cardBorderStyle,
      cardBorderColor,
      cardBorderOpacity,
      shadowX,
      shadowY,
      shadowBlur,
      shadowSpread,
      shadowInset,
      bgGradientFrom,
      bgGradientTo,
      bgOpacityFrom,
      bgOpacityTo,
    });

    switch (presetId) {
      case "flat":
        setShadowX("0");
        setShadowY("0");
        setShadowBlur("0");
        setShadowSpread("0");
        setUseSecondShadow(false);
        setCardBorderWidth("1");
        setCardBorderColor("#000000");
        setCardBorderOpacity("0.1");
        break;
      case "glass":
        setBgOpacityFrom("0.2");
        setBgOpacityTo("0.1");
        setCardBorderWidth("1");
        setCardBorderColor("#ffffff");
        setCardBorderOpacity("0.2");
        setShadowX("0");
        setShadowY("10");
        setShadowBlur("30");
        setShadowSpread("0");
        setShadowOpacity("0.15");
        break;
      case "neumorphism":
        setBgGradientFrom("#e0e0e0");
        setBgGradientTo("#e0e0e0");
        setBgOpacityFrom("1");
        setBgOpacityTo("1");
        setShadowColor("#ffffff");
        setShadowOpacity("1");
        setShadowX("-10");
        setShadowY("-10");
        setShadowBlur("20");
        setShadowSpread("0");
        setUseSecondShadow(true);
        setShadow2Color("#000000");
        setShadow2Opacity("0.1");
        setShadow2X("10");
        setShadow2Y("10");
        setShadow2Blur("20");
        setShadow2Spread("0");
        setCardBorderWidth("0");
        break;
      case "material":
        setShadowX("0");
        setShadowY("4");
        setShadowBlur("20");
        setShadowSpread("0");
        setShadowOpacity("0.2");
        setUseSecondShadow(true);
        setShadow2X("0");
        setShadow2Y("2");
        setShadow2Blur("4");
        setShadow2Spread("0");
        setShadow2Color("#000000");
        setShadow2Opacity("0.1");
        setCardBorderWidth("0");
        break;
      default: // default preset
        // Reset to default values
        setShadowX("0");
        setShadowY("30");
        setShadowBlur("50");
        setShadowSpread("0");
        setShadowOpacity("0.4");
        setUseSecondShadow(true);
        setShadow2Inset(true);
        setShadow2X("0");
        setShadow2Y("1");
        setShadow2Blur("0");
        setShadow2Spread("0");
        setShadow2Color("#ffffff");
        setShadow2Opacity("0.1");
        setCardBorderWidth("0");
        break;
    }
  };

  // Generate CSS code
  const generateCssCode = () => {
    // Calculate border radius values
    const borderRadiusValue = linkBorderRadius 
      ? `${cardBorderRadiusTopLeft}${cardBorderRadiusUnit}`
      : `${cardBorderRadiusTopLeft}${cardBorderRadiusUnit} ${cardBorderRadiusTopRight}${cardBorderRadiusUnit} ${cardBorderRadiusBottomRight}${cardBorderRadiusUnit} ${cardBorderRadiusBottomLeft}${cardBorderRadiusUnit}`;
    
    // Calculate shadow values
    const mainShadow = `${shadowInset ? 'inset ' : ''}${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px rgba(${hexToRgb(shadowColor)}, ${shadowOpacity})`;
    const secondShadow = useSecondShadow 
      ? `, ${shadow2Inset ? 'inset ' : ''}${shadow2X}px ${shadow2Y}px ${shadow2Blur}px ${shadow2Spread}px rgba(${hexToRgb(shadow2Color)}, ${shadow2Opacity})`
      : '';
    
    // Calculate border
    const borderValue = cardBorderWidth !== "0" 
      ? `${cardBorderWidth}px ${cardBorderStyle} rgba(${hexToRgb(cardBorderColor)}, ${cardBorderOpacity})`
      : 'none';
    
    // Calculate icon border
    const iconBorderValue = iconBorderWidth !== "0"
      ? `${iconBorderWidth}px ${iconBorderStyle} rgba(${hexToRgb(iconBorderColor)}, ${iconBorderOpacity})`
      : 'none';

    // Generate the CSS
    let css = `/* ${selectedType.toUpperCase()} CARD STYLES */

/* Card Container */
.${selectedType}-card {
  width: ${cardWidth}${cardWidthUnit};
  height: ${cardHeight === "auto" ? "auto" : `${cardHeight}${cardHeightUnit}`};
  position: ${positionType};
  z-index: ${zIndex};
  opacity: ${cardOpacity / 100};
  padding: ${cardPadding}${cardPaddingUnit};
  border-radius: ${borderRadiusValue};
  border: ${borderValue};
  background: radial-gradient(86.88% 75.47% at 50.00% 24.53%, 
    rgba(${hexToRgb(bgGradientFrom)}, ${bgOpacityFrom}), 
    rgba(${hexToRgb(bgGradientTo)}, ${bgOpacityTo}));
  box-shadow: ${mainShadow}${secondShadow};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Icon Container */
.${selectedType}-icon {
  width: ${iconSize}px;
  height: ${iconSize}px;
  border-radius: ${iconBorderRadius}${iconBorderRadiusUnit};
  border: ${iconBorderValue};
  background: linear-gradient(to bottom right, ${iconGradientFrom}, ${iconGradientTo});
  box-shadow: 0 4px 12px rgba(${hexToRgb(iconGradientFrom)}, 0.3);
  transition: all 0.3s ease-in-out;
}

/* Card Image Background */
.${selectedType}-card-image {
  background: linear-gradient(to bottom right, 
    ${cardImageGradientFrom}, 
    ${cardImageGradientVia}, 
    ${cardImageGradientTo});
}

/* Hover Effects */
${enableHoverEffects ? `
.${selectedType}-card:hover {
  transform: translateY(-8px) scale(1.02);
  background: radial-gradient(86.88% 75.47% at 50.00% 24.53%, 
    rgba(${hexToRgb(bgGradientFrom)}, ${parseFloat(bgOpacityFrom) + 0.15}), 
    rgba(${hexToRgb(bgGradientTo)}, ${parseFloat(bgOpacityTo) + 0.1}));
  box-shadow: ${shadowInset ? 'inset ' : ''}${shadowX}px ${parseInt(shadowY) + 20}px ${parseInt(shadowBlur) + 30}px ${shadowSpread}px rgba(${hexToRgb(shadowColor)}, ${parseFloat(shadowOpacity) + 0.2})${secondShadow};
}

.${selectedType}-icon:hover {
  transform: scale(1.05);
  background: linear-gradient(to bottom right, 
    ${lightenColor(iconGradientFrom, 10)}, 
    ${lightenColor(iconGradientTo, 10)});
  box-shadow: 0 8px 24px rgba(${hexToRgb(iconGradientFrom)}, 0.5);
}

.${selectedType}-card-image:hover {
  background: linear-gradient(to bottom right, 
    ${lightenColor(cardImageGradientFrom, 10)}, 
    ${lightenColor(cardImageGradientVia, 10)}, 
    ${lightenColor(cardImageGradientTo, 10)});
}
` : ''}

/* Animations */
${enableAnimations ? `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.${selectedType}-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 0.8; }
  100% { opacity: 0.6; }
}

.${selectedType}-pulse {
  animation: pulse 2s ease-in-out infinite;
}
` : ''}`;

    // Add browser prefixes if needed
    if (includePrefixes) {
      css = css.replace(/border-radius: /g, "-webkit-border-radius: $&\nborder-radius: ")
        .replace(/box-shadow: /g, "-webkit-box-shadow: $&\n-moz-box-shadow: $&\nbox-shadow: ")
        .replace(/background: (linear|radial)-gradient/g, "background: -webkit-$1-gradient$&\nbackground: -moz-$1-gradient$&\nbackground: $1-gradient");
    }
    
    // Minify if requested
    if (minifyCss) {
      css = css.replace(/\s+/g, ' ')
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*:\s*/g, ':')
        .replace(/\s*;\s*/g, ';')
        .replace(/\/\*.*?\*\//g, '')
        .trim();
    }
    
    return css;
  };

  // Helper function to convert hex to rgb
  const hexToRgb = (hex: string) => {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  };

  // Helper function to lighten a color
  const lightenColor = (color: string, percent: number) => {
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
  };

  // Get the current active card
  const activeCard = React.useMemo(() => {
    // Check if cards is an array before calling find
    if (!Array.isArray(cards)) {
      return null;
    }
    return cards.find(card => card.id === activeCardId);
  }, [cards, activeCardId]);

  // Initialize editor state from active card
  React.useEffect(() => {
    if (activeCard) {
      setSelectedType(activeCard.type);
      setTitle(activeCard.title);
      setDescription(activeCard.description);
      setDelay(activeCard.delay || "500ms");
      setBgGradientFrom(activeCard.bgGradientFrom);
      setBgGradientTo(activeCard.bgGradientTo);
      setBgOpacityFrom(activeCard.bgOpacityFrom);
      setBgOpacityTo(activeCard.bgOpacityTo);
      setIconGradientFrom(activeCard.iconGradientFrom);
      setIconGradientTo(activeCard.iconGradientTo);
      setCardImageGradientFrom(activeCard.cardImageGradientFrom);
      setCardImageGradientVia(activeCard.cardImageGradientVia);
      setCardImageGradientTo(activeCard.cardImageGradientTo);
      setShadowColor(activeCard.shadowColor);
      setShadowOpacity(activeCard.shadowOpacity);
      setEnableHoverEffects(activeCard.enableHoverEffects);
      setEnableAnimations(activeCard.enableAnimations);
      
      // Additional properties
      if (activeCard.cardWidth) setCardWidth(activeCard.cardWidth);
      if (activeCard.cardWidthUnit) setCardWidthUnit(activeCard.cardWidthUnit);
      if (activeCard.cardHeight) setCardHeight(activeCard.cardHeight);
      if (activeCard.cardHeightUnit) setCardHeightUnit(activeCard.cardHeightUnit);
      if (activeCard.cardPadding) setCardPadding(activeCard.cardPadding);
      if (activeCard.cardPaddingUnit) setCardPaddingUnit(activeCard.cardPaddingUnit);
      if (activeCard.cardBorderWidth) setCardBorderWidth(activeCard.cardBorderWidth);
      if (activeCard.cardBorderStyle) setCardBorderStyle(activeCard.cardBorderStyle);
      if (activeCard.cardBorderColor) setCardBorderColor(activeCard.cardBorderColor);
      if (activeCard.cardBorderOpacity) setCardBorderOpacity(activeCard.cardBorderOpacity);
      if (activeCard.cardBorderRadius) {
        setCardBorderRadiusTopLeft(activeCard.cardBorderRadius.topLeft);
        setCardBorderRadiusTopRight(activeCard.cardBorderRadius.topRight);
        setCardBorderRadiusBottomLeft(activeCard.cardBorderRadius.bottomLeft);
        setCardBorderRadiusBottomRight(activeCard.cardBorderRadius.bottomRight);
        setCardBorderRadiusUnit(activeCard.cardBorderRadius.unit);
      }
      if (activeCard.iconBorderWidth) setIconBorderWidth(activeCard.iconBorderWidth);
      if (activeCard.iconBorderStyle) setIconBorderStyle(activeCard.iconBorderStyle);
      if (activeCard.iconBorderColor) setIconBorderColor(activeCard.iconBorderColor);
      if (activeCard.iconBorderOpacity) setIconBorderOpacity(activeCard.iconBorderOpacity);
      if (activeCard.iconSize) setIconSize(activeCard.iconSize);
      if (activeCard.iconBorderRadius) setIconBorderRadius(activeCard.iconBorderRadius);
      if (activeCard.iconBorderRadiusUnit) setIconBorderRadiusUnit(activeCard.iconBorderRadiusUnit);
      if (activeCard.cardOpacity) setCardOpacity(activeCard.cardOpacity);
      if (activeCard.zIndex) setZIndex(activeCard.zIndex);
      if (activeCard.positionType) setPositionType(activeCard.positionType);
      if (activeCard.shadowSettings) {
        setShadowInset(activeCard.shadowSettings.inset);
        setShadowX(activeCard.shadowSettings.x);
        setShadowY(activeCard.shadowSettings.y);
        setShadowBlur(activeCard.shadowSettings.blur);
        setShadowSpread(activeCard.shadowSettings.spread);
      }
      if (activeCard.shadow2Settings) {
        setUseSecondShadow(true);
        setShadow2Inset(activeCard.shadow2Settings.inset);
        setShadow2X(activeCard.shadow2Settings.x);
        setShadow2Y(activeCard.shadow2Settings.y);
        setShadow2Blur(activeCard.shadow2Settings.blur);
        setShadow2Spread(activeCard.shadow2Settings.spread);
        setShadow2Color(activeCard.shadow2Settings.color || "#ffffff");
        setShadow2Opacity(activeCard.shadow2Settings.opacity || "0.1");
      } else {
        setUseSecondShadow(false);
      }
      
      // Custom images
      if (activeCard.iconImage) {
        setIconImage(activeCard.iconImage);
        setUseCustomIcon(true);
      } else {
        setIconImage(null);
        setUseCustomIcon(false);
      }
      
      if (activeCard.contentImage) {
        setContentImage(activeCard.contentImage);
        setUseCustomContent(true);
      } else {
        setContentImage(null);
        setUseCustomContent(false);
      }
    }
  }, [activeCard]);

  // Save changes to the card
  const handleSave = () => {
    if (!activeCardId) return;
    
    const updatedCard = {
      id: activeCardId,
      type: selectedType,
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
      cardBorderRadius: {
        topLeft: cardBorderRadiusTopLeft,
        topRight: cardBorderRadiusTopRight,
        bottomLeft: cardBorderRadiusBottomLeft,
        bottomRight: cardBorderRadiusBottomRight,
        unit: cardBorderRadiusUnit
      },
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
      shadowSettings: {
        inset: shadowInset,
        x: shadowX,
        y: shadowY,
        blur: shadowBlur,
        spread: shadowSpread
      },
      shadow2Settings: useSecondShadow ? {
        inset: shadow2Inset,
        x: shadow2X,
        y: shadow2Y,
        blur: shadow2Blur,
        spread: shadow2Spread,
        color: shadow2Color,
        opacity: shadow2Opacity
      } : undefined,
      iconImage: useCustomIcon ? iconImage : null,
      contentImage: useCustomContent ? contentImage : null
    };
    
    updateCard(updatedCard);
    onCloseSaveModal();
  };

  // Reset card to default
  const handleReset = () => {
    if (!activeCardId) return;
    resetCardToDefault(activeCardId);
    onCloseResetModal();
  };

  // Create a new card
  const handleCreateNewCard = () => {
    if (!newCardTitle || !newCardType) return;
    
    createNewCard({
      type: newCardType as any,
      title: newCardTitle,
      description: newCardDescription,
      delay: "500ms"
    });
    
    // Reset form
    setNewCardTitle("");
    setNewCardDescription("");
    setNewCardType("obsidian");
    onCloseNewCardModal();
  };

  // Handle image upload for icon
  const handleIconImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setIconImage(event.target.result as string);
          setUseCustomIcon(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload for content
  const handleContentImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setContentImage(event.target.result as string);
          setUseCustomContent(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Tab state
  const [selectedTab, setSelectedTab] = React.useState("basic");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-[#1a1a2e]/80 border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-violet-500 to-purple-700 p-2 rounded-lg">
                <Icon icon="lucide:layers" className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Card Style Editor
              </h1>
            </div>
            
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Select
                aria-label="Select Card"
                placeholder="Select Card"
                selectedKeys={activeCardId ? [activeCardId] : []}
                onChange={(e) => setActiveCardId(e.target.value)}
                className="w-full sm:w-64"
                classNames={{
                  trigger: "bg-[#252538] border-white/10"
                }}
              >
                {Array.isArray(cards) && cards.map((card) => (
                  <SelectItem key={card.id} value={card.id}>
                    <div className="flex items-center gap-2">
                      <span>{card.title}</span>
                      {!card.isActive && (
                        <Badge color="warning" variant="flat" size="sm">Inactive</Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </Select>
              
              <div className="flex gap-1">
                <Tooltip content="Undo" placement="bottom">
                  <Button 
                    isIconOnly 
                    variant="flat" 
                    isDisabled={!canUndo}
                    onPress={undo}
                    className="bg-[#252538] text-white"
                  >
                    <Icon icon="lucide:undo-2" />
                  </Button>
                </Tooltip>
                
                <Tooltip content="Redo" placement="bottom">
                  <Button 
                    isIconOnly 
                    variant="flat" 
                    isDisabled={!canRedo}
                    onPress={redo}
                    className="bg-[#252538] text-white"
                  >
                    <Icon icon="lucide:redo-2" />
                  </Button>
                </Tooltip>
              </div>
              
              <Button
                variant="flat"
                color="success"
                startContent={<Icon icon="lucide:plus" />}
                onPress={onOpenNewCardModal}
                className="bg-[#252538]/80"
              >
                New
              </Button>
              
              <Button 
                variant="solid" 
                color="primary"
                startContent={<Icon icon="lucide:save" />}
                onPress={onOpenSaveModal}
                isDisabled={!activeCardId}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Card Actions */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <div>
            <PresetSelector presets={presets} onSelect={applyPreset} />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="flat"
              color="danger"
              startContent={<Icon icon="lucide:trash-2" />}
              isDisabled={!activeCardId}
              onPress={() => {
                if (activeCardId) {
                  deleteCard(activeCardId);
                }
              }}
              className="bg-[#252538]/80"
            >
              Delete
            </Button>
            
            <Button
              variant="flat"
              color="warning"
              startContent={<Icon icon={activeCard?.isActive ? "lucide:eye-off" : "lucide:eye"} />}
              isDisabled={!activeCardId}
              onPress={() => {
                if (activeCardId) {
                  toggleCardActive(activeCardId);
                }
              }}
              className="bg-[#252538]/80"
            >
              {activeCard?.isActive ? "Deactivate" : "Activate"}
            </Button>
            
            <Button 
              variant="flat" 
              color="default"
              startContent={<Icon icon="lucide:refresh-ccw" />}
              onPress={onOpenResetModal}
              isDisabled={!activeCardId}
              className="bg-[#252538]/80"
            >
              Reset
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side: Editor controls */}
          <div className="lg:col-span-2">
            <Card className="bg-[#252538]/90 backdrop-blur-md border border-white/10 shadow-xl">
              <CardBody>
                <Tabs 
                  aria-label="Card Editor Options" 
                  selectedKey={selectedTab}
                  onSelectionChange={(key) => setSelectedTab(key as string)}
                  classNames={{
                    tabList: "bg-[#1e1e30] p-1 rounded-lg",
                    cursor: "bg-[#6d28d9]",
                    tab: "text-white/70 data-[selected=true]:text-white"
                  }}
                  variant="solid"
                  color="secondary"
                >
                  <Tab 
                    key="basic" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:settings" />
                        <span>Basic Settings</span>
                      </div>
                    }
                  >
                    <div className="space-y-6 py-4">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                          <Icon icon="lucide:layout-template" />
                          Card Type
                        </h3>
                        <Select
                          label="Card Type"
                          placeholder="Select a card type"
                          selectedKeys={[selectedType]}
                          onChange={(e) => {
                            // Save current state to history before changing type
                            addToHistory({ selectedType, title, description });
                            setSelectedType(e.target.value);
                          }}
                          className="max-w-xs"
                          classNames={{
                            trigger: "bg-[#1e1e30] border-white/10",
                            listbox: "bg-[#252538] text-white"
                          }}
                        >
                          {cardTypes.map((type) => (
                            <SelectItem key={type.key} value={type.key}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                      
                      <Divider className="bg-white/10" />
                      
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                          <Icon icon="lucide:text" />
                          Content
                        </h3>
                        <Input 
                          label="Title" 
                          value={title} 
                          onValueChange={(value) => {
                            addToHistory({ title });
                            setTitle(value);
                          }}
                          className="max-w-md"
                          classNames={{
                            inputWrapper: "bg-[#1e1e30] border-white/10"
                          }}
                        />
                        <Input 
                          label="Description" 
                          value={description} 
                          onValueChange={(value) => {
                            addToHistory({ description });
                            setDescription(value);
                          }}
                          className="max-w-md"
                          classNames={{
                            inputWrapper: "bg-[#1e1e30] border-white/10"
                          }}
                        />
                        <Input 
                          label="Animation Delay" 
                          value={delay} 
                          onValueChange={(value) => {
                            addToHistory({ delay });
                            setDelay(value);
                          }}
                          className="max-w-xs"
                          description="Format: 500ms, 1s, etc."
                          classNames={{
                            inputWrapper: "bg-[#1e1e30] border-white/10"
                          }}
                        />
                      </div>
                      
                      <Divider className="bg-white/10" />
                      
                      {/* Image upload section for icon */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                          <Icon icon="lucide:image" />
                          Icon Image
                        </h3>
                        <div className="flex items-center gap-4">
                          <Checkbox 
                            isSelected={useCustomIcon}
                            onValueChange={setUseCustomIcon}
                            color="secondary"
                          >
                            Use custom icon image
                          </Checkbox>
                          
                          {useCustomIcon && (
                            <Button
                              variant="flat"
                              color="secondary"
                              size="sm"
                              onPress={() => document.getElementById('icon-image-upload')?.click()}
                              startContent={<Icon icon="lucide:upload" />}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                        
                        <input
                          id="icon-image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleIconImageUpload}
                          className="hidden"
                        />
                        
                        {useCustomIcon && iconImage && (
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/20">
                            <Image
                              src={iconImage}
                              alt="Custom icon"
                              className="w-full h-full object-cover"
                            />
                            <Button
                              isIconOnly
                              size="sm"
                              color="danger"
                              variant="solid"
                              className="absolute top-1 right-1"
                              onPress={() => {
                                setIconImage(null);
                                setUseCustomIcon(false);
                              }}
                            >
                              <Icon icon="lucide:x" size={16} />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {/* Image upload section for content */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                          <Icon icon="lucide:image" />
                          Content Image
                        </h3>
                        <div className="flex items-center gap-4">
                          <Checkbox 
                            isSelected={useCustomContent}
                            onValueChange={setUseCustomContent}
                            color="secondary"
                          >
                            Use custom content image
                          </Checkbox>
                          
                          {useCustomContent && (
                            <Button
                              variant="flat"
                              color="secondary"
                              size="sm"
                              onPress={() => document.getElementById('content-image-upload')?.click()}
                              startContent={<Icon icon="lucide:upload" />}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                        
                        <input
                          id="content-image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleContentImageUpload}
                          className="hidden"
                        />
                        
                        {useCustomContent && contentImage && (
                          <div className="relative w-full max-w-md h-40 rounded-xl overflow-hidden border border-white/20">
                            <Image
                              src={contentImage}
                              alt="Custom content"
                              className="w-full h-full object-cover"
                            />
                            <Button
                              isIconOnly
                              size="sm"
                              color="danger"
                              variant="solid"
                              className="absolute top-1 right-1"
                              onPress={() => {
                                setContentImage(null);
                                setUseCustomContent(false);
                              }}
                            >
                              <Icon icon="lucide:x" size={16} />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <Divider className="bg-white/10" />
                      
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                          <Icon icon="lucide:move-horizontal" />
                          Dimensions & Position
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex gap-2 items-end">
                            <Input 
                              type="text"
                              label="Width" 
                              value={cardWidth}
                              onValueChange={setCardWidth}
                              className="flex-1"
                              classNames={{
                                inputWrapper: "bg-[#1e1e30] border-white/10"
                              }}
                            />
                            <Select
                              selectedKeys={[cardWidthUnit]}
                              onChange={(e) => setCardWidthUnit(e.target.value)}
                              className="w-24"
                              classNames={{
                                trigger: "bg-[#1e1e30] border-white/10",
                                listbox: "bg-[#252538] text-white"
                              }}
                            >
                              <SelectItem key="px" value="px">px</SelectItem>
                              <SelectItem key="%" value="%">%</SelectItem>
                              <SelectItem key="rem" value="rem">rem</SelectItem>
                            </Select>
                          </div>
                          <div className="flex gap-2 items-end">
                            <Input 
                              type="text"
                              label="Height" 
                              value={cardHeight}
                              onValueChange={setCardHeight}
                              className="flex-1"
                              classNames={{
                                inputWrapper: "bg-[#1e1e30] border-white/10"
                              }}
                            />
                            <Select
                              selectedKeys={[cardHeightUnit]}
                              onChange={(e) => setCardHeightUnit(e.target.value)}
                              className="w-24"
                              isDisabled={cardHeight === "auto"}
                              classNames={{
                                trigger: "bg-[#1e1e30] border-white/10",
                                listbox: "bg-[#252538] text-white"
                              }}
                            >
                              <SelectItem key="px" value="px">px</SelectItem>
                              <SelectItem key="%" value="%">%</SelectItem>
                              <SelectItem key="rem" value="rem">rem</SelectItem>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex gap-2 items-end">
                            <Input 
                              type="text"
                              label="Padding" 
                              value={cardPadding}
                              onValueChange={setCardPadding}
                              className="flex-1"
                              classNames={{
                                inputWrapper: "bg-[#1e1e30] border-white/10"
                              }}
                            />
                            <Select
                              selectedKeys={[cardPaddingUnit]}
                              onChange={(e) => setCardPaddingUnit(e.target.value)}
                              className="w-24"
                              classNames={{
                                trigger: "bg-[#1e1e30] border-white/10",
                                listbox: "bg-[#252538] text-white"
                              }}
                            >
                              <SelectItem key="px" value="px">px</SelectItem>
                              <SelectItem key="%" value="%">%</SelectItem>
                              <SelectItem key="rem" value="rem">rem</SelectItem>
                            </Select>
                          </div>
                          <Select
                            label="Position"
                            selectedKeys={[positionType]}
                            onChange={(e) => setPositionType(e.target.value)}
                            className="max-w-xs"
                            classNames={{
                              trigger: "bg-[#1e1e30] border-white/10",
                              listbox: "bg-[#252538] text-white"
                            }}
                          >
                            <SelectItem key="relative" value="relative">Relative</SelectItem>
                            <SelectItem key="absolute" value="absolute">Absolute</SelectItem>
                            <SelectItem key="fixed" value="fixed">Fixed</SelectItem>
                            <SelectItem key="sticky" value="sticky">Sticky</SelectItem>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input 
                            type="text"
                            label="Z-Index" 
                            value={zIndex}
                            onValueChange={setZIndex}
                            className="max-w-xs"
                            classNames={{
                              inputWrapper: "bg-[#1e1e30] border-white/10"
                            }}
                          />
                          <div>
                            <p className="text-sm mb-1">Opacity: {cardOpacity}%</p>
                            <Slider 
                              aria-label="Opacity" 
                              value={cardOpacity} 
                              onChange={setCardOpacity}
                              step={1}
                              maxValue={100}
                              minValue={0}
                              className="max-w-md"
                              color="secondary"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Divider className="bg-white/10" />
                      
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                          <Icon icon="lucide:sparkles" />
                          Animation Settings
                        </h3>
                        <div className="flex flex-col gap-2">
                          <Checkbox 
                            isSelected={enableHoverEffects}
                            onValueChange={(value) => {
                              addToHistory({ enableHoverEffects });
                              setEnableHoverEffects(value);
                            }}
                            color="secondary"
                          >
                            Enable hover effects
                          </Checkbox>
                          <Checkbox 
                            isSelected={enableAnimations}
                            onValueChange={(value) => {
                              addToHistory({ enableAnimations });
                              setEnableAnimations(value);
                            }}
                            color="secondary"
                          >
                            Enable animations
                          </Checkbox>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  
                  <Tab 
                    key="border" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:square" />
                        <span>Border Settings</span>
                      </div>
                    }
                  >
                    <div className="space-y-6 py-4">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                          <Icon icon="lucide:box" />
                          Card Border
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input 
                            type="text"
                            label="Border Width" 
                            value={cardBorderWidth}
                            onValueChange={setCardBorderWidth}
                            endContent="px"
                            classNames={{
                              inputWrapper: "bg-[#1e1e30] border-white/10"
                            }}
                          />
                          <Select
                            label="Border Style"
                            selectedKeys={[cardBorderStyle]}
                            onChange={(e) => setCardBorderStyle(e.target.value)}
                            classNames={{
                              trigger: "bg-[#1e1e30] border-white/10",
                              listbox: "bg-[#252538] text-white"
                            }}
                          >
                            <SelectItem key="solid" value="solid">Solid</SelectItem>
                            <SelectItem key="dashed" value="dashed">Dashed</SelectItem>
                            <SelectItem key="dotted" value="dotted">Dotted</SelectItem>
                            <SelectItem key="double" value="double">Double</SelectItem>
                            <SelectItem key="groove" value="groove">Groove</SelectItem>
                            <SelectItem key="ridge" value="ridge">Ridge</SelectItem>
                            <SelectItem key="inset" value="inset">Inset</SelectItem>
                            <SelectItem key="outset" value="outset">Outset</SelectItem>
                          </Select>
                          <div className="flex gap-2 items-end">
                            <ColorPicker
                              label="Border Color"
                              value={cardBorderColor}
                              onChange={setCardBorderColor}
                              className="flex-1"
                            />
                            <Input
                              type="text"
                              label="Opacity"
                              value={cardBorderOpacity}
                              onValueChange={setCardBorderOpacity}
                              className="w-24"
                              classNames={{
                                inputWrapper: "bg-[#1e1e30] border-white/10"
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="text-white font-medium flex items-center gap-2">
                              <Icon icon="lucide:corner-down-right" size={18} />
                              Border Radius
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-white/70">Link corners</span>
                              <Switch 
                                isSelected={linkBorderRadius}
                                onValueChange={setLinkBorderRadius}
                                size="sm"
                                color="secondary"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Input 
                              type="text"
                              label="Top Left" 
                              value={cardBorderRadiusTopLeft}
                              onValueChange={(value) => handleBorderRadiusChange(value, "topLeft")}
                              classNames={{
                                inputWrapper: "bg-[#1e1e30] border-white/10"
                              }}
                            />
                            <Input 
                              type="text"
                              label="Top Right" 
                              value={cardBorderRadiusTopRight}
                              onValueChange={(value) => handleBorderRadiusChange(value, "topRight")}
                              isDisabled={linkBorderRadius}
                              classNames={{
                                inputWrapper: "bg-[#1e1e30] border-white/10"
                              }}
                            />
                            <Input 
                              type="text"
                              label="Bottom Left" 
                              value={cardBorderRadiusBottomLeft}
                              onValueChange={(value) => handleBorderRadiusChange(value, "bottomLeft")}
                              isDisabled={linkBorderRadius}
                              classNames={{
                                inputWrapper: "bg-[#1e1e30] border-white/10"
                              }}
                            />
                            <Input 
                              type="text"
                              label="Bottom Right" 
                              value={cardBorderRadiusBottomRight}
                              onValueChange={(value) => handleBorderRadiusChange(value, "bottomRight")}
                              isDisabled={linkBorderRadius}
                              classNames={{
                                inputWrapper: "bg-[#1e1e30] border-white/10"
                              }}
                            />
                          </div>
                          
                          <Select
                            label="Unit"
                            selectedKeys={[cardBorderRadiusUnit]}
                            onChange={(e) => setCardBorderRadiusUnit(e.target.value)}
                            className="max-w-xs"
                            classNames={{
                              trigger: "bg-[#1e1e30] border-white/10",
                              listbox: "bg-[#252538] text-white"
                            }}
                          >
                            <SelectItem key="px" value="px">px</SelectItem>
                            <SelectItem key="%" value="%">%</SelectItem>
                            <SelectItem key="rem" value="rem">rem</SelectItem>
                          </Select>
                        </div>
                      </div>
                      
                      <Divider className="bg-white/10" />
                      
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                          <Icon icon="lucide:square-asterisk" />
                          Icon Settings
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input 
                            type="text"
                            label="Icon Size" 
                            value={iconSize}
                            onValueChange={setIconSize}
                            endContent="px"
                            classNames={{
                              inputWrapper: "bg-[#1e1e30] border-white/10"
                            }}
                          />
                          <div className="flex gap-2 items-end">
                            <Input 
                              type="text"
                              label="Border Radius" 
                              value={iconBorderRadius}
                              onValueChange={setIconBorderRadius}
                              className="flex-1"
                              classNames={{
                                inputWrapper: "bg-[#1e1e30] border-white/10"
                              }}
                            />
                            <Select
                              selectedKeys={[iconBorderRadiusUnit]}
                              onChange={(e) => setIconBorderRadiusUnit(e.target.value)}
                              className="w-24"
                              classNames={{
                                trigger: "bg-[#1e1e30] border-white/10",
                                listbox: "bg-[#252538] text-white"
                              }}
                            >
                              <SelectItem key="px" value="px">px</SelectItem>
                              <SelectItem key="%" value="%">%</SelectItem>
                              <SelectItem key="rem" value="rem">rem</SelectItem>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input 
                            type="text"
                            label="Border Width" 
                            value={iconBorderWidth}
                            onValueChange={setIconBorderWidth}
                            endContent="px"
                            classNames={{
                              inputWrapper: "bg-[#1e1e30] border-white/10"
                            }}
                          />
                          <Select
                            label="Border Style"
                            selectedKeys={[iconBorderStyle]}
                            onChange={(e) => setIconBorderStyle(e.target.value)}
                            classNames={{
                              trigger: "bg-[#1e1e30] border-white/10",
                              listbox: "bg-[#252538] text-white"
                            }}
                          >
                            <SelectItem key="solid" value="solid">Solid</SelectItem>
                            <SelectItem key="dashed" value="dashed">Dashed</SelectItem>
                            <SelectItem key="dotted" value="dotted">Dotted</SelectItem>
                            <SelectItem key="double" value="double">Double</SelectItem>
                            <SelectItem key="groove" value="groove">Groove</SelectItem>
                            <SelectItem key="ridge" value="ridge">Ridge</SelectItem>
                            <SelectItem key="inset" value="inset">Inset</SelectItem>
                            <SelectItem key="outset" value="outset">Outset</SelectItem>
                          </Select>
                          <div className="flex gap-2 items-end">
                            <ColorPicker
                              label="Border Color"
                              value={iconBorderColor}
                              onChange={setIconBorderColor}
                              className="flex-1"
                            />
                            <Input
                              type="text"
                              label="Opacity"
                              value={iconBorderOpacity}
                              onValueChange={setIconBorderOpacity}
                              className="w-24"
                              classNames={{
                                inputWrapper: "bg-[#1e1e30] border-white/10"
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  
                  <Tab 
                    key="background" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:palette" />
                        <span>Background</span>
                      </div>
                    }
                  >
                    <div className="space-y-6 py-4">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                          <Icon icon="lucide:layers" />
                          Card Background
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <ColorPicker
                              label="Gradient From Color" 
                              value={bgGradientFrom}
                              onChange={(value) => {
                                addToHistory({ bgGradientFrom });
                                setBgGradientFrom(value);
                              }}
                            />
                          </div>
                          <div>
                            <Input 
                              type="text"
                              label="Gradient From Opacity" 
                              value={bgOpacityFrom}
                              onValueChange={(value) => {
                                addToHistory({ bgOpacityFrom });
                                setBgOpacityFrom(value);
                              }}
                              classNames={{
                                inputWrapper: "bg-[#1e1e30] border-white/10"
                              }}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <ColorPicker
                              label="Gradient To Color" 
                              value={bgGradientTo}
                              onChange={(value) => {
                                addToHistory({ bgGradientTo });
                                setBgGradientTo(value);
                              }}
                            />
                          </div>
                          <div>
                            <Input 
                              type="text"
                              label="Gradient To Opacity" 
                              value={bgOpacityTo}
                              onValueChange={(value) => {
                                addToHistory({ bgOpacityTo });
                                setBgOpacityTo(value);
                              }}
                              classNames={{
                                inputWrapper: "bg-[#1e1e30] border-white/10"
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Divider className="bg-white/10" />
                      
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                          <Icon icon="lucide:circle" />
                          Icon Background
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ColorPicker
                            label="Gradient From" 
                            value={iconGradientFrom}
                            onChange={(value) => {
                              addToHistory({ iconGradientFrom });
                              setIconGradientFrom(value);
                            }}
                          />
                          <ColorPicker
                            label="Gradient To" 
                            value={iconGradientTo}
                            onChange={(value) => {
                              addToHistory({ iconGradientTo });
                              setIconGradientTo(value);
                            }}
                          />
                        </div>
                      </div>
                      
                      <Divider className="bg-white/10" />
                      
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                          <Icon icon="lucide:image" />
                          Card Image Background
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <ColorPicker
                            label="Gradient From" 
                            value={cardImageGradientFrom}
                            onChange={(value) => {
                              addToHistory({ cardImageGradientFrom });
                              setCardImageGradientFrom(value);
                            }}
                          />
                          <ColorPicker
                            label="Gradient Via" 
                            value={cardImageGradientVia}
                            onChange={(value) => {
                              addToHistory({ cardImageGradientVia });
                              setCardImageGradientVia(value);
                            }}
                          />
                          <ColorPicker
                            label="Gradient To" 
                            value={cardImageGradientTo}
                            onChange={(value) => {
                              addToHistory({ cardImageGradientTo });
                              setCardImageGradientTo(value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Tab>
                  
                  <Tab 
                    key="shadows" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:cloud" />
                        <span>Shadows</span>
                      </div>
                    }
                  >
                    <div className="space-y-6 py-4">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                          <Icon icon="lucide:cloud-rain" />
                          Primary Shadow
                        </h3>
                        <div className="flex items-center gap-2 mb-4">
                          <Checkbox 
                            isSelected={shadowInset}
                            onValueChange={setShadowInset}
                            color="secondary"
                          >
                            Inset Shadow
                          </Checkbox>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input 
                            type="text"
                            label="X Offset" 
                            value={shadowX}
                            onValueChange={setShadowX}
                            endContent="px"
                            classNames={{
                              inputWrapper: "bg-[#1e1e30] border-white/10"
                            }}
                          />
                          <Input 
                            type="text"
                            label="Y Offset" 
                            value={shadowY}
                            onValueChange={setShadowY}
                            endContent="px"
                            classNames={{
                              inputWrapper: "bg-[#1e1e30] border-white/10"
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input 
                            type="text"
                            label="Blur Radius" 
                            value={shadowBlur}
                            onValueChange={setShadowBlur}
                            endContent="px"
                            classNames={{
                              inputWrapper: "bg-[#1e1e30] border-white/10"
                            }}
                          />
                          <Input 
                            type="text"
                            label="Spread Radius" 
                            value={shadowSpread}
                            onValueChange={setShadowSpread}
                            endContent="px"
                            classNames={{
                              inputWrapper: "bg-[#1e1e30] border-white/10"
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ColorPicker
                            label="Shadow Color" 
                            value={shadowColor}
                            onChange={(value) => {
                              addToHistory({ shadowColor });
                              setShadowColor(value);
                            }}
                          />
                          <Input 
                            type="text"
                            label="Shadow Opacity" 
                            value={shadowOpacity}
                            onValueChange={(value) => {
                              addToHistory({ shadowOpacity });
                              setShadowOpacity(value);
                            }}
                            classNames={{
                              inputWrapper: "bg-[#1e1e30] border-white/10"
                            }}
                          />
                        </div>
                      </div>
                      
                      <Divider className="bg-white/10" />
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Icon icon="lucide:cloud-drizzle" />
                            Secondary Shadow
                          </h3>
                          <Switch 
                            isSelected={useSecondShadow}
                            onValueChange={setUseSecondShadow}
                            color="secondary"
                          >
                            Enable
                          </Switch>
                        </div>
                        
                        {useSecondShadow && (
                          <>
                            <div className="flex items-center gap-2 mb-4">
                              <Checkbox 
                                isSelected={shadow2Inset}
                                onValueChange={setShadow2Inset}
                                color="secondary"
                              >
                                Inset Shadow
                              </Checkbox>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Input 
                                type="text"
                                label="X Offset" 
                                value={shadow2X}
                                onValueChange={setShadow2X}
                                endContent="px"
                                classNames={{
                                  inputWrapper: "bg-[#1e1e30] border-white/10"
                                }}
                              />
                              <Input 
                                type="text"
                                label="Y Offset" 
                                value={shadow2Y}
                                onValueChange={setShadow2Y}
                                endContent="px"
                                classNames={{
                                  inputWrapper: "bg-[#1e1e30] border-white/10"
                                }}
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Input 
                                type="text"
                                label="Blur Radius" 
                                value={shadow2Blur}
                                onValueChange={setShadow2Blur}
                                endContent="px"
                                classNames={{
                                  inputWrapper: "bg-[#1e1e30] border-white/10"
                                }}
                              />
                              <Input 
                                type="text"
                                label="Spread Radius" 
                                value={shadow2Spread}
                                onValueChange={setShadow2Spread}
                                endContent="px"
                                classNames={{
                                  inputWrapper: "bg-[#1e1e30] border-white/10"
                                }}
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <ColorPicker
                                label="Shadow Color" 
                                value={shadow2Color}
                                onChange={setShadow2Color}
                              />
                              <Input 
                                type="text"
                                label="Shadow Opacity" 
                                value={shadow2Opacity}
                                onValueChange={setShadow2Opacity}
                                classNames={{
                                  inputWrapper: "bg-[#1e1e30] border-white/10"
                                }}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </Tab>
                  
                  <Tab 
                    key="css" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:code" />
                        <span>Generated CSS</span>
                      </div>
                    }
                  >
                    <CssCodePanel 
                      cssCode={generateCssCode()}
                      minifyCss={minifyCss}
                      setMinifyCss={setMinifyCss}
                      includePrefixes={includePrefixes}
                      setIncludePrefixes={setIncludePrefixes}
                    />
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
          
          {/* Right side: Preview */}
          <div>
            <Card className="bg-[#252538]/90 backdrop-blur-md border border-white/10 shadow-xl sticky top-24">
              <CardBody>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Icon icon="lucide:eye" />
                  Preview
                </h3>
                <div className="flex justify-center">
                  <CardPreview 
                    type={selectedType as any}
                    title={title}
                    description={description}
                    delay={delay}
                    bgGradientFrom={bgGradientFrom}
                    bgGradientTo={bgGradientTo}
                    bgOpacityFrom={bgOpacityFrom}
                    bgOpacityTo={bgOpacityTo}
                    iconGradientFrom={iconGradientFrom}
                    iconGradientTo={iconGradientTo}
                    cardImageGradientFrom={cardImageGradientFrom}
                    cardImageGradientVia={cardImageGradientVia}
                    cardImageGradientTo={cardImageGradientTo}
                    shadowColor={shadowColor}
                    shadowOpacity={shadowOpacity}
                    enableHoverEffects={enableHoverEffects}
                    enableAnimations={enableAnimations}
                    // Additional props
                    cardWidth={cardWidth}
                    cardWidthUnit={cardWidthUnit}
                    cardHeight={cardHeight}
                    cardHeightUnit={cardHeightUnit}
                    cardPadding={cardPadding}
                    cardPaddingUnit={cardPaddingUnit}
                    cardBorderWidth={cardBorderWidth}
                    cardBorderStyle={cardBorderStyle}
                    cardBorderColor={cardBorderColor}
                    cardBorderOpacity={cardBorderOpacity}
                    cardBorderRadius={{
                      topLeft: cardBorderRadiusTopLeft,
                      topRight: cardBorderRadiusTopRight,
                      bottomLeft: cardBorderRadiusBottomLeft,
                      bottomRight: cardBorderRadiusBottomRight,
                      unit: cardBorderRadiusUnit
                    }}
                    iconBorderWidth={iconBorderWidth}
                    iconBorderStyle={iconBorderStyle}
                    iconBorderColor={iconBorderColor}
                    iconBorderOpacity={iconBorderOpacity}
                    iconSize={iconSize}
                    iconBorderRadius={iconBorderRadius}
                    iconBorderRadiusUnit={iconBorderRadiusUnit}
                    cardOpacity={cardOpacity}
                    zIndex={zIndex}
                    positionType={positionType}
                    shadowSettings={{
                      inset: shadowInset,
                      x: shadowX,
                      y: shadowY,
                      blur: shadowBlur,
                      spread: shadowSpread
                    }}
                    shadow2Settings={useSecondShadow ? {
                      inset: shadow2Inset,
                      x: shadow2X,
                      y: shadow2Y,
                      blur: shadow2Blur,
                      spread: shadow2Spread,
                      color: shadow2Color,
                      opacity: shadow2Opacity
                    } : undefined}
                    iconImage={useCustomIcon ? iconImage : null}
                    contentImage={useCustomContent ? contentImage : null}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Save Confirmation Modal */}
      <Modal 
        isOpen={isSaveModalOpen} 
        onOpenChange={onCloseSaveModal}
        classNames={{
          base: "bg-[#252538] text-white border border-white/10",
          header: "border-b border-white/10",
          footer: "border-t border-white/10"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Save Changes</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to save changes to this card? This will update the card on the main page.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose} className="bg-[#1e1e30]">
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSave}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      {/* Reset Confirmation Modal */}
      <Modal 
        isOpen={isResetModalOpen} 
        onOpenChange={onCloseResetModal}
        classNames={{
          base: "bg-[#252538] text-white border border-white/10",
          header: "border-b border-white/10",
          footer: "border-t border-white/10"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Reset Card</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to reset this card to its default settings? This action cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose} className="bg-[#1e1e30]">
                  Cancel
                </Button>
                <Button color="danger" onPress={handleReset}>
                  Reset Card
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      {/* New Card Modal */}
      <Modal 
        isOpen={isNewCardModalOpen} 
        onOpenChange={onCloseNewCardModal}
        classNames={{
          base: "bg-[#252538] text-white border border-white/10",
          header: "border-b border-white/10",
          footer: "border-t border-white/10"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create New Card</ModalHeader>
              <ModalBody>
                <Select
                  label="Card Type"
                  placeholder="Select a card type"
                  selectedKeys={[newCardType]}
                  onChange={(e) => setNewCardType(e.target.value)}
                  className="w-full mb-4"
                  classNames={{
                    trigger: "bg-[#1e1e30] border-white/10",
                    listbox: "bg-[#252538] text-white"
                  }}
                >
                  {cardTypes.map((type) => (
                    <SelectItem key={type.key} value={type.key}>
                      {type.label}
                    </SelectItem>
                  ))}
                </Select>
                <Input 
                  label="Title" 
                  value={newCardTitle} 
                  onValueChange={setNewCardTitle}
                  className="mb-4"
                  classNames={{
                    inputWrapper: "bg-[#1e1e30] border-white/10"
                  }}
                />
                <Input 
                  label="Description" 
                  value={newCardDescription} 
                  onValueChange={setNewCardDescription}
                  classNames={{
                    inputWrapper: "bg-[#1e1e30] border-white/10"
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose} className="bg-[#1e1e30]">
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleCreateNewCard}
                  isDisabled={!newCardTitle || !newCardType}
                >
                  Create Card
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
