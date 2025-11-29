import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Search, Shield, TrendingUp, Users, Zap } from "lucide-react";

const benefits = [
  {
    icon: BarChart3,
    title: "Data-Driven Decisions",
    description: "Make informed choices with comprehensive market analytics and trends",
    audience: "For Buyers & Tenants",
  },
  {
    icon: Search,
    title: "Advanced Search",
    description: "Find exactly what you need with powerful filtering and comparison tools",
    audience: "For Buyers & Tenants",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Access real-time statistics and price dynamics across all major cities",
    audience: "For Everyone",
  },
  {
    icon: Users,
    title: "Professional Tools",
    description: "Manage multiple listings and track performance with dedicated realtor dashboard",
    audience: "For Realtors",
  },
  {
    icon: Shield,
    title: "Verified Listings",
    description: "All properties are moderated to ensure quality and accuracy",
    audience: "For Everyone",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Get alerted about new properties and price changes matching your criteria",
    audience: "For Buyers & Tenants",
  },
];

const BenefitsSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Why Choose RealEstate Analytics
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A comprehensive platform designed for buyers, tenants, and real estate professionals
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card 
              key={index}
              className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border"
            >
              <CardContent className="p-6">
                <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                
                <div className="text-xs font-medium text-accent mb-2">
                  {benefit.audience}
                </div>
                
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default BenefitsSection;
