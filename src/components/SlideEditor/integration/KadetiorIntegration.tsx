
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Settings, FileText, Layout } from 'lucide-react';
import KadetiorSystem from '../external/KadetiorSystem';
import { useToast } from '@/hooks/use-toast';

interface KadetiorIntegrationProps {
  onIntegrationUpdate?: (data: any) => void;
}

export const KadetiorIntegration: React.FC<KadetiorIntegrationProps> = ({
  onIntegrationUpdate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('components');
  const { toast } = useToast();

  const handleItemSelect = (item: any) => {
    console.log('Kadetior item selected:', item);
    if (onIntegrationUpdate) {
      onIntegrationUpdate(item);
    }
    toast({
      title: "Integration Updated",
      description: `Integrated ${item.name} into the slide editor`
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Kadetior Integration
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Kadetior System Integration</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="components" className="mt-4">
            <KadetiorSystem onItemSelect={handleItemSelect} />
          </TabsContent>
          
          <TabsContent value="templates" className="mt-4">
            <div className="text-center py-8 text-muted-foreground">
              Kadetior templates will be available here
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Integration Settings</h3>
              <p className="text-muted-foreground">
                Configure how the Kadetior system integrates with your slide editor.
              </p>
              <Button onClick={() => {
                toast({
                  title: "Settings Saved",
                  description: "Kadetior integration settings have been updated"
                });
              }}>
                Save Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default KadetiorIntegration;
