import React from 'react';
import { Input, Select, SelectItem } from "@heroui/react";
import { ColorPicker } from './color-picker';

interface BorderControlsProps {
  width: string;
  style: string;
  color: string;
  opacity: string;
  onWidthChange: (value: string) => void;
  onStyleChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onOpacityChange: (value: string) => void;
}

export const BorderControls: React.FC<BorderControlsProps> = ({
  width,
  style,
  color,
  opacity,
  onWidthChange,
  onStyleChange,
  onColorChange,
  onOpacityChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Input 
        type="text"
        label="Border Width" 
        value={width}
        onValueChange={onWidthChange}
        endContent="px"
      />
      <Select
        label="Border Style"
        selectedKeys={[style]}
        onChange={(e) => onStyleChange(e.target.value)}
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
          value={color}
          onChange={onColorChange}
          className="flex-1"
        />
        <Input
          type="text"
          label="Opacity"
          value={opacity}
          onValueChange={onOpacityChange}
          className="w-24"
        />
      </div>
    </div>
  );
};