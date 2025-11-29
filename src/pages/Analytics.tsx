import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Download, Calculator } from "lucide-react";

// Price data for different time periods (price per m²)
const priceData3Months = [
  { month: "Oct 2024", kyiv: 44800, kharkiv: 28400, odesa: 38200, dnipro: 25800, lviv: 35000 },
  { month: "Nov 2024", kyiv: 45100, kharkiv: 28550, odesa: 38500, dnipro: 26100, lviv: 35350 },
  { month: "Dec 2024", kyiv: 45280, kharkiv: 28650, odesa: 38920, dnipro: 26340, lviv: 35780 },
];

const priceData6Months = [
  { month: "Jul 2024", kyiv: 43200, kharkiv: 27800, odesa: 36800, dnipro: 24800, lviv: 33800 },
  { month: "Aug 2024", kyiv: 43600, kharkiv: 28000, odesa: 37200, dnipro: 25200, lviv: 34200 },
  { month: "Sep 2024", kyiv: 44100, kharkiv: 28200, odesa: 37600, dnipro: 25500, lviv: 34600 },
  { month: "Oct 2024", kyiv: 44800, kharkiv: 28400, odesa: 38200, dnipro: 25800, lviv: 35000 },
  { month: "Nov 2024", kyiv: 45100, kharkiv: 28550, odesa: 38500, dnipro: 26100, lviv: 35350 },
  { month: "Dec 2024", kyiv: 45280, kharkiv: 28650, odesa: 38920, dnipro: 26340, lviv: 35780 },
];

const priceDataYear = [
  { month: "Jan 2024", kyiv: 39500, kharkiv: 25000, odesa: 33000, dnipro: 22000, lviv: 30000 },
  { month: "Feb 2024", kyiv: 40200, kharkiv: 25400, odesa: 33600, dnipro: 22500, lviv: 30600 },
  { month: "Mar 2024", kyiv: 40800, kharkiv: 25800, odesa: 34200, dnipro: 23000, lviv: 31200 },
  { month: "Apr 2024", kyiv: 41300, kharkiv: 26200, odesa: 34800, dnipro: 23500, lviv: 31800 },
  { month: "May 2024", kyiv: 41900, kharkiv: 26600, odesa: 35400, dnipro: 24000, lviv: 32400 },
  { month: "Jun 2024", kyiv: 42600, kharkiv: 27200, odesa: 36200, dnipro: 24400, lviv: 33000 },
  { month: "Jul 2024", kyiv: 43200, kharkiv: 27800, odesa: 36800, dnipro: 24800, lviv: 33800 },
  { month: "Aug 2024", kyiv: 43600, kharkiv: 28000, odesa: 37200, dnipro: 25200, lviv: 34200 },
  { month: "Sep 2024", kyiv: 44100, kharkiv: 28200, odesa: 37600, dnipro: 25500, lviv: 34600 },
  { month: "Oct 2024", kyiv: 44800, kharkiv: 28400, odesa: 38200, dnipro: 25800, lviv: 35000 },
  { month: "Nov 2024", kyiv: 45100, kharkiv: 28550, odesa: 38500, dnipro: 26100, lviv: 35350 },
  { month: "Dec 2024", kyiv: 45280, kharkiv: 28650, odesa: 38920, dnipro: 26340, lviv: 35780 },
];

const priceData2Years = [
  { month: "Jan 2023", kyiv: 32000, kharkiv: 20000, odesa: 27000, dnipro: 18000, lviv: 24000 },
  { month: "Mar 2023", kyiv: 33500, kharkiv: 21000, odesa: 28500, dnipro: 19000, lviv: 25500 },
  { month: "May 2023", kyiv: 35000, kharkiv: 22000, odesa: 30000, dnipro: 20000, lviv: 27000 },
  { month: "Jul 2023", kyiv: 36500, kharkiv: 23000, odesa: 31000, dnipro: 20800, lviv: 28000 },
  { month: "Sep 2023", kyiv: 37800, kharkiv: 24000, odesa: 32000, dnipro: 21500, lviv: 29000 },
  { month: "Nov 2023", kyiv: 38800, kharkiv: 24500, odesa: 32500, dnipro: 21800, lviv: 29500 },
  { month: "Jan 2024", kyiv: 39500, kharkiv: 25000, odesa: 33000, dnipro: 22000, lviv: 30000 },
  { month: "Mar 2024", kyiv: 40800, kharkiv: 25800, odesa: 34200, dnipro: 23000, lviv: 31200 },
  { month: "May 2024", kyiv: 41900, kharkiv: 26600, odesa: 35400, dnipro: 24000, lviv: 32400 },
  { month: "Jul 2024", kyiv: 43200, kharkiv: 27800, odesa: 36800, dnipro: 24800, lviv: 33800 },
  { month: "Sep 2024", kyiv: 44100, kharkiv: 28200, odesa: 37600, dnipro: 25500, lviv: 34600 },
  { month: "Nov 2024", kyiv: 45100, kharkiv: 28550, odesa: 38500, dnipro: 26100, lviv: 35350 },
  { month: "Dec 2024", kyiv: 45280, kharkiv: 28650, odesa: 38920, dnipro: 26340, lviv: 35780 },
];

