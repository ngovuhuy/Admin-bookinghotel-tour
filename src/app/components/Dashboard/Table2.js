import React, { useEffect, useState } from "react";
import dashBoardService from "@/app/services/dashBoardService";
import * as XLSX from "xlsx";

const Table2 = ({ setTable2 }) => {
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
          reportSupp = await dashBoardService.getRevenueAdminInMonth();
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
          if (differenceInDays > 31) {
            setDateError("Date range cannot be more than 1 month");
            setFilteredSuppliers([]); // Reset dữ liệu khi có lỗi
            setLoading(false);
            return;
          }

          reportSupp = await dashBoardService.getRevenueAdminInDateRange(
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
    if (typeof window !== "undefined") {
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
    }
  }, [filteredSuppliers]);

  useEffect(() => {
    const filterSuppliers = () => {
      let filtered = Array.isArray(reportSupplier) ? [...reportSupplier] : [];

      if (searchTerm) {
        filtered = filtered.filter((supplier) =>
          supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (filterCriteria.revenue === "highestCommission") {
        filtered.sort((a, b) => b.commission - a.commission);
      } else if (filterCriteria.revenue === "highestTotalRevenue") {
        filtered.sort((a, b) => b.totalRevenue - a.totalRevenue);
      } else if (filterCriteria.revenue === "highestTotalRevenueAfterFee") {
        filtered.sort(
          (a, b) => b.totalRevenueAfterFee - a.totalRevenueAfterFee
        );
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
    data.addColumn("number", "Commission Fee(%)");
    data.addColumn("number", "Total Revenue");
    data.addColumn("number", "Total Revenue After Fee");
    data.addColumn("number", "Commission Fee Received");
    data.addColumn("boolean", "Status");

    const rows = filteredSuppliers.map((supplier) => [
      supplier.supplierName || "N/A",
      supplier.commission || 0,
      {
        v: supplier.totalRevenue || 0,
        f: `$${(supplier.totalRevenue || 0).toLocaleString()}`,
      },
      {
        v: supplier.totalRevenueAfterFee || 0,
        f: `$${(supplier.totalRevenueAfterFee || 0).toLocaleString()}`,
      },
      {
        v: supplier.commissionFeeReceived || 0,
        f: `$${(supplier.commissionFeeReceived || 0).toLocaleString()}`,
      },
      supplier.status,
    ]);

    const totalCommissionFeeReceived = filteredSuppliers.reduce(
      (total, supplier) => total + (supplier.commissionFeeReceived || 0),
      0
    );

    // Add the total row with a specific CSS class
    rows.push([
      {
        v: "Total Revenue",
        p: { className: "highlight-total" },
      },
      null,
      null,
      null,
      {
        v: totalCommissionFeeReceived,
        f: `$${totalCommissionFeeReceived.toLocaleString()}`,
        p: { className: "highlight-total" },
      },
      null,
    ]);

    data.addRows(rows);

    const table = new google.visualization.Table(
      document.getElementById("table_div2")
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const style = document.createElement("style");
      style.innerHTML = `
      .highlight-total {
        height: 40px;
        font-size: 20px;
        font-weight: bold;
      }`;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  const getExcelData = () => {
    const title = `Report for ${
      timeRange === "month"
        ? "Current Month"
        : "Custom Range from " + `${startDate} to ${endDate}`
    }`;

    const headers = [
      ["Admin Report"],
      [title],
      [],
      [
        "SupplierName",
        "Commission Fee(%)",
        "Total Revenue",
        "Total Revenue After Fee",
        "Commission Fee Received",
        "Status",
      ],
    ];

    const rows = Array.isArray(filteredSuppliers)
      ? filteredSuppliers.map((supplier) => [
          supplier.supplierName || "N/A",
          supplier.commission || 0,
          `$${(supplier.totalRevenue || 0).toLocaleString()}`,
          `$${(supplier.totalRevenueAfterFee || 0).toLocaleString()}`,
          `$${(supplier.commissionFeeReceived || 0).toLocaleString()}`,
          supplier.status ? "Active" : "Inactive",
        ])
      : [];
    const totalCommissionFeeReceived = Array.isArray(filteredSuppliers)
      ? filteredSuppliers.reduce(
          (total, supplier) => total + (supplier.commissionFeeReceived || 0),
          0
        )
      : 0;
    rows.push([
      {
        v: "Total Revenue",
        p: { className: "highlight-total" },
      },
      null,
      null,
      null,
      {
        v: `$${totalCommissionFeeReceived.toLocaleString()}`,
        p: { className: "highlight-total" },
      },
      null,
    ]);
    return { headers, rows };
  };

  const exportToExcel = () => {
    const { headers, rows } = getExcelData();
    const ws = XLSX.utils.aoa_to_sheet([...headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report Admin");
    XLSX.writeFile(wb, "ReportAdmin.xlsx");
  };

  useEffect(() => {
    const { headers, rows } = getExcelData();
    setTable2([...headers, ...rows]);
  }, [filteredSuppliers, timeRange, startDate, endDate]);

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
          <option value="highestCommission">Highest Commission</option>
          <option value="highestTotalRevenue">Highest Total Revenue</option>
          <option value="highestTotalRevenueAfterFee">
            Highest Total Revenue After Fee
          </option>
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
                id="table_div2"
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

export default Table2;
