# NiftyInvest Stock Dashboard

A professional stock dashboard for tracking NiftyInvest stocks with real-time data visualization.

## Design Choices

- **Layout**: The dashboard uses a clean, centered header with a blue background. The main content area is constrained to a max width of 1400px for readability.
- **Search Bar**: Positioned absolutely at the top left of the main container, overlaying the table with a z-index of 10 for easy access without disrupting the table layout.
- **Table**: Custom-styled table with hover effects, sorting indicators, and responsive design for mobile devices.
- **Styling**: Utilizes Inter font, blue color scheme, and subtle animations for a modern look.
- **Responsiveness**: Media queries ensure the layout adapts to screens smaller than 768px.

## Steps to Run the Project

1. Ensure you have a web browser installed (e.g., Chrome, Firefox).
2. Open the `index.html` file in your browser by double-clicking it or using a local server.
3. The dashboard will load, displaying the stock data from `stocks.json`.
4. Use the search bar to filter stocks by symbol or company name.
5. Click on table headers to sort the data.
