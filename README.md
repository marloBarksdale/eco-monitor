# Eco-Monitor Dashboard
https://marlobarksdale.github.io/eco-monitor/

A responsive, real-time environmental monitoring dashboard that I built using React and TypeScript. It simulates live sensor data and provides flexible filtering, clear data visualization, and mobile-first performance.

---

## 🌐 Project Overview

This dashboard displays simulated sensor readings (Temperature, Humidity, and AQI) with the following goals:

* Provide **live updates** from a simulated sensor array
* Allow **real-time filtering** by environmental parameters
* Maintain **performance** on both desktop and mobile
* Support **data pruning** by user-defined time windows
* Meet the technical spec of a front-end systems engineering challenge

---

## 🔧 Key Features

### ✅ Real-Time Data Simulation

* I use `SimulateRealTimeData` to push new sensor readings every second
* 100 sensors continuously emit data
* Data is pruned by a sliding window (30s to 10min)

### ✅ Sensor Card Display

* Each card shows temperature, humidity, and AQI
* Color-coded indicators (green, yellow, red) reflect severity
* Responsive grid layout:

  * **Desktop**: multiple columns
  * **Mobile**: scrollable, fewer cards visible at once

### ✅ Filtering System

* **Three filter categories**: Temperature, Humidity, AQI
* **Preset buttons** for quick selection:

  * e.g., "Normal", "Warm", "Hot" for temperature
* **Custom sliders** with two-sided range control
* **All buttons** reset the filter to the full expected range based on simulated data
* **Collapsible filter panel**:

  * Saves space on mobile, visible by default on desktop

### ✅ Pagination

* Limits display to 12 records per page
* Fully responsive layout:

  * Buttons shrink and scroll on mobile
* Includes navigation: First, Prev, Next, and Last

### ✅ Pause/Resume + Time Window

* Pause button halts updates while keeping current data visible
* Dropdown allows users to select time window (30s, 1min, 5min, 10min)

---

## 🧠 Design Considerations

### 🔄 State Management

* I use `useReducer` to efficiently handle streaming updates
* All incoming data is timestamped and pruned based on the time window

### 💾 Memory Safety

* Data is kept in memory only as long as needed
* No external logging or local storage is used

### 📱 Mobile Optimization


* Filter controls collapse automatically
* Cards remain scrollable underneath sticky controls

### 🎯 Decision Rationale

| Feature                                 | Why I Chose It                                                                |
| --------------------------------------- | ----------------------------------------------------------------------------- |
| Time window pruning (30s–10min)         | Prevents excessive memory use and keeps the data focused on recent conditions |
| Limit of 12 cards per page              | Balances readability with performance, especially on low-power mobile devices |
| Filter presets with "All" option        | Makes it easy to quickly explore sensor ranges or clear all filters at once   |
| Range sliders                           | Gives fine-tuned control while avoiding invalid filter combinations           |
| Sticky layout for pagination & controls | Keeps core navigation visible without blocking the grid                       |
| Pause/resume toggle                     | Allows temporary inspection of data without it changing beneath the user      |

---



---

## 🚀 Getting Started

```bash
git clone <repo>
cd eco-monitor-dashboard
npm install
npm start
```



## 🧑‍💻 Author

Lynden Flood

---

## 📄 License

MIT — Free to use, share, modify.
