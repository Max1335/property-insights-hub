-- Create RPC function to increment property views count
CREATE OR REPLACE FUNCTION increment_property_views(property_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.properties
  SET views_count = views_count + 1
  WHERE id = property_id;
END;
$$;