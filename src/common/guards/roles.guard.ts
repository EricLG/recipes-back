import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { UserRole } from '../../domain/user/enums/user-role.enum'
import { UserDto } from './../../api/auth/dto/user.dto'

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ])
        if (!requiredRoles) {
            return true
        }

        const { user }: { user: UserDto } = context.switchToHttp().getRequest()
        if (!user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException('Insufficient permissions')
        }
        return true
    }

}
