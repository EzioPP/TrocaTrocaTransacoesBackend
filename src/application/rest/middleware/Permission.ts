import { User } from '@/domain/entities';
import { Request, Response, NextFunction } from 'express';
import { permission } from 'process';
/* example

protect(administrador)
*/
enum PermissionEnum {
  'admin' = 3,
  'moderator' = 2,
  'user' = 1,
}

export function can(permission: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as User;
      if (!user) {
        return res.status(403).json({ message: 'Access denied' });
      }
      const userPermissionValue =
        PermissionEnum[user.permission as keyof typeof PermissionEnum];
      const requiredPermissionValue =
        PermissionEnum[permission as keyof typeof PermissionEnum];
      console.log('User permission:', user.permission);
      console.log('Required permission:', permission);

      console.log('User permission value:', userPermissionValue);
      console.log('Required permission value:', requiredPermissionValue);
      if (userPermissionValue < requiredPermissionValue) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}
