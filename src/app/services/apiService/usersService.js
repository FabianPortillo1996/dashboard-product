import usersRepository from '../../repositories/userRepository';

const usersService = {
  getUsers: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await usersRepository.getUser();
    } catch (error) {
      throw error;
    }
  },
  saveUser: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await usersRepository.saveUser(data);
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { id } = data;
      // const body = AnimalModel(data);
      return await usersRepository.updateUser(id, data);
    } catch (error) {
      throw error;
    }
  },

  changeStatusUser: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { id } = data;
      return await usersRepository.statusUser(id);
    } catch (error) {
      throw error;
    }
  },

  getInfoUserCommerce: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await usersRepository.getInfoUser();
    } catch (error) {
      throw error;
    }
  },
};

export default usersService;
