import { httpClient } from "@/api/client/httpClient";
import { API_CONFIG } from "@/api/config/apiConfig";
import { CurrencyPair, AwesomeApiResponse } from "./types";

export class CurrencyService {
  public static async getExchangeRate({ from, to }: CurrencyPair): Promise<number> {
    if (!from || !to || to === from) return 1;

    const pair = `${to}-${from}`;
    const url = `${API_CONFIG.currency.baseUrl}/${pair}`;

    try {
      const data = await httpClient.get<AwesomeApiResponse>(url);
      const key = pair.replace("-", "");

      if (data && data[key] && data[key].bid) {
        return Number(data[key].bid);
      }
      return 1;
    } catch {
      return 1;
    }
  }
}
