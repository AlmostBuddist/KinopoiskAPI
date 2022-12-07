import { CacheModule, CacheStore, Module } from "@nestjs/common";
import { redisStore } from "cache-manager-redis-store";
import { RedisClientOptions } from "redis";
import * as config from "config";
import FilmsModule from "../Films/films.module";

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: { ...config.get("redis.socket") },
          ttl: config.get("redis.ttl"),
        });

        return { store: store as unknown as CacheStore };
      },
    }),

    FilmsModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
