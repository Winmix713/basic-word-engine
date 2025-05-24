import React from 'react';
import { Button, Checkbox, Divider } from "@heroui/react";
import { Icon } from '@iconify/react';

interface CssCodePanelProps {
  cssCode: string;
  minifyCss: boolean;
  setMinifyCss: (value: boolean) => void;
  includePrefixes: boolean;
  setIncludePrefixes: (value: boolean) => void;
}

export const CssCodePanel: React.FC<CssCodePanelProps> = ({
  cssCode,
  minifyCss,
  setMinifyCss,
  includePrefixes,
  setIncludePrefixes
}) => {
  // Copy CSS to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(cssCode)
      .then(() => {
        // Show success message or toast
        console.log('CSS copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy CSS: ', err);
      });
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Icon icon="lucide:code" />
            CSS Code
          </h3>
          <div className="flex gap-2">
            <Button 
              color="primary" 
              endContent={<Icon icon="lucide:clipboard" />}
              onPress={handleCopyToClipboard}
            >
              Copy to Clipboard
            </Button>
            <Button 
              variant="flat"
              color="default"
              endContent={<Icon icon="lucide:download" />}
              onPress={() => {
                const blob = new Blob([cssCode], { type: 'text/css' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'card-styles.css';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="bg-[#1e1e30]"
            >
              Download
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <Checkbox 
            isSelected={minifyCss}
            onValueChange={setMinifyCss}
            color="secondary"
          >
            Minify CSS
          </Checkbox>
          <Checkbox 
            isSelected={includePrefixes}
            onValueChange={setIncludePrefixes}
            color="secondary"
          >
            Include vendor prefixes
          </Checkbox>
        </div>
        
        <Divider className="bg-white/10" />
        
        <div className="bg-[#0d0d21] p-4 rounded-lg border border-white/10 overflow-auto max-h-[400px]">
          <pre className="text-white/80 text-sm whitespace-pre-wrap font-mono">
            {cssCode}
          </pre>
        </div>
      </div>
    </div>
  );
};