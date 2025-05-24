import { hexToRgb, lightenColor } from './color-utils';

interface CssGeneratorProps {
  selectedType: string;
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
  cardBorderRadiusTopLeft: string;
  cardBorderRadiusTopRight: string;
  cardBorderRadiusBottomLeft: string;
  cardBorderRadiusBottomRight: string;
  cardBorderRadiusUnit: string;
  bgGradientFrom: string;
  bgGradientTo: string;
  bgOpacityFrom: string;
  bgOpacityTo: string;
  shadowInset: boolean;
  shadowX: string;
  shadowY: string;
  shadowBlur: string;
  shadowSpread: string;
  shadowColor: string;
  shadowOpacity: string;
  useSecondShadow: boolean;
  shadow2Inset?: boolean;
  shadow2X?: string;
  shadow2Y?: string;
  shadow2Blur?: string;
  shadow2Spread?: string;
  shadow2Color?: string;
  shadow2Opacity?: string;
  iconSize: string;
  iconBorderRadius: string;
  iconBorderRadiusUnit: string;
  iconBorderWidth: string;
  iconBorderStyle: string;
  iconBorderColor: string;
  iconBorderOpacity: string;
  iconGradientFrom: string;
  iconGradientTo: string;
  cardImageGradientFrom: string;
  cardImageGradientVia: string;
  cardImageGradientTo: string;
  enableHoverEffects: boolean;
  enableAnimations: boolean;
  positionType: string;
  zIndex: string;
  cardOpacity: number;
  minifyCss: boolean;
  includePrefixes: boolean;
}

export const generateCssCode = (props: CssGeneratorProps): string => {
  const {
    selectedType,
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
    cardBorderRadiusTopLeft,
    cardBorderRadiusTopRight,
    cardBorderRadiusBottomLeft,
    cardBorderRadiusBottomRight,
    cardBorderRadiusUnit,
    bgGradientFrom,
    bgGradientTo,
    bgOpacityFrom,
    bgOpacityTo,
    shadowInset,
    shadowX,
    shadowY,
    shadowBlur,
    shadowSpread,
    shadowColor,
    shadowOpacity,
    useSecondShadow,
    shadow2Inset,
    shadow2X,
    shadow2Y,
    shadow2Blur,
    shadow2Spread,
    shadow2Color,
    shadow2Opacity,
    iconSize,
    iconBorderRadius,
    iconBorderRadiusUnit,
    iconBorderWidth,
    iconBorderStyle,
    iconBorderColor,
    iconBorderOpacity,
    iconGradientFrom,
    iconGradientTo,
    cardImageGradientFrom,
    cardImageGradientVia,
    cardImageGradientTo,
    enableHoverEffects,
    enableAnimations,
    positionType,
    zIndex,
    cardOpacity,
    minifyCss,
    includePrefixes
  } = props;

  // Calculate border radius values
  const borderRadiusValue = `${cardBorderRadiusTopLeft}${cardBorderRadiusUnit} ${cardBorderRadiusTopRight}${cardBorderRadiusUnit} ${cardBorderRadiusBottomRight}${cardBorderRadiusUnit} ${cardBorderRadiusBottomLeft}${cardBorderRadiusUnit}`;
  
  // Calculate shadow values
  const mainShadow = `${shadowInset ? 'inset ' : ''}${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px rgba(${hexToRgb(shadowColor)}, ${shadowOpacity})`;
  const secondShadow = useSecondShadow && shadow2X && shadow2Y && shadow2Blur && shadow2Spread && shadow2Color && shadow2Opacity
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
      .replace(/background: (linear|radial)-gradient/g, "background: -webkit-$1-gradient$&\nbackground: -moz-$1-gradient$&\nbackground: $1-gradient")
      .replace(/@keyframes /g, "@-webkit-keyframes $&\n@-moz-keyframes $&\n@keyframes ")
      .replace(/animation: /g, "-webkit-animation: $&\n-moz-animation: $&\nanimation: ");
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