import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useComparison } from "@/contexts/ComparisonContext";
import { supabase } from "@/integrations/supabase/client";
import { X, ArrowLeft } from "lucide-react";
import property1 from "@/assets/property-1.jpg";

interface Property {
  id: string;
  title: string;
  price: number;
  price_per_sqm: number;
  area: number;
  rooms: number | null;
  floor: number;
  total_floors: number;
  building_year: number | null;
  condition: string | null;
  city: string;
  district: string;
  property_type: string;
  features: any;
}

const Compare = () => {
  const { comparisonIds, removeFromComparison, clearComparison } = useComparison();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (comparisonIds.length === 0) {
      setLoading(false);
      return;
    }
    fetchProperties();
  }, [comparisonIds]);

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .in('id', comparisonIds);

    if (!error && data) {
      setProperties(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (comparisonIds.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold mb-2">No properties to compare</h3>
              <p className="text-muted-foreground mb-6">
                Add properties to comparison from listings
              </p>
              <Button onClick={() => navigate('/listings')}>Browse Properties</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const compareFields: Array<{
    label: string;
    key: keyof Property;
    format: (v: any, p?: Property) => string;
  }> = [
    { label: "Price", key: "price", format: (v: number) => `₴${v.toLocaleString()}` },
    { label: "Price per m²", key: "price_per_sqm", format: (v: number) => `₴${v.toLocaleString()}` },
    { label: "Area", key: "area", format: (v: number) => `${v} m²` },
    { label: "Rooms", key: "rooms", format: (v: number | null) => v ? v.toString() : "N/A" },
    { label: "Floor", key: "floor", format: (v: number, p?: Property) => p ? `${v}/${p.total_floors}` : v.toString() },
    { label: "Building Year", key: "building_year", format: (v: number | null) => v ? v.toString() : "N/A" },
    { label: "Condition", key: "condition", format: (v: string | null) => v || "N/A" },
    { label: "Location", key: "city", format: (v: string, p?: Property) => p ? `${v}, ${p.district}` : v },
    { label: "Type", key: "property_type", format: (v: string) => v },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-display font-bold">Compare Properties</h1>
            <p className="text-muted-foreground">{properties.length} properties selected</p>
          </div>
          <Button variant="outline" onClick={clearComparison}>
            Clear All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
              {/* Header row with images */}
              <div></div>
              {properties.map((property) => (
                <Card key={property.id} className="relative">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full"
                    onClick={() => removeFromComparison(property.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <img 
                    src={property1} 
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2 mb-2">{property.title}</h3>
                  </CardContent>
                </Card>
              ))}

              {/* Comparison rows */}
              {compareFields.map((field) => (
                <>
                  <div key={`label-${field.key}`} className="flex items-center p-4 bg-muted/50 rounded-lg font-medium">
                    {field.label}
                  </div>
                  {properties.map((property) => (
                    <div key={`${property.id}-${field.key}`} className="flex items-center p-4 border rounded-lg">
                      {field.format((property as any)[field.key], property)}
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
