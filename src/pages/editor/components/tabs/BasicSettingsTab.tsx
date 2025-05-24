import React from 'react';
import { Input, Select, SelectItem, Checkbox, Button, Divider } from "@heroui/react";
import { Icon } from '@iconify/react';

interface BasicSettingsTabProps {
  cardState: any;
  updateCardState: (key: string, value: any) => void;
  addToHistory: () => void;
  cardTypes: { key: string; label: string }[];
  handleIconImageUpload: (file: File) => void;
  handleContentImageUpload: (file: File) => void;
}

export const BasicSettingsTab: React.FC<BasicSettingsTabProps> = ({
  cardState,
  updateCardState,
  addToHistory,
  cardTypes,
  handleIconImageUpload,
  handleContentImageUpload
}) => {
  // File input refs
  const iconFileInputRef = React.useRef<HTMLInputElement>(null);
  const contentFileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle file selection for icon
  const handleIconFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleIconImageUpload(e.target.files[0]);
    }
  };

  // Handle file selection for content
  const handleContentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleContentImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Card Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Card Type</h3>
        <Select
          label="Card Type"
          placeholder="Select a card type"
          selectedKeys={[cardState.selectedType]}
          onChange={(e) => {
            updateCardState('selectedType', e.target.value);
            addToHistory();
          }}
          className="max-w-xs"
        >
          {cardTypes.map((type) => (
            <SelectItem key={type.key} value={type.key}>
              {type.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      
      <Divider className="my-6" />
      
      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Content</h3>
        <Input 
          label="Title" 
          value={cardState.title} 
          onValueChange={(value) => updateCardState('title', value)}
          onBlur={addToHistory}
          className="max-w-md"
        />
        <Input 
          label="Description" 
          value={cardState.description} 
          onValueChange={(value) => updateCardState('description', value)}
          onBlur={addToHistory}
          className="max-w-md"
        />
        <Input 
          label="Animation Delay" 
          value={cardState.delay} 
          onValueChange={(value) => updateCardState('delay', value)}
          onBlur={addToHistory}
          className="max-w-xs"
          description="Format: 500ms, 1s, etc."
        />
      </div>
      
      <Divider className="my-6" />
      
      {/* Dimensions */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Dimensions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-end gap-2">
            <Input 
              type="number"
              label="Width" 
              value={cardState.cardWidth}
              onValueChange={(value) => updateCardState('cardWidth', value)}
              onBlur={addToHistory}
              className="flex-1"
            />
            <Select
              selectedKeys={[cardState.cardWidthUnit]}
              onChange={(e) => {
                updateCardState('cardWidthUnit', e.target.value);
                addToHistory();
              }}
              className="w-24"
            >
              <SelectItem key="px" value="px">px</SelectItem>
              <SelectItem key="%" value="%">%</SelectItem>
              <SelectItem key="rem" value="rem">rem</SelectItem>
              <SelectItem key="em" value="em">em</SelectItem>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Input 
              type="text"
              label="Height" 
              value={cardState.cardHeight}
              onValueChange={(value) => updateCardState('cardHeight', value)}
              onBlur={addToHistory}
              className="flex-1"
              description="Use 'auto' or a number"
            />
            <Select
              selectedKeys={[cardState.cardHeightUnit]}
              onChange={(e) => {
                updateCardState('cardHeightUnit', e.target.value);
                addToHistory();
              }}
              className="w-24"
              isDisabled={cardState.cardHeight === 'auto'}
            >
              <SelectItem key="px" value="px">px</SelectItem>
              <SelectItem key="%" value="%">%</SelectItem>
              <SelectItem key="rem" value="rem">rem</SelectItem>
              <SelectItem key="em" value="em">em</SelectItem>
            </Select>
          </div>
        </div>
        <div className="flex items-end gap-2">
          <Input 
            type="number"
            label="Padding" 
            value={cardState.cardPadding}
            onValueChange={(value) => updateCardState('cardPadding', value)}
            onBlur={addToHistory}
            className="flex-1 max-w-xs"
          />
          <Select
            selectedKeys={[cardState.cardPaddingUnit]}
            onChange={(e) => {
              updateCardState('cardPaddingUnit', e.target.value);
              addToHistory();
            }}
            className="w-24"
          >
            <SelectItem key="px" value="px">px</SelectItem>
            <SelectItem key="%" value="%">%</SelectItem>
            <SelectItem key="rem" value="rem">rem</SelectItem>
            <SelectItem key="em" value="em">em</SelectItem>
          </Select>
        </div>
      </div>
      
      <Divider className="my-6" />
      
      {/* Position */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Position</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Position Type"
            selectedKeys={[cardState.positionType]}
            onChange={(e) => {
              updateCardState('positionType', e.target.value);
              addToHistory();
            }}
            className="max-w-xs"
          >
            <SelectItem key="static" value="static">Static</SelectItem>
            <SelectItem key="relative" value="relative">Relative</SelectItem>
            <SelectItem key="absolute" value="absolute">Absolute</SelectItem>
            <SelectItem key="fixed" value="fixed">Fixed</SelectItem>
            <SelectItem key="sticky" value="sticky">Sticky</SelectItem>
          </Select>
          <Input 
            type="number"
            label="Z-Index" 
            value={cardState.zIndex}
            onValueChange={(value) => updateCardState('zIndex', value)}
            onBlur={addToHistory}
            className="max-w-xs"
          />
        </div>
        <Input 
          type="range"
          label={`Opacity: ${cardState.cardOpacity}%`}
          value={cardState.cardOpacity}
          min={0}
          max={100}
          step={1}
          onChange={(e) => updateCardState('cardOpacity', e.target.value)}
          onChangeEnd={addToHistory}
          className="max-w-md"
        />
      </div>
      
      <Divider className="my-6" />
      
      {/* Icon Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Icon Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            type="number"
            label="Icon Size (px)" 
            value={cardState.iconSize}
            onValueChange={(value) => updateCardState('iconSize', value)}
            onBlur={addToHistory}
            className="max-w-xs"
          />
          <div className="flex items-end gap-2">
            <Input 
              type="number"
              label="Icon Border Radius" 
              value={cardState.iconBorderRadius}
              onValueChange={(value) => updateCardState('iconBorderRadius', value)}
              onBlur={addToHistory}
              className="flex-1"
            />
            <Select
              selectedKeys={[cardState.iconBorderRadiusUnit]}
              onChange={(e) => {
                updateCardState('iconBorderRadiusUnit', e.target.value);
                addToHistory();
              }}
              className="w-24"
            >
              <SelectItem key="px" value="px">px</SelectItem>
              <SelectItem key="%" value="%">%</SelectItem>
              <SelectItem key="rem" value="rem">rem</SelectItem>
            </Select>
          </div>
        </div>
        
        <div className="mt-4">
          <Checkbox 
            isSelected={cardState.useCustomIcon}
            onValueChange={(isSelected) => {
              updateCardState('useCustomIcon', isSelected);
              addToHistory();
            }}
          >
            Use custom icon image
          </Checkbox>
          
          {cardState.useCustomIcon && (
            <div className="mt-2 flex flex-col gap-2">
              <input 
                type="file" 
                ref={iconFileInputRef}
                onChange={handleIconFileChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                color="primary"
                variant="flat"
                startContent={<Icon icon="lucide:upload" />}
                onPress={() => iconFileInputRef.current?.click()}
              >
                Upload Icon Image
              </Button>
              
              {cardState.iconImage && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-md overflow-hidden">
                    <img 
                      src={cardState.iconImage} 
                      alt="Icon Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    onPress={() => {
                      updateCardState('iconImage', null);
                      addToHistory();
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Divider className="my-6" />
      
      {/* Content Image */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Content Image</h3>
        <div className="mt-2">
          <Checkbox 
            isSelected={cardState.useCustomContent}
            onValueChange={(isSelected) => {
              updateCardState('useCustomContent', isSelected);
              addToHistory();
            }}
          >
            Use custom content image
          </Checkbox>
          
          {cardState.useCustomContent && (
            <div className="mt-2 flex flex-col gap-2">
              <input 
                type="file" 
                ref={contentFileInputRef}
                onChange={handleContentFileChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                color="primary"
                variant="flat"
                startContent={<Icon icon="lucide:upload" />}
                onPress={() => contentFileInputRef.current?.click()}
              >
                Upload Content Image
              </Button>
              
              {cardState.contentImage && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-20 h-12 rounded-md overflow-hidden">
                    <img 
                      src={cardState.contentImage} 
                      alt="Content Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    onPress={() => {
                      updateCardState('contentImage', null);
                      addToHistory();
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Divider className="my-6" />
      
      {/* Animation Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Animation Settings</h3>
        <div className="flex flex-col gap-2">
          <Checkbox 
            isSelected={cardState.enableHoverEffects}
            onValueChange={(isSelected) => {
              updateCardState('enableHoverEffects', isSelected);
              addToHistory();
            }}
          >
            Enable hover effects
          </Checkbox>
          <Checkbox 
            isSelected={cardState.enableAnimations}
            onValueChange={(isSelected) => {
              updateCardState('enableAnimations', isSelected);
              addToHistory();
            }}
          >
            Enable animations
          </Checkbox>
        </div>
      </div>
    </div>
  );
};