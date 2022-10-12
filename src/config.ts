import { configure } from "./libs/configure";

interface Config {
  server: {
    name: string;
    port: number;
  };
  jwt: {
    apiSecret: string;
  };
  redis: {
    host: string;
    port: number;
  };
  mongodb: {
    url: string;
  }
}

interface Variables {
  PORT: number;
  REDIS: {
    host: string;
    port: number;
  }
  MONGODB: {
    url: string;
  }
}

const config = configure<Variables, Config>(
  ({ REDIS, PORT, MONGODB }) => ({
    server: {
      name: "typescript-server-starter",
      port: PORT
    },
    jwt: {
      apiSecret: "typescript-server-starter-secret",
    },
    redis  : REDIS,
    mongodb: MONGODB,
  }),
  {
    development: {
      PORT : 6001,
      REDIS: {
        host: "127.0.0.1",
        port: 6379,
      },
      MONGODB: {
        url: "mongodb://127.0.0.1:27017/development",
      }
    },
    production: {
      PORT : 6001,
      REDIS: {
        host: "127.0.0.1",
        port: 6379,
      },
      MONGODB: {
        url: "mongodb://127.0.0.1:27017/production",
      }
    },
  }
);

export default config;
