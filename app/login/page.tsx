"use client";

import { useState } from "react";
import { login, signup } from "./action";
import TextBox from "../components/Input/TextBox";
import LoginLogo from "../components/Login/Logo";
import PhoneTextBox from "../components/Input/PhoneTextBox";
import ErrorForm from "../components/Error/ErrorForm";
import { useRouter } from "next/navigation";
// import { setUser } from "@/lib/slices/user-slice";
// import { useAppDispatch } from "@/lib/hook";

export default function LoginPage() {
  const router = useRouter();
  // const dispatch = useAppDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Inserisci un'email valida";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "La password deve avere almeno 6 caratteri";
    }

    if (isSignUp) {
      if (!formData.name) newErrors.name = "Nome obbligatorio";
      if (!formData.surname) newErrors.surname = "Cognome obbligatorio";
      if (!formData.address) newErrors.address = "Indirizzo obbligatorio";
      if (!formData.phone || !/^\+?\d{8,15}$/.test(formData.phone)) {
        newErrors.phone = "Numero di telefono non valido";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    const result = isSignUp ? await signup(data) : await login(data);

    if (result?.error) {
      setErrors(result.error);
    } else {
      if (result.user) {
        console.log(result.user);
        // dispatch(setUser(result.user));
      }
      router.push("/");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-lg overflow-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {isSignUp ? "Crea un account" : "Benvenuto"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <TextBox
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <TextBox
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            {isSignUp && (
              <>
                <TextBox
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
                <TextBox
                  label="Cognome"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  error={errors.surname}
                  required
                />
                <TextBox
                  label="Indirizzo"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                  required
                />
                <PhoneTextBox
                  label="Telefono"
                  name="phone"
                  value={formData.phone}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, phone: val || "" }))
                  }
                  error={errors.phone}
                />
              </>
            )}
            <ErrorForm errors={errors} />
            <div className="flex space-x-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  isSignUp
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white py-2 px-4 rounded-md transition disabled:opacity-50`}
              >
                {isSubmitting
                  ? isSignUp
                    ? "Signing up..."
                    : "Logging in..."
                  : isSignUp
                  ? "Sign up"
                  : "Log in"}
              </button>
            </div>

            <div className="pt-4 text-center text-sm text-gray-600">
              {isSignUp ? (
                <>
                  Hai già un account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-blue-600 hover:underline"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  Non hai un account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      <LoginLogo />
    </div>
  );
}
