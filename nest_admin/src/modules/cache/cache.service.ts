import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  redis: Redis
  isConnected: boolean = false;

  constructor() {
    this.redis = new Redis({
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      // username: "default", // needs Redis >= 6
      // password: "my-top-secret",
      db: 1, // Defaults to 0
      retryStrategy: (times) => {
        const maxRetries = 10; // 最大重连次数
        const retryDelay = 600000; // 重连间隔（毫秒）
        if (times > maxRetries) {
          console.error('Redis 重连次数达到最大限制，停止重连');
          return null; // 停止重连
        }
        console.log(`Redis 正在重连... 尝试次数: ${times}`);
        return retryDelay; // 返回重连间隔
      },
    })

    this.redis.on('connect', () => {
      console.log('Redis 已连接');
      this.isConnected = true;
    });

    this.redis.on('reconnecting', () => {
      console.log('Redis  正在重连...');
      this.isConnected = false;
    });

    this.redis.on('error', (err) => {
      console.error('Redis 出错了', err);
      this.isConnected = false;
    });

    this.redis.on('close', () => {
      console.log('Redis 连接关闭');
      this.isConnected = false;
    });

  }

  async set(key: string, value: string, time = 60) {
    if (!this.isConnected) {
      console.log('redis未连接',key,": 缓存失败");
      return null
    }
    if (Object.prototype.toString.call(value) === '[object Object]') {
      value = JSON.stringify(value)
    }
    return await this.redis.set(key, value, 'EX', time)
  }

  async get(key: string) {
    if (!this.isConnected) {
      console.log('redis未连接',key,": 获取失败");
      return null
    }
    let value = await this.redis.get(key)
    return value
  }

  async del(key: string) {
    if (!this.isConnected) {
      console.log('redis未连接',key,": 无法删除");
      return null
    }
    return await this.redis.del(key)
  }

}
