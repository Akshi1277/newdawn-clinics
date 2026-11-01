import { TOPO_VARIANTS, topoSvg, type TopoVariant } from "@/components/art/topoVariants";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(TOPO_VARIANTS).map((name) => ({ variant: `${name}.svg` }));
}

export async function GET(_req: Request, { params }: RouteContext<"/art/topo/[variant]">) {
  const { variant } = await params;
  const name = variant.replace(/\.svg$/, "") as TopoVariant;
  return new Response(topoSvg(TOPO_VARIANTS[name]), {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
