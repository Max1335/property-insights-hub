import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Maximize, BedDouble, Building2, Calendar, Phone, Mail, Heart, Share2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { usePropertyView } from "@/hooks/usePropertyView";
import { useFavorite } from "@/hooks/useFavorite";
import property1 from "@/assets/property-1.jpg";

const PropertyDetails = () => {
  const { id } = useParams();
  
  // Track property view
  usePropertyView(id);
  
  // Favorite functionality
  const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorite(id);
  
  const property = {
    id: 1,
    images: [property1, property1, property1],
    title: "Luxury Penthouse with Panoramic City View",
    price: "₴8,500,000",
    pricePerSqm: "₴65,385",
    area: "130 m²",
    rooms: 3,
    floor: "15/16",
    year: 2022,
    condition: "New Building",
    city: "Kyiv",
    district: "Pechersk",
    address: "15 Druzhby Narodiv Blvd",
    description: "Exclusive penthouse apartment with stunning panoramic views of the city. This modern property features high-end finishes, floor-to-ceiling windows, and an open-plan layout. Perfect for those seeking luxury living in the heart of Kyiv.",
    features: [
      "Parking Space",
      "24/7 Security",
      "Elevator",
      "Balcony",
      "Central Heating",
      "Air Conditioning",
      "Furnished",
      "Smart Home",
    ],
    seller: {
      name: "Premium Real Estate Agency",
      type: "Realtor",
      phone: "+380 44 123 4567",
      email: "contact@premiumrealestate.ua",
    },
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <Badge variant="default">New</Badge>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full"
                      onClick={toggleFavorite}
                      disabled={favoriteLoading}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current text-destructive' : ''}`} />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {property.images.slice(1, 4).map((img, idx) => (
                  <div key={idx} className="aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                    <img src={img} alt="" className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Property Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{property.title}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{property.address}, {property.district}, {property.city}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{property.price}</div>
                    <div className="text-sm text-muted-foreground">{property.pricePerSqm}/m²</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Maximize className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Area</div>
                      <div className="font-semibold">{property.area}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Rooms</div>
                      <div className="font-semibold">{property.rooms}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Floor</div>
                      <div className="font-semibold">{property.floor}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Year</div>
                      <div className="font-semibold">{property.year}</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </div>
                
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-3">Key Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-3">Location</h3>
                  <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Contact Seller</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold mb-1">{property.seller.name}</div>
                  <Badge variant="secondary">{property.seller.type}</Badge>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Phone className="mr-2 h-4 w-4" />
                    Show Phone
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground pt-4 border-t border-border">
                  By contacting the seller, you agree to our terms of service and privacy policy.
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Similar Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={property1} alt="" className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1 truncate">Modern Apartment</h4>
                      <div className="text-xs text-muted-foreground mb-2">Kyiv, Pechersk</div>
                      <div className="font-semibold text-primary">₴7,200,000</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetails;
