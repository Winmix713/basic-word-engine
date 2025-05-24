import React from 'react';
import { Button, ButtonGroup, Tooltip } from "@heroui/react";
import { Icon } from '@iconify/react';

interface Preset {
  id: string;
  name: string;
  icon?: string;
  description?: string;
}

interface PresetSelectorProps {
  presets: Preset[];
  onSelect: (presetId: string) => void;
  activePreset?: string;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  presets,
  onSelect,
  activePreset
}) => {
  const getPresetIcon = (presetId: string) => {
    switch (presetId) {
      case 'default':
        return 'lucide:sparkles';
      case 'flat':
        return 'lucide:square';
      case 'glass':
        return 'lucide:glasses';
      case 'neumorphism':
        return 'lucide:layers';
      case 'material':
        return 'lucide:box';
      default:
        return 'lucide:palette';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon icon="lucide:wand-2" className="text-white/70" />
        <span className="text-white font-medium">Style Presets</span>
      </div>
      <ButtonGroup variant="flat">
        {presets.map((preset) => (
          <Tooltip key={preset.id} content={preset.description || preset.name}>
            <Button
              color={activePreset === preset.id ? "secondary" : "default"}
              onPress={() => onSelect(preset.id)}
              startContent={<Icon icon={preset.icon || getPresetIcon(preset.id)} />}
              className={activePreset === preset.id ? "bg-purple-600/20" : ""}
            >
              {preset.name}
            </Button>
          </Tooltip>
        ))}
      </ButtonGroup>
    </div>
  );
};