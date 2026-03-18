"use client";

import { ShieldCheck, Tags } from "lucide-react";

import { AuthGuard } from "@/components/auth-guard";
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { COURSE_CONCEPTS, HTML_TAGS } from "@/lib/constants";

const CHEESE_COLORS = [
  "#F6C453",
  "#F28B50",
  "#F8CF6B",
  "#EDAA2E",
  "#FFD978",
  "#F4BE47",
  "#FF7A59",
  "#A3D977",
  "#58C4DD",
  "#7C6CF2",
  "#FF5D8F",
  "#42B883",
  "#C98BFF",
  "#FFB703",
  "#00A6A6",
];

const TAG_WEIGHTS = [8, 7, 6, 5, 9, 4, 5, 7, 4, 6, 8, 9, 10, 6, 6];

function polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function buildSlicePath(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [`M ${cx} ${cy}`, `L ${start.x} ${start.y}`, `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`, "Z"].join(" ");
}

export default function DashboardPage() {
  const viewBoxSize = 420;
  const center = viewBoxSize / 2;
  const radius = 156;
  const totalWeight = TAG_WEIGHTS.reduce((sum, weight) => sum + weight, 0);
  const chartSlices = HTML_TAGS.map((tag, index) => {
    const previousWeight = TAG_WEIGHTS.slice(0, index).reduce((sum, weight) => sum + weight, 0);
    const currentWeight = TAG_WEIGHTS[index];
    const startAngle = (previousWeight / totalWeight) * 360;
    const endAngle = ((previousWeight + currentWeight) / totalWeight) * 360;
    const percentage = Math.round((currentWeight / totalWeight) * 100);

    return {
      tag,
      startAngle,
      endAngle,
      percentage,
      color: CHEESE_COLORS[index % CHEESE_COLORS.length],
    };
  });

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
                      Resumen util para repasar estructura y semantica en formato quesito.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative overflow-hidden rounded-[2rem] border border-[#E9B949]/35 bg-[radial-gradient(circle_at_top,_rgba(255,247,193,0.28),_rgba(233,185,73,0.18)_38%,_rgba(23,18,25,0.2)_70%)] p-4">
                    <div className="absolute inset-x-8 top-4 h-10 rounded-full bg-white/10 blur-2xl" />
                    <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className="relative mx-auto w-full max-w-[420px] drop-shadow-[0_18px_36px_rgba(0,0,0,0.28)]">
                      <circle cx={center} cy={center} r={radius + 16} fill="#7A4B12" opacity="0.24" />

                      {chartSlices.map(({ tag, startAngle, endAngle, percentage, color }) => {
                        const midAngle = startAngle + (endAngle - startAngle) / 2;

                        return (
                          <g key={tag}>
                            <path
                              d={buildSlicePath(center, center, radius, startAngle, endAngle)}
                              fill={color}
                              stroke="#7A4B12"
                              strokeWidth="3"
                            />
                            <circle
                              cx={center + Math.cos(((midAngle - 90) * Math.PI) / 180) * (radius * 0.42)}
                              cy={center + Math.sin(((midAngle - 90) * Math.PI) / 180) * (radius * 0.42)}
                              r="5"
                              fill="#FFF4B3"
                              opacity="0.75"
                            />
                          </g>
                        );
                      })}

                      <circle cx={center} cy={center} r="46" fill="#FFF4B3" opacity="0.92" />
                      <circle cx={center} cy={center} r="31" fill="#F5C24B" opacity="0.95" />
                      <text
                        x={center}
                        y={center - 6}
                        fill="#6A3D09"
                        fontSize="17"
                        fontWeight="900"
                        textAnchor="middle"
                      >
                        HTML
                      </text>
                      <text
                        x={center}
                        y={center + 16}
                        fill="#6A3D09"
                        fontSize="11"
                        fontWeight="700"
                        textAnchor="middle"
                      >
                        15 tags
                      </text>
                    </svg>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-[#FFF4B3]">
                    {chartSlices.map(({ tag, color, percentage }) => (
                      <div
                        key={`${tag}-legend`}
                        className="flex items-center gap-2 rounded-full border border-[#7A4B12]/50 bg-[#5C3508]/20 px-3 py-1.5"
                      >
                        <span
                          className="size-2.5 rounded-full border border-[#7A4B12]/45"
                          style={{ backgroundColor: color }}
                        />
                        <span>
                          {tag} {percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
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
