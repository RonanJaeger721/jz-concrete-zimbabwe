import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }));
  const expectedPassword = process.env.JZ_ADMIN_PASSWORD || "JZconcrete123";

  if (password !== expectedPassword) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
