import dashBoardService from "@/app/services/dashBoardService";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";

const LineChartUS = ({ setLineChartUs }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("days");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setHasData(true);
      setDateError("");
      try {
        let UserNew = [],
          SupplierNew = [];

        if (timeRange === "days") {
          const currentDate = new Date();
          const endDate = new Date(currentDate);
          const startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() - 7);

          const formatDate = (date) => {
            let adjustedDate = new Date(date);
            // adjustedDate.setDate(adjustedDate.getDate() + 1);
            adjustedDate.setDate(adjustedDate.getDate());
            return adjustedDate.toISOString().split("T")[0];
          };

          const formattedStartDate = formatDate(startDate);
          const formattedEndDate = formatDate(endDate);

          UserNew = await dashBoardService.getNewUserRegister(
            formattedStartDate,
            formattedEndDate
          );
          SupplierNew = await dashBoardService.getNewSupplierRegister(
            formattedStartDate,
            formattedEndDate
          );
        } else if (timeRange === "custom" && startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          if (start > end) {
            setDateError("Start date cannot be greater than end date");
            setLoading(false);
            return;
          }

          const differenceInDays = (end - start) / (1000 * 3600 * 24);
          if (differenceInDays > 365) {
            setDateError("Date range cannot be more than 1 year");
            setLoading(false);
            return;
          }
          UserNew = await dashBoardService.getNewUserRegister(
            startDate,
            endDate
          );
          SupplierNew = await dashBoardService.getNewSupplierRegister(
            startDate,
            endDate
          );
        }
        formattedData(UserNew, SupplierNew);
      } catch (error) {
        console.error("Failed to fetch revenue data", error);
      } finally {
        setLoading(false);
      }
    };
    const formattedData = (UserNew, SupplierNew) => {
      let formattedData = [];
      if (timeRange === "days") {
        formattedData = [
          [
            "Number of users and suppliers registering new accounts in days",
            "New User",
            "New Supplier",
          ],
        ];
        UserNew.forEach((item, index) => {
          const date = new Date(item.createDate);
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
          formattedData.push([
            formattedDate,
            item.countUser,
            SupplierNew[index]?.countUser || 0,
          ]);
        });
      } else if (startDate && endDate) {
        formattedData = [
          [
            `Number of users and suppliers registering new accounts from ${startDate} to ${endDate}`,
            "New User",
            "New Supplier",
          ],
        ];
        if (UserNew.length > 0) {
          UserNew.forEach((item, index) => {
            const date = new Date(item.createDate);
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
            formattedData.push([
              formattedDate,
              item.countUser,
              SupplierNew[index]?.countUser || 0,
            ]);
          });
        } else if (SupplierNew.length > 0) {
          SupplierNew.forEach((item) => {
            const date = new Date(item.createDate);
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
            formattedData.push([formattedDate, 0, item.countUser]);
          });
        }
      }
      setChartData(formattedData);
      setLineChartUs(formattedData);
    };
    fetchData();
  }, [timeRange, setChartData, startDate, endDate, setLineChartUs]);

  useEffect(() => {
    if (timeRange !== "custom") {
      setStartDate("");
      setEndDate("");
    }
  }, [timeRange]);

  useEffect(() => {
    const loadGoogleCharts = () => {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.onload = () => {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
      };
      script.onerror = () => {
        console.error("Failed to load Google Charts");
      };
      document.body.appendChild(script);
    };

    const drawChart = () => {
      if (chartRef.current) {
        if (dateError) {
          chartRef.current.innerHTML = `<div style='text-align: center; font-size: 20px; padding-top: 50px; color: red'>${dateError}</div>`;
        } else if (hasData && chartData.length > 0) {
          const data = google.visualization.arrayToDataTable(chartData);
          const title =
            timeRange === "custom"
              ? "Number of users and suppliers registering new accounts from " +
                `${startDate} to ${endDate}`
              : "Number of users and suppliers registering new accounts by " +
                `${timeRange}`;

          const options = {
            title: title,
            hAxis: {
              title: "",
            },
            series: {
              0: { targetAxisIndex: 0 },
              1: { targetAxisIndex: 1 },
            },
            vAxes: {
              0: { title: "New users" },
              1: { title: "New suppliers" },
            },
          };
          const chart = new google.visualization.LineChart(chartRef.current);
          chart.draw(data, options);
        } else {
          chartRef.current.innerHTML =
            "<div style='text-align: center; font-size: 20px; padding-top: 50px;'>No data</div>";
        }
      }
    };

    if (!window.google) {
      loadGoogleCharts();
    } else {
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);
    }
  }, [chartData, loading, timeRange, dateError, hasData, startDate, endDate]);

  const exportToExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet(chartData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "New User and Suplier");
    XLSX.writeFile(wb, "NewUserAndSupplier.xlsx");
  };

  const handleDateChange = (e, setter) => {
    const date = e.target.value;
    setter(date);
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <select
          style={{ margin: "20px 0px 5px 0px" }}
          onChange={(e) => setTimeRange(e.target.value)}
          value={timeRange}
        >
          <option value="days">Days</option>
          <option value="custom">Custom Made</option>
        </select>
        <button
          onClick={exportToExcel}
          style={{
            marginLeft: "20px",
            marginBottom: "5px",
            marginTop: "20px",
            color: "white",
            fontWeight: "bold",
            background: "green",
            borderRadius: "5px",
            paddingRight: "5px",
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          ref={chartRef}
          id="chart_div"
          style={{
            width: "100%",
            height: chartData.length > 1 ? "300px" : "100px",
          }}
        >
          {!hasData && !loading && (
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                paddingTop: "150px",
              }}
            >
              No data
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LineChartUS;
