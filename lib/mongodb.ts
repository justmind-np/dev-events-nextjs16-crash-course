import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

/**
 * Cached connection interface.
 * - `conn`: the active Mongoose connection (null until connected)
 * - `promise`: the in-flight connection promise (null until first call)
 */
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

/**
 * Cache the connection on the Node.js global object so it persists
 * across hot reloads in development (Next.js re-evaluates modules on each request).
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

/**
 * Returns a cached Mongoose connection, creating one if it doesn't exist.
 */
async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, { dbName: "devEvent" })
      .then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
