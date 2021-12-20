import http from '../services/http';

const commerceUrl = '/api/v1/commerces';

const headers = {
  applicationJson: 'application/json',
  multipartFormData: 'multipart/form-data',
};

const commerceRepository = {
  saveCommerce: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${commerceUrl}`, data);
    } catch (error) {
      throw error;
    }
  },

  updateCommerce: async (idCommerce, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.put(`${commerceUrl}/${idCommerce}`, data);
    } catch (error) {
      throw error;
    }
  },
};
export default commerceRepository;
