import { createClient } from 'redis';
import * as dotenv from 'dotenv';

dotenv.config();

const client = createClient({
    url: process.env.REDIS_URL,
});

client.on('error', (err) => console.error('❌ Redis Client Error:', err));

client.connect()
    .then(() => console.log('✅ Conectado a Redis en la nube'))
    .catch((error) => console.error('❌ Error conectando a Redis:', error));

export default client;