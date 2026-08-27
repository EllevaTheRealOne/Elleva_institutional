export class ResourceService {
  public static async checkResourceExists(url: string): Promise<boolean> {
    try {
      const res = await fetch(url, { method: "HEAD" });
      const contentType = res.headers.get("content-type");
      return (
        res.ok &&
        (contentType?.includes("application/pdf") || res.status === 200)
      );
    } catch {
      return false;
    }
  }
}
