# Hotel Spatial Search System

This project involves developing a **Spatial Decision Support System (SDSS)** for hotel and tourism-related locations in Malaysia. It combines data extraction, geospatial data visualisation, and interactive map functionalities using the **Google Maps Platform**. This system is designed to support spatial decision-making in the hospitality and tourism sectors.

**GitHub Repository**: [Hotel Spatial Search](https://github.com/Shab-33/Hotel-Spatial-Search)

---

## Overview

The project integrates hotel and homestay data with Google Maps for a comprehensive spatial decision-making platform. Users can view locations, overlay relevant geographic data, and explore nearby businesses related to tourism, such as restaurants, rental services, and souvenir shops.

The development process was carried out over **five weeks**, with tasks ranging from data extraction to implementing advanced visualisation features.

---

## Project Features

1. **Hotel and Homestay Location Database**:
   - Extracted data from:
     - [Ministry of Tourism, Arts and Culture Malaysia (MOTAC) Hotel Directory](https://www.motac.gov.my/semakan/hotel-daftar)
     - MOTAC Homestay Directory (PDF format)
   - Database fields include:
     - Name
     - Full address (street, region, city, etc.)
     - Longitude and latitude (geospatial coordinates)

2. **Interactive Map Visualisation**:
   - Developed using the **Google Maps Platform** and **React**.
   - Features:
     - Pinpointing hotel and homestay locations on a map.
     - Overlaying additional data layers (e.g., rainfall information).

3. **Tourism Business Mapping**:
   - Plotted tourism-related businesses based on Google Maps data, including:
     - Photography services
     - Travel and tour agencies
     - Food and beverage establishments
     - Rental services (cars, bikes, taxis)
     - Souvenir shops
     - Bed and breakfasts
     
---

## Technical Stack

- **Frontend**: React
- **Backend**: Node.js
- **APIs**: Google Maps API
- **Data Handling**: CSV and JSON for database storage
- **Tools**: Web scraping, PDF data extraction
