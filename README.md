# ⛅ WeatherSphere

Welcome to **WeatherSphere**, a stunning, production-ready weather application built with modern web technologies. WeatherSphere allows you to search for any city in the world and instantly receive real-time, beautifully formatted weather data including temperature, humidity, wind speed, visibility, and more!

## ✨ Features
- **Real-Time Data**: Live weather information powered by the [OpenWeatherMap API](https://openweathermap.org/).
- **Dynamic Interpretations**: Automatically interprets condition codes (e.g., determining if it's currently raining) and provides visual indicators.
- **Glassmorphic Design**: A premium, frosted-glass UI built entirely with TailwindCSS.
- **Micro-Animations**: Smooth hover effects, transitions, and loading skeletons for a seamless user experience.
- **Responsive**: Mobile-first design that looks breathtaking on phones, tablets, and desktop monitors.
- **Robust Error Handling**: Gracefully handles network failures, unresolved cities, and unauthorized API keys without breaking the application.

## 🛠️ Tech Stack
- **Framework**: Next.js 14+ (App Router, Server Actions)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine and an active API key from [OpenWeatherMap](https://openweathermap.org/api).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/riteshbonthalakoti/weathersphere.git
   cd weathersphere
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your OpenWeather API key:
   ```env
   OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application!

## 📦 Architecture
The project strictly follows Clean Architecture principles:
- `app/`: Next.js App Router endpoints and core layout boundaries.
- `components/`: Modular, reusable UI components (e.g., `SearchBar`, `WeatherCard`, `WeatherDetails`).
- `hooks/`: Custom client-side React hooks (`useWeather.ts`).
- `services/`: Server-side API fetching and business logic (`weather.ts`).
- `types/`: Strict TypeScript interfaces for data models.
- `lib/`: Utility functions and helper scripts.

## 🌐 Deployment
This project is officially deployed on **Vercel** with continuous integration enabled. 
Live URL: [https://weathersphere-eta.vercel.app](https://weathersphere-eta.vercel.app)

*Note: Ensure your `OPENWEATHER_API_KEY` is added to your Vercel project's Environment Variables dashboard.*

---
*Developed with modern web guidelines focusing on aesthetics, performance, and accessibility.*
