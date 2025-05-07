import axios from "axios";

export const productService = {
  getAllProduct: () => {
    const url = "https://fakestoreapi.com/products";
    return axios.get(url);
  },
};
