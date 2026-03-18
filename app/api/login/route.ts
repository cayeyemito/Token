import { NextResponse } from "next/server";

import { TEST_USER } from "@/lib/constants";
import { signAuthToken } from "@/lib/jwt";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBody;
  const email = body.email?.trim().toLowerCase();
  const password = body.password?.trim();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Debes indicar email y contraseña." },
      { status: 400 },
    );
  }

  if (email !== TEST_USER.email || password !== TEST_USER.password) {
    return NextResponse.json(
      { error: "Credenciales incorrectas." },
      { status: 401 },
    );
  }

  const user = {
    email: TEST_USER.email,
    name: TEST_USER.name,
  };

  const token = signAuthToken(user);

  return NextResponse.json({ token, user });
}
