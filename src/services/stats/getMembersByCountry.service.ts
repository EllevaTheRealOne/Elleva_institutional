import { httpClient } from "@/api/client/httpClient";
import { API_CONFIG } from "@/api/config/apiConfig";
import { membersByCountryResponseSchema, type MembersByCountryResponse } from "./types";

export class StatsService {
  /**
   * Member counts per country, for the Global Presence map.
   *
   * Throws on a non-2xx answer or on a body that does not match the contract: a
   * map drawn from half a payload would publish wrong numbers, and the section
   * hides itself on error instead.
   */
  public static async getMembersByCountry(): Promise<MembersByCountryResponse> {
    // Dev-only preview without a running api: VITE_ELLEVA_API_URL=fixture.
    // `import.meta.env.DEV` is false in a production build, so the branch and the
    // fixture chunk are dropped from the bundle.
    if (import.meta.env.DEV && API_CONFIG.elleva.baseUrl === "fixture") {
      const { membersByCountryFixture } = await import("./fixtures/membersByCountry.fixture");
      return membersByCountryFixture;
    }

    const data = await httpClient.get<unknown>(
      `${API_CONFIG.elleva.baseUrl}/public/members-by-country`,
      { timeout: API_CONFIG.elleva.timeout },
    );

    return membersByCountryResponseSchema.parse(data);
  }
}
