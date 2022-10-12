import { configure } from "../configure";

interface Config {
  server: {
    name: string;
    port: number;
  };
}

interface Variables {
  PORT: number;
}

describe("libs/configure", () => {
  it("should return the configuration for the current environment", () => {
    const config = configure<Variables, Config>(
      ({ PORT }) => ({
        server: {
          name: "typescript-server-starter",
          port: PORT
        },
      }),
      {
        development: {
          PORT: 6001,
        },
        production: {
          PORT: 3000,
        },
      }
    );
    expect(config).toEqual({
      server: {
        name: "typescript-server-starter",
        port: 6001,
      }
    });
  });
});