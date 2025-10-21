window.addEventListener("load", () => {
  // Simulate data loading delay
  setTimeout(() => {
    const loader = document.getElementById("page-loader");
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);

    // Mock stock data
    const stockData = [
      { symbol: "SBIN", name: "State Bank of India", ltp: 735.25, change: 5.30, percentChange: 0.73, dayHigh: 742.00, dayLow: 728.10 },
      { symbol: "RELIANCE", name: "Reliance Industries Ltd", ltp: 2538.40, change: -12.60, percentChange: -0.49, dayHigh: 2562.75, dayLow: 2521.30 },
      { symbol: "TCS", name: "Tata Consultancy Services Ltd", ltp: 3872.10, change: 28.90, percentChange: 0.75, dayHigh: 3890.00, dayLow: 3835.50 },
      { symbol: "INFY", name: "Infosys Ltd", ltp: 1534.80, change: -6.10, percentChange: -0.40, dayHigh: 1552.20, dayLow: 1528.00 },
      { symbol: "HDFC", name: "HDFC Bank Ltd", ltp: 1652.55, change: 9.75, percentChange: 0.59, dayHigh: 1665.00, dayLow: 1641.00 },
    ];

    // Show table
    const tableEl = document.getElementById("stock-table");
    tableEl.style.display = "block";

    // Initialize Tabulator
    const table = new Tabulator("#stock-table", {
      data: stockData,
      layout: "fitColumns",
      responsiveLayout: "collapse",
      pagination: "local",
      paginationSize: 5,
      paginationCounter: "rows",
      movableColumns: true,
      resizableColumns: true,
      placeholder: "No data available",
      headerHozAlign: "center",
      height: "auto",

      columns: [
        { title: "Symbol", field: "symbol", headerFilter: "input", width: 120, hozAlign: "center", headerSort: true },
        { title: "Company", field: "name", headerFilter: "input", minWidth: 220, headerSort: true },
        { title: "LTP (₹)", field: "ltp", hozAlign: "right", formatter: "money", formatterParams: { symbol: "₹", precision: 2 } },
        {
          title: "Change",
          field: "change",
          hozAlign: "right",
          formatter: (cell) => {
            const value = cell.getValue();
            const isPositive = value >= 0;
            const icon = isPositive ? "▲" : "▼";
            const colorClass = isPositive ? "positive" : "negative";
            cell.getElement().classList.add(colorClass);
            return `<span>${icon} ${value.toFixed(2)}</span>`;
          },
        },
        {
          title: "% Change",
          field: "percentChange",
          hozAlign: "right",
          formatter: (cell) => {
            const value = cell.getValue();
            const isPositive = value >= 0;
            const colorClass = isPositive ? "positive" : "negative";
            cell.getElement().classList.add(colorClass);
            return `<span>${value.toFixed(2)}%</span>`;
          },
        },
        { title: "Day High", field: "dayHigh", hozAlign: "right" },
        { title: "Day Low", field: "dayLow", hozAlign: "right" },
      ],

      rowFormatter: (row) => {
        // Add a subtle hover glow effect
        row.getElement().style.transition = "background-color 0.2s ease";
      },
    });

    // Smooth fade-in animation for table
    tableEl.classList.add("fade-in");

  }, 1800); // shorter delay for faster UX
});
