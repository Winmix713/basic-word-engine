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
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">CSS Code</h3>
          <div className="flex items-center gap-4">
            <Checkbox 
              isSelected={minifyCss}
              onValueChange={setMinifyCss}
              size="sm"
              color="secondary"
            >
              Minify CSS
            </Checkbox>
            
            <Checkbox 
              isSelected={includePrefixes}
              onValueChange={setIncludePrefixes}
              size="sm"
              color="secondary"
            >
              Include vendor prefixes
            </Checkbox>
            
            <Button 
              color="primary" 
              endContent={<Icon icon={copied ? "lucide:check" : "lucide:clipboard"} />}
              onPress={handleCopy}
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
        
        <Divider className="my-4 bg-white/10" />
        
        <div className="text-white/70 text-sm">
          <h4 className="font-medium mb-2">How to use this CSS:</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>Copy the CSS code above</li>
            <li>Paste it into your CSS file or style tag</li>
            <li>Add the appropriate class names to your HTML elements:</li>
          </ol>
          <div className="mt-2 p-3 bg-[#0d0d21]/50 rounded border border-white/10">
            <code className="text-xs text-white/80 font-mono">
              &lt;div class="card-container"&gt;<br/>
              &nbsp;&nbsp;&lt;div class="card obsidian-card"&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="card-icon obsidian-icon"&gt;...&lt;/div&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="card-content"&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h3&gt;{cssCode.includes('title') ? 'Card Title' : 'Obsidian'}&lt;/h3&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;{cssCode.includes('description') ? 'Card Description' : 'Capture information and manage tasks.'}&lt;/p&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="card-image obsidian-card-image"&gt;...&lt;/div&gt;<br/>
              &nbsp;&nbsp;&lt;/div&gt;<br/>
              &lt;/div&gt;
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};