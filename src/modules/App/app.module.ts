import { CacheModule, CacheStore, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
// import * as config from 'config';
import { redisStore } from "cache-manager-redis-store";
import { RedisClientOptions } from "redis";
import FilmsModule from "../Films/films.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: { host: "localhost", port: 6379 },
          ttl: 60 * 60,
        });
        // const store = await redisStore(configLocal);

        return { store: store as unknown as CacheStore };
      },
    }),

    FilmsModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
