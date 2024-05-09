import { mutate } from "swr";
interface IProductService {
  getProductList(): Promise<any[]>;
  // Other methods if needed
}

const productService: IProductService = {
    
  async getProductList() {
    try {
      const response = await fetch("https://localhost:7059/api/Product");
      if (!response.ok) {
        throw new Error("Failed to fetch product list");
      }
      const data = await response.json();
      await mutate("https://localhost:7059/api/Product");
      return data;
    } catch (error) {
      console.error("Error fetching product list:", error);
      throw error;
    }
  },
  // Other methods if needed
};

export default productService;

