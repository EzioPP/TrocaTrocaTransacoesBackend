import { User as UserPrisma } from '@prisma/client';
import { User } from '@/domain/entities';
export class UserMapper {
  static toDomain(user: UserPrisma): User {
    return new User(
      user.id_cliente ?? 0,
      user.login ?? '',
      user.senha ?? '',
      user.id_cliente ?? 0,
    );
  }

  static toPersistence(user: User): any {
    return {
      id_usuario: user.id,
      login: user.login,
      senha: user.password,
      id_cliente: user.clientId,
    };
  }
}
