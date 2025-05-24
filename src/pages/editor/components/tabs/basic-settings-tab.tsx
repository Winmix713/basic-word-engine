import React from 'react';
import { Button } from '../ui/Button';
import { Upload } from 'lucide-react';

interface BasicSettingsTabProps {
  cardState: any;
  updateCardState: (updates: Record<string, any>) => void;
  addToHistory: (state: Record<string, any>) => void;
  cardTypes: Array<{ key: string; label: string }>;
  handleIconImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BasicSettingsTab: React.FC<BasicSettingsTabProps> = ({
  cardState,
  updateCardState,
  addToHistory,
  cardTypes,
  handleIconImageUpload,
  handleContentImageUpload
}) => {
  // Handler for input changes
  const handleInputChange = (field: string, value: string | boolean | number) => {
    // Record current state for undo/redo
    if (field === 'title' || field === 'description' || field === 'selectedType') {
      addToHistory({
        [field]: cardState[field]
      });
    }
    
    // Update the state
    updateCardState({ [field]: value });
  };

  return (
    <div className="space-y-6 text-white">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">Card Type</label>
        <div className="flex flex-wrap gap-2">
          {cardTypes.map(type => (
            <button
              key={type.key}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                cardState.selectedType === type.key
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => handleInputChange('selectedType', type.key)}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Card Title
        </label>
        <input
          id="title"
          type="text"
          value={cardState.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={cardState.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="delay" className="block text-sm font-medium text-gray-300 mb-1">
          Animation Delay
        </label>
        <input
          id="delay"
          type="text"
          value={cardState.delay}
          onChange={(e) => handleInputChange('delay', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="e.g. 500ms"
        />
        <p className="text-xs text-gray-400 mt-1">Enter a valid CSS time value (e.g., 300ms, 0.5s)</p>
      </div>
      
      <div className="border-t border-gray-700 pt-4">
        <h3 className="text-lg font-medium text-white mb-4">Custom Images</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Icon Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Custom Icon
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  id="icon-upload"
                  accept="image/*"
                  onChange={handleIconImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="icon-upload"
                  className="flex items-center justify-center w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 cursor-pointer"
                >
                  <Upload size={16} className="mr-2" />
                  <span>Upload Icon</span>
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="use-custom-icon"
                  checked={cardState.useCustomIcon}
                  onChange={(e) => handleInputChange('useCustomIcon', e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded border-gray-700 focus:ring-purple-500"
                />
                <label htmlFor="use-custom-icon" className="text-sm text-gray-300">
                  Use Custom
                </label>
              </div>
            </div>
            
            {cardState.iconImage && (
              <div className="mt-2 relative">
                <img 
                  src={cardState.iconImage} 
                  alt="Icon Preview" 
                  className="w-16 h-16 object-cover rounded-md border border-gray-700" 
                />
                <button 
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  onClick={() => updateCardState({ iconImage: null, useCustomIcon: false })}
                >
                  ×
                </button>
              </div>
            )}
          </div>
          
          {/* Content Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content Image
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  id="content-upload"
                  accept="image/*"
                  onChange={handleContentImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="content-upload"
                  className="flex items-center justify-center w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 cursor-pointer"
                >
                  <Upload size={16} className="mr-2" />
                  <span>Upload Image</span>
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="use-custom-content"
                  checked={cardState.useCustomContent}
                  onChange={(e) => handleInputChange('useCustomContent', e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded border-gray-700 focus:ring-purple-500"
                />
                <label htmlFor="use-custom-content" className="text-sm text-gray-300">
                  Use Custom
                </label>
              </div>
            </div>
            
            {cardState.contentImage && (
              <div className="mt-2 relative">
                <img 
                  src={cardState.contentImage} 
                  alt="Content Preview" 
                  className="h-16 w-auto object-cover rounded-md border border-gray-700" 
                />
                <button 
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  onClick={() => updateCardState({ contentImage: null, useCustomContent: false })}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-4">
        <h3 className="text-lg font-medium text-white mb-4">Effects</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="enableHoverEffects" className="text-sm font-medium text-gray-300">
              Enable Hover Effects
            </label>
            <input
              type="checkbox"
              id="enableHoverEffects"
              checked={cardState.enableHoverEffects}
              onChange={(e) => handleInputChange('enableHoverEffects', e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded border-gray-700 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="enableAnimations" className="text-sm font-medium text-gray-300">
              Enable Animations
            </label>
            <input
              type="checkbox"
              id="enableAnimations"
              checked={cardState.enableAnimations}
              onChange={(e) => handleInputChange('enableAnimations', e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded border-gray-700 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-4">
        <h3 className="text-lg font-medium text-white mb-4">Dimensions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cardWidth" className="block text-sm font-medium text-gray-300 mb-1">
              Width
            </label>
            <div className="flex">
              <input
                id="cardWidth"
                type="text"
                value={cardState.cardWidth}
                onChange={(e) => handleInputChange('cardWidth', e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={cardState.cardWidthUnit}
                onChange={(e) => handleInputChange('cardWidthUnit', e.target.value)}
                className="px-2 py-2 bg-gray-700 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="rem">rem</option>
                <option value="em">em</option>
                <option value="vw">vw</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="cardHeight" className="block text-sm font-medium text-gray-300 mb-1">
              Height
            </label>
            <div className="flex">
              <input
                id="cardHeight"
                type="text"
                value={cardState.cardHeight}
                onChange={(e) => handleInputChange('cardHeight', e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={cardState.cardHeightUnit}
                onChange={(e) => handleInputChange('cardHeightUnit', e.target.value)}
                className="px-2 py-2 bg-gray-700 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="auto">auto</option>
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="rem">rem</option>
                <option value="em">em</option>
                <option value="vh">vh</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="cardPadding" className="block text-sm font-medium text-gray-300 mb-1">
              Padding
            </label>
            <div className="flex">
              <input
                id="cardPadding"
                type="text"
                value={cardState.cardPadding}
                onChange={(e) => handleInputChange('cardPadding', e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={cardState.cardPaddingUnit}
                onChange={(e) => handleInputChange('cardPaddingUnit', e.target.value)}
                className="px-2 py-2 bg-gray-700 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="rem">rem</option>
                <option value="em">em</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};