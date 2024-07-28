interface IReportRevenueAdmin{
    supplierId: number,
    supplierName: string,
    status: boolean,
    commission: number,
    totalRevenue: number,
    totalRevenueAfterFee: number,
    commissionFeeReceived: number
}