import React from 'react';
import { Button } from '../ui/Button';

interface ShadowsTabProps {
  cardState: any;
  updateCardState: (updates: Record<string, any>) => void;
  addToHistory: (state: Record<string, any>) => void;
  applyPreset: (presetId: string) => void;
}

export const ShadowsTab: React.FC<ShadowsTabProps> = ({
  cardState,
  updateCardState,
  addToHistory,
  applyPreset
}) => {
  // Save current shadow settings before changing them
  const saveShadowHistory = () => {
    addToHistory({
      shadowColor: cardState.shadowColor,
      shadowOpacity: cardState.shadowOpacity,
      shadowX: cardState.shadowX,
      shadowY: cardState.shadowY,
      shadowBlur: cardState.shadowBlur,
      shadowSpread: cardState.shadowSpread,
      shadowInset: cardState.shadowInset,
      useSecondShadow: cardState.useSecondShadow,
      shadow2Color: cardState.shadow2Color,
      shadow2Opacity: cardState.shadow2Opacity,
      shadow2X: cardState.shadow2X,
      shadow2Y: cardState.shadow2Y,
      shadow2Blur: cardState.shadow2Blur,
      shadow2Spread: cardState.shadow2Spread,
      shadow2Inset: cardState.shadow2Inset
    });
  };

  return (
    <div className="space-y-6 text-white">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-4">Shadow Presets</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button
            onClick={() => applyPreset('default')}
            className="p-4 h-20 rounded-lg bg-gray-800 hover:bg-gray-700 border border-purple-500 transition-colors"
          >
            <div className="text-center">
              <div className="text-sm font-medium">Default</div>
              <div className="text-xs text-gray-400">Soft drop shadow</div>
            </div>
          </button>
          
          <button
            onClick={() => applyPreset('flat')}
            className="p-4 h-20 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-sm font-medium">Flat</div>
              <div className="text-xs text-gray-400">No shadow, border only</div>
            </div>
          </button>
          
          <button
            onClick={() => applyPreset('glass')}
            className="p-4 h-20 rounded-lg bg-gray-800 hover:bg-gray-700 border border-white/20 transition-colors"
          >
            <div className="text-center">
              <div className="text-sm font-medium">Glass</div>
              <div className="text-xs text-gray-400">Frosted glass effect</div>
            </div>
          </button>
          
          <button
            onClick={() => applyPreset('neumorphism')}
            className="p-4 h-20 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-sm font-medium">Neumorphism</div>
              <div className="text-xs text-gray-400">Soft UI effect</div>
            </div>
          </button>
          
          <button
            onClick={() => applyPreset('material')}
            className="p-4 h-20 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-sm font-medium">Material</div>
              <div className="text-xs text-gray-400">Multi-layered shadow</div>
            </div>
          </button>
        </div>
      </div>
      
      <div className="mb-6 border-t border-gray-700 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Primary Shadow</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Shadow Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={cardState.shadowColor}
                onChange={(e) => {
                  saveShadowHistory();
                  updateCardState({ shadowColor: e.target.value });
                }}
                className="w-10 h-10 rounded-l-md border-0"
              />
              <input
                type="text"
                value={cardState.shadowColor}
                onChange={(e) => {
                  saveShadowHistory();
                  updateCardState({ shadowColor: e.target.value });
                }}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Shadow Opacity
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={cardState.shadowOpacity}
                onChange={(e) => {
                  saveShadowHistory();
                  updateCardState({ shadowOpacity: e.target.value });
                }}
                className="flex-1"
              />
              <span className="w-12 text-center">{Math.round(parseFloat(cardState.shadowOpacity) * 100)}%</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              X Offset (px)
            </label>
            <input
              type="number"
              value={cardState.shadowX}
              onChange={(e) => {
                saveShadowHistory();
                updateCardState({ shadowX: e.target.value });
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Y Offset (px)
            </label>
            <input
              type="number"
              value={cardState.shadowY}
              onChange={(e) => {
                saveShadowHistory();
                updateCardState({ shadowY: e.target.value });
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Blur Radius (px)
            </label>
            <input
              type="number"
              min="0"
              value={cardState.shadowBlur}
              onChange={(e) => {
                saveShadowHistory();
                updateCardState({ shadowBlur: e.target.value });
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Spread Radius (px)
            </label>
            <input
              type="number"
              value={cardState.shadowSpread}
              onChange={(e) => {
                saveShadowHistory();
                updateCardState({ shadowSpread: e.target.value });
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="shadowInset"
              checked={cardState.shadowInset}
              onChange={(e) => {
                saveShadowHistory();
                updateCardState({ shadowInset: e.target.checked });
              }}
              className="w-4 h-4 text-purple-600 rounded border-gray-700 focus:ring-purple-500"
            />
            <label htmlFor="shadowInset" className="text-sm font-medium text-gray-300">
              Inset Shadow
            </label>
          </div>
        </div>
        
        <div className="mt-4 p-6 bg-gray-800 rounded-md flex justify-center">
          <div className="w-32 h-32 bg-white/10 rounded-md" style={{
            boxShadow: `${cardState.shadowInset ? 'inset ' : ''}${cardState.shadowX}px ${cardState.shadowY}px ${cardState.shadowBlur}px ${cardState.shadowSpread}px rgba(${hexToRgb(cardState.shadowColor)}, ${cardState.shadowOpacity})`
          }}></div>
        </div>
      </div>
      
      <div className="mb-6 border-t border-gray-700 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Secondary Shadow</h3>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="useSecondShadow"
              checked={cardState.useSecondShadow}
              onChange={(e) => {
                saveShadowHistory();
                updateCardState({ useSecondShadow: e.target.checked });
              }}
              className="w-4 h-4 text-purple-600 rounded border-gray-700 focus:ring-purple-500"
            />
            <label htmlFor="useSecondShadow" className="text-sm font-medium text-gray-300">
              Enable Second Shadow
            </label>
          </div>
        </div>
        
        {cardState.useSecondShadow && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Shadow Color
              </label>
              <div className="flex">
                <input
                  type="color"
                  value={cardState.shadow2Color}
                  onChange={(e) => {
                    saveShadowHistory();
                    updateCardState({ shadow2Color: e.target.value });
                  }}
                  className="w-10 h-10 rounded-l-md border-0"
                />
                <input
                  type="text"
                  value={cardState.shadow2Color}
                  onChange={(e) => {
                    saveShadowHistory();
                    updateCardState({ shadow2Color: e.target.value });
                  }}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Shadow Opacity
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={cardState.shadow2Opacity}
                  onChange={(e) => {
                    saveShadowHistory();
                    updateCardState({ shadow2Opacity: e.target.value });
                  }}
                  className="flex-1"
                />
                <span className="w-12 text-center">{Math.round(parseFloat(cardState.shadow2Opacity) * 100)}%</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                X Offset (px)
              </label>
              <input
                type="number"
                value={cardState.shadow2X}
                onChange={(e) => {
                  saveShadowHistory();
                  updateCardState({ shadow2X: e.target.value });
                }}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Y Offset (px)
              </label>
              <input
                type="number"
                value={cardState.shadow2Y}
                onChange={(e) => {
                  saveShadowHistory();
                  updateCardState({ shadow2Y: e.target.value });
                }}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Blur Radius (px)
              </label>
              <input
                type="number"
                min="0"
                value={cardState.shadow2Blur}
                onChange={(e) => {
                  saveShadowHistory();
                  updateCardState({ shadow2Blur: e.target.value });
                }}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Spread Radius (px)
              </label>
              <input
                type="number"
                value={cardState.shadow2Spread}
                onChange={(e) => {
                  saveShadowHistory();
                  updateCardState({ shadow2Spread: e.target.value });
                }}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="shadow2Inset"
                checked={cardState.shadow2Inset}
                onChange={(e) => {
                  saveShadowHistory();
                  updateCardState({ shadow2Inset: e.target.checked });
                }}
                className="w-4 h-4 text-purple-600 rounded border-gray-700 focus:ring-purple-500"
              />
              <label htmlFor="shadow2Inset" className="text-sm font-medium text-gray-300">
                Inset Shadow
              </label>
            </div>
          </div>
        )}
        
        {cardState.useSecondShadow && (
          <div className="mt-4 p-6 bg-gray-800 rounded-md flex justify-center">
            <div className="w-32 h-32 bg-white/10 rounded-md" style={{
              boxShadow: `${cardState.shadow2Inset ? 'inset ' : ''}${cardState.shadow2X}px ${cardState.shadow2Y}px ${cardState.shadow2Blur}px ${cardState.shadow2Spread}px rgba(${hexToRgb(cardState.shadow2Color)}, ${cardState.shadow2Opacity})`
            }}></div>
          </div>
        )}
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