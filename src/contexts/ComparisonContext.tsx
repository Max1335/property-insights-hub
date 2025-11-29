import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface ComparisonContextType {
  comparisonIds: string[];
  addToComparison: (id: string) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  isInComparison: (id: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider = ({ children }: { children: React.ReactNode }) => {
  const [comparisonIds, setComparisonIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('property-comparison');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('property-comparison', JSON.stringify(comparisonIds));
  }, [comparisonIds]);

  const addToComparison = (id: string) => {
    if (comparisonIds.length >= 4) {
      toast.error("Maximum 4 properties can be compared");
      return;
    }
    if (!comparisonIds.includes(id)) {
      setComparisonIds([...comparisonIds, id]);
      toast.success("Added to comparison");
    }
  };

  const removeFromComparison = (id: string) => {
    setComparisonIds(comparisonIds.filter(cid => cid !== id));
    toast.success("Removed from comparison");
  };

  const clearComparison = () => {
    setComparisonIds([]);
    toast.success("Comparison cleared");
  };

  const isInComparison = (id: string) => comparisonIds.includes(id);

  return (
    <ComparisonContext.Provider value={{ 
      comparisonIds, 
      addToComparison, 
      removeFromComparison, 
      clearComparison, 
      isInComparison 
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
};
