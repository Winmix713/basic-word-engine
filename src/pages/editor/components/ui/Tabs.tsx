import React from 'react';
import { Tabs as HeroUITabs, Tab } from "@heroui/react";

interface TabItem {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultSelectedKey?: string;
  className?: string;
  ariaLabel?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultSelectedKey,
  className = "",
  ariaLabel = "Options"
}) => {
  const [selectedKey, setSelectedKey] = React.useState<string>(defaultSelectedKey || tabs[0]?.key || "");

  return (
    <div className={`w-full ${className}`}>
      <HeroUITabs 
        aria-label={ariaLabel}
        selectedKey={selectedKey}
        onSelectionChange={setSelectedKey}
        className="w-full"
      >
        {tabs.map((tab) => (
          <Tab key={tab.key} title={tab.title}>
            <div className="py-4">
              {tab.content}
            </div>
          </Tab>
        ))}
      </HeroUITabs>
    </div>
  );
};