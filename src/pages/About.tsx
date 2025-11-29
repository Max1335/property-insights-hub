import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Target, Database, TrendingUp, Shield, Mail } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-center">
            About RealEstate Analytics
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Your trusted partner for data-driven real estate decisions in Ukraine
          </p>
          
          <div className="prose prose-lg max-w-none">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  RealEstate Analytics was created to help Ukrainians make informed decisions in the property market. 
                  We believe that access to comprehensive market data and analytics should be available to everyone - 
                  from first-time buyers to seasoned real estate professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-center mb-12">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="rounded-lg bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Comprehensive Database</h3>
                <p className="text-sm text-muted-foreground">
                  Thousands of verified listings across 5 major Ukrainian cities
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="rounded-lg bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Market Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time price trends and market dynamics visualization
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="rounded-lg bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Verified Information</h3>
                <p className="text-sm text-muted-foreground">
                  All listings are moderated for accuracy and quality
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="rounded-lg bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Smart Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced search filters and mortgage calculators
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Data Sources</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We aggregate data from multiple reliable sources to provide you with the most comprehensive 
                  view of the Ukrainian real estate market:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Direct partnerships with leading real estate agencies</li>
                  <li>Verified listings from property owners</li>
                  <li>Public real estate statistics and market reports</li>
                  <li>Continuously updated pricing data across all major cities</li>
                </ul>
                <p className="pt-4">
                  Our analytical team processes this information to provide accurate trends, forecasts, 
                  and insights that help you make better decisions.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
                <p className="text-muted-foreground">
                  Interested in partnership or have questions? Contact us
                </p>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="mt-2" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="mt-2" />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your inquiry..." 
                    rows={5}
                    className="mt-2"
                  />
                </div>
                
                <Button type="submit" className="w-full" size="lg">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default About;
