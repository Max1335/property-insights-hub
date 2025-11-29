import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { TrendingDown, TrendingUp } from "lucide-react";
import { format } from "date-fns";

interface PriceChange {
  id: string;
  changed_at: string;
  old_price: number;
  new_price: number;
}

export const PropertyPriceHistory = ({ propertyId }: { propertyId: string }) => {
  const [changes, setChanges] = useState<PriceChange[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPriceHistory();
  }, [propertyId]);

  const fetchPriceHistory = async () => {
    const { data, error } = await supabase
      .from('property_changes')
      .select('*')
      .eq('property_id', propertyId)
      .eq('change_type', 'price')
      .order('changed_at', { ascending: false })
      .limit(10);

    if (!error && data) {
      setChanges(data as PriceChange[]);
    }
    setLoading(false);
  };

  if (loading || changes.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Історія цін</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {changes.map((change) => {
            const priceDiff = change.new_price - change.old_price;
            const isIncrease = priceDiff > 0;
            
            return (
              <div key={change.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(change.changed_at), 'MMM d, yyyy')}
                  </p>
                  <p className="font-medium">
                    ₴{change.old_price.toLocaleString()} → ₴{change.new_price.toLocaleString()}
                  </p>
                </div>
                <div className={`flex items-center gap-1 ${isIncrease ? 'text-destructive' : 'text-green-600'}`}>
                  {isIncrease ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="font-medium">
                    {isIncrease ? '+' : ''}₴{Math.abs(priceDiff).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
