import Cookies from 'js-cookie';
import BASE_URL from './apiService';

interface IOrderTourHeaderService {
  getOrderTourHeaderByUserId(): Promise<IOrderTourHeader[]>;
  getOrderTourHeaderBySupplierId(): Promise<IOrderTourHeader[]>;
  getOrderTourHeaderBySupplierIdAdmin(supplierId: number): Promise<IOrderTourHeader[]>;
}
export const toggleOrderTourStatus = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/toggleOrderTourHeaderStatus`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    if (!response.ok) {
      throw new Error('Failed to toggle order tour status');
    }
  } catch (error: any) {
    throw new Error('Failed to toggle order tour status: ' + error.message);
  }
};
const orderTourHeaderService: IOrderTourHeaderService = {
  async getOrderTourHeaderByUserId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getOrderTourHeaderByUserId`,
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
        throw new Error("Failed to fetch order tour headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order tour headers:", error);
      throw error;
    }
  },
  async getOrderTourHeaderBySupplierId() {
    try {
      const response = await fetch(
        `${BASE_URL}/getOrderTourHeaderBySupplierId`,
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
        throw new Error("Failed to fetch order tour headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order tour headers:", error);
      throw error;
    }
  },
  async getOrderTourHeaderBySupplierIdAdmin(supplierId) {
    try {
      const response = await fetch(
        `${BASE_URL}/getOrderTourHeaderBySupplierIdAdmin/${supplierId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order tour headers");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching order tour headers:", error);
      throw error;
    }
  },
};

export default orderTourHeaderService;
