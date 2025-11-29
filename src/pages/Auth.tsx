import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";

const emailSchema = z.string().email("Будь ласка, введіть дійсну адресу електронної пошти");
const passwordSchema = z.string().min(6, "Пароль має містити принаймні 6 символів");

const Auth = () => {
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpFullName, setSignUpFullName] = useState("");
  const [signUpRole, setSignUpRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateSignIn = () => {
    const newErrors: Record<string, string> = {};
    
    try {
      emailSchema.parse(signInEmail);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.signInEmail = e.errors[0].message;
      }
    }
    
    try {
      passwordSchema.parse(signInPassword);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.signInPassword = e.errors[0].message;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUp = () => {
    const newErrors: Record<string, string> = {};
    
    if (!signUpFullName.trim()) {
      newErrors.signUpFullName = "Повне ім'я обов'язкове";
    }
    
    try {
      emailSchema.parse(signUpEmail);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.signUpEmail = e.errors[0].message;
      }
    }
    
    try {
      passwordSchema.parse(signUpPassword);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.signUpPassword = e.errors[0].message;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignIn()) return;
    
    setLoading(true);
    await signIn(signInEmail, signInPassword);
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignUp()) return;
    
    setLoading(true);
    await signUp(signUpEmail, signUpPassword, signUpFullName, signUpRole);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Аналітика Нерухомості
          </span>
        </Link>
        
        <Card>
          <CardHeader>
            <CardTitle>Вітаємо</CardTitle>
            <CardDescription>Увійдіть у свій акаунт або створіть новий</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Вхід</TabsTrigger>
                <TabsTrigger value="signup">Реєстрація</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      className="mt-2"
                    />
                    {errors.signInEmail && (
                      <p className="text-sm text-destructive mt-1">{errors.signInEmail}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="signin-password">Пароль</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="mt-2"
                    />
                    {errors.signInPassword && (
                      <p className="text-sm text-destructive mt-1">{errors.signInPassword}</p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Вхід..." : "Увійти"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">Повне ім'я</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Ім'я Прізвище"
                      value={signUpFullName}
                      onChange={(e) => setSignUpFullName(e.target.value)}
                      className="mt-2"
                    />
                    {errors.signUpFullName && (
                      <p className="text-sm text-destructive mt-1">{errors.signUpFullName}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="mt-2"
                    />
                    {errors.signUpEmail && (
                      <p className="text-sm text-destructive mt-1">{errors.signUpEmail}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="signup-password">Пароль</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="mt-2"
                    />
                    {errors.signUpPassword && (
                      <p className="text-sm text-destructive mt-1">{errors.signUpPassword}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="signup-role">Я...</Label>
                    <Select value={signUpRole} onValueChange={setSignUpRole}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Покупець / Орендар</SelectItem>
                        <SelectItem value="realtor">Рієлтор / Агент</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Створення акаунту..." : "Створити акаунт"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          Продовжуючи, ви погоджуєтесь з нашими Умовами використання та Політикою конфіденційності
        </p>
      </div>
    </div>
  );
};

export default Auth;