import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  redis: Redis
  // constructor(private loginLogsService: LoginLogsService) {
  //   this.redis = new Redis({
  //     port: 6379, // Redis port
  //     host: '127.0.0.1', // Redis host
  //     // username: "default", // needs Redis >= 6
  //     // password: "my-top-secret",
  //     db: 1, // Defaults to 0
  //   })
  // }
}
