# Crypto Asset Tracker

A modern cryptocurrency tracking application built with React and TypeScript, featuring a neo-brutalist design aesthetic.

## Features

- 📊 Real-time tracking of top 50 cryptocurrencies by market cap
- 📈 Interactive price charts with historical data
- 💰 Detailed asset information including market cap, volume, and price changes
- 🎨 Unique neo-brutalist design with high contrast and bold typography
- 📱 Fully responsive design for all devices

## Technologies Used

- React + TypeScript
- Vite for blazing fast development
- Tailwind CSS for styling
- Recharts for interactive data visualization
- CoinCap API for real-time cryptocurrency data
- React Query for efficient data fetching and caching
- React Router for navigation

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Integration

This project uses the [CoinCap API](https://docs.coincap.io/) to fetch cryptocurrency data. The API is free to use and doesn't require authentication for basic endpoints.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API service functions
└── utils/         # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [CoinCap API](https://docs.coincap.io/) for providing cryptocurrency data
- [Recharts](https://recharts.org/) for the charting library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [shadcn/ui](https://ui.shadcn.com/) for UI components
