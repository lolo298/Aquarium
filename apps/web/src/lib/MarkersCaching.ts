import type { StrategyHandler } from "serwist";
import { Strategy } from "serwist";
import type { Markers as MarkersType } from "@/types";
import { bucket } from "@repo/db/env";

/* Custom caching strategy for the PWA
 * Cache the /api/markers response and all the markers and models in db
 * Also cache the targets.mind file in the bucket
 */
export class Markers extends Strategy {
  protected async _handle(
    request: Request,
    handler: StrategyHandler,
  ): Promise<Response | undefined> {
    // Get the markers from the /api/markers endpoint
    const data: MarkersType = await fetch(request.url)
      .then((res) => res.json())
      .catch((err) => {
        return undefined;
      });

    // if no data (no connection) return the cached response
    if (!data) {
      return handler.cacheMatch(request);
    }

    const original = handler.fetchAndCachePut(request);

    //same as above but with timeout

    await Promise.all(
      data.reduce(
        (acc, marker) => {
          acc.push(handler.fetchAndCachePut(new Request(marker.model.path)));
          acc.push(handler.fetchAndCachePut(new Request(marker.preview.path)));
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
