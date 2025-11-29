import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useFavorite = (propertyId: string | undefined) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !propertyId) {
      setIsFavorite(false);
      return;
    }

    checkFavorite();
  }, [user, propertyId]);

  const checkFavorite = async () => {
    if (!user || !propertyId) return;

    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('property_id', propertyId)
      .maybeSingle();

    if (!error && data) {
      setIsFavorite(true);
      setFavoriteId(data.id);
    } else {
      setIsFavorite(false);
      setFavoriteId(null);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please sign in to save favorites");
      return;
    }

    if (!propertyId) return;

    setLoading(true);

    if (isFavorite && favoriteId) {
      // Remove from favorites
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);

      if (error) {
        toast.error("Failed to remove from favorites");
      } else {
        setIsFavorite(false);
        setFavoriteId(null);
        toast.success("Removed from favorites");
      }
    } else {
      // Add to favorites
      const { data, error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          property_id: propertyId,
        })
        .select('id')
        .single();

      if (error) {
        toast.error("Failed to add to favorites");
      } else {
        setIsFavorite(true);
        setFavoriteId(data.id);
        toast.success("Added to favorites");
      }
    }

    setLoading(false);
  };

  return { isFavorite, toggleFavorite, loading };
};
