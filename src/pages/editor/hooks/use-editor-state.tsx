import React from 'react';
import { Card } from '../../../context/card-manager-context';

export const useEditorState = () => {
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
  
  // CSS output settings
  const [minifyCss, setMinifyCss] = React.useState<boolean>(false);
  const [includePrefixes, setIncludePrefixes] = React.useState<boolean>(true);
  
  // Image upload states
  const [iconImage, setIconImage] = React.useState<string | null>(null);
  const [contentImage, setContentImage] = React.useState<string | null>(null);
  const [useCustomIcon, setUseCustomIcon] = React.useState<boolean>(false);
  const [useCustomContent, setUseCustomContent] = React.useState<boolean>(false);

  // Reset editor state to default values
  const resetEditorState = React.useCallback(() => {
    setSelectedType("obsidian");
    setTitle("Obsidian");
    setDescription("Capture information, manage tasks and pin notes to your menu bar.");
    setDelay("500ms");
    setBgGradientFrom("#523091");
    setBgGradientTo("#1a0b33");
    setBgOpacityFrom("0.70");
    setBgOpacityTo("0.14");
    setIconGradientFrom("#7c3aed");
    setIconGradientTo("#a855f7");
    setCardImageGradientFrom("#4C1D95");
    setCardImageGradientVia("#7C3AED");
    setCardImageGradientTo("#A855F7");
    setShadowColor("#7c3aed");
    setShadowOpacity("0.3");
    setEnableHoverEffects(true);
    setEnableAnimations(true);
    setCardWidth("320");
    setCardWidthUnit("px");
    setCardHeight("auto");
    setCardHeightUnit("px");
    setCardPadding("20");
    setCardPaddingUnit("px");
    setCardBorderWidth("0");
    setCardBorderStyle("solid");
    setCardBorderColor("#ffffff");
    setCardBorderOpacity("0.1");
    setCardBorderRadiusTopLeft("16");
    setCardBorderRadiusTopRight("16");
    setCardBorderRadiusBottomLeft("16");
    setCardBorderRadiusBottomRight("16");
    setCardBorderRadiusUnit("px");
    setLinkBorderRadius(true);
    setIconBorderWidth("0");
    setIconBorderStyle("solid");
    setIconBorderColor("#ffffff");
    setIconBorderOpacity("0.2");
    setIconSize("56");
    setIconBorderRadius("12");
    setIconBorderRadiusUnit("px");
    setCardOpacity(100);
    setZIndex("1");
    setPositionType("relative");
    setShadowInset(false);
    setShadowX("0");
    setShadowY("30");
    setShadowBlur("50");
    setShadowSpread("0");
    setUseSecondShadow(true);
    setShadow2Inset(true);
    setShadow2X("0");
    setShadow2Y("1");
    setShadow2Blur("0");
    setShadow2Spread("0");
    setShadow2Color("#ffffff");
    setShadow2Opacity("0.1");
    setIconImage(null);
    setContentImage(null);
    setUseCustomIcon(false);
    setUseCustomContent(false);
  }, []);

  // Sync editor state with a card
  const syncWithCard = React.useCallback((card: Card) => {
    setSelectedType(card.type);
    setTitle(card.title);
    setDescription(card.description);
    setDelay(card.delay || "500ms");
    setBgGradientFrom(card.bgGradientFrom);
    setBgGradientTo(card.bgGradientTo);
    setBgOpacityFrom(card.bgOpacityFrom);
    setBgOpacityTo(card.bgOpacityTo);
    setIconGradientFrom(card.iconGradientFrom);
    setIconGradientTo(card.iconGradientTo);
    setCardImageGradientFrom(card.cardImageGradientFrom);
    setCardImageGradientVia(card.cardImageGradientVia);
    setCardImageGradientTo(card.cardImageGradientTo);
    setShadowColor(card.shadowColor);
    setShadowOpacity(card.shadowOpacity);
    setEnableHoverEffects(card.enableHoverEffects);
    setEnableAnimations(card.enableAnimations);
    
    // Additional properties
    if (card.cardWidth) setCardWidth(card.cardWidth);
    if (card.cardWidthUnit) setCardWidthUnit(card.cardWidthUnit);
    if (card.cardHeight) setCardHeight(card.cardHeight);
    if (card.cardHeightUnit) setCardHeightUnit(card.cardHeightUnit);
    if (card.cardPadding) setCardPadding(card.cardPadding);
    if (card.cardPaddingUnit) setCardPaddingUnit(card.cardPaddingUnit);
    if (card.cardBorderWidth) setCardBorderWidth(card.cardBorderWidth);
    if (card.cardBorderStyle) setCardBorderStyle(card.cardBorderStyle);
    if (card.cardBorderColor) setCardBorderColor(card.cardBorderColor);
    if (card.cardBorderOpacity) setCardBorderOpacity(card.cardBorderOpacity);
    if (card.cardBorderRadius) {
      setCardBorderRadiusTopLeft(card.cardBorderRadius.topLeft);
      setCardBorderRadiusTopRight(card.cardBorderRadius.topRight);
      setCardBorderRadiusBottomLeft(card.cardBorderRadius.bottomLeft);
      setCardBorderRadiusBottomRight(card.cardBorderRadius.bottomRight);
      setCardBorderRadiusUnit(card.cardBorderRadius.unit);
    }
    if (card.iconBorderWidth) setIconBorderWidth(card.iconBorderWidth);
    if (card.iconBorderStyle) setIconBorderStyle(card.iconBorderStyle);
    if (card.iconBorderColor) setIconBorderColor(card.iconBorderColor);
    if (card.iconBorderOpacity) setIconBorderOpacity(card.iconBorderOpacity);
    if (card.iconSize) setIconSize(card.iconSize);
    if (card.iconBorderRadius) setIconBorderRadius(card.iconBorderRadius);
    if (card.iconBorderRadiusUnit) setIconBorderRadiusUnit(card.iconBorderRadiusUnit);
    if (card.cardOpacity) setCardOpacity(card.cardOpacity);
    if (card.zIndex) setZIndex(card.zIndex);
    if (card.positionType) setPositionType(card.positionType);
    if (card.shadowSettings) {
      setShadowInset(card.shadowSettings.inset);
      setShadowX(card.shadowSettings.x);
      setShadowY(card.shadowSettings.y);
      setShadowBlur(card.shadowSettings.blur);
      setShadowSpread(card.shadowSettings.spread);
    }
    if (card.shadow2Settings) {
      setUseSecondShadow(true);
      setShadow2Inset(card.shadow2Settings.inset);
      setShadow2X(card.shadow2Settings.x);
      setShadow2Y(card.shadow2Settings.y);
      setShadow2Blur(card.shadow2Settings.blur);
      setShadow2Spread(card.shadow2Settings.spread);
      setShadow2Color(card.shadow2Settings.color || "#ffffff");
      setShadow2Opacity(card.shadow2Settings.opacity || "0.1");
    } else {
      setUseSecondShadow(false);
    }
    
    // Custom images
    if (card.iconImage) {
      setIconImage(card.iconImage);
      setUseCustomIcon(true);
    } else {
      setIconImage(null);
      setUseCustomIcon(false);
    }
    
    if (card.contentImage) {
      setContentImage(card.contentImage);
      setUseCustomContent(true);
    } else {
      setContentImage(null);
      setUseCustomContent(false);
    }
  }, []);

  return {
    // State variables and setters
    selectedType, setSelectedType,
    title, setTitle,
    description, setDescription,
    delay, setDelay,
    bgGradientFrom, setBgGradientFrom,
    bgGradientTo, setBgGradientTo,
    bgOpacityFrom, setBgOpacityFrom,
    bgOpacityTo, setBgOpacityTo,
    iconGradientFrom, setIconGradientFrom,
    iconGradientTo, setIconGradientTo,
    cardImageGradientFrom, setCardImageGradientFrom,
    cardImageGradientVia, setCardImageGradientVia,
    cardImageGradientTo, setCardImageGradientTo,
    shadowColor, setShadowColor,
    shadowOpacity, setShadowOpacity,
    enableHoverEffects, setEnableHoverEffects,
    enableAnimations, setEnableAnimations,
    cardWidth, setCardWidth,
    cardWidthUnit, setCardWidthUnit,
    cardHeight, setCardHeight,
    cardHeightUnit, setCardHeightUnit,
    cardPadding, setCardPadding,
    cardPaddingUnit, setCardPaddingUnit,
    cardBorderWidth, setCardBorderWidth,
    cardBorderStyle, setCardBorderStyle,
    cardBorderColor, setCardBorderColor,
    cardBorderOpacity, setCardBorderOpacity,
    cardBorderRadiusTopLeft, setCardBorderRadiusTopLeft,
    cardBorderRadiusTopRight, setCardBorderRadiusTopRight,
    cardBorderRadiusBottomLeft, setCardBorderRadiusBottomLeft,
    cardBorderRadiusBottomRight, setCardBorderRadiusBottomRight,
    cardBorderRadiusUnit, setCardBorderRadiusUnit,
    linkBorderRadius, setLinkBorderRadius,
    iconBorderWidth, setIconBorderWidth,
    iconBorderStyle, setIconBorderStyle,
    iconBorderColor, setIconBorderColor,
    iconBorderOpacity, setIconBorderOpacity,
    iconSize, setIconSize,
    iconBorderRadius, setIconBorderRadius,
    iconBorderRadiusUnit, setIconBorderRadiusUnit,
    cardOpacity, setCardOpacity,
    zIndex, setZIndex,
    positionType, setPositionType,
    shadowInset, setShadowInset,
    shadowX, setShadowX,
    shadowY, setShadowY,
    shadowBlur, setShadowBlur,
    shadowSpread, setShadowSpread,
    useSecondShadow, setUseSecondShadow,
    shadow2Inset, setShadow2Inset,
    shadow2X, setShadow2X,
    shadow2Y, setShadow2Y,
    shadow2Blur, setShadow2Blur,
    shadow2Spread, setShadow2Spread,
    shadow2Color, setShadow2Color,
    shadow2Opacity, setShadow2Opacity,
    minifyCss, setMinifyCss,
    includePrefixes, setIncludePrefixes,
    iconImage, setIconImage,
    contentImage, setContentImage,
    useCustomIcon, setUseCustomIcon,
    useCustomContent, setUseCustomContent,
    
    // Helper functions
    resetEditorState,
    syncWithCard
  };
};