const listingsData = [
  { city: "Kyiv", apartments: 1820, houses: 620, commercial: 407 },
  { city: "Kharkiv", apartments: 980, houses: 340, commercial: 203 },
  { city: "Odesa", apartments: 1230, houses: 410, commercial: 252 },
  { city: "Dnipro", apartments: 780, houses: 280, commercial: 174 },
  { city: "Lviv", apartments: 1080, houses: 380, commercial: 218 },
];

const distributionData = [
  { name: "Under ₴2M", value: 25 },
  { name: "₴2M - ₴5M", value: 35 },
  { name: "₴5M - ₴10M", value: 25 },
  { name: "Over ₴10M", value: 15 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

const Analytics = () => {
  const [timeRange, setTimeRange] = React.useState("year");
  
  const getPriceData = () => {
    switch (timeRange) {
      case "3months":
        return priceData3Months;
      case "6months":
        return priceData6Months;
      case "year":
        return priceDataYear;
      case "2years":
        return priceData2Years;
      default:
        return priceDataYear;
    }
  };
  
  const handleExportData = () => {
    const currentData = getPriceData();
    const csvContent = [
      ['Month', 'Kyiv', 'Kharkiv', 'Odesa', 'Dnipro', 'Lviv'],
      ...currentData.map(row => [row.month, row.kyiv, row.kharkiv, row.odesa, row.dnipro, row.lviv])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'price-trends.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Market Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into Ukrainian real estate markets</p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="trends">Price Trends</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Active Listings</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">9,174</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-success">+12.3%</span> from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Avg Price per m²</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₴34,795</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-success">+2.1%</span> across all cities
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-success">+8.7%</span> growth rate
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Listings by City & Type</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="apartments">Apartments</SelectItem>
                      <SelectItem value="houses">Houses</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={listingsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="city" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="apartments" fill="hsl(var(--chart-1))" name="Apartments" />
                    <Bar dataKey="houses" fill="hsl(var(--chart-2))" name="Houses" />
                    <Bar dataKey="commercial" fill="hsl(var(--chart-3))" name="Commercial" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle>Price Dynamics (per m²)</CardTitle>
                  <div className="flex gap-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3months">Last 3 Months</SelectItem>
                        <SelectItem value="6months">Last 6 Months</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                        <SelectItem value="2years">Last 2 Years</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={handleExportData}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={getPriceData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="kyiv" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Kyiv" />
                    <Line type="monotone" dataKey="kharkiv" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Kharkiv" />
                    <Line type="monotone" dataKey="odesa" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Odesa" />
                    <Line type="monotone" dataKey="dnipro" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Dnipro" />
                    <Line type="monotone" dataKey="lviv" stroke="hsl(var(--chart-5))" strokeWidth={2} name="Lviv" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="distribution" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle>Price Distribution</CardTitle>
                  <Select defaultValue="kyiv">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kyiv">Kyiv</SelectItem>
                      <SelectItem value="kharkiv">Kharkiv</SelectItem>
                      <SelectItem value="odesa">Odesa</SelectItem>
                      <SelectItem value="dnipro">Dnipro</SelectItem>
                      <SelectItem value="lviv">Lviv</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calculator">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Mortgage Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="price">Property Price (UAH)</Label>
                      <Input id="price" type="number" placeholder="5000000" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="downpayment">Down Payment (UAH)</Label>
                      <Input id="downpayment" type="number" placeholder="1000000" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="rate">Interest Rate (%)</Label>
                      <Input id="rate" type="number" placeholder="12" step="0.1" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="term">Loan Term (years)</Label>
                      <Input id="term" type="number" placeholder="20" className="mt-2" />
                    </div>
                    <Button className="w-full" size="lg">Calculate</Button>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-lg mb-4">Results</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b border-border">
                        <span className="text-muted-foreground">Monthly Payment</span>
                        <span className="text-2xl font-bold text-primary">₴44,100</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-border">
                        <span className="text-muted-foreground">Total Amount</span>
                        <span className="font-semibold">₴10,584,000</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-border">
                        <span className="text-muted-foreground">Total Interest</span>
                        <span className="font-semibold">₴6,584,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-semibold">₴4,000,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
