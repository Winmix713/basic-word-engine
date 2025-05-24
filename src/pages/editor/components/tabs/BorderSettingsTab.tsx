import React from 'react';
import { Input, Select, SelectItem, Divider } from "@heroui/react";

interface BorderSettingsTabProps {
  cardState: any;
  updateCardState: (key: string, value: any) => void;
  handleBorderRadiusChange: (corner: string, value: string) => void;
}

export const BorderSettingsTab: React.FC<BorderSettingsTabProps> = ({
  cardState,
  updateCardState,
  handleBorderRadiusChange
}) => {
  // Border style options
  const borderStyleOptions = [
    { key: "solid", label: "Solid" },
    { key: "dashed", label: "Dashed" },
    { key: "dotted", label: "Dotted" },
    { key: "double", label: "Double" },
    { key: "none", label: "None" }
  ];

  return (
    <div className="space-y-6">
      {/* Card Border Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Card Border</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-end gap-2">
            <Input 
              type="number"
              label="Border Width" 
              value={cardState.cardBorderWidth}
              onValueChange={(value) => updateCardState('cardBorderWidth', value)}
              className="flex-1"
            />
            <span className="mb-2 text-white">px</span>
          </div>
          
          <Select
            label="Border Style"
            selectedKeys={[cardState.cardBorderStyle]}
            onChange={(e) => updateCardState('cardBorderStyle', e.target.value)}
            className="max-w-xs"
          >
            {borderStyleOptions.map((style) => (
              <SelectItem key={style.key} value={style.key}>
                {style.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            type="text"
            label="Border Color" 
            value={cardState.cardBorderColor}
            onValueChange={(value) => updateCardState('cardBorderColor', value)}
            startContent={
              <div 
                className="w-6 h-6 rounded-md mr-2" 
                style={{ backgroundColor: cardState.cardBorderColor }}
              ></div>
            }
          />
          
          <Input 
            type="range"
            label={`Border Opacity: ${cardState.cardBorderOpacity}%`}
            value={cardState.cardBorderOpacity}
            min={0}
            max={100}
            step={1}
            onChange={(e) => updateCardState('cardBorderOpacity', e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>
      
      <Divider className="my-6" />
      
      {/* Border Radius Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Border Radius</h3>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">Unit:</span>
            <Select
              selectedKeys={[cardState.cardBorderRadiusUnit]}
              onChange={(e) => updateCardState('cardBorderRadiusUnit', e.target.value)}
              size="sm"
              className="w-24"
            >
              <SelectItem key="px" value="px">px</SelectItem>
              <SelectItem key="%" value="%">%</SelectItem>
              <SelectItem key="rem" value="rem">rem</SelectItem>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input 
            type="text"
            label="Top Left" 
            value={cardState.cardBorderRadiusTopLeft}
            onValueChange={(value) => handleBorderRadiusChange('TopLeft', value)}
            className="max-w-xs"
          />
          
          <Input 
            type="text"
            label="Top Right" 
            value={cardState.cardBorderRadiusTopRight}
            onValueChange={(value) => handleBorderRadiusChange('TopRight', value)}
            className="max-w-xs"
          />
          
          <Input 
            type="text"
            label="Bottom Left" 
            value={cardState.cardBorderRadiusBottomLeft}
            onValueChange={(value) => handleBorderRadiusChange('BottomLeft', value)}
            className="max-w-xs"
          />
          
          <Input 
            type="text"
            label="Bottom Right" 
            value={cardState.cardBorderRadiusBottomRight}
            onValueChange={(value) => handleBorderRadiusChange('BottomRight', value)}
            className="max-w-xs"
          />
        </div>
        
        <div className="mt-4 p-4 bg-[#0d0d21]/50 rounded-lg border border-white/5">
          <div className="flex items-center justify-center">
            <div 
              className="w-32 h-32 border-2 border-white/30"
              style={{
                borderTopLeftRadius: `${cardState.cardBorderRadiusTopLeft}${cardState.cardBorderRadiusUnit}`,
                borderTopRightRadius: `${cardState.cardBorderRadiusTopRight}${cardState.cardBorderRadiusUnit}`,
                borderBottomLeftRadius: `${cardState.cardBorderRadiusBottomLeft}${cardState.cardBorderRadiusUnit}`,
                borderBottomRightRadius: `${cardState.cardBorderRadiusBottomRight}${cardState.cardBorderRadiusUnit}`
              }}
            ></div>
          </div>
        </div>
      </div>
      
      <Divider className="my-6" />
      
      {/* Icon Border Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Icon Border</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-end gap-2">
            <Input 
              type="number"
              label="Border Width" 
              value={cardState.iconBorderWidth}
              onValueChange={(value) => updateCardState('iconBorderWidth', value)}
              className="flex-1"
            />
            <span className="mb-2 text-white">px</span>
          </div>
          
          <Select
            label="Border Style"
            selectedKeys={[cardState.iconBorderStyle]}
            onChange={(e) => updateCardState('iconBorderStyle', e.target.value)}
            className="max-w-xs"
          >
            {borderStyleOptions.map((style) => (
              <SelectItem key={style.key} value={style.key}>
                {style.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            type="text"
            label="Border Color" 
            value={cardState.iconBorderColor}
            onValueChange={(value) => updateCardState('iconBorderColor', value)}
            startContent={
              <div 
                className="w-6 h-6 rounded-md mr-2" 
                style={{ backgroundColor: cardState.iconBorderColor }}
              ></div>
            }
          />
          
          <Input 
            type="range"
            label={`Border Opacity: ${cardState.iconBorderOpacity}%`}
            value={cardState.iconBorderOpacity}
            min={0}
            max={100}
            step={1}
            onChange={(e) => updateCardState('iconBorderOpacity', e.target.value)}
            className="max-w-xs"
          />
        </div>
        
        <div className="flex items-end gap-2">
          <Input 
            type="text"
            label="Icon Border Radius" 
            value={cardState.iconBorderRadius}
            onValueChange={(value) => updateCardState('iconBorderRadius', value)}
            className="flex-1 max-w-xs"
          />
          <Select
            selectedKeys={[cardState.iconBorderRadiusUnit]}
            onChange={(e) => updateCardState('iconBorderRadiusUnit', e.target.value)}
            className="w-24 mb-2"
          >
            <SelectItem key="px" value="px">px</SelectItem>
            <SelectItem key="%" value="%">%</SelectItem>
            <SelectItem key="rem" value="rem">rem</SelectItem>
          </Select>
        </div>
      </div>
    </div>
  );
};