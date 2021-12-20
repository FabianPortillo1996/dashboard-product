import http from '../services/http';

// eslint-disable-next-line camelcase
const userUrl = '/api/v1/users';

const usersRepository = {
  getUser: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const users = await http.get(`${userUrl}/commerce`);
      return users;
    } catch (error) {
      throw error;
    }
  },
  saveUser: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const user = await http.post(`${userUrl}/commerce`, data);
      return user;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (user, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const userupdate = await http.post(`${userUrl}/commerce/${user}`, data);
      return userupdate;
    } catch (error) {
      throw error;
    }
  },

  statusUser: async (user) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const userupdate = await http.get(`${userUrl}/status/${user}`);
      return userupdate;
    } catch (error) {
      throw error;
    }
  },

  getInfoUser: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get('/api/v1/auth/me?include=commerce');
    } catch (error) {
      throw error;
    }
  },
};

export default usersRepository;
