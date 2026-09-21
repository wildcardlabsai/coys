'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

function Tabs({
  defaultValue,
  value,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const activeTab = value ?? internalValue;

  const setActiveTab = React.useCallback(
    (tab: string) => {
      if (!value) setInternalValue(tab);
      onValueChange?.(tab);
    },
    [value, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800',
        className
      )}
      {...props}
    />
  );
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function TabsTrigger({ className, value, ...props }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => setActiveTab(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#132257] focus-visible:ring-offset-2',
        isActive
          ? 'bg-[#132257] text-white shadow-sm dark:bg-[#8DB7E0] dark:text-[#0B1428]'
          : 'text-[#6B7280] hover:text-[#132257] dark:text-gray-400 dark:hover:text-gray-200',
        className
      )}
      {...props}
    />
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabsContent({ className, value, ...props }: TabsContentProps) {
  const { activeTab } = useTabsContext();

  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      data-state={activeTab === value ? 'active' : 'inactive'}
      className={cn('mt-3 focus-visible:outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
