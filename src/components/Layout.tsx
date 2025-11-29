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
              RealEstate Analytics
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/listings" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/listings") ? "text-primary" : "text-foreground"
              }`}
            >
              Listings
            </Link>
            <Link 
              to="/analytics" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/analytics") ? "text-primary" : "text-foreground"
              }`}
            >
              Analytics
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-foreground"
              }`}
            >
              About
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
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/favorites" className="cursor-pointer flex items-center">
                    <Heart className="mr-2 h-4 w-4" />
                    Favorites
                  </Link>
                </DropdownMenuItem>
                {userRole === 'realtor' && (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer flex items-center">
                      <Building2 className="mr-2 h-4 w-4" />
                      My Listings
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="hidden md:flex items-center gap-2">
                <User className="h-4 w-4" />
                Sign In
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
                <span className="text-xs">Home</span>
              </Button>
            </Link>
            <Link to="/listings" className="flex-1">
              <Button 
                variant={isActive("/listings") ? "default" : "ghost"} 
                size="sm" 
                className="w-full flex flex-col items-center gap-1 h-auto py-2"
              >
                <Building2 className="h-4 w-4" />
                <span className="text-xs">Listings</span>
              </Button>
            </Link>
            <Link to="/analytics" className="flex-1">
              <Button 
                variant={isActive("/analytics") ? "default" : "ghost"} 
                size="sm" 
                className="w-full flex flex-col items-center gap-1 h-auto py-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs">Analytics</span>
              </Button>
            </Link>
            <Link to="/about" className="flex-1">
              <Button 
                variant={isActive("/about") ? "default" : "ghost"} 
                size="sm" 
                className="w-full flex flex-col items-center gap-1 h-auto py-2"
              >
                <Info className="h-4 w-4" />
                <span className="text-xs">About</span>
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
                <span className="font-bold text-lg">RealEstate Analytics</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Premium real estate market analysis for Ukrainian cities.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/listings" className="hover:text-primary transition-colors">Browse Listings</Link></li>
                <li><Link to="/analytics" className="hover:text-primary transition-colors">Market Analytics</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Cities</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Kyiv</li>
                <li>Kharkiv</li>
                <li>Odesa</li>
                <li>Dnipro</li>
                <li>Lviv</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 RealEstate Analytics. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
