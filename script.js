window.addEventListener("load", () => {
  setTimeout(() => {
    // Fade out loader
    const loader = document.getElementById("page-loader");
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);

    // Load stock data
    fetch("stocks.json")
      .then(response => response.json())
      .then(data => {
        document.getElementById("stock-table").style.display = "block";

        new Tabulator("#stock-table", {
          data: data,
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
      });
  }, 2000); // Simulate loading delay
});