import { serialize } from 'object-to-formdata';
import categoriesRepository from '../../repositories/categoryRepository';

const categoriesService = {
  getCategories: async (idCommerce) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await categoriesRepository.getCategory(idCommerce);
    } catch (error) {
      throw error;
    }
  },
  getCategoryByUser: async (idCommerce) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await categoriesRepository.getCategoryByUser(idCommerce);
    } catch (error) {
      throw error;
    }
  },
  saveCategory: async (idCommerce, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await categoriesRepository.saveCategory(idCommerce, data);
    } catch (error) {
      throw error;
    }
  },

  updateCategory: async (idCategory, idCommerce, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await categoriesRepository.updateCategory(
        idCategory,
        idCommerce,
        serialize(categoryRequestData(data))
      );
    } catch (error) {
      throw error;
    }
  },

  changeStatusCategory: async (idCategory, idCommerce) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await categoriesRepository.statusCategory(idCategory, idCommerce);
    } catch (error) {
      throw error;
    }
  },
};

const categoryRequestData = (dataCategory) => {
  dataCategory = dataCategory || {};

  return {
    category: dataCategory.category,
    _method: 'PUT',
  };
};

export default categoriesService;
