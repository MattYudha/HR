import usersRepository from './users.repository';

export class UsersService {
  async getUserProfile(userId: string) {
    const user = await usersRepository.findUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getAllUsers() {
    const users = await usersRepository.findAllUsers();
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
}

export default new UsersService();
