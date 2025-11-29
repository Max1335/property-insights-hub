import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Maximize, BedDouble, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

interface Property {
  id: string;
  title: string;
  price: number;
  price_per_sqm: number;
  area: number;
  rooms: number | null;
  city: string;
  district: string;
  property_type: string;
  status: string;
}

const images = [property1, property2, property3];

const FeaturedListingsData = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('id, title, price, price_per_sqm, area, rooms, city, district, property_type, status')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(3);

    if (!error && data) {
      setProperties(data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading properties...</div>;
  }

  return (
    <section className="container mx-auto px-4 py-16 bg-muted/30">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Featured Properties
          </h2>
          <p className="text-lg text-muted-foreground">
            Handpicked listings worth your attention
          </p>
        </div>
        <Link to="/listings">
          <Button variant="outline" className="hidden md:flex items-center gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <Link key={property.id} to={`/property/${property.id}`}>
            <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={images[index % images.length]} 
                  alt={property.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <Badge variant="default" className="absolute top-4 right-4">
                  {property.property_type}
                </Badge>
              </div>
              
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-1">
                  {property.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{property.city}, {property.district}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Maximize className="h-4 w-4" />
                      <span>{property.area} m²</span>
                    </div>
                    {property.rooms && (
                      <div className="flex items-center gap-1">
                        <BedDouble className="h-4 w-4" />
                        <span>{property.rooms} rooms</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-baseline justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      ₴{property.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ₴{property.price_per_sqm?.toLocaleString()}/m²
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 text-center md:hidden">
        <Link to="/listings">
          <Button variant="outline" className="w-full">
            View All Properties
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedListingsData;
