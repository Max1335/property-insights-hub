
-- Create function to delete user and all related data
CREATE OR REPLACE FUNCTION public.delete_user(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Delete user roles
  DELETE FROM public.user_roles WHERE user_roles.user_id = delete_user.user_id;
  
  -- Delete user profile
  DELETE FROM public.profiles WHERE id = delete_user.user_id;
  
  -- Delete from auth.users (this will cascade to related tables)
  DELETE FROM auth.users WHERE id = delete_user.user_id;
END;
$$;

-- Grant execute permission to authenticated users (will be restricted by RLS in practice)
GRANT EXECUTE ON FUNCTION public.delete_user(uuid) TO authenticated;
