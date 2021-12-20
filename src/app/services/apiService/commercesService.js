import { serialize } from 'object-to-formdata';
import commerceRepository from '../../repositories/commerceRepository';

const commercesService = {
  saveCommerce: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const requestData = commerceRequestData(data);
      return await commerceRepository.saveCommerce(
        serialize(requestData, { nullsAsUndefineds: true })
      );
    } catch (error) {
      throw error;
    }
  },

  updateCommerce: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { id } = data;
      const requestData = commerceRequestData(data, 'PUT');
      return await commerceRepository.updateCommerce(
        id,
        serialize(requestData, { nullsAsUndefineds: true })
      );
    } catch (error) {
      throw error;
    }
  },
};

const commerceRequestData = (dataCommerce, method) => {
  dataCommerce = dataCommerce || {};
  const withImages = checkUploadImages(dataCommerce);

  return {
    ...withImages,
    name: dataCommerce.name,
    nit: dataCommerce.nit,
    contact: dataCommerce.contact,
    email: dataCommerce.email,
    address: dataCommerce.address,
    city_id: dataCommerce.city_id,
    phone: dataCommerce.phone,
    latitude: dataCommerce.latitude,
    longitude: dataCommerce.longitude,
    attention_schedule: dataCommerce.attention_schedule,
    quantity_table: dataCommerce.quantity_table,
    _method: method,
  };
};

const checkUploadImages = (data) => {
  let withImages = {};

  if (!data?.logo?.id) {
    withImages = { ...withImages, logo: data.logo };
  }
  if (!data?.banner?.id) {
    withImages = { ...withImages, banner: data.banner };
  }
  return withImages;
};

export default commercesService;
