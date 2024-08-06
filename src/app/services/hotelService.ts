// apiService.js
import { mutate } from 'swr';

const BASE_URL = "https://trekbookingapi.azurewebsites.net";

interface IHotelService {
  getHotelList(): Promise<any[]>;
  getHotelById(hotelId: number): Promise<IHotel>;
  createHotel(hotel: IHotel): Promise<IHotel>;
  updateHotel(hotel: Partial<IHotel>): Promise<IHotel>;
  updateHotelAvatar(hotel: Partial<IHotel>): Promise<IHotel>;
  deleteHotel(hotelId: number): Promise<IHotel>;
  recoverHotelDeleted(hotelId: number): Promise<IHotel>;
  // Other methods if needed
}
export const toggleHotelStatus = async (hotelId: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/toggleHotelStatus`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ hotelId })
    });

    if (!response.ok) {
      throw new Error('Failed to toggle hotel status');
    }
  } catch (error: any) {
    throw new Error('Failed to toggle hotel status: ' + error.message);
  }
};
const hotelService: IHotelService = {
  async getHotelList() {
    try {
      const response = await fetch(`${BASE_URL}/getHotelsAdmin`);
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

  async getHotelById(hotelId) {
    try {
      const response = await fetch(
        `${BASE_URL}/getHotelById/${hotelId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hotel details");
      }
      const data: IHotel = await response.json(); 
      return data;
    } 
    catch (error) {
      console.error("Error fetching hotel details:", error);
      throw error;
    }
  },

  async createHotel(hotel) {
    try {
      const response = await fetch(`${BASE_URL}/createHotel`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotel),
      });
      if (!response.ok) {
        throw new Error("Failed to create hotel");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating hotel:", error);
      throw error;
    }
  },

  async updateHotel(hotel) {
    try {
      const response = await fetch(
        `${BASE_URL}/updateHotel`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hotel),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update hotel");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating hotel:", error);
      throw error;
    }
  },

  async updateHotelAvatar(hotel) {
    try {
      const response = await fetch(
        `${BASE_URL}/updateHotelAvatar`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hotel),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update hotel");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating hotel:", error);
      throw error;
    }
  },

  async deleteHotel(hotelId) {
    try {
      const response = await fetch(
        `${BASE_URL}/deleteHotel/${hotelId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hotel");
      }
  
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text(); 
      }
  
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching hotel:", error);
      throw error;
    }
  },

  async recoverHotelDeleted(hotelId) {
    try {
      const response = await fetch(
        `${BASE_URL}/recoverHotelDeleted/${hotelId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hotel");
      }
  
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text(); 
      }
  
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching hotel:", error);
      throw error;
    }
  },
  // Other methods if needed
};

export default hotelService;
export { BASE_URL };
