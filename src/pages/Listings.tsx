import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MapPin, Maximize, BedDouble, Filter, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const allProperties = [
  {
    id: 1,
    image: property1,
    title: "Luxury Penthouse with City View",
    price: "₴8,500,000",
    pricePerSqm: "₴65,385",
    area: "130 m²",
    rooms: 3,
    floor: "15/16",
    city: "Kyiv",
    district: "Pechersk",
    badge: "New",
    badgeVariant: "default" as const,
  },
  {
    id: 2,
    image: property2,
    title: "Modern Office Space in Business Center",
    price: "₴12,000,000",
    pricePerSqm: "₴40,000",
    area: "300 m²",
    rooms: null,
    floor: "8/20",
    city: "Kyiv",
    district: "Podil",
    badge: "Hot",
    badgeVariant: "destructive" as const,
  },
  {
    id: 3,
    image: property3,
    title: "Renovated 2-Room Apartment",
    price: "₴3,250,000",
    pricePerSqm: "₴50,000",
    area: "65 m²",
    rooms: 2,
    floor: "5/9",
    city: "Lviv",
    district: "Sykhiv",
    badge: "Price Drop",
    badgeVariant: "secondary" as const,
  },
  {
    id: 4,
    image: property1,
    title: "Spacious 3-Room Apartment",
    price: "₴4,200,000",
    pricePerSqm: "₴48,000",
    area: "87.5 m²",
    rooms: 3,
    floor: "7/12",
    city: "Kharkiv",
    district: "Saltivka",
    badge: "Verified",
    badgeVariant: "secondary" as const,
  },
  {
    id: 5,
    image: property3,
    title: "Cozy Studio Near Metro",
    price: "₴1,850,000",
    pricePerSqm: "₴52,857",
    area: "35 m²",
    rooms: 1,
    floor: "3/10",
    city: "Odesa",
    district: "Arcadia",
    badge: "New",
    badgeVariant: "default" as const,
  },
  {
    id: 6,
    image: property2,
    title: "Premium Office with Parking",
    price: "₴18,500,000",
    pricePerSqm: "₴37,000",
    area: "500 m²",
    rooms: null,
    floor: "12/25",
    city: "Dnipro",
    district: "Center",
    badge: "Hot",
    badgeVariant: "destructive" as const,
  },
];

const Listings = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Оголошення нерухомості</h1>
          <p className="text-muted-foreground">Перегляньте всі доступні об'єкти в українських містах</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Фільтри
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="lg:hidden">
                    Закрити
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Місто</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Всі міста" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Всі міста</SelectItem>
                        <SelectItem value="kyiv">Київ</SelectItem>
                        <SelectItem value="kharkiv">Харків</SelectItem>
                        <SelectItem value="odesa">Одеса</SelectItem>
                        <SelectItem value="dnipro">Дніпро</SelectItem>
                        <SelectItem value="lviv">Львів</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Тип нерухомості</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Всі типи" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Всі типи</SelectItem>
                        <SelectItem value="apartment">Квартира</SelectItem>
                        <SelectItem value="house">Будинок</SelectItem>
                        <SelectItem value="commercial">Комерційна</SelectItem>
                        <SelectItem value="office">Офіс</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="mb-3 block">Діапазон цін (грн)</Label>
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
                    <Label className="mb-3 block">Кімнат</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, "5+"].map((num) => (
                        <Button key={num} variant="outline" size="sm" className="w-full">
                          {num}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-3 block">Стан</Label>
                    <div className="space-y-2">
                      {["Новобудова", "Після ремонту", "Добрий", "Потребує ремонту"].map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox id={condition} />
                          <label htmlFor={condition} className="text-sm cursor-pointer">
                            {condition}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full">Застосувати фільтри</Button>
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
                  Фільтри
                </Button>
                <span className="text-sm text-muted-foreground">
                  Знайдено {allProperties.length} оголошень
                </span>
              </div>
              
              <Select defaultValue="date">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Спочатку нові</SelectItem>
                  <SelectItem value="price-asc">Ціна: від низької</SelectItem>
                  <SelectItem value="price-desc">Ціна: від високої</SelectItem>
                  <SelectItem value="area">Площа</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allProperties.map((property) => (
                <Link key={property.id} to={`/property/${property.id}`}>
                  <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border h-full">
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
                          <span>Поверх {property.floor}</span>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Listings;
