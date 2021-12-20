import { serialize } from 'object-to-formdata';
import productsRepository from '../../repositories/productRepository';

const productsService = {
  getProductsByCategory: async (category) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await productsRepository.getProductsByCategory(category);
    } catch (error) {
      throw error;
    }
  },
  getProductsByCommerce: async (commerce) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await productsRepository.getProductsByCommerce(commerce);
    } catch (error) {
      throw error;
    }
  },
  saveProduct: async (commerce, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await productsRepository.saveProduct(
        commerce,
        serialize(productRequestData(data), { nullsAsUndefineds: true })
      );
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async (product, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await productsRepository.updateProduct(
        product,
        serialize(productRequestData(data, 'PUT'), { nullsAsUndefineds: true })
      );
    } catch (error) {
      throw error;
    }
  },

  statusProduct: async (product) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await productsRepository.statusProduct(product);
    } catch (error) {
      throw error;
    }
  },

  /* PRODUCT VARIANTS */
  saveProductVariant: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await productsRepository.saveProductVariant(serialize(variantRequestData(data)));
    } catch (error) {
      throw error;
    }
  },
  updateProductVariant: async (id, data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await productsRepository.updateProductVariant(
        id,
        serialize(variantRequestData(data, 'PUT'), {
          nullsAsUndefineds: true,
        })
      );
    } catch (error) {
      throw error;
    }
  },
  statusProductVariant: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await productsRepository.statusProductVariant(data);
    } catch (error) {
      throw error;
    }
  },
};

const productRequestData = (dataProduct, method) => {
  dataProduct = dataProduct || {};
  const withImages = checkUploadImages(dataProduct);

  return {
    ...withImages,
    name: dataProduct.name,
    category_id: dataProduct.category_id,
    description: dataProduct.description,
    code: dataProduct.code,
    price_sale: dataProduct.price_sale,
    price_discount: dataProduct.price_discount,
    preparation_time: dataProduct.preparation_time,
    _method: method,
  };
};

const variantRequestData = (dataVariant, method) => {
  dataVariant = dataVariant || {};

  return {
    name: dataVariant.name,
    price: dataVariant.price,
    product_id: method === 'PUT' ? null : dataVariant.product_id,
    _method: method,
  };
};

const checkUploadImages = (data) => {
  let withImages = {};
  if (data?.photo) {
    withImages = { ...withImages, photo: data.photo };
  }
  return withImages;
};

export default productsService;
