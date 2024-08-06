import useSWR, { mutate } from 'swr';
import BASE_URL from './apiService';
import { ITour } from '../entitis/tour';

interface ITourService {
  getTourById(tourId: number): Promise<ITour>;
  getTours(): Promise<any[]>;
}
export const toggleTourStatus = async (tourId: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/toggleTourStatus`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tourId })
    });

    if (!response.ok) {
      throw new Error('Failed to toggle tour status');
    }
  } catch (error: any) {
    throw new Error('Failed to toggle tour status: ' + error.message);
  }
};
export const tourService: ITourService = {
  async getTours() {
    try {
      const response = await fetch(`${BASE_URL}/getToursAdmin`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tour list");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tour list:", error);
      throw error;
    }
  },

  async getTourById(tourId) {
    try {
      const response = await fetch(`${BASE_URL}/getTourById/${tourId}`, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tour detail");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tour detail", error);
      throw error;
    }
  },
};

export const revalidateTours = () => mutate(tourService.getTours);



export default tourService;
