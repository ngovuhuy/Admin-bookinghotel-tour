
const BASE_URL = "https://trekbookingapi.azurewebsites.net";
interface IDashBoardService {
    countAllUser(): Promise<number>;
    countUserBanned(): Promise<number>;
    countSupplierBanned(): Promise<number>;
    countAllSupplier(): Promise<number>;
    countAllBookingRoom(): Promise<number>;
    countAllBookingTour():Promise<number>;
    getSupplierReportsInCurrentMonth(): Promise<IReportSupplier>;
    getTopHotelOfSupplierInWeek():Promise<ITopHotel>;
    getTopHotelOfSupplierDateRange(startDate: Date, endDate: Date): Promise<ITopHotel>;
    getTopTourOfSupplierInWeek():Promise<ITopTourAdmin>;
    getTopTourOfSupplierDateRange(startDate: Date, endDate: Date): Promise<ITopTourAdmin>;
    getNewUserRegister(startDate: Date, endDate: Date):Promise<INewUserSupplier>;
    getNewSupplierRegister(startDate: Date, endDate: Date):Promise<INewUserSupplier>;
    getRevenueHotelByAdmin(startDate:Date, endDate: Date): Promise<IRevenueTourAndHotel>;
    getRevenueTourByAdmin(startDate:Date, endDate: Date): Promise<IRevenueTourAndHotel>;
    getSupplierReportsInDateRange(startDate: Date, endDate: Date): Promise<IReportSupplier>;
    getRevenueAdminInMonth():Promise<IReportRevenueAdmin>;
    getRevenueAdminInDateRange(startDate: Date, endDate:Date): Promise<IReportRevenueAdmin>;
}
const dashBoardService: IDashBoardService = {
    async countAllUser() {
      try {
        const response = await fetch(
          `${BASE_URL}/countAllUser`,
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
    async countAllSupplier() {
        try {
          const response = await fetch(
            `${BASE_URL}/countAllSupplier`,
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
      async countAllBookingRoom() {
        try {
          const response = await fetch(
            `${BASE_URL}/countAllBookingRoom`,
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

      async countAllBookingTour() {
        try {
          const response = await fetch(
            `${BASE_URL}/countAllBookingTour`,
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
      async getSupplierReportsInCurrentMonth() {
        try {
          const response = await fetch(
            `${BASE_URL}/getSupplierReportsInCurrentMonth`,
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
      async getTopHotelOfSupplierInWeek() {
        try {
          const response = await fetch(
            `${BASE_URL}/getTopHotelOfSupplierInWeek`,
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
      async getTopHotelOfSupplierDateRange(startDate, endDate) {
        try {
          const response = await fetch(
            `${BASE_URL}/getTopHotelOfSupplierDateRange?startDate=${startDate}&endDate=${endDate}`,
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
      

      async getTopTourOfSupplierInWeek() {
        try {
          const response = await fetch(
            `${BASE_URL}/getTopTourOfSupplierInWeek`,
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
      async getTopTourOfSupplierDateRange(startDate, endDate) {
        try {
          const response = await fetch(
            `${BASE_URL}/getTopTourOfSupplierDateRange?startDate=${startDate}&endDate=${endDate}`,
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
     
      async getNewUserRegister(startDate,endDate) {
        try {
          const response = await fetch(
            `${BASE_URL}/getNewUserRegister?startDate=${startDate}&endDate=${endDate}`,
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

      

      async getNewSupplierRegister(startDate,endDate) {
        try {
          const response = await fetch(
            `${BASE_URL}/getNewSupplierRegister?startDate=${startDate}&endDate=${endDate}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    
      async getRevenueHotelByAdmin(startDate,endDate) {
        try {
          const response = await fetch(
            `${BASE_URL}/getRevenueHotelByAdmin?startDate=${startDate}&endDate=${endDate}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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

      async getRevenueTourByAdmin(startDate,endDate) {
        try {
          const response = await fetch(
            `${BASE_URL}/getRevenueTourByAdmin?startDate=${startDate}&endDate=${endDate}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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

      async getSupplierReportsInDateRange(startDate,endDate) {
        try {
          const response = await fetch(
            `${BASE_URL}/getSupplierReportsInDateRange?startDate=${startDate}&endDate=${endDate}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      async getRevenueAdminInMonth() {
        try {
          const response = await fetch(
            `${BASE_URL}/getRevenueAdminInMonth`,
            {
              method: "GET",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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

      async getRevenueAdminInDateRange(startDate, endDate) {
        try {
          const response = await fetch(
            `${BASE_URL}/getRevenueAdminInDateRange?startDate=${startDate}&endDate=${endDate}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      async countUserBanned() {
        try {
          const response = await fetch(
            `${BASE_URL}/countUserBanned`,
            {
              method: "GET",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      async countSupplierBanned() {
        try {
          const response = await fetch(
            `${BASE_URL}/countSupplierBanned`,
            {
              method: "GET",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  
  export default dashBoardService;