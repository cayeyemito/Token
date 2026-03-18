"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { clearSession, type AuthUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  user: AuthUser;
};

export function Header({ user }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    // En JWT el token tiene vencimiento propio. El logout normal en apps sencillas
    // consiste en borrar el token del cliente. Si el token siguiera siendo valido,
    // el servidor no lo invalida automaticamente salvo que exista una blacklist u otra estrategia.
    clearSession();
    router.replace("/login");
  };

  return (
    <header className="border-b border-[#FF5376]/20 bg-[#171219]/72 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div>
          <p className="text-lg font-semibold text-white">Dashboard privado</p>
          <p className="text-sm text-slate-300">Sesion iniciada como {user.email}</p>
        </div>

        <Button
          variant="outline"
          className="border-[#225560] bg-[#225560]/12 text-white hover:border-[#FF5376] hover:bg-[#F0386B]/15 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          Cerrar sesion
        </Button>
      </div>
    </header>
  );
}
