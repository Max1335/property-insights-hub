import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Maximize, BedDouble, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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
  city: string;
  district: string;
  property_type: string;
}

interface Favorite {
  id: string;
  property_id: string;
  properties: Property;
}

const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    fetchFavorites();
  }, [user, navigate]);

  const fetchFavorites = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('favorites')
      .select(`
        id,
        property_id,
        properties (
          id,
          title,
          price,
          price_per_sqm,
          area,
          rooms,
          floor,
          total_floors,
          city,
          district,
          property_type
        )
      `)
      .eq('user_id', user.id);

    if (error) {
      toast.error("Failed to load favorites");
      console.error(error);
    } else {
      setFavorites(data as Favorite[]);
    }
    setLoading(false);
  };

  const removeFavorite = async (favoriteId: string) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', favoriteId);

    if (error) {
      toast.error("Failed to remove favorite");
    } else {
      toast.success("Removed from favorites");
      setFavorites(favorites.filter(f => f.id !== favoriteId));
    }
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
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Обране</h1>
          <p className="text-muted-foreground">
            Збережено {favorites.length} {favorites.length === 1 ? 'оголошення' : 'оголошень'}
          </p>
        </div>

        {favorites.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Поки що немає обраного</h3>
              <p className="text-muted-foreground mb-6">
                Додайте нерухомість до обраного, щоб побачити її тут
              </p>
              <Link to="/listings">
                <Button>Переглянути оголошення</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => {
              const property = favorite.properties;
              return (
                <Card key={favorite.id} className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={property1} 
                      alt={property.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-4 right-4 rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFavorite(favorite.id);
                      }}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                    <Badge variant="default" className="absolute top-4 left-4">
                      {property.property_type}
                    </Badge>
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
                              <span>{property.rooms} кімн</span>
                            </div>
                          )}
                          <span>Поверх {property.floor}/{property.total_floors}</span>
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
                          Детальніше
                        </Button>
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

export default Favorites;
