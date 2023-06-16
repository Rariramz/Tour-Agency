import { CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from 'rxjs';
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(), context.getClass()
      ]);
      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User unauthorized' });
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      return requiredRoles.includes(user.role.name);
    } catch {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}