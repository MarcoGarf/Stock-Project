
# Stock Price Tracker

## Overview

The **Stock Price Tracker** is a web application that allows users to track real-time stock prices of their chosen tickers. The app uses Yahoo Finance (`yfinance`) to fetch stock data and Flask for the backend, while the frontend is powered by HTML, CSS, and JavaScript with jQuery for dynamic updates.

## Features

- Add and remove stock tickers to the dashboard.
- Fetch real-time stock data, including the current price and the price percentage change from the opening price.
- Automatic updates every 15 seconds with a countdown timer.
- Visual cues (color changes and flash animations) to indicate price movements.

## Technologies Used

- **Backend**: Flask, `yfinance`
- **Frontend**: HTML, CSS, JavaScript, jQuery
- **Storage**: Local Storage for persisting ticker data
- **Styling**: Custom CSS animations for visual feedback

## Installation

##File Structure

├── app.py                 
├── templates
   └── index.html         
├── static
  ├── style.css ── script.js          
├── requirements.txt       
└── README.md              

