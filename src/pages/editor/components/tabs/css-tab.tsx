import React, { useState, useEffect } from 'react';
import { Button } from "@heroui/react";
import { Icon } from '@iconify/react';

interface CssTabProps {
  cardState: any;
  updateCardState: (updates: Record<string, any>) => void;
  generateCssCode: () => string;
}

export const CssTab: React.FC<CssTabProps> = ({
  cardState,
  updateCardState,
  generateCssCode
}) => {
  const [cssCode, setCssCode] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Regenerate CSS when any property changes
  useEffect(() => {
    setCssCode(generateCssCode());
  }, [cardState, generateCssCode]);

  // Copy CSS to clipboard
  const handleCopyClick = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Generated CSS</h3>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="minifyCss"
              checked={cardState.minifyCss}
              onChange={(e) => updateCardState({ minifyCss: e.target.checked })}
              className="w-4 h-4 text-purple-600 rounded border-gray-700 focus:ring-purple-500"
            />
            <label htmlFor="minifyCss" className="text-sm text-gray-300">
              Minify CSS
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="includePrefixes"
              checked={cardState.includePrefixes}
              onChange={(e) => updateCardState({ includePrefixes: e.target.checked })}
              className="w-4 h-4 text-purple-600 rounded border-gray-700 focus:ring-purple-500"
            />
            <label htmlFor="includePrefixes" className="text-sm text-gray-300">
              Include vendor prefixes
            </label>
          </div>
          
          <Button 
            color="primary" 
            endContent={<Icon icon={copied ? "lucide:check" : "lucide:clipboard"} />}
            onPress={handleCopyClick}
            size="sm"
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </div>
      </div>
      
      <div className="bg-[#0d0d21] p-4 rounded-lg border border-white/10 overflow-auto max-h-[400px]">
        <pre className="text-white/80 text-sm whitespace-pre-wrap font-mono">
          {cssCode}
        </pre>
      </div>
    </div>
  );
};