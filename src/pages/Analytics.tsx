import React, { useRef } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Download, Calculator } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

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
  const chartRef = useRef<HTMLDivElement>(null);
  
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

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case "3months":
        return "Last 3 Months";
      case "6months":
        return "Last 6 Months";
      case "year":
        return "Last Year";
      case "2years":
        return "Last 2 Years";
      default:
        return "Last Year";
    }
  };

  const calculateStatistics = () => {
    const data = getPriceData();
    
    const getAverage = (city: keyof typeof data[0]) => {
      const sum = data.reduce((acc, item) => acc + Number(item[city]), 0);
      return Math.round(sum / data.length);
    };

    const getGrowth = (city: keyof typeof data[0]) => {
      const first = Number(data[0][city]);
      const last = Number(data[data.length - 1][city]);
      return (((last - first) / first) * 100).toFixed(1);
    };

    return {
      kyiv: { avg: getAverage("kyiv"), growth: getGrowth("kyiv") },
      kharkiv: { avg: getAverage("kharkiv"), growth: getGrowth("kharkiv") },
      odesa: { avg: getAverage("odesa"), growth: getGrowth("odesa") },
      dnipro: { avg: getAverage("dnipro"), growth: getGrowth("dnipro") },
      lviv: { avg: getAverage("lviv"), growth: getGrowth("lviv") },
    };
  };
  
  const handleExportData = async () => {
    const pdf = new jsPDF();
    const currentData = getPriceData();
    const stats = calculateStatistics();
    
    // Title
    pdf.setFontSize(20);
    pdf.text("Real Estate Market Analytics Report", 14, 20);
    
    // Period
    pdf.setFontSize(12);
    pdf.text(`Period: ${getTimeRangeLabel()}`, 14, 30);
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 37);
    
    // Summary Statistics
    pdf.setFontSize(16);
    pdf.text("Summary Statistics", 14, 50);
    
    pdf.setFontSize(10);
    const summaryData = [
      ["City", "Avg Price per m²", "Price Growth"],
      ["Kyiv", `₴${stats.kyiv.avg.toLocaleString()}`, `${stats.kyiv.growth}%`],
      ["Kharkiv", `₴${stats.kharkiv.avg.toLocaleString()}`, `${stats.kharkiv.growth}%`],
      ["Odesa", `₴${stats.odesa.avg.toLocaleString()}`, `${stats.odesa.growth}%`],
      ["Dnipro", `₴${stats.dnipro.avg.toLocaleString()}`, `${stats.dnipro.growth}%`],
      ["Lviv", `₴${stats.lviv.avg.toLocaleString()}`, `${stats.lviv.growth}%`],
    ];
    
    autoTable(pdf, {
      startY: 55,
      head: [summaryData[0]],
      body: summaryData.slice(1),
      theme: "grid",
      headStyles: { fillColor: [59, 130, 246] },
    });

    // Capture chart
    if (chartRef.current) {
      try {
        const canvas = await html2canvas(chartRef.current, {
          scale: 2,
          backgroundColor: "#ffffff",
        });
        const imgData = canvas.toDataURL("image/png");
        
        // @ts-ignore - autoTable adds finalY to jsPDF
        const yPosition = pdf.lastAutoTable.finalY + 15;
        
        pdf.setFontSize(16);
        pdf.text("Price Trends Chart", 14, yPosition);
        
        const imgWidth = 180;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 14, yPosition + 5, imgWidth, imgHeight);
        
        // Add page if needed for detailed data
        pdf.addPage();
      } catch (error) {
        console.error("Error capturing chart:", error);
      }
    }
    
    // Detailed Price Data
    pdf.setFontSize(16);
    pdf.text("Detailed Price Data (per m²)", 14, 20);
    
    const detailedData = currentData.map(row => [
      row.month,
      `₴${row.kyiv.toLocaleString()}`,
      `₴${row.kharkiv.toLocaleString()}`,
      `₴${row.odesa.toLocaleString()}`,
      `₴${row.dnipro.toLocaleString()}`,
      `₴${row.lviv.toLocaleString()}`,
    ]);
    
    autoTable(pdf, {
      startY: 25,
      head: [["Month", "Kyiv", "Kharkiv", "Odesa", "Dnipro", "Lviv"]],
      body: detailedData,
      theme: "striped",
      headStyles: { fillColor: [59, 130, 246] },
    });
    
    // Save PDF
    pdf.save(`market-analytics-${timeRange}-${new Date().getTime()}.pdf`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Аналітика ринку нерухомості</h1>
          <p className="text-muted-foreground">Комплексні інсайти щодо українського ринку нерухомості</p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
            <TabsTrigger value="overview">Огляд ринку</TabsTrigger>
            <TabsTrigger value="trends">Цінові тренди</TabsTrigger>
            <TabsTrigger value="distribution">Розподіл</TabsTrigger>
            <TabsTrigger value="calculator">Калькулятор</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Всього активних оголошень</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">9,174</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-success">+12.3%</span> від минулого місяця
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Середня ціна за м²</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₴34,795</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-success">+2.1%</span> в усіх містах
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Нових цього місяця</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-success">+8.7%</span> темп зростання
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Оголошення за містом та типом</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Всі типи</SelectItem>
                      <SelectItem value="apartments">Квартири</SelectItem>
                      <SelectItem value="houses">Будинки</SelectItem>
                      <SelectItem value="commercial">Комерційна</SelectItem>
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
                    <Bar dataKey="apartments" fill="hsl(var(--chart-1))" name="Квартири" />
                    <Bar dataKey="houses" fill="hsl(var(--chart-2))" name="Будинки" />
                    <Bar dataKey="commercial" fill="hsl(var(--chart-3))" name="Комерційна" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle>Динаміка цін (за м²)</CardTitle>
                  <div className="flex gap-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3months">Останні 3 місяці</SelectItem>
                        <SelectItem value="6months">Останні 6 місяців</SelectItem>
                        <SelectItem value="year">Останній рік</SelectItem>
                        <SelectItem value="2years">Останні 2 роки</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={handleExportData}>
                      <Download className="h-4 w-4 mr-2" />
                      Експорт PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div ref={chartRef}>
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
                      <Line type="monotone" dataKey="kyiv" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Київ" />
                      <Line type="monotone" dataKey="kharkiv" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Харків" />
                      <Line type="monotone" dataKey="odesa" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Одеса" />
                      <Line type="monotone" dataKey="dnipro" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Дніпро" />
                      <Line type="monotone" dataKey="lviv" stroke="hsl(var(--chart-5))" strokeWidth={2} name="Львів" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="distribution" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle>Розподіл цін</CardTitle>
                  <Select defaultValue="kyiv">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kyiv">Київ</SelectItem>
                      <SelectItem value="kharkiv">Харків</SelectItem>
                      <SelectItem value="odesa">Одеса</SelectItem>
                      <SelectItem value="dnipro">Дніпро</SelectItem>
                      <SelectItem value="lviv">Львів</SelectItem>
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
                  Іпотечний калькулятор
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="price">Ціна нерухомості (грн)</Label>
                      <Input id="price" type="number" placeholder="5000000" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="downpayment">Перший внесок (грн)</Label>
                      <Input id="downpayment" type="number" placeholder="1000000" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="rate">Процентна ставка (%)</Label>
                      <Input id="rate" type="number" placeholder="12" step="0.1" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="term">Термін кредиту (роки)</Label>
                      <Input id="term" type="number" placeholder="20" className="mt-2" />
                    </div>
                    <Button className="w-full" size="lg">Розрахувати</Button>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-lg mb-4">Результати</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b border-border">
                        <span className="text-muted-foreground">Щомісячний платіж</span>
                        <span className="text-2xl font-bold text-primary">₴44,100</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-border">
                        <span className="text-muted-foreground">Загальна сума</span>
                        <span className="font-semibold">₴10,584,000</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-border">
                        <span className="text-muted-foreground">Загальні відсотки</span>
                        <span className="font-semibold">₴6,584,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Сума кредиту</span>
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
