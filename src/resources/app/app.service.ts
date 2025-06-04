import { Injectable } from '@nestjs/common';
import { ENVCONFIG } from 'src/config/env.config';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return `Server is running! 🚀\n Please check <a href="http://localhost:${ENVCONFIG.PORT}/api/v0/docs">http://localhost:${ENVCONFIG.PORT}/api/v0/docs</a> for Swagger docs...`;
  }
}
