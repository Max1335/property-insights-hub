import { Link, useLocation } from "react-router-dom";
import { Building2, BarChart3, Info, User, LogOut, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, signOut, userRole } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-display">
              Аналітика Нерухомості
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Головна
            </Link>
            <Link 
              to="/listings" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/listings") ? "text-primary" : "text-foreground"
              }`}
            >
              Об'єкти
            </Link>
            <Link 
              to="/analytics" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/analytics") ? "text-primary" : "text-foreground"
              }`}
            >
              Аналітика
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-foreground"
              }`}
            >
              Про нас
            </Link>
          </div>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.email?.split('@')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Мій акаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/favorites" className="cursor-pointer flex items-center">
                    <Heart className="mr-2 h-4 w-4" />
                    Обране
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/history" className="cursor-pointer flex items-center">
                    <Building2 className="mr-2 h-4 w-4" />
                    Історія переглядів
                  </Link>
                </DropdownMenuItem>
                {(userRole === 'realtor' || userRole === 'admin') && (
                  <DropdownMenuItem asChild>
                    <Link to="/add-listing" className="cursor-pointer flex items-center">
                      <Building2 className="mr-2 h-4 w-4" />
                      Додати оголошення
                    </Link>
                  </DropdownMenuItem>
                )}
                {userRole === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer flex items-center">
                      <Building2 className="mr-2 h-4 w-4" />
                      Панель адміністратора
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Вийти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="hidden md:flex items-center gap-2">
                <User className="h-4 w-4" />
                Увійти
              </Button>
            </Link>
          )}
          
          <div className="flex md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-2 gap-2">
            <Link to="/" className="flex-1">
              <Button 
                variant={isActive("/") ? "default" : "ghost"} 
                size="sm" 
                className="w-full flex flex-col items-center gap-1 h-auto py-2"
              >
                <Building2 className="h-4 w-4" />
                <span className="text-xs">Головна</span>
              </Button>
            </Link>
            <Link to="/listings" className="flex-1">
              <Button 
                variant={isActive("/listings") ? "default" : "ghost"} 
                size="sm" 
                className="w-full flex flex-col items-center gap-1 h-auto py-2"
              >
                <Building2 className="h-4 w-4" />
                <span className="text-xs">Об'єкти</span>
              </Button>
            </Link>
            <Link to="/analytics" className="flex-1">
              <Button 
                variant={isActive("/analytics") ? "default" : "ghost"} 
                size="sm" 
                className="w-full flex flex-col items-center gap-1 h-auto py-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs">Аналітика</span>
              </Button>
            </Link>
            <Link to="/about" className="flex-1">
              <Button 
                variant={isActive("/about") ? "default" : "ghost"} 
                size="sm" 
                className="w-full flex flex-col items-center gap-1 h-auto py-2"
              >
                <Info className="h-4 w-4" />
                <span className="text-xs">Про нас</span>
              </Button>
            </Link>
          </div>
        </nav>
      </header>
      
      <main className="pb-20 md:pb-0">{children}</main>
      
      <footer className="hidden md:block border-t border-border bg-muted/30 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">Аналітика Нерухомості</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Преміум аналіз ринку нерухомості для українських міст.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Платформа</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/listings" className="hover:text-primary transition-colors">Переглянути об'єкти</Link></li>
                <li><Link to="/analytics" className="hover:text-primary transition-colors">Ринкова аналітика</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">Про нас</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Міста</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Київ</li>
                <li>Харків</li>
                <li>Одеса</li>
                <li>Дніпро</li>
                <li>Львів</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Юридична інформація</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Умови використання</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Політика конфіденційності</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакти</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Аналітика Нерухомості. Всі права захищено.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
