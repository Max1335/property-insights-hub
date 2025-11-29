import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Building2, DollarSign } from "lucide-react";

const statsData = [
  {
    city: "Kyiv",
    avgPrice: "₴45,280",
    pricePerSqm: true,
    change: "+3.2%",
    trending: "up",
    listings: "2,847",
  },
  {
    city: "Kharkiv",
    avgPrice: "₴28,650",
    pricePerSqm: true,
    change: "+1.8%",
    trending: "up",
    listings: "1,523",
  },
  {
    city: "Odesa",
    avgPrice: "₴38,920",
    pricePerSqm: true,
    change: "-0.5%",
    trending: "down",
    listings: "1,892",
  },
  {
    city: "Dnipro",
    avgPrice: "₴26,340",
    pricePerSqm: true,
    change: "+2.1%",
    trending: "up",
    listings: "1,234",
  },
  {
    city: "Lviv",
    avgPrice: "₴35,780",
    pricePerSqm: true,
    change: "+1.5%",
    trending: "up",
    listings: "1,678",
  },
];

const StatsSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Market Overview
        </h2>
        <p className="text-lg text-muted-foreground">
          Real-time statistics from major Ukrainian cities
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statsData.map((stat) => (
          <Card 
            key={stat.city} 
            className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                {stat.city}
                <Building2 className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {stat.avgPrice}
                </div>
                <div className="text-xs text-muted-foreground">per m²</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {stat.trending === "up" ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trending === "up" ? "text-success" : "text-destructive"
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">this month</div>
              </div>
              
              <div className="pt-3 border-t border-border">
                <div className="text-sm text-muted-foreground">Active listings</div>
                <div className="text-lg font-semibold text-foreground">{stat.listings}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
