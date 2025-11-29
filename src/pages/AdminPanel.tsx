import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, X, Users, Building2, Eye } from "lucide-react";

interface PendingProperty {
  id: string;
  title: string;
  price: number;
  city: string;
  property_type: string;
  created_at: string;
  profiles: { full_name: string; email: string } | null;
}

interface User {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  user_roles: { role: string }[];
}

const AdminPanel = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [pendingProperties, setPendingProperties] = useState<PendingProperty[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({ totalProperties: 0, activeListings: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (userRole !== 'admin') {
      toast.error("Access denied - Admin only");
      navigate("/");
      return;
    }
    fetchData();
  }, [user, userRole, navigate]);

  const fetchData = async () => {
    await Promise.all([
      fetchPendingProperties(),
      fetchUsers(),
      fetchStats(),
    ]);
    setLoading(false);
  };

  const fetchPendingProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('id, title, price, city, property_type, created_at, seller_id')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Fetch profiles separately
      const withProfiles = await Promise.all(
        data.map(async (prop) => {
          if (prop.seller_id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('full_name, email')
              .eq('id', prop.seller_id)
              .single();
            return { ...prop, profiles: profile };
          }
          return { ...prop, profiles: null };
        })
      );
      setPendingProperties(withProfiles);
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, created_at')
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      // Fetch roles separately
      const withRoles = await Promise.all(
        data.map(async (user) => {
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id);
          return { ...user, user_roles: roles || [] };
        })
      );
      setUsers(withRoles);
    }
  };

  const fetchStats = async () => {
    const [propertiesRes, activeRes, usersRes] = await Promise.all([
      supabase.from('properties').select('id', { count: 'exact', head: true }),
      supabase.from('properties').select('id', { count: 'exact', head: true }).eq('status', 'active'),
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
    ]);

    setStats({
      totalProperties: propertiesRes.count || 0,
      activeListings: activeRes.count || 0,
      totalUsers: usersRes.count || 0,
    });
  };

  const handlePropertyAction = async (propertyId: string, action: 'active' | 'rejected') => {
    const { error } = await supabase
      .from('properties')
      .update({ status: action })
      .eq('id', propertyId);

    if (error) {
      toast.error("Failed to update property");
    } else {
      toast.success(action === 'active' ? "Property approved" : "Property rejected");
      fetchData();
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage listings, users, and system settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeListings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">
              Pending Approval ({pendingProperties.length})
            </TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingProperties.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No pending properties</p>
                </CardContent>
              </Card>
            ) : (
              pendingProperties.map((property) => (
                <Card key={property.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{property.title}</CardTitle>
                        <CardDescription>
                          Submitted by {property.profiles?.full_name || property.profiles?.email}
                        </CardDescription>
                      </div>
                      <Badge>{property.property_type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Price: ₴{property.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Location: {property.city}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handlePropertyAction(property.id, 'active')}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handlePropertyAction(property.id, 'rejected')}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium">{user.full_name || user.email}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Badge variant="secondary">
                        {user.user_roles[0]?.role || 'user'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPanel;
