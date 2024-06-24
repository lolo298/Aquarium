import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const res = new Response(
    new ReadableStream({
      start(controller) {
        let i = 0;
        const id = setInterval(() => {
          controller.enqueue(`data: ${i}\n\n`);
          i++;
        }, 1000);
        return () => clearInterval(id);
      },
    }),
    {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    },
  );

  return res;
}
