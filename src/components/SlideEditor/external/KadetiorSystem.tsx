
import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { useToast } from '@/hooks/use-toast';

interface KadetiorItem {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  category: string;
  description: string;
  createdAt: Date;
}

interface KadetiorSystemProps {
  onItemSelect?: (item: KadetiorItem) => void;
  className?: string;
}

export const KadetiorSystem: React.FC<KadetiorSystemProps> = ({ 
  onItemSelect, 
  className = "" 
}) => {
  const [items, setItems] = useState<KadetiorItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadKadetiorData();
  }, []);

  const loadKadetiorData = async () => {
    setLoading(true);
    try {
      // Simulate loading external data
      const mockData: KadetiorItem[] = [
        {
          id: '1',
          name: 'Kadetior Element 1',
          status: 'active',
          category: 'presentation',
          description: 'Advanced presentation component',
          createdAt: new Date()
        },
        {
          id: '2',
          name: 'Kadetior Element 2',
          status: 'pending',
          category: 'layout',
          description: 'Dynamic layout system',
          createdAt: new Date()
        }
      ];
      
      setItems(mockData);
      toast({
        title: "Kadetior System Loaded",
        description: "External system components are now available"
      });
    } catch (error) {
      console.error('Error loading Kadetior data:', error);
      toast({
        title: "Error",
        description: "Failed to load Kadetior system",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];

  const handleItemClick = (item: KadetiorItem) => {
    if (onItemSelect) {
      onItemSelect(item);
    }
    toast({
      title: "Item Selected",
      description: `Selected: ${item.name}`
    });
  };

  const getStatusColor = (status: KadetiorItem['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`kadetior-system space-y-4 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle>Kadetior System Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading Kadetior components...</div>
          ) : (
            <div className="grid gap-3">
              {filteredItems.map(item => (
                <Card 
                  key={item.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleItemClick(item)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{item.name}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Category: {item.category}</span>
                          <span>•</span>
                          <span>Created: {item.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredItems.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No components found matching your criteria
                </div>
              )}
            </div>
          )}

          <Button 
            onClick={loadKadetiorData} 
            disabled={loading}
            className="w-full"
          >
            Refresh Kadetior Components
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default KadetiorSystem;
