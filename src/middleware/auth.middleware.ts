import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 1. Check if the "user-role" header exists
    const role = req.headers['user-role'];

    console.log(`[Middleware] Request received with Role: ${role}`);

    // 2. Validation: If no role is provided
    if (!role) {
      throw new UnauthorizedException('Role header is missing. Please provide "user-role".');
    }

    // 3. Authorization: Check if the role is valid
    const validRoles = ['admin', 'employee', 'hr'];
    
    // We convert to string and lowercase to be safe
    const currentRole = role.toString().toLowerCase();

    if (!validRoles.includes(currentRole)) {
      throw new ForbiddenException(`Access Denied. Role '${currentRole}' is not allowed.`);
    }

    // 4. If everything is good, proceed to the Controller
    next();
  }
}