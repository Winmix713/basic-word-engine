import React from 'react';
import { Card, CardBody } from "@heroui/react";
import { CardPreview } from '../card-preview';

interface EditorPreviewProps {
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
  // Additional props
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

export const EditorPreview: React.FC<EditorPreviewProps> = (props) => {
  return (
    <Card className="bg-[#1e1e2e]/80 backdrop-blur-md border border-white/10 sticky top-6">
      <CardBody>
        <h3 className="text-xl font-semibold text-white mb-4">Preview</h3>
        <div className="flex justify-center">
          <CardPreview 
            type={props.type}
            title={props.title}
            description={props.description}
            delay={props.delay}
            bgGradientFrom={props.bgGradientFrom}
            bgGradientTo={props.bgGradientTo}
            bgOpacityFrom={props.bgOpacityFrom}
            bgOpacityTo={props.bgOpacityTo}
            iconGradientFrom={props.iconGradientFrom}
            iconGradientTo={props.iconGradientTo}
            cardImageGradientFrom={props.cardImageGradientFrom}
            cardImageGradientVia={props.cardImageGradientVia}
            cardImageGradientTo={props.cardImageGradientTo}
            shadowColor={props.shadowColor}
            shadowOpacity={props.shadowOpacity}
            enableHoverEffects={props.enableHoverEffects}
            enableAnimations={props.enableAnimations}
            // Additional props
            cardWidth={props.cardWidth}
            cardWidthUnit={props.cardWidthUnit}
            cardHeight={props.cardHeight}
            cardHeightUnit={props.cardHeightUnit}
            cardPadding={props.cardPadding}
            cardPaddingUnit={props.cardPaddingUnit}
            cardBorderWidth={props.cardBorderWidth}
            cardBorderStyle={props.cardBorderStyle}
            cardBorderColor={props.cardBorderColor}
            cardBorderOpacity={props.cardBorderOpacity}
            cardBorderRadius={props.cardBorderRadius}
            iconBorderWidth={props.iconBorderWidth}
            iconBorderStyle={props.iconBorderStyle}
            iconBorderColor={props.iconBorderColor}
            iconBorderOpacity={props.iconBorderOpacity}
            iconSize={props.iconSize}
            iconBorderRadius={props.iconBorderRadius}
            iconBorderRadiusUnit={props.iconBorderRadiusUnit}
            cardOpacity={props.cardOpacity}
            zIndex={props.zIndex}
            positionType={props.positionType}
            shadowSettings={props.shadowSettings}
            shadow2Settings={props.shadow2Settings}
            iconImage={props.iconImage}
            contentImage={props.contentImage}
          />
        </div>
      </CardBody>
    </Card>
  );
};