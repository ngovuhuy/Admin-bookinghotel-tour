import { mutate } from "swr";
interface IHotelService {
  getHotelList(): Promise<any[]>;
  // Other methods if needed
}

const hotelService: IHotelService = {
    
  async getHotelList() {
    try {
      const response = await fetch("https://localhost:7132/getHotels");
      if (!response.ok) {
        throw new Error("Failed to fetch hotel list");
      }
      const data = await response.json();
      await mutate("https://localhost:7132/getHotels");
      return data;
    } catch (error) {
      console.error("Error fetching product list:", error);
      throw error;
    }
  },
  // Other methods if needed
};

export default hotelService;

