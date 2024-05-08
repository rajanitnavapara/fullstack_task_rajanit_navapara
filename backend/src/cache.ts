import * as redis from "redis"; //Enable redis Cache

const firstName = "RAJANIT";
const key = `FULLSTACK_TASK_${firstName}`; //FULLSTACK_TASK_RAJANIT
const CACHE_FLAG_KEY = "CACHE_FLAG";

const REDIS_HOST = "redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com";
const REDIS_PORT = "12675";
const REDIS_USERNNAME = "default"
const REDIS_PASSWORD = "dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB"
const url = `redis://localhost:${REDIS_PORT}`

enum DataState {
    NOT_INITIATED = "0",
    INITIATED = "1",
    FLUSHED = "2",
  }
  

 // Create Redis client with configuration object
const redisOptions: redis.RedisClientOptions = {
    url : `redis://${REDIS_USERNNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`, // Use URL with port information
    username: REDIS_USERNNAME,
    password: REDIS_PASSWORD // Use URL with port information
  };
  
  // Create Redis client
const redisClient = redis.createClient(redisOptions); 

export default redisClient;