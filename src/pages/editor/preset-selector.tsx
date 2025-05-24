import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from '@iconify/react';

interface Preset {
  name: string;
  id: string;
}

interface PresetSelectorProps {
  presets: Preset[];
  onSelect: (presetId: string) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ presets, onSelect }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="flat" 
          color="secondary"
          startContent={<Icon icon="lucide:layout-template" />}
          endContent={<Icon icon="lucide:chevron-down" className="text-small" />}
          className="bg-[#252538]/80"
        >
          Apply Preset
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Style Presets"
        className="bg-[#252538] border border-white/10"
        onAction={(key) => onSelect(key as string)}
      >
        {presets.map((preset) => (
          <DropdownItem 
            key={preset.id} 
            className="text-white data-[hover=true]:bg-[#1e1e30]"
            startContent={getPresetIcon(preset.id)}
          >
            {preset.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

// Helper function to get appropriate icon for each preset
const getPresetIcon = (presetId: string) => {
  switch (presetId) {
    case 'default':
      return <Icon icon="lucide:layout" className="text-purple-400" />;
    case 'flat':
      return <Icon icon="lucide:square" className="text-blue-400" />;
    case 'glass':
      return <Icon icon="lucide:glasses" className="text-cyan-400" />;
    case 'neumorphism':
      return <Icon icon="lucide:layers" className="text-indigo-400" />;
    case 'material':
      return <Icon icon="lucide:palette" className="text-pink-400" />;
    default:
      return <Icon icon="lucide:box" className="text-gray-400" />;
  }
};