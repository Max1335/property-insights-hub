import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Maximize, BedDouble, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const featuredProperties = [
  {
    id: 1,
    image: property1,
    title: "Розкішний пентхаус з панорамним видом на місто",
    price: "₴8,500,000",
    pricePerSqm: "₴65,385",
    area: "130 м²",
    rooms: 3,
    city: "Київ",
    district: "Печерськ",
    badge: "Нове",
    badgeVariant: "default" as const,
  },
  {
    id: 2,
    image: property2,
    title: "Сучасний офісний простір у бізнес-центрі",
    price: "₴12,000,000",
    pricePerSqm: "₴40,000",
    area: "300 м²",
    rooms: null,
    city: "Київ",
    district: "Поділ",
    badge: "Топ",
    badgeVariant: "destructive" as const,
  },
  {
    id: 3,
    image: property3,
    title: "Відремонтована 2-кімнатна квартира",
    price: "₴3,250,000",
    pricePerSqm: "₴50,000",
    area: "65 м²",
    rooms: 2,
    city: "Львів",
    district: "Сихів",
    badge: "Знижка",
    badgeVariant: "secondary" as const,
  },
];

const FeaturedListings = () => {
  return (
    <section className="container mx-auto px-4 py-16 bg-muted/30">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Рекомендовані оголошення
          </h2>
          <p className="text-lg text-muted-foreground">
            Відібрані пропозиції, що заслуговують на вашу увагу
          </p>
        </div>
        <Link to="/listings">
          <Button variant="outline" className="hidden md:flex items-center gap-2">
            Дивитись всі
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProperties.map((property) => (
          <Link key={property.id} to={`/property/${property.id}`}>
            <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <Badge 
                  variant={property.badgeVariant} 
                  className="absolute top-4 right-4"
                >
                  {property.badge}
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
                      <span>{property.area}</span>
                    </div>
                    {property.rooms && (
                      <div className="flex items-center gap-1">
                        <BedDouble className="h-4 w-4" />
                        <span>{property.rooms} кімн</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-baseline justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {property.price}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {property.pricePerSqm}/m²
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Детальніше
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
            Дивитись всі оголошення
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedListings;
