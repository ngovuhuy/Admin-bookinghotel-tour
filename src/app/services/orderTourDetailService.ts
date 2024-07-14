import Cookies from 'js-cookie';
import BASE_URL from './apiService';

interface IOrderTourDetailService {
  getOrderTourDetailByOrderTourHeaderId(orderTourHeaderId: number): Promise<IOrderTourDetail>;
}

const orderTourDetailService: IOrderTourDetailService = {
  async getOrderTourDetailByOrderTourHeaderId(orderTourHeaderId) {
    try {
      const response = await fetch(
        `${BASE_URL}/getOrderTourDetailByOrderTourHeaderId/${orderTourHeaderId}`,
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
        throw new Error("Failed to fetch order tour detail");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order tour detail:", error);
      throw error;
    }
  },
};

export default orderTourDetailService;
