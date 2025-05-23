import { createClient as CreateServer } from "@/utils/supabase/server";
import { createClient } from "@/utils/supabase/client";
import { UsersProps } from "../models/users";

export async function getAuthenticatedUser() {
  const supabase = await CreateServer();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error };
}

export async function getUsers() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("users").select("*");

  return {
    users: data as UsersProps[],
    error,
  };
}

export async function getUserByEmail(email: string) {
  const supabase = await createClient();

  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return { user: users, error };
}
