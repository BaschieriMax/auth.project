"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { UsersProps } from "../models/users";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = (formData.get("email") || "").toString().trim();
  const password = (formData.get("password") || "").toString();

  const errors: Record<string, string> = {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Email non valida";
  }
  if (!password) {
    errors.password = "Password obbligatoria";
  }

  if (Object.keys(errors).length > 0) {
    return { error: errors };
  }

  const { data: userData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (
      error.message.toLowerCase().includes("invalid login credentials") ||
      error.status === 400
    ) {
      return { error: { general: "Email o password errati." } };
    }
    return { error: { general: "Errore durante il login, riprova." } };
  }

  if (!userData.user) {
    return { error: { general: "Credenziali non valide." } };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = (formData.get("email") || "").toString().trim();
  const password = (formData.get("password") || "").toString();
  const name = (formData.get("name") || "").toString().trim();
  const surname = (formData.get("surname") || "").toString().trim();
  const address = (formData.get("address") || "").toString().trim();
  const phone = (formData.get("phone") || "").toString().trim();

  const errors: Record<string, string> = {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Email non valida";
  }

  if (!password || password.length < 6) {
    errors.password = "La password deve avere almeno 6 caratteri";
  }

  if (!name) errors.name = "Nome obbligatorio";
  if (!surname) errors.surname = "Cognome obbligatorio";
  if (!address) errors.address = "Indirizzo obbligatorio";
  if (!phone || !/^\+?\d{8,15}$/.test(phone)) {
    errors.phone = "Numero di telefono non valido";
  }

  if (Object.keys(errors).length > 0) {
    return { error: errors };
  }

  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .limit(1)
    .single();

  if (existingUser) {
    return { error: { email: "Email già registrata" } };
  }

  const { data: sameNameUser } = await supabase
    .from("users")
    .select("id")
    .eq("full_name", `${name} ${surname}`)
    .limit(1)
    .single();

  if (sameNameUser) {
    return { error: { name: "Nome e cognome già registrati" } };
  }

  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    phone,
  });

  if (signupError || !signupData?.user) {
    return { error: { general: "Registrazione fallita, riprova più tardi." } };
  }

  const newUserToAdd: UsersProps = {
    id: signupData.user.id,
    email,
    full_name: `${name} ${surname}`,
    address,
    phone,
  };

  const { error: insertError } = await supabase
    .from("users")
    .insert(newUserToAdd);

  if (insertError) {
    return { error: { general: "Errore durante il salvataggio dei dati." } };
  }

  return {
    success: true,
    user: newUserToAdd,
  };
}
