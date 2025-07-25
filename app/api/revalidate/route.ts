// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { path } = await req.json();

  if (!path) {
    return new Response(JSON.stringify({ error: "Missing path" }), {
      status: 400,
    });
  }

  revalidatePath(path); // e.g. /page/1
  return new Response(JSON.stringify({ revalidated: true }), {
    status: 200,
  });
}
