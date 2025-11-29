import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const usePropertyView = (propertyId: string | undefined) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!propertyId) return;

    const trackView = async () => {
      // Insert view record
      await supabase
        .from('property_views')
        .insert({
          property_id: propertyId,
          user_id: user?.id || null,
        });

      // Increment views count on property
      const { error } = await supabase.rpc('increment_property_views', {
        property_id: propertyId
      });

      if (error) {
        console.log('View tracking error:', error);
      }
    };

    trackView();
  }, [propertyId, user]);
};
