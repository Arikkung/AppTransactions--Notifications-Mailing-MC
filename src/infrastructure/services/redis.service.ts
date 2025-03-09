import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    this.client.on('error', (err) => console.error('❌ Redis Error:', err));

    this.client.connect().then(() => console.log('✅ Conectado a Redis'));
  }

  async saveNotification(key: string, data: any) {
    await this.client.set(key, JSON.stringify(data));
  }

  async getNotification(key: string) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }
}