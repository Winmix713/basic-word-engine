import React from 'react';

interface BackgroundTabProps {
  cardState: any;
  updateCardState: (updates: Record<string, any>) => void;
  addToHistory: (state: Record<string, any>) => void;
}

export const BackgroundTab: React.FC<BackgroundTabProps> = ({
  cardState,
  updateCardState,
  addToHistory
}) => {
  // Save current background settings before changing them
  const saveBackgroundHistory = () => {
    addToHistory({
      bgGradientFrom: cardState.bgGradientFrom,
      bgGradientTo: cardState.bgGradientTo,
      bgOpacityFrom: cardState.bgOpacityFrom,
      bgOpacityTo: cardState.bgOpacityTo,
      iconGradientFrom: cardState.iconGradientFrom,
      iconGradientTo: cardState.iconGradientTo,
      cardImageGradientFrom: cardState.cardImageGradientFrom,
      cardImageGradientVia: cardState.cardImageGradientVia,
      cardImageGradientTo: cardState.cardImageGradientTo
    });
  };

  return (
    <div className="space-y-6 text-white">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-4">Card Background Gradient</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              From Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={cardState.bgGradientFrom}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ bgGradientFrom: e.target.value });
                }}
                className="w-10 h-10 rounded-l-md border-0"
              />
              <input
                type="text"
                value={cardState.bgGradientFrom}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ bgGradientFrom: e.target.value });
                }}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              From Opacity
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={cardState.bgOpacityFrom}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ bgOpacityFrom: e.target.value });
                }}
                className="flex-1"
              />
              <span className="w-12 text-center">{Math.round(parseFloat(cardState.bgOpacityFrom) * 100)}%</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              To Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={cardState.bgGradientTo}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ bgGradientTo: e.target.value });
                }}
                className="w-10 h-10 rounded-l-md border-0"
              />
              <input
                type="text"
                value={cardState.bgGradientTo}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ bgGradientTo: e.target.value });
                }}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              To Opacity
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={cardState.bgOpacityTo}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ bgOpacityTo: e.target.value });
                }}
                className="flex-1"
              />
              <span className="w-12 text-center">{Math.round(parseFloat(cardState.bgOpacityTo) * 100)}%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gray-800 rounded-md">
          <div className="w-full h-16 rounded-md" style={{
            background: `radial-gradient(86.88% 75.47% at 50.00% 24.53%, rgba(${hexToRgb(cardState.bgGradientFrom)}, ${cardState.bgOpacityFrom}), rgba(${hexToRgb(cardState.bgGradientTo)}, ${cardState.bgOpacityTo}))`
          }}></div>
          <p className="text-xs text-gray-400 mt-2 text-center">Background Preview</p>
        </div>
      </div>
      
      <div className="mb-6 border-t border-gray-700 pt-4">
        <h3 className="text-lg font-medium text-white mb-4">Icon Gradient</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              From Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={cardState.iconGradientFrom}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ iconGradientFrom: e.target.value });
                }}
                className="w-10 h-10 rounded-l-md border-0"
              />
              <input
                type="text"
                value={cardState.iconGradientFrom}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ iconGradientFrom: e.target.value });
                }}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              To Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={cardState.iconGradientTo}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ iconGradientTo: e.target.value });
                }}
                className="w-10 h-10 rounded-l-md border-0"
              />
              <input
                type="text"
                value={cardState.iconGradientTo}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ iconGradientTo: e.target.value });
                }}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gray-800 rounded-md">
          <div className="w-full h-16 rounded-md" style={{
            background: `linear-gradient(to bottom right, ${cardState.iconGradientFrom}, ${cardState.iconGradientTo})`
          }}></div>
          <p className="text-xs text-gray-400 mt-2 text-center">Icon Gradient Preview</p>
        </div>
      </div>
      
      <div className="mb-6 border-t border-gray-700 pt-4">
        <h3 className="text-lg font-medium text-white mb-4">Card Image Gradient</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              From Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={cardState.cardImageGradientFrom}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ cardImageGradientFrom: e.target.value });
                }}
                className="w-10 h-10 rounded-l-md border-0"
              />
              <input
                type="text"
                value={cardState.cardImageGradientFrom}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ cardImageGradientFrom: e.target.value });
                }}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Via Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={cardState.cardImageGradientVia}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ cardImageGradientVia: e.target.value });
                }}
                className="w-10 h-10 rounded-l-md border-0"
              />
              <input
                type="text"
                value={cardState.cardImageGradientVia}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ cardImageGradientVia: e.target.value });
                }}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              To Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={cardState.cardImageGradientTo}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ cardImageGradientTo: e.target.value });
                }}
                className="w-10 h-10 rounded-l-md border-0"
              />
              <input
                type="text"
                value={cardState.cardImageGradientTo}
                onChange={(e) => {
                  saveBackgroundHistory();
                  updateCardState({ cardImageGradientTo: e.target.value });
                }}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gray-800 rounded-md">
          <div className="w-full h-16 rounded-md" style={{
            background: `linear-gradient(to bottom right, ${cardState.cardImageGradientFrom}, ${cardState.cardImageGradientVia}, ${cardState.cardImageGradientTo})`
          }}></div>
          <p className="text-xs text-gray-400 mt-2 text-center">Card Image Gradient Preview</p>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert hex to rgb
function hexToRgb(hex: string) {
  // Remove the # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}