import Cookies from 'js-cookie';
import BASE_URL from './apiService';

interface IOrderHotelDetailService {
  getOrderHotelDetailByOrderHotelHeaderId(orderHotelHeaderId: number): Promise<IOrderHotelDetail>;
}

const orderHotelDetailService: IOrderHotelDetailService = {
  async getOrderHotelDetailByOrderHotelHeaderId(orderHotelHeaderId) {
    try {
      const response = await fetch(
        `${BASE_URL}/getOrderHotelDetailByOrderHotelHeaderId/${orderHotelHeaderId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel detail");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order hotel detail:", error);
      throw error;
    }
  },
};

export default orderHotelDetailService;
