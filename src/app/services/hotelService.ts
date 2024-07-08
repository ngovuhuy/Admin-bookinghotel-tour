// apiService.js
import { mutate } from 'swr';

const BASE_URL = "https://trekbookingapi.azurewebsites.net";

interface IHotelService {
  getHotelList(): Promise<any[]>;
  // Other methods if needed
}

const hotelService: IHotelService = {
  async getHotelList() {
    try {
      const response = await fetch(`${BASE_URL}/getHotels`);
      if (!response.ok) {
        throw new Error("Failed to fetch hotel list");
      }
      const data = await response.json();
      await mutate(`${BASE_URL}/getHotels`);
      return data;
    } catch (error) {
      console.error("Error fetching hotel list:", error);
      throw error;
    }
  },
  // Other methods if needed
};

export default hotelService;
export { BASE_URL };
