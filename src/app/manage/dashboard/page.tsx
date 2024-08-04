"use client";
import React, { useEffect, useState } from "react";
import "../../../../public/css/dashboard.css";
import LineChartUS from "../../components/Dashboard/LineChart/LineChartUS";
import PieChartHotel from "../../components/Dashboard/PieChartHotel";
import Table1 from "../../components/Dashboard/Table1";
import Table2 from "../../components/Dashboard/Table2";
import PieChartTour from "../../components/Dashboard/PieChartTour";
import LineChartRevenue from "../../components/Dashboard/LineChart/LineChartRevenue";
import dashBoardService from "@/app/services/dashBoardService";
import * as XLSX from "xlsx";

const DashBoard = () => {
  const [countUser, setCountUser] = useState<number | null>(null);
  const [countUserBanned, setCountUserBanned] = useState<number | null>(null);
  const [countSuppBanned, setCountSuppBanned] = useState<number | null>(null);
  const [countSupplier, setCountSupplier] = useState<number | null>(null);
  const [countBookRoom, setCountBookRoom] = useState<number | null>(null);
  const [countBookTour, setCountBookTour] = useState<number | null>(null);

  const [lineChartRevenue, setLineChartRevenue] = useState<any[]>([]);
  const [lineChartUS, setLineChartUS] = useState<any[]>([]);
  const [pieChartTour, setPieChartTour] = useState<any[]>([]);
  const [pieChartHotel, setPieChartHotel] = useState<any[]>([]);
  const [table1, setTable1] = useState<any[]>([]);
  const [table2, setTable2] = useState<any[]>([]);

  useEffect(() => {
    const fetchCountUser = async () => {
      try {
        const data = await dashBoardService.countAllUser();
        setCountUser(data);
      } catch (error) {
        console.error("Failed to fetch total order count", error);
      }
    };

    const fetchCountSupplier = async () => {
      try {
        const countSupp = await dashBoardService.countAllSupplier();
        setCountSupplier(countSupp);
      } catch (error) {
        console.error("Failed to fetch percent change", error);
      }
    };

    const fetchBookRoom = async () => {
      try {
        const countRoom = await dashBoardService.countAllBookingRoom();
        setCountBookRoom(countRoom);
      } catch (error) {
        console.error("Failed to fetch total revenue hotel", error);
      }
    };
    const fetchCountUserBanned = async () => {
      try {
        const countUserBanned = await dashBoardService.countUserBanned();
        setCountUserBanned(countUserBanned);
      } catch (error) {
        console.error("Failed to fetch total revenue hotel", error);
      }
    };
    const fetchCountSuppBanned = async () => {
      try {
        const countSuppBanned = await dashBoardService.countSupplierBanned();
        setCountSuppBanned(countSuppBanned);
      } catch (error) {
        console.error("Failed to fetch total revenue hotel", error);
      }
    };

    const fetchBookTour = async () => {
      try {
        const countTour = await dashBoardService.countAllBookingTour();
        setCountBookTour(countTour);
      } catch (error) {
        console.error("Failed to fetch percent revenue hotel", error);
      }
    };
    fetchCountUser();
    fetchCountSupplier();
    fetchBookRoom();
    fetchBookTour();
    fetchCountUserBanned();
    fetchCountSuppBanned();
  }, []);

  const convertToArrayOfArrays = (data: any[]): any[][] => {
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
      const keys = Object.keys(data[0]);
      const result = [keys];
      data.forEach((item) => {
        result.push(keys.map((key) => item[key]));
      });
      return result;
    }
    return data;
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    let hasData = false;

    if (lineChartUS.length > 0) {
      const barChartWS = XLSX.utils.aoa_to_sheet(
        convertToArrayOfArrays(lineChartUS)
      );
      XLSX.utils.book_append_sheet(workbook, barChartWS, "NewUser&Supplier");
      hasData = true;
    }

    if (lineChartRevenue.length > 0) {
      const lineChartWS = XLSX.utils.aoa_to_sheet(
        convertToArrayOfArrays(lineChartRevenue)
      );
      XLSX.utils.book_append_sheet(workbook, lineChartWS, "RevenueTour&Hotel");
      hasData = true;
    }

    if (pieChartHotel.length > 0) {
      const pieChartWS = XLSX.utils.aoa_to_sheet(
        convertToArrayOfArrays(pieChartHotel)
      );
      XLSX.utils.book_append_sheet(workbook, pieChartWS, "MostHotelOrdered");
      hasData = true;
    }

    if (pieChartTour.length > 0) {
      const donutChartWS = XLSX.utils.aoa_to_sheet(
        convertToArrayOfArrays(pieChartTour)
      );
      XLSX.utils.book_append_sheet(workbook, donutChartWS, "MostTourOrdered");
      hasData = true;
    }

    if (table1.length > 0) {
      const table1WS = XLSX.utils.aoa_to_sheet(table1);
      XLSX.utils.book_append_sheet(workbook, table1WS, "ReportSupplier");
      hasData = true;
    }

    if (table2.length > 0) {
      const table2WS = XLSX.utils.aoa_to_sheet(table2);
      XLSX.utils.book_append_sheet(workbook, table2WS, "ReportRevenueAdmin");
      hasData = true;
    }

    if (hasData) {
      XLSX.writeFile(workbook, "dashboard_charts_data.xlsx");
    } else {
      console.error("No data available to export");
    }
  };

  return (
    <>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="relative">
        <div className="table-hotel max-[768px]:w-100 ">
          <button
            onClick={exportToExcel}
            style={{
              marginBottom: "10px",
              color: "white",
              fontWeight: "bold",
              background: "green",
              borderRadius: "5px",
              paddingRight: "3px",
            }}
          >
            <i
              className="fa fa-file-excel-o"
              style={{ marginRight: "5px", marginLeft: "3px" }}
            ></i>
            Export All to Excel
          </button>
          <div className="row pb-4">
            <div className="col-lg-3 col-6 max-[992px]:mb-4">
              <div className="card radius-10 border-start border-0 border-3 border-info">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Total Users</p>
                      <h4 className="my-1 text-info">
                        {countUser !== null ? countUser : "No user yet..."}
                      </h4>
                    </div>
                    <div className="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                      <i className="fa fa-users"></i>
                    </div>
                  </div>

                  {/* <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Banned</p>
                      <h4 className="my-1 text-info">
                        {countUserBanned !== null
                          ? countUserBanned
                          : "No user yet..."}
                      </h4>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="card radius-10 border-start border-0 border-3 border-danger">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Total Suppliers</p>
                      <h4 className="my-1 text-danger">
                        {countSupplier !== null
                          ? countSupplier
                          : "No supplier yet..."}
                      </h4>
                    </div>
                    <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                      <i className="fa fa-users"></i>
                    </div>
                  </div>

                  {/* <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Banned</p>
                      <h4 className="my-1 text-danger">
                        {countSuppBanned !== null ? countSuppBanned : 0}
                      </h4>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="card radius-10 border-start border-0 border-3 border-success">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Total Order Hotel</p>
                      <h4 className="my-1 text-success">
                        {countBookRoom !== null ? countBookRoom : 0}
                      </h4>
                    </div>
                    <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                      <i className="fa fa-shopping-cart"></i>
                    </div>
                  </div>

                  {/* <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">
                        Total Order Canceled
                      </p>
                      <h4 className="my-1 text-success">
                        {countBookRoom !== null
                          ? countBookRoom
                          : "No order yet..."}
                      </h4>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="card radius-10 border-start border-0 border-3 border-warning">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Total Order Tour</p>
                      <h4 className="my-1 text-warning">
                        {countBookTour !== null
                          ? countBookTour
                          : "No revenue yet..."}
                      </h4>
                    </div>
                    <div className="widgets-icons-2 rounded-circle bg-gradient-blooker text-white ms-auto">
                      <i className="fa fa-shopping-cart"></i>
                    </div>
                  </div>

                  {/* <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">
                        Total Order Canceled
                      </p>
                      <h4 className="my-1 text-warning">
                        {countBookTour !== null
                          ? countBookTour
                          : "No revenue yet..."}
                      </h4>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div>
            <LineChartUS setLineChartUs={setLineChartUS} />
          </div>
          <div>
            <LineChartRevenue setLineChartRevenue={setLineChartRevenue} />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%", marginRight: "5px" }}>
              <PieChartHotel setPieChartHotel={setPieChartHotel} />
            </div>
            <div style={{ width: "50%", marginLeft: "5px" }}>
              <PieChartTour setPieChartTour={setPieChartTour} />
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <h1 style={{ marginBottom: "5px", color: "red" }}>
              Report Suppliers
            </h1>
            <Table1 setTable1={setTable1} />
          </div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <h1 style={{ marginBottom: "5px", color: "red" }}>
              Report Revenue
            </h1>
            <Table2 setTable2={setTable2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;