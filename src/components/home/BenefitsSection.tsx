import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Search, Shield, TrendingUp, Users, Zap } from "lucide-react";

const benefits = [
  {
    icon: BarChart3,
    title: "Рішення на основі даних",
    description: "Приймайте обґрунтовані рішення з комплексною аналітикою та трендами ринку",
    audience: "Для покупців та орендарів",
  },
  {
    icon: Search,
    title: "Розширений пошук",
    description: "Знайдіть саме те, що вам потрібно, за допомогою потужних інструментів фільтрації та порівняння",
    audience: "Для покупців та орендарів",
  },
  {
    icon: TrendingUp,
    title: "Ринкові інсайти",
    description: "Доступ до статистики в реальному часі та динаміки цін у всіх великих містах",
    audience: "Для всіх",
  },
  {
    icon: Users,
    title: "Професійні інструменти",
    description: "Керуйте кількома оголошеннями та відстежуйте ефективність за допомогою спеціальної панелі рієлтора",
    audience: "Для рієлторів",
  },
  {
    icon: Shield,
    title: "Перевірені оголошення",
    description: "Всі об'єкти модеруються для забезпечення якості та точності",
    audience: "Для всіх",
  },
  {
    icon: Zap,
    title: "Миттєві сповіщення",
    description: "Отримуйте сповіщення про нові об'єкти та зміни цін, які відповідають вашим критеріям",
    audience: "Для покупців та орендарів",
  },
];

const BenefitsSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Чому обирають Аналітику Нерухомості
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Комплексна платформа, розроблена для покупців, орендарів та професіоналів нерухомості
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