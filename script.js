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

  // Simulate loading
  setTimeout(() => {
    document.getElementById("page-loader").style.display = "none";
    document.getElementById("skeleton-loader").style.display = "block";
  }, 1000);

  setTimeout(() => {
    document.getElementById("skeleton-loader").style.display = "none";
    document.getElementById("stock-table").style.display = "block";

    // Load mock stock data
    fetch("stocks.json")
      .then(response => response.json())
      .then(stockData => {
        let currentSort = { field: null, direction: 'asc' };
        let currentPage = 1;
        const itemsPerPage = 10;
        let filteredData = stockData;

        // Set up sortable headers
        const headers = document.querySelectorAll(".custom-table th");
        const fieldMap = ["symbol", "name", "ltp", "change", "percentChange", "dayHigh", "dayLow"];
        headers.forEach((th, index) => {
          th.dataset.field = fieldMap[index];
          th.classList.add("sortable");
          th.addEventListener("click", () => sortTable(fieldMap[index]));
        });

        // ✅ Search filter setup
        const searchInput = document.getElementById("search-input");
        const filterButton = document.getElementById("filter-button");

        function applySearch() {
          const query = searchInput.value.toLowerCase().trim();
          if (query === "") {
            filteredData = stockData;
          } else {
            filteredData = stockData.filter(stock =>
              stock.symbol.toLowerCase().includes(query) ||
              stock.name.toLowerCase().includes(query)
            );
          }
          currentPage = 1;
          renderTable(filteredData);
        }

        // Filter on button click
        filterButton.addEventListener("click", applySearch);

        // Filter in real-time while typing
        searchInput.addEventListener("input", applySearch);

        // Also trigger search on Enter key
        searchInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") applySearch();
        });

        // Function to render table
        function renderTable(data) {
          const tbody = document.getElementById("table-body");
          tbody.innerHTML = '';

          // Update header classes for sorting indicators
          headers.forEach((th, index) => {
            th.classList.remove("asc", "desc");
            if (currentSort.field === fieldMap[index]) {
              th.classList.add(currentSort.direction);
            }
          });

          // Paginate data
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const paginatedData = data.slice(startIndex, endIndex);

          // Populate rows
          paginatedData.forEach(stock => {
            const row = document.createElement("tr");

            row.innerHTML = `
              <td>${stock.symbol}</td>
              <td>${stock.name}</td>
              <td class="ltp">₹${stock.ltp.toFixed(2)}</td>
              <td class="${stock.change >= 0 ? 'positive' : 'negative'}">${stock.change.toFixed(2)}</td>
              <td class="${stock.percentChange >= 0 ? 'positive' : 'negative'}">${stock.percentChange.toFixed(2)}%</td>
              <td>${stock.dayHigh.toFixed(2)}</td>
              <td>${stock.dayLow.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
          });

          renderPagination(data.length);
        }

        // Pagination
        function renderPagination(totalItems) {
          const totalPages = Math.ceil(totalItems / itemsPerPage);
          const paginationContainer = document.getElementById("pagination-container");
          paginationContainer.innerHTML = '';

          const makeButton = (text, disabled, onClick) => {
            const btn = document.createElement("button");
            btn.textContent = text;
            btn.disabled = disabled;
            btn.addEventListener("click", onClick);
            return btn;
          };

          paginationContainer.appendChild(makeButton("First", currentPage === 1, () => { currentPage = 1; renderTable(filteredData); }));
          paginationContainer.appendChild(makeButton("Previous", currentPage === 1, () => { if (currentPage > 1) { currentPage--; renderTable(filteredData); } }));

          for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.textContent = i;
            pageBtn.classList.add("page-number");
            if (i === currentPage) pageBtn.classList.add("active");
            pageBtn.addEventListener("click", () => { currentPage = i; renderTable(filteredData); });
            paginationContainer.appendChild(pageBtn);
          }

          paginationContainer.appendChild(makeButton("Next", currentPage === totalPages, () => { if (currentPage < totalPages) { currentPage++; renderTable(filteredData); } }));
          paginationContainer.appendChild(makeButton("Last", currentPage === totalPages, () => { currentPage = totalPages; renderTable(filteredData); }));
        }

        // Sorting
        function sortTable(field) {
          if (currentSort.field === field) {
            currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
          } else {
            currentSort.field = field;
            currentSort.direction = 'asc';
          }

          filteredData.sort((a, b) => {
            let aVal = a[field];
            let bVal = b[field];
            if (typeof aVal === 'string') {
              aVal = aVal.toLowerCase();
              bVal = bVal.toLowerCase();
            }
            return currentSort.direction === 'asc'
              ? (aVal > bVal ? 1 : -1)
              : (aVal < bVal ? 1 : -1);
          });

          currentPage = 1;
          renderTable(filteredData);
        }

        // Initial render
        renderTable(stockData);
      });
  }, 3000);
});
