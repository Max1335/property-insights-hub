import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listings?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/listings');
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Find Your Perfect Property with Data-Driven Insights
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Analyze Ukrainian real estate market trends across Kyiv, Kharkiv, Odesa, Dnipro, and Lviv
          </p>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-elevated animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kyiv">Kyiv</SelectItem>
                  <SelectItem value="kharkiv">Kharkiv</SelectItem>
                  <SelectItem value="odesa">Odesa</SelectItem>
                  <SelectItem value="dnipro">Dnipro</SelectItem>
                  <SelectItem value="lviv">Lviv</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                </SelectContent>
              </Select>
              
              <Input 
                type="text" 
                placeholder="Max Price (UAH)" 
                className="bg-background"
              />
              
              <Button className="w-full" size="lg">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            
            <div className="mt-4 text-center">
              <button className="text-sm text-primary hover:underline font-medium">
                Advanced Search →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
