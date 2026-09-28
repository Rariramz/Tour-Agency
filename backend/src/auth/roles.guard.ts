import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(), context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const [scheme, token] = (request.headers.authorization ?? '').split(' ');
    if (scheme !== 'Bearer' || !token) throw new UnauthorizedException();

    let payload: { id: number };
    try {
      payload = await this.jwtService.verifyAsync<{ id: number }>(token);
    } catch {
      throw new UnauthorizedException();
    }
    if (!Number.isInteger(payload.id)) throw new UnauthorizedException();
    const user = await User.findByPk(payload.id, { include: ['role'] });
    if (!user || user.banned) throw new UnauthorizedException();
    if (!requiredRoles.includes(user.role?.name)) throw new ForbiddenException();
    request.user = { id: user.id, email: user.email, role: user.role.name };
    return true;
  }
}
