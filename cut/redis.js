import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();
        this.client.on('error', (err) => console.error('Redis client error:', err));
    }

    /**
     * Check if the Redis client is connected
     * @returns {boolean} true if the connection is alive, otherwise false
     */
    isAlive() {
        return this.client.connected;
    }

    /**
     * Get the value of a key from Redis
     * @param {string} key - The key to retrieve
     * @returns {Promise<string|null>} The value of the key, or null if it does not exist
     */
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) reject(err);
                resolve(value);
            });
        });
    }

    /**
     * Set a key-value pair in Redis with an expiration time
     * @param {string} key - The key to set
     * @param {string|number} value - The value to store
     * @param {number} duration - The expiration time in seconds
     * @returns {Promise<void>}
     */
    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, value, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    /**
     * Delete a key from Redis
     * @param {string} key - The key to delete
     * @returns {Promise<void>}
     */
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
}

const redisClient = new RedisClient();
export default redisClient;

