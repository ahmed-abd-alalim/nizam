export async function getPkgInfo(pkg_name: string): Promise<string[]> {
  const res = await fetch(
    `https://registry.npmjs.org/${encodeURIComponent(pkg_name)}/latest`,
    {
      signal: AbortSignal.timeout(60000),
    },
  );

  if (!res.ok) {
    throw `Failed to fetch version for ${pkg_name}`;
  }

  const npm_json = await res.json();
  return [npm_json.name, npm_json.version];
}
