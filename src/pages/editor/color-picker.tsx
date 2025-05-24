import React from 'react';
import { Input, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  label, 
  value, 
  onChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom">
      <PopoverTrigger>
        <div className={className}>
          <Input 
            type="text"
            label={label} 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            startContent={
              <div 
                className="w-6 h-6 rounded-md mr-2 cursor-pointer border border-white/20" 
                style={{ backgroundColor: value }}
                onClick={() => setIsOpen(true)}
              />
            }
          />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-2 w-64">
          <p className="text-sm font-medium mb-2">{label}</p>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-10 cursor-pointer rounded-md"
          />
          <div className="grid grid-cols-5 gap-2 mt-2">
            {[
              "#000000", "#ffffff", "#f44336", "#e91e63", "#9c27b0",
              "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
              "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b",
              "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"
            ].map((color) => (
              <div
                key={color}
                className="w-8 h-8 rounded-md cursor-pointer border border-white/20 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChange(color);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};