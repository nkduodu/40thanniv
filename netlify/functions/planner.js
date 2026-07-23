import { getStore } from "@netlify/blobs";
const STORE = "cost-planner"; const KEY = "planner-data";

export default async (req) => {
  const store = getStore(STORE);
  if (req.method === "GET") {
    const data = await store.get(KEY, { type: "json" });
    return new Response(JSON.stringify(data || null), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
  if (req.method === "POST") {
    const body = await req.json();
    await store.setJSON(KEY, body);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
  return new Response("Method not allowed", { status: 405 });
};
export const config = { path: "/api/planner" };
