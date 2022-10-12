export function configure<V, C> (callback: (vars: V) => C, envs: { [key: string]: V }): C {
  const env = process.env.NODE_ENV || "development";
  const vars = envs[env] || envs.development;
  const config = callback(vars);
  return config;
}