"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, LockKeyhole, Mail } from "lucide-react";

import { saveSession } from "@/lib/auth";
import { TEST_USER } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginResponse = {
  token: string;
  user: {
    email: string;
    name: string;
  };
};

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(TEST_USER.email);
  const [password, setPassword] = useState(TEST_USER.password);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as LoginResponse | { error: string };

      if (!response.ok || !("token" in data)) {
        setError("error" in data ? data.error : "No se pudo iniciar sesion.");
        return;
      }

      // Para esta practica se usa localStorage por simplicidad.
      // En produccion suele ser mas seguro usar cookies httpOnly para reducir exposicion a XSS.
      saveSession(data.token, data.user);
      router.push("/dashboard");
    } catch {
      setError("Ha ocurrido un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-[#FF5376]/20 bg-[#171219]/82 shadow-soft backdrop-blur">
      <CardHeader className="space-y-2 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#F0386B]/15 text-[#FAF33E]">
          <LockKeyhole className="size-5" />
        </div>
        <CardTitle className="text-2xl text-white">Iniciar sesion</CardTitle>
        <CardDescription className="text-slate-300">
          Accede con el usuario de prueba para entrar al dashboard privado.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">
              Email
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#FF5376]" />
              <Input
                id="email"
                type="email"
                placeholder="admin@tomates.com"
                className="border-[#225560] bg-[#225560]/15 pl-9 text-white placeholder:text-slate-400"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-200">
              Contrasena
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="1234"
              className="border-[#225560] bg-[#225560]/15 text-white placeholder:text-slate-400"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error ? (
            <p className="rounded-xl border border-[#FF5376]/30 bg-[#F0386B]/10 px-3 py-2 text-sm text-[#FFD3DE]">
              {error}
            </p>
          ) : null}

          <Button className="w-full bg-[#F0386B] text-white hover:bg-[#FF5376]" type="submit" disabled={isLoading}>
            {isLoading ? <LoaderCircle className="size-4 animate-spin" /> : null}
            {isLoading ? "Validando..." : "Iniciar sesion"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="block rounded-b-3xl border-t border-[#225560]/40 bg-[#225560]/20 text-sm text-slate-200">
        <p className="font-medium text-[#FAF33E]">Credenciales de prueba</p>
        <p>Usuario: {TEST_USER.email}</p>
        <p>Contrasena: {TEST_USER.password}</p>
      </CardFooter>
    </Card>
  );
}
