// Wait for the page to fully load before initializing
window.addEventListener("load", () => {
  // Simulate a loading delay to show off the spinner
  setTimeout(() => {
    // Hide the loader with a fade effect
    const loader = document.getElementById("page-loader");
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);

    // Stock data embedded directly to avoid fetch issues in local development
    // In a real app, this would come from an API
    const stockData = [
      {"symbol": "SBIN", "name": "State Bank of India", "ltp": 735.25, "change": 5.30, "percentChange": 0.73, "dayHigh": 742.00, "dayLow": 728.10},
      {"symbol": "RELIANCE", "name": "Reliance Industries Ltd", "ltp": 2538.40, "change": -12.60, "percentChange": -0.49, "dayHigh": 2562.75, "dayLow": 2521.30},
      {"symbol": "TCS", "name": "Tata Consultancy Services Ltd", "ltp": 3872.10, "change": 28.90, "percentChange": 0.75, "dayHigh": 3890.00, "dayLow": 3835.50},
      {"symbol": "INFY", "name": "Infosys Ltd", "ltp": 1534.80, "change": -6.10, "percentChange": -0.40, "dayHigh": 1552.20, "dayLow": 1528.00},
      {"symbol": "HDFC", "name": "HDFC Bank Ltd", "ltp": 1652.55, "change": 9.75, "percentChange": 0.59, "dayHigh": 1665.00, "dayLow": 1641.00}
    ];

    // Show the table now that data is loaded
    document.getElementById("stock-table").style.display = "block";

    // Initialize the Tabulator table with our stock data
    new Tabulator("#stock-table", {
      data: stockData,
      layout: "fitColumns",
      responsiveLayout: "hide",
      pagination: "local",
      paginationSize: 5,
      columns: [
        { title: "Symbol", field: "symbol", headerFilter: "input", width: 100 },
        { title: "Company", field: "name", headerFilter: "input", minWidth: 200 },
        { title: "LTP ₹", field: "ltp", hozAlign: "right", formatter: "money", formatterParams: { symbol: "₹", precision: 2 } },
        {
          title: "Change",
          field: "change",
          hozAlign: "right",
          formatter: (cell) => {
            const value = cell.getValue();
            const cls = value >= 0 ? "positive" : "negative";
            const icon = value >= 0 ? "▲" : "▼";
            cell.getElement().classList.add(cls);
            return `${icon} ${value.toFixed(2)}`;
          }
        },
        {
          title: "% Change",
          field: "percentChange",
          hozAlign: "right",
          formatter: (cell) => {
            const value = cell.getValue();
            const cls = value >= 0 ? "positive" : "negative";
            cell.getElement().classList.add(cls);
            return `${value.toFixed(2)}%`;
          }
        },
        { title: "Day High", field: "dayHigh", hozAlign: "right" },
        { title: "Day Low", field: "dayLow", hozAlign: "right" }
      ],
      selectable: true,
    });
  }, 2000); // This delay makes the loading feel more natural
});
