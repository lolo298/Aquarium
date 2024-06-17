import type { StrategyHandler } from "serwist";
import { Strategy } from "serwist";
import { bucket, type getAllMarkers } from "@repo/db";

export class Markers extends Strategy {
  protected async _handle(
    request: Request,
    handler: StrategyHandler,
  ): Promise<Response | undefined> {
    const data: Awaited<ReturnType<typeof getAllMarkers>> = await fetch(
      request.url,
    )
      .then((res) => res.json())
      .catch((err) => {
        return undefined;
      });

    if (!data) {
      return handler.cacheMatch(request);
    }

    const original = handler.fetchAndCachePut(request);

    //same as above but with timeout

    await Promise.all(
      data.reduce(
        (acc, marker) => {
          acc.push(handler.fetchAndCachePut(new Request(marker.model.path)));
          return acc;
        },
        [
          handler.fetchAndCachePut(
            new Request(
              `https://ofnectvdmnyxxznhaagk.supabase.co/storage/v1/object/public/${bucket}/uploads/targets.mind`,
            ),
          ),
        ] as Promise<Response>[],
      ),
    );

    return original;
  }
}
