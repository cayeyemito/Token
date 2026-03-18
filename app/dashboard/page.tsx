"use client";

import { ShieldCheck, Tags } from "lucide-react";

import { AuthGuard } from "@/components/auth-guard";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { COURSE_CONCEPTS, HTML_TAGS } from "@/lib/constants";

export default function DashboardPage() {
  return (
    <AuthGuard>
      {(session) => (
        <main className="min-h-screen">
          <Header user={session.user} />

          <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
            <Card className="border-[#FF5376]/20 bg-[#171219]/78 shadow-soft backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Bienvenido a la zona privada</CardTitle>
                <CardDescription className="text-slate-300">
                  Esta pantalla solo se muestra cuando existe una sesion valida guardada en el cliente.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
                <div className="rounded-xl border border-[#225560]/40 bg-[#225560]/18 p-4">
                  <p className="font-medium text-[#FAF33E]">Usuario autenticado</p>
                  <p>Email: {session.user.email}</p>
                  <p>Nombre: {session.user.name}</p>
                </div>
                <div className="rounded-xl border border-[#F0386B]/30 bg-[#F0386B]/10 p-4">
                  <p className="font-medium text-[#FF5376]">Sesion JWT</p>
                  <p>
                    El token incluye un tiempo de vida. Si expira o se borra del cliente, el acceso a esta
                    ruta se pierde.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-[#FF5376]/20 bg-[#171219]/78 shadow-soft backdrop-blur">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <div className="rounded-full bg-[#F0386B]/15 p-2 text-[#FAF33E]">
                    <Tags className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-white">15 etiquetas HTML mas usadas</CardTitle>
                    <CardDescription className="text-slate-300">
                      Resumen util para repasar estructura y semantica.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {HTML_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#225560] bg-[#225560]/18 px-3 py-1 text-sm text-[#FAF33E]"
                    >
                      {tag}
                    </span>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-[#FF5376]/20 bg-[#171219]/78 shadow-soft backdrop-blur">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <div className="rounded-full bg-[#FAF33E]/14 p-2 text-[#FAF33E]">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Conceptos principales del curso</CardTitle>
                    <CardDescription className="text-slate-300">
                      Elementos clave usados en esta practica.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {COURSE_CONCEPTS.map((concept) => (
                    <div
                      key={concept}
                      className="rounded-xl border border-[#FF5376]/20 bg-[#F0386B]/10 px-3 py-2 text-sm text-slate-100"
                    >
                      {concept}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      )}
    </AuthGuard>
  );
}
