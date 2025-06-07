declare module 'express' {
  interface Request extends Request {
    headers: any;
    user?: any;
  }
}
