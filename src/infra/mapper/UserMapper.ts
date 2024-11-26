import { User as UserPrisma } from '@prisma/client';
import { User } from '@/domain/entities';
export class UserMapper {
  static toDomain(user: UserPrisma): User {
    return new User(
      user.id_usuario ?? 0,
      user.username ?? '',
      user.senha ?? '',
      user.permissao ?? '',
      user.id_cliente ?? 0,
    );
  }

  static toPersistence(user: User): any {
    return {
      id_usuario: user.id,
      username: user.username,
      senha: user.password,
      permissao: user.permission,
      id_cliente: user.clientId,
    };
  }
}
