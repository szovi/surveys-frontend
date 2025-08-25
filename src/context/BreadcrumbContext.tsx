import React, { createContext, useContext, useState, type ReactNode } from "react";

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbContextType {
  breadcrumbItems: BreadcrumbItem[]
  setBreadcrumbItems: (items: BreadcrumbItem[]) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const BreadcrumbProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([])
  return (
    <BreadcrumbContext.Provider value={{ breadcrumbItems, setBreadcrumbItems }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }

  return context
}
