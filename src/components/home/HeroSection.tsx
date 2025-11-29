import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Build URL with query parameters
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.append('search', searchQuery.trim());
    }
    if (selectedCity) {
      params.append('city', selectedCity);
    }
    if (selectedType) {
      params.append('type', selectedType);
    }
    if (maxPrice) {
      params.append('maxPrice', maxPrice);
    }
    const queryString = params.toString();
    navigate(`/listings${queryString ? `?${queryString}` : ''}`);
  };
  return <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} />
      
      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">Знайдіть ідеальну нерухомість</h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Аналізуйте тенденції українського ринку нерухомості у Києві, Харкові, Одесі, Дніпрі та Львові
          </p>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-elevated animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Місто" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kyiv">Київ</SelectItem>
                    <SelectItem value="Kharkiv">Харків</SelectItem>
                    <SelectItem value="Odesa">Одеса</SelectItem>
                    <SelectItem value="Dnipro">Дніпро</SelectItem>
                    <SelectItem value="Lviv">Львів</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Тип нерухомості" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Квартира</SelectItem>
                    <SelectItem value="house">Будинок</SelectItem>
                    <SelectItem value="office">Офіс</SelectItem>
                    <SelectItem value="commercial">Комерційна</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input type="number" placeholder="Макс. ціна (грн)" className="bg-background" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                
                <Button type="submit" className="w-full" size="lg">
                  <Search className="mr-2 h-4 w-4" />
                  Пошук
                </Button>
              </div>
              
              <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Або пошук за ключовими словами..." className="bg-background" />
            </form>
            
            <div className="mt-4 text-center">
              <button type="button" onClick={() => navigate('/listings')} className="text-sm text-primary hover:underline font-medium">
                Розширений пошук →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;