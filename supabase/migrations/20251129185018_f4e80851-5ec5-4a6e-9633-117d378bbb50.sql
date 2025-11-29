-- Create property changes tracking table
CREATE TABLE public.property_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  old_price DECIMAL(12, 2),
  new_price DECIMAL(12, 2),
  old_data JSONB,
  new_data JSONB,
  change_type TEXT NOT NULL -- 'price', 'details', 'status'
);

-- Enable RLS
ALTER TABLE public.property_changes ENABLE ROW LEVEL SECURITY;

-- Anyone can view property changes
CREATE POLICY "Anyone can view property changes"
  ON public.property_changes
  FOR SELECT
  USING (true);

-- Create trigger to track price changes
CREATE OR REPLACE FUNCTION public.track_property_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Track price changes
  IF OLD.price IS DISTINCT FROM NEW.price THEN
    INSERT INTO public.property_changes (property_id, change_type, old_price, new_price)
    VALUES (NEW.id, 'price', OLD.price, NEW.price);
  END IF;
  
  -- Track status changes
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.property_changes (property_id, change_type, old_data, new_data)
    VALUES (NEW.id, 'status', 
      jsonb_build_object('status', OLD.status),
      jsonb_build_object('status', NEW.status)
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Add trigger to properties table
CREATE TRIGGER track_changes_trigger
  AFTER UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.track_property_changes();

-- Create property comparisons table
CREATE TABLE public.property_comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  property_ids UUID[] NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.property_comparisons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own comparisons"
  ON public.property_comparisons
  FOR ALL
  USING (auth.uid() = user_id);

-- Add indexes
CREATE INDEX idx_property_changes_property ON public.property_changes(property_id);
CREATE INDEX idx_property_changes_date ON public.property_changes(changed_at DESC);
CREATE INDEX idx_property_comparisons_user ON public.property_comparisons(user_id);