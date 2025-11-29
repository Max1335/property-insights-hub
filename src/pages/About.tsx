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
            Про Аналітику Нерухомості
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Ваш надійний партнер для прийняття рішень щодо нерухомості на основі даних в Україні
          </p>
          
          <div className="prose prose-lg max-w-none">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Наша місія</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Аналітика Нерухомості створена для того, щоб допомогти українцям приймати обґрунтовані рішення на ринку нерухомості. 
                  Ми віримо, що доступ до комплексних даних ринку та аналітики має бути доступний кожному - 
                  від тих, хто купує нерухомість вперше, до досвідчених професіоналів у сфері нерухомості.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Що ми пропонуємо</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="rounded-lg bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Комплексна база даних</h3>
                <p className="text-sm text-muted-foreground">
                  Тисячі перевірених оголошень у 5 великих містах України
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="rounded-lg bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Ринкова аналітика</h3>
                <p className="text-sm text-muted-foreground">
                  Цінові тренди в реальному часі та візуалізація динаміки ринку
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="rounded-lg bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Перевірена інформація</h3>
                <p className="text-sm text-muted-foreground">
                  Всі оголошення проходять модерацію для забезпечення точності та якості
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="rounded-lg bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Розумні інструменти</h3>
                <p className="text-sm text-muted-foreground">
                  Розширені фільтри пошуку та іпотечні калькулятори
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Наші джерела даних</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ми агрегуємо дані з кількох надійних джерел, щоб надати вам найповніший 
                  огляд українського ринку нерухомості:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Прямі партнерства з провідними агентствами нерухомості</li>
                  <li>Перевірені оголошення від власників</li>
                  <li>Публічна статистика нерухомості та ринкові звіти</li>
                  <li>Постійно оновлювані дані про ціни в усіх великих містах</li>
                </ul>
                <p className="pt-4">
                  Наша аналітична команда обробляє цю інформацію, щоб надати точні тренди, прогнози 
                  та інсайти, які допомагають вам приймати кращі рішення.
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
                <h2 className="text-2xl font-bold mb-2">Зв'яжіться з нами</h2>
                <p className="text-muted-foreground">
                  Зацікавлені у партнерстві або маєте питання? Напишіть нам
                </p>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ім'я</Label>
                    <Input id="name" placeholder="Ваше ім'я" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="mt-2" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Тема</Label>
                  <Input id="subject" placeholder="Як ми можемо допомогти?" className="mt-2" />
                </div>
                
                <div>
                  <Label htmlFor="message">Повідомлення</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Розкажіть нам більше про ваш запит..." 
                    rows={5}
                    className="mt-2"
                  />
                </div>
                
                <Button type="submit" className="w-full" size="lg">
                  Надіслати повідомлення
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