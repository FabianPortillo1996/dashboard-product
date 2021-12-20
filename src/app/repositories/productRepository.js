import http from '../services/http';

// eslint-disable-next-line camelcase
const productUrl = '/api/v1/products';
const productVariantUrl = '/api/v1/variantProducts';

const productsRepository = {
  getProductsByCategory: async (category) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${productUrl}/menu/${category}?include=productVariants`);
    } catch (error) {
      throw error;
    }
  },
  getProductsByCommerce: async (commerce) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${productUrl}/commerce/${commerce}?include=productVariants`);
      // return data;
    } catch (error) {
      throw error;
    }
  },
  saveProduct: async (commerce, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${productUrl}/${commerce}`, data);
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async (product, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.put(`${productUrl}/${product}`, data);
    } catch (error) {
      throw error;
    }
  },

  statusProduct: async (product) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${productUrl}/status/${product}`);
    } catch (error) {
      throw error;
    }
  },

  saveProductVariant: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${productVariantUrl}`, data);
    } catch (error) {
      throw error;
    }
  },
  updateProductVariant: async (id, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.put(`${productVariantUrl}/${id}`, data);
    } catch (error) {
      throw error;
    }
  },
  statusProductVariant: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.delete(`${productVariantUrl}/${data}`);
    } catch (error) {
      throw error;
    }
  },
};

export default productsRepository;
