import { bootstrapServerless } from '../src/main';

// Vercel serverless entry — forwards every request into the cached Nest app.
export default async function handler(req: any, res: any) {
  const server = await bootstrapServerless();
  return server(req, res);
}
