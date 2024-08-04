interface IReportSupplier{
    supplierId: number;
    supplierName: string;
    status: boolean;
    email: string;
    activeTours: number;
    activeHotels: number;
    activeRooms: number;
    tourBookings: number;
    hotelBookings: number;
    tourRevenue: number;
    hotelRevenue: number;
}