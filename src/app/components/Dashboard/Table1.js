import React, { useEffect, useState } from "react";
import dashBoardService from "@/app/services/dashBoardService";
import * as XLSX from "xlsx";

const Table1 = ({ setTable1 }) => {
  const [loading, setLoading] = useState(true);
  const [reportSupplier, setReportSupplier] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    revenue: "",
    status: "",
  });

  const [timeRange, setTimeRange] = useState("month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    const fetchReportSupplier = async () => {
      try {
        let reportSupp;
        if (timeRange === "month") {
          reportSupp =
            await dashBoardService.getSupplierReportsInCurrentMonth();
        } else if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);

          if (start > end) {
            setDateError("Start date cannot be greater than end date");
            setFilteredSuppliers([]); // Reset dữ liệu khi có lỗi
            setLoading(false);
            return;
          }

          const differenceInDays = (end - start) / (1000 * 3600 * 24);
          if (differenceInDays > 365) {
            setDateError("Date range cannot be more than 1 year");
            setFilteredSuppliers([]); // Reset dữ liệu khi có lỗi
            setLoading(false);
            return;
          }

          reportSupp = await dashBoardService.getSupplierReportsInDateRange(
            startDate,
            endDate
          );
        }

        setReportSupplier(reportSupp);
        setFilteredSuppliers(reportSupp);
        setDateError("");
        setLoading(false);
        console.log("Report: ", reportSupp);
      } catch (error) {
        console.error("Failed to fetch supplier reports", error);
        setLoading(false);
      }
    };
    fetchReportSupplier();
  }, [timeRange, startDate, endDate]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/charts/loader.js";
    script.async = true;
    script.onload = () => {
      google.charts.load("current", { packages: ["table"] });
      google.charts.setOnLoadCallback(drawTable);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [filteredSuppliers]);

  useEffect(() => {
    const filterSuppliers = () => {
      let filtered = Array.isArray(reportSupplier) ? [...reportSupplier] : [];

      if (searchTerm) {
        filtered = filtered.filter((supplier) =>
          supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filterCriteria.revenue) {
        if (filterCriteria.revenue === "highestTourRevenue") {
          filtered.sort((a, b) => b.tourRevenue - a.tourRevenue);
        } else if (filterCriteria.revenue === "highestHotelRevenue") {
          filtered.sort((a, b) => b.hotelRevenue - a.hotelRevenue);
        }
      }

      if (filterCriteria.status) {
        filtered = filtered.filter(
          (supplier) =>
            (filterCriteria.status === "active" && supplier.status) ||
            (filterCriteria.status === "inactive" && !supplier.status)
        );
      }

      setFilteredSuppliers(filtered);
    };

    filterSuppliers();
  }, [searchTerm, filterCriteria, reportSupplier]);

  const drawTable = () => {
    if (!Array.isArray(filteredSuppliers) || filteredSuppliers.length === 0)
      return;

    const data = new google.visualization.DataTable();
    data.addColumn("string", "SupplierName");
    data.addColumn("number", "Active Tours");
    data.addColumn("number", "Active Hotels");
    data.addColumn("number", "Active Rooms");
    data.addColumn("number", "Tour Orders");
    data.addColumn("number", "Hotel Orders");
    data.addColumn("number", "Tour Revenue");
    data.addColumn("number", "Hotel Revenue");
    data.addColumn("boolean", "Status");

    const rows = filteredSuppliers.map((supplier) => [
      supplier.supplierName || "N/A",
      supplier.activeTours || 0,
      supplier.activeHotels || 0,
      supplier.activeRooms || 0,
      supplier.tourBookings || 0,
      supplier.hotelBookings || 0,
      {
        v: supplier.tourRevenue || 0,
        f: `$${(supplier.tourRevenue || 0).toLocaleString()}`,
      },
      {
        v: supplier.hotelRevenue || 0,
        f: `$${(supplier.hotelRevenue || 0).toLocaleString()}`,
      },
      supplier.status,
    ]);

    data.addRows(rows);

    const table = new google.visualization.Table(
      document.getElementById("table_div")
    );

    const options = {
      width: "100%",
      height: "100%",
      cssClassNames: {
        tableCell: "center-align",
        headerCell: "center-align",
      },
    };
    table.draw(data, options);
  };

  const getExcelData = () => {
    const title = `Report for ${
      timeRange === "month"
        ? "Current Month"
        : "Custom Range from " + `${startDate} to ${endDate}`
    }`;

    const headers = [
      ["Supplier Report"],
      [title],
      [],
      [
        "SupplierName",
        "Active Tours",
        "Active Hotels",
        "Active Rooms",
        "Tour Orders",
        "Hotel Orders",
        "Tour Revenue",
        "Hotel Revenue",
        "Status",
      ],
    ];

    const rows = Array.isArray(filteredSuppliers)
      ? filteredSuppliers.map((supplier) => [
          supplier.supplierName || "N/A",
          supplier.activeTours || 0,
          supplier.activeHotels || 0,
          supplier.activeRooms || 0,
          supplier.tourBookings || 0,
          supplier.hotelBookings || 0,
          `$${(supplier.tourRevenue || 0).toLocaleString()}`,
          `$${(supplier.hotelRevenue || 0).toLocaleString()}`,
          supplier.status ? "Active" : "Inactive",
        ])
      : [];
    return { headers, rows };
  };

  const exportToExcel = () => {
    const { headers, rows } = getExcelData();
    const ws = XLSX.utils.aoa_to_sheet([...headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report Supplier");
    XLSX.writeFile(wb, "ReportSupplier.xlsx");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (timeRange !== "custom") {
      setStartDate("");
      setEndDate("");
      setDateError("");
      setFilteredSuppliers([]);
    }
  }, [timeRange]);

  const handleDateChange = (e, setter) => {
    const date = e.target.value;
    setter(date);
  };

  useEffect(() => {
    const { headers, rows } = getExcelData();
    setTable1([...headers, ...rows]);
  }, [filteredSuppliers, timeRange, startDate, endDate]);

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search Supplier Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select
          style={{ marginRight: "10px" }}
          onChange={(e) => setTimeRange(e.target.value)}
          value={timeRange}
        >
          <option value="month">Month (current)</option>
          <option value="custom">Custom Made</option>
        </select>
        <select
          name="revenue"
          value={filterCriteria.revenue}
          onChange={handleFilterChange}
          style={{ marginRight: "10px" }}
        >
          <option value="">Filter by Revenue</option>
          <option value="highestTourRevenue">Highest Tour Revenue</option>
          <option value="highestHotelRevenue">Highest Hotel Revenue</option>
        </select>

        <select
          name="status"
          value={filterCriteria.status}
          onChange={handleFilterChange}
          style={{ marginRight: "10px" }}
        >
          <option value="">Filter by Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button
          onClick={exportToExcel}
          style={{
            marginLeft: "20px",
            marginBottom: "5px",
            paddingRight: "3px",
            color: "white",
            fontWeight: "bold",
            background: "green",
            borderRadius: "5px",
          }}
        >
          <i
            className="fa fa-file-excel-o"
            style={{ marginRight: "5px", marginLeft: "3px" }}
          ></i>
          Excel
        </button>
      </div>
      {timeRange === "custom" && (
        <div style={{ display: "flex", marginBottom: "5px" }}>
          <div style={{ marginLeft: "20px", background: "white" }}>
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange(e, setStartDate)}
              />
            </label>
          </div>
          <div style={{ marginLeft: "20px", background: "white" }}>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange(e, setEndDate)}
              />
            </label>
          </div>
        </div>
      )}
      {dateError && (
        <p
          style={{
            color: "red",
            marginLeft: "400px",
            marginTop: "100px",
            marginBottom: "100px",
          }}
        >
          {dateError}
        </p>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {dateError === "" && // Kiểm tra nếu không có lỗi về ngày tháng
            ((timeRange === "custom" && !Array.isArray(filteredSuppliers)) ||
            filteredSuppliers.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  marginTop: "100px",
                  marginBottom: "100px",
                }}
              >
                No data
              </p>
            ) : (
              <div
                id="table_div"
                style={{
                  width: "100%",
                  height: "500px",
                  textAlign: "center",
                }}
              ></div>
            ))}
        </>
      )}
    </div>
  );
};

export default Table1;
