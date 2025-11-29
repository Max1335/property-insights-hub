import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Maximize, BedDouble, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import property1 from "@/assets/property-1.jpg";
import { format } from "date-fns";

interface ViewRecord {
  id: string;
  viewed_at: string;
  properties: {
    id: string;
    title: string;
    price: number;
    price_per_sqm: number;
    area: number;
    rooms: number | null;
    city: string;
    district: string;
    property_type: string;
  };
}

const ViewHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<ViewRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchHistory();
  }, [user, navigate]);

  const fetchHistory = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('property_views')
      .select(`
        id,
        viewed_at,
        properties (
          id,
          title,
          price,
          price_per_sqm,
          area,
          rooms,
          city,
          district,
          property_type
        )
      `)
      .eq('user_id', user.id)
      .order('viewed_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      setHistory(data as ViewRecord[]);
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">View History</h1>
          <p className="text-muted-foreground">
            Recently viewed properties
          </p>
        </div>

        {history.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No viewing history</h3>
              <p className="text-muted-foreground mb-6">
                Start browsing properties to build your history
              </p>
              <Link to="/listings">
                <Button>Browse Properties</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((record) => {
              const property = record.properties;
              return (
                <Card key={record.id} className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={property1} 
                      alt={property.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge variant="default" className="absolute top-4 right-4">
                      {property.property_type}
                    </Badge>
                    <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-background/90 rounded-full px-3 py-1 text-xs">
                      <Clock className="h-3 w-3" />
                      {format(new Date(record.viewed_at), 'MMM d, HH:mm')}
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <Link to={`/property/${property.id}`}>
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
                          <div className="text-2xl font-bold">
                            ₴{property.price.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ₴{property.price_per_sqm?.toLocaleString()}/m²
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ViewHistory;
