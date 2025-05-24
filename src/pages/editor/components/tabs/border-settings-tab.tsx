import React from 'react';
import { Link } from 'lucide-react';

interface BorderSettingsTabProps {
  cardState: any;
  updateCardState: (updates: Record<string, any>) => void;
  handleBorderRadiusChange: (value: string, corner: string) => void;
}

export const BorderSettingsTab: React.FC<BorderSettingsTabProps> = ({
  cardState,
  updateCardState,
  handleBorderRadiusChange
}) => {
  // Toggle the border radius linking
  const toggleLinkBorderRadius = () => {
    updateCardState({ linkBorderRadius: !cardState.linkBorderRadius });
    
    // If we're turning on linking, set all corners to the top-left value
    if (!cardState.linkBorderRadius) {
      updateCardState({
        cardBorderRadiusTopRight: cardState.cardBorderRadiusTopLeft,
        cardBorderRadiusBottomLeft: cardState.cardBorderRadiusTopLeft,
        cardBorderRadiusBottomRight: cardState.cardBorderRadiusTopLeft
      });
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-4">Card Border</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cardBorderWidth" className="block text-sm font-medium text-gray-300 mb-1">
              Border Width (px)
            </label>
            <input
              id="cardBorderWidth"
              type="number"
              min="0"
              max="10"
              value={cardState.cardBorderWidth}
              onChange={(e) => updateCardState({ cardBorderWidth: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label htmlFor="cardBorderStyle" className="block text-sm font-medium text-gray-300 mb-1">
              Border Style
            </label>
            <select
              id="cardBorderStyle"
              value={cardState.cardBorderStyle}
              onChange={(e) => updateCardState({ cardBorderStyle: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="groove">Groove</option>
              <option value="ridge">Ridge</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="cardBorderColor" className="block text-sm font-medium text-gray-300 mb-1">
              Border Color
            </label>
            <div className="flex">
              <input
                type="color"
                id="cardBorderColor"
                value={cardState.cardBorderColor}
                onChange={(e) => updateCardState({ cardBorderColor: e.target.value })}
                className="w-10 h-10 rounded-l-md border-0"
              />
              <input
                type="text"
                value={cardState.cardBorderColor}
                onChange={(e) => updateCardState({ cardBorderColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="cardBorderOpacity" className="block text-sm font-medium text-gray-300 mb-1">
              Border Opacity
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                id="cardBorderOpacity"
                min="0"
                max="1"
                step="0.01"
                value={cardState.cardBorderOpacity}
                onChange={(e) => updateCardState({ cardBorderOpacity: e.target.value })}
                className="flex-1"
              />
              <span className="w-12 text-center">{Math.round(parseFloat(cardState.cardBorderOpacity) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6 border-t border-gray-700 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Border Radius</h3>
          <button
            onClick={toggleLinkBorderRadius}
            className={`p-2 rounded-md ${cardState.linkBorderRadius ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            title={cardState.linkBorderRadius ? "Unlink corners" : "Link corners"}
          >
            <Link size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cardBorderRadiusTopLeft" className="block text-sm font-medium text-gray-300 mb-1">
              Top Left
            </label>
            <div className="flex">
              <input
                id="cardBorderRadiusTopLeft"
                type="number"
                min="0"
                value={cardState.cardBorderRadiusTopLeft}
                onChange={(e) => handleBorderRadiusChange(e.target.value, "topLeft")}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={cardState.cardBorderRadiusUnit}
                onChange={(e) => updateCardState({ cardBorderRadiusUnit: e.target.value })}
                className="px-2 py-2 bg-gray-700 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="rem">rem</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="cardBorderRadiusTopRight" className="block text-sm font-medium text-gray-300 mb-1">
              Top Right
            </label>
            <input
              id="cardBorderRadiusTopRight"
              type="number"
              min="0"
              value={cardState.cardBorderRadiusTopRight}
              onChange={(e) => handleBorderRadiusChange(e.target.value, "topRight")}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={cardState.linkBorderRadius}
            />
          </div>
          
          <div>
            <label htmlFor="cardBorderRadiusBottomLeft" className="block text-sm font-medium text-gray-300 mb-1">
              Bottom Left
            </label>
            <input
              id="cardBorderRadiusBottomLeft"
              type="number"
              min="0"
              value={cardState.cardBorderRadiusBottomLeft}
              onChange={(e) => handleBorderRadiusChange(e.target.value, "bottomLeft")}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={cardState.linkBorderRadius}
            />
          </div>
          
          <div>
            <label htmlFor="cardBorderRadiusBottomRight" className="block text-sm font-medium text-gray-300 mb-1">
              Bottom Right
            </label>
            <input
              id="cardBorderRadiusBottomRight"
              type="number"
              min="0"
              value={cardState.cardBorderRadiusBottomRight}
              onChange={(e) => handleBorderRadiusChange(e.target.value, "bottomRight")}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={cardState.linkBorderRadius}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6 border-t border-gray-700 pt-4">
        <h3 className="text-lg font-medium text-white mb-4">Icon Border</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="iconSize" className="block text-sm font-medium text-gray-300 mb-1">
              Icon Size (px)
            </label>
            <input
              id="iconSize"
              type="number"
              min="16"
              max="128"
              value={cardState.iconSize}
              onChange={(e) => updateCardState({ iconSize: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label htmlFor="iconBorderRadius" className="block text-sm font-medium text-gray-300 mb-1">
              Icon Border Radius
            </label>
            <div className="flex">
              <input
                id="iconBorderRadius"
                type="number"
                min="0"
                value={cardState.iconBorderRadius}
                onChange={(e) => updateCardState({ iconBorderRadius: e.target.value })}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={cardState.iconBorderRadiusUnit}
                onChange={(e) => updateCardState({ iconBorderRadiusUnit: e.target.value })}
                className="px-2 py-2 bg-gray-700 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="rem">rem</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="iconBorderWidth" className="block text-sm font-medium text-gray-300 mb-1">
              Icon Border Width (px)
            </label>
            <input
              id="iconBorderWidth"
              type="number"
              min="0"
              max="10"
              value={cardState.iconBorderWidth}
              onChange={(e) => updateCardState({ iconBorderWidth: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label htmlFor="iconBorderStyle" className="block text-sm font-medium text-gray-300 mb-1">
              Icon Border Style
            </label>
            <select
              id="iconBorderStyle"
              value={cardState.iconBorderStyle}
              onChange={(e) => updateCardState({ iconBorderStyle: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="groove">Groove</option>
              <option value="ridge">Ridge</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="iconBorderColor" className="block text-sm font-medium text-gray-300 mb-1">
              Icon Border Color
            </label>
            <div className="flex">
              <input
                type="color"
                id="iconBorderColor"
                value={cardState.iconBorderColor}
                onChange={(e) => updateCardState({ iconBorderColor: e.target.value })}
                className="w-10 h-10 rounded-l-md border-0"
              />
              <input
                type="text"
                value={cardState.iconBorderColor}
                onChange={(e) => updateCardState({ iconBorderColor: e.target.value })}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="iconBorderOpacity" className="block text-sm font-medium text-gray-300 mb-1">
              Icon Border Opacity
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                id="iconBorderOpacity"
                min="0"
                max="1"
                step="0.01"
                value={cardState.iconBorderOpacity}
                onChange={(e) => updateCardState({ iconBorderOpacity: e.target.value })}
                className="flex-1"
              />
              <span className="w-12 text-center">{Math.round(parseFloat(cardState.iconBorderOpacity) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6 border-t border-gray-700 pt-4">
        <h3 className="text-lg font-medium text-white mb-4">Additional Properties</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cardOpacity" className="block text-sm font-medium text-gray-300 mb-1">
              Card Opacity
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                id="cardOpacity"
                min="1"
                max="100"
                step="1"
                value={cardState.cardOpacity}
                onChange={(e) => updateCardState({ cardOpacity: Number(e.target.value) })}
                className="flex-1"
              />
              <span className="w-12 text-center">{cardState.cardOpacity}%</span>
            </div>
          </div>
          
          <div>
            <label htmlFor="zIndex" className="block text-sm font-medium text-gray-300 mb-1">
              Z-Index
            </label>
            <input
              id="zIndex"
              type="number"
              min="-1"
              max="1000"
              value={cardState.zIndex}
              onChange={(e) => updateCardState({ zIndex: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label htmlFor="positionType" className="block text-sm font-medium text-gray-300 mb-1">
              Position Type
            </label>
            <select
              id="positionType"
              value={cardState.positionType}
              onChange={(e) => updateCardState({ positionType: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="relative">Relative</option>
              <option value="absolute">Absolute</option>
              <option value="fixed">Fixed</option>
              <option value="sticky">Sticky</option>
              <option value="static">Static</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};