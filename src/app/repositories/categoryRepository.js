import http from '../services/http';

// eslint-disable-next-line camelcase
const categoryUrl = '/api/v1/categories';

const categoriesRepository = {
  getCategory: async (idCommerce) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const categories = await http.get(`${categoryUrl}/commerce/${idCommerce}`);
      return categories;
    } catch (error) {
      throw error;
    }
  },
  getCategoryByUser: async (idCommerce) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const categories = await http.get(`${categoryUrl}/user/${idCommerce}`);
      return categories;
    } catch (error) {
      throw error;
    }
  },
  saveCategory: async (idCommerce, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const category = await http.post(`${categoryUrl}/${idCommerce}`, data);
      return category;
    } catch (error) {
      throw error;
    }
  },

  updateCategory: async (idCategory, idCommerce, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const categoryUpdate = await http.put(`${categoryUrl}/${idCategory}/${idCommerce}`, data);
      return categoryUpdate;
    } catch (error) {
      throw error;
    }
  },

  statusCategory: async (idCategory, idCommerce) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const categoryUpdate = await http.get(`${categoryUrl}/status/${idCategory}/${idCommerce}`);
      return categoryUpdate;
    } catch (error) {
      throw error;
    }
  },
};

export default categoriesRepository;
