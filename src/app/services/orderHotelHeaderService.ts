import Cookies from 'js-cookie';
import BASE_URL from './apiService';

interface IOrderHotelHeaderService {
  getOrderHotelHeaderByUserId(): Promise<IOrderHotelHeader[]>;
  getOrderHotelHeaderBySupplierId(): Promise<IOrderHotelHeader[]>;
  getOrderHotelHeaderBySupplierIdAdmin(supplierId : number): Promise<IOrderHotelHeader[]>;
}
export const toggleOrderHotelHeaderStatus = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/toggleOrderHotelHeaderStatus`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    if (!response.ok) {
      throw new Error('Failed to toggle order header status');
    }
  } catch (error: any) {
    throw new Error('Failed to toggle order header status: ' + error.message);
  }
};
const orderHotelHeaderService: IOrderHotelHeaderService = {
  async getOrderHotelHeaderByUserId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getOrderHotelHeaderByUserId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenUser")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  async getOrderHotelHeaderBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getOrderHotelHeaderBySupplierId`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("tokenSupplier")}`, // Retrieve token from localStorage
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
  async getOrderHotelHeaderBySupplierIdAdmin(supplierId) {
    try {
      const response = await fetch(
        `${BASE_URL}/getOrderHotelHeaderBySupplierIdAdmin/${supplierId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order hotel headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order hotel headers:", error);
      throw error;
    }
  },
};

export default orderHotelHeaderService;
