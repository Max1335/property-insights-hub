import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MapPin, Maximize, BedDouble, Filter, SlidersHorizontal, GitCompare } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useComparison } from "@/contexts/ComparisonContext";
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
  floor: number;
  total_floors: number;
  city: string;
  district: string;
  property_type: string;
  condition: string;
}

const images = [property1, property2, property3];

const ListingsData = () => {
  const { comparisonIds, addToComparison, isInComparison } = useComparison();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedRooms, setSelectedRooms] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [minYear, setMinYear] = useState("");

  useEffect(() => {
    fetchProperties();
  }, [selectedCity, selectedType, sortBy, selectedRooms, selectedCondition, minYear]);

  const fetchProperties = async () => {
    setLoading(true);
    
    let query = supabase
      .from('properties')
      .select('*')
      .eq('status', 'active')
      .gte('price', priceRange[0])
      .lte('price', priceRange[1]);

    if (selectedCity !== "all") {
      query = query.eq('city', selectedCity);
    }

    if (selectedType !== "all") {
      query = query.eq('property_type', selectedType);
    }

    if (selectedRooms !== "all") {
      query = query.eq('rooms', parseInt(selectedRooms));
    }

    if (selectedCondition !== "all") {
      query = query.eq('condition', selectedCondition);
    }

    if (minYear) {
      query = query.gte('building_year', parseInt(minYear));
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        query = query.order('price', { ascending: true });
        break;
      case "price-desc":
        query = query.order('price', { ascending: false });
        break;
      case "area":
        query = query.order('area', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (!error && data) {
      setProperties(data);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    fetchProperties();
    setShowFilters(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Property Listings</h1>
          <p className="text-muted-foreground">Browse all available properties across Ukrainian cities</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filters
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="lg:hidden">
                    Close
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">City</Label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="All cities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All cities</SelectItem>
                        <SelectItem value="Kyiv">Kyiv</SelectItem>
                        <SelectItem value="Kharkiv">Kharkiv</SelectItem>
                        <SelectItem value="Odesa">Odesa</SelectItem>
                        <SelectItem value="Dnipro">Dnipro</SelectItem>
                        <SelectItem value="Lviv">Lviv</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Property Type</Label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="mb-3 block">Price Range (UAH)</Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={20000000}
                      step={100000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₴{priceRange[0].toLocaleString()}</span>
                      <span>₴{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <Label>Rooms</Label>
                    <Select value={selectedRooms} onValueChange={setSelectedRooms}>
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Condition</Label>
                    <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="renovated">Renovated</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="minYear">Built After</Label>
                    <Input
                      id="minYear"
                      type="number"
                      placeholder="e.g. 2010"
                      value={minYear}
                      onChange={(e) => setMinYear(e.target.value)}
                    />
                  </div>
                  
                  <Button className="w-full" onClick={applyFilters}>Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
          </aside>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-sm text-muted-foreground">
                  {properties.length} properties found
                </span>
                {comparisonIds.length > 0 && (
                  <Link to="/compare">
                    <Button variant="default" size="sm">
                      <GitCompare className="h-4 w-4 mr-2" />
                      Compare ({comparisonIds.length})
                    </Button>
                  </Link>
                )}
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Newest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="area">Area</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {loading ? (
              <div className="text-center py-12">Loading properties...</div>
            ) : properties.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No properties found matching your criteria</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property, index) => (
                  <Link key={property.id} to={`/property/${property.id}`}>
                    <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border h-full">
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
                            <span>Floor {property.floor}/{property.total_floors}</span>
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
                          <div className="flex gap-2">
                            <Checkbox
                              checked={isInComparison(property.id)}
                              onCheckedChange={() => addToComparison(property.id)}
                              onClick={(e) => e.preventDefault()}
                            />
                            <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListingsData;
