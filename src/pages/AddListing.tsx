import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { Upload, X } from "lucide-react";

const listingSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  price: z.number().positive("Price must be positive"),
  area: z.number().positive("Area must be positive"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  address: z.string().min(1, "Address is required"),
});

const AddListing = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property_type: "apartment",
    transaction_type: "sale",
    price: "",
    area: "",
    rooms: "",
    floor: "",
    total_floors: "",
    building_year: "",
    condition: "good",
    city: "",
    district: "",
    address: "",
    features: [] as string[],
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (userRole !== 'realtor' && userRole !== 'admin') {
      toast.error("Only realtors can add listings");
      navigate("/");
    }
  }, [user, userRole, navigate]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (uploadedImages.length + files.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    setUploading(true);
    const newImageUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max 5MB per image`);
        continue;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('property-images')
        .upload(fileName, file);

      if (error) {
        toast.error(`Failed to upload ${file.name}`);
        console.error(error);
      } else {
        const { data: urlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(fileName);
        
        newImageUrls.push(urlData.publicUrl);
      }
    }

    setUploadedImages([...uploadedImages, ...newImageUrls]);
    setUploading(false);
    
    if (newImageUrls.length > 0) {
      toast.success(`${newImageUrls.length} image(s) uploaded`);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validated = listingSchema.parse({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        area: parseFloat(formData.area),
        city: formData.city,
        district: formData.district,
        address: formData.address,
      });

      setLoading(true);

      const { error } = await supabase.from('properties').insert({
        title: validated.title,
        description: validated.description,
        property_type: formData.property_type,
        transaction_type: formData.transaction_type,
        price: validated.price,
        price_per_sqm: validated.price / validated.area,
        area: validated.area,
        rooms: formData.rooms ? parseInt(formData.rooms) : null,
        floor: formData.floor ? parseInt(formData.floor) : null,
        total_floors: formData.total_floors ? parseInt(formData.total_floors) : null,
        building_year: formData.building_year ? parseInt(formData.building_year) : null,
        condition: formData.condition,
        city: formData.city,
        district: formData.district,
        address: formData.address,
        features: formData.features,
        images: uploadedImages,
        seller_id: user?.id,
        status: 'pending',
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Listing submitted for review");
        navigate("/listings");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach(error => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "parking", "elevator", "balcony", "24/7 security",
    "central heating", "air conditioning", "furnished", "renovated"
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Add New Listing</CardTitle>
            <CardDescription>
              Fill in the details below. Your listing will be reviewed before going live.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Modern 2-bedroom apartment in city center"
                />
                {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Detailed description of the property..."
                  rows={5}
                />
                {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Property Type *</Label>
                  <Select value={formData.property_type} onValueChange={(v) => setFormData({...formData, property_type: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Transaction Type *</Label>
                  <Select value={formData.transaction_type} onValueChange={(v) => setFormData({...formData, transaction_type: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Price (UAH) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                  {errors.price && <p className="text-sm text-destructive mt-1">{errors.price}</p>}
                </div>

                <div>
                  <Label htmlFor="area">Area (m²) *</Label>
                  <Input
                    id="area"
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                  />
                  {errors.area && <p className="text-sm text-destructive mt-1">{errors.area}</p>}
                </div>

                <div>
                  <Label htmlFor="rooms">Rooms</Label>
                  <Input
                    id="rooms"
                    type="number"
                    value={formData.rooms}
                    onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="floor">Floor</Label>
                  <Input
                    id="floor"
                    type="number"
                    value={formData.floor}
                    onChange={(e) => setFormData({...formData, floor: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="total_floors">Total Floors</Label>
                  <Input
                    id="total_floors"
                    type="number"
                    value={formData.total_floors}
                    onChange={(e) => setFormData({...formData, total_floors: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="building_year">Building Year</Label>
                  <Input
                    id="building_year"
                    type="number"
                    value={formData.building_year}
                    onChange={(e) => setFormData({...formData, building_year: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Condition</Label>
                  <Select value={formData.condition} onValueChange={(v) => setFormData({...formData, condition: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="renovated">Renovated</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="needs_repair">Needs Repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                  {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                </div>

                <div>
                  <Label htmlFor="district">District *</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                  />
                  {errors.district && <p className="text-sm text-destructive mt-1">{errors.district}</p>}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                  {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                </div>
              </div>

              <div className="md:col-span-2">
                <Label className="mb-3 block">Property Images (Max 10, 5MB each)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading || uploadedImages.length >= 10}
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {uploading ? "Uploading..." : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label className="mb-3 block">Features</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {features.map(feature => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={formData.features.includes(feature)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({...formData, features: [...formData.features, feature]});
                          } else {
                            setFormData({...formData, features: formData.features.filter(f => f !== feature)});
                          }
                        }}
                      />
                      <Label htmlFor={feature} className="text-sm cursor-pointer">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Submitting..." : "Submit for Review"}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/listings")}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddListing;
