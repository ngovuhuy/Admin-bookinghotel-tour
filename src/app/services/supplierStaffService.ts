import { mutate } from "swr";
import BASE_URL from "./apiService";

interface ISupplierStaffService {
  getStaffsBySuppierId(supplierId: number): Promise<ISupplierStaff[]>;
  deleteStaff(staffId: number): Promise<void>;
}

const supplierStaffService: ISupplierStaffService = {
  async getStaffsBySuppierId(supplierId) {
    try {
      const response = await fetch(
        `${BASE_URL}/getSupplierStaffBySupplierIdAdmin/${supplierId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch supplier staff list");
      }
      const data = await response.json();
      console.log(data); // Trigger refetch after fetching
      return data;
    } catch (error) {
      console.error("Error fetching supplier staff list:", error);
      throw error;
    }
  },
  async deleteStaff(staffId) {
    try {
      const response = await fetch(
        `${BASE_URL}/deleteSupplierStaff/${staffId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: false }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete supplier staff status to false");
      }
    } catch (error) {
      console.error("Error updating supplier staff status to false:", error);
      throw error;
    }
  },
};

export const revalidateSupplierStaffs = () =>
  mutate(supplierStaffService.getStaffsBySuppierId);

export const toggleSupplierStaffStatus = async (
  staffId: number
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/SupplierStaffAPI/ToggleSupplierStaff`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ staffId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to toggle supplier staff status");
    }
  } catch (error: any) {
    throw new Error("Failed to toggle supplier staff status: " + error.message);
  }
};

export default supplierStaffService;
