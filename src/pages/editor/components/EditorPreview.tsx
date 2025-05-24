import React from 'react';
import { Card, CardBody } from "@heroui/react";
import { CardPreview } from '../card-preview';

interface EditorPreviewProps {
  cardState: any; // Using any for simplicity, but ideally should be properly typed
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({ cardState }) => {
  return (
    <Card className="bg-[#1e1e2e]/80 backdrop-blur-md border border-white/10 sticky top-6">
      <CardBody>
        <h3 className="text-xl font-semibold text-white mb-4">Preview</h3>
        <div className="flex justify-center">
          <CardPreview 
            type={cardState.selectedType as any}
            title={cardState.title}
            description={cardState.description}
            delay={cardState.delay}
            bgGradientFrom={cardState.bgGradientFrom}
            bgGradientTo={cardState.bgGradientTo}
            bgOpacityFrom={cardState.bgOpacityFrom}
            bgOpacityTo={cardState.bgOpacityTo}
            iconGradientFrom={cardState.iconGradientFrom}
            iconGradientTo={cardState.iconGradientTo}
            cardImageGradientFrom={cardState.cardImageGradientFrom}
            cardImageGradientVia={cardState.cardImageGradientVia}
            cardImageGradientTo={cardState.cardImageGradientTo}
            shadowColor={cardState.shadowColor}
            shadowOpacity={cardState.shadowOpacity}
            enableHoverEffects={cardState.enableHoverEffects}
            enableAnimations={cardState.enableAnimations}
            // Additional props
            cardWidth={cardState.cardWidth}
            cardWidthUnit={cardState.cardWidthUnit}
            cardHeight={cardState.cardHeight}
            cardHeightUnit={cardState.cardHeightUnit}
            cardPadding={cardState.cardPadding}
            cardPaddingUnit={cardState.cardPaddingUnit}
            cardBorderWidth={cardState.cardBorderWidth}
            cardBorderStyle={cardState.cardBorderStyle}
            cardBorderColor={cardState.cardBorderColor}
            cardBorderOpacity={cardState.cardBorderOpacity}
            cardBorderRadius={{
              topLeft: cardState.cardBorderRadiusTopLeft,
              topRight: cardState.cardBorderRadiusTopRight,
              bottomLeft: cardState.cardBorderRadiusBottomLeft,
              bottomRight: cardState.cardBorderRadiusBottomRight,
              unit: cardState.cardBorderRadiusUnit
            }}
            iconBorderWidth={cardState.iconBorderWidth}
            iconBorderStyle={cardState.iconBorderStyle}
            iconBorderColor={cardState.iconBorderColor}
            iconBorderOpacity={cardState.iconBorderOpacity}
            iconSize={cardState.iconSize}
            iconBorderRadius={cardState.iconBorderRadius}
            iconBorderRadiusUnit={cardState.iconBorderRadiusUnit}
            cardOpacity={cardState.cardOpacity}
            zIndex={cardState.zIndex}
            positionType={cardState.positionType}
            shadowSettings={{
              inset: cardState.shadowInset,
              x: cardState.shadowX,
              y: cardState.shadowY,
              blur: cardState.shadowBlur,
              spread: cardState.shadowSpread
            }}
            shadow2Settings={cardState.useSecondShadow ? {
              inset: cardState.shadow2Inset,
              x: cardState.shadow2X,
              y: cardState.shadow2Y,
              blur: cardState.shadow2Blur,
              spread: cardState.shadow2Spread,
              color: cardState.shadow2Color,
              opacity: cardState.shadow2Opacity
            } : undefined}
            iconImage={cardState.useCustomIcon ? cardState.iconImage : null}
            contentImage={cardState.useCustomContent ? cardState.contentImage : null}
          />
        </div>
      </CardBody>
    </Card>
  );
};