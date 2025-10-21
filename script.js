
window.addEventListener("load", () => {
  // Create skeleton loader dynamically
  const skeletonLoader = document.createElement("div");
  skeletonLoader.id = "skeleton-loader";
  skeletonLoader.className = "skeleton-loader";
  skeletonLoader.style.display = "none";

  // Create 5 skeleton rows, each with 7 divs
  for (let i = 0; i < 5; i++) {
    const skeletonRow = document.createElement("div");
    skeletonRow.className = "skeleton-row";
    for (let j = 0; j < 7; j++) {
      const placeholder = document.createElement("div");
      skeletonRow.appendChild(placeholder);
    }
    skeletonLoader.appendChild(skeletonRow);
  }

  // Append skeleton loader to main
  document.querySelector("main").appendChild(skeletonLoader);

  setTimeout(() => {
    document.getElementById("page-loader").style.display = "none";
    document.getElementById("skeleton-loader").style.display = "block";
  }, 1000);

  setTimeout(() => {
    document.getElementById("skeleton-loader").style.display = "none";
    document.getElementById("stock-table").style.display = "block";

   
   fetch("stocks.json")
      .then(response => response.json())
      .then(stockData => {

    new Tabulator("#stock-table", {
      data: stockData,
      layout: "fitColumns",
      responsiveLayout: "hide",
      pagination: "local",
      paginationSize: 5,
      columns: [
        {
          title: "Symbol",
          field: "symbol",
          headerFilter: "input",
          width: 100,
          headerSort: true,
          sorter: "string"
        },
        {
          title: "Company",
          field: "name",
          headerFilter: "input",
          minWidth: 200,
          headerSort: true,
          sorter: "string"
        },
        {
          title: "LTP ₹",
          field: "ltp",
          hozAlign: "right",
          formatter: "money",
          formatterParams: { symbol: "₹", precision: 2 },
          headerSort: true,
          sorter: "number"
        },
        {
          title: "Change",
          field: "change",
          hozAlign: "right",
          formatter: (cell) => {
            const value = cell.getValue();
            const cls = value >= 0 ? "positive" : "negative";
            cell.getElement().classList.add(cls);
            return value.toFixed(2);
          },
          headerSort: true,
          sorter: "number"
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
          },
          headerSort: true,
          sorter: "number"
        },
        {
          title: "Day High",
          field: "dayHigh",
          hozAlign: "right",
          headerSort: true,
          sorter: "number"
        },
        {
          title: "Day Low",
          field: "dayLow",
          hozAlign: "right",
          headerSort: true,
          sorter: "number"
        }
      ],
      selectable: true,
      rowSelected: function(row) {
        console.log("Row selected:", row.getData());
      },
      rowDeselected: function(row) {
        console.log("Row deselected:", row.getData());
      }
    });
    });
  }, 3000); 
});
