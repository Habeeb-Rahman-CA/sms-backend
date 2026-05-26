import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const schoolCode = req.headers['x-school-code'] || req.headers['x-tenant-id'];
    
    // Attach resolved school code to request for access within controllers/services
    if (schoolCode) {
      (req as any).schoolCode = schoolCode;
    }
    
    next();
  }
}
