export async function getPkgInfo(pkg_name: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(pkg_name)}/latest`,
      {
        signal: AbortSignal.timeout(60000),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch version for ${pkg_name}`);
    }

    const data = await res.json();
    return [data.name, data.version];
  } catch (err) {
    throw err;
  }
}
