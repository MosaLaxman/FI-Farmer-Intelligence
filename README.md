# 🌱 Farmer Intelligence (Smart Farm AI)

Farmer Intelligence is an AI-powered platform designed to help farmers optimize the use of resources such as **water, fertilizers, and labor** by analyzing **soil conditions, weather data, and crop details**.  
The system provides intelligent recommendations, crop predictions, disease detection, cost optimization tips, and weather alerts — all in the farmer’s **preferred language**.

---

## 🚀 Features

- 🔐 **User Authentication** with language preference (English, Hindi, Telugu, Odia)
- 🌾 **Farm Resource Analysis** (Water, Fertilizer, Labor recommendations)
- 🌱 **Crop Prediction** based on soil, season, and land area
- 🩺 **Crop Disease Detection** using Gemini Vision AI
- 💰 **Cost Optimization** with cost breakdown and reduction tips
- 🌦 **Real-time Weather Alerts**
- 📜 **User History Tracking**
- 🤖 **AI-Powered Insights** using Google Gemini

---

## 📸 Screenshots

![Dashboard](ui%20images/Screenshot%20(61).png) 
![Farm Analysis](ui%20images/Screenshot%20(62).png) 
![Crop Prediction](ui%20images/Screenshot%20(63).png) 
![Disease Detection](ui%20images/Screenshot%20(64).png) 
![Cost Optimization](ui%20images/Screenshot%20(65).png) 
![Weather Alerts](ui%20images/Screenshot%20(66).png) 
![History](ui%20images/Screenshot%20(67).png) 

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Lucide Icons

### Backend
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Hibernate
- REST APIs

### AI & External Services
- Google Gemini API (Text & Vision)
- Weather API

---

## 🔐 Environment Configuration (Required)

Before running the backend, configure the following **environment variables**.

Create a `.env` file **OR** set them in your system environment.

```properties
spring.application.name=${SPRING_APPLICATION_NAME}

# 🌦 Weather API
weather.api.key=${WEATHER_API_KEY}
weather.api.url=${WEATHER_API_URL}

# 🤖 Gemini AI API
gemini.api.key=${GEMINI_API_KEY}
gemini.api.url=${GEMINI_API_URL}

# 🐘 PostgreSQL Database
spring.datasource.url=${POSTGRES_DB_URL}
spring.datasource.username=${POSTGRES_DB_USERNAME}
spring.datasource.password=${POSTGRES_DB_PASSWORD}

# ⚙️ JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

---

## 💻 How to Run the Project

### 1. Backend (Spring Boot)
```bash
cd backend/smart-farm-ai/smart-farm-ai
./mvnw spring-boot:run
```

### 2. Frontend (React)
```bash
cd frontend/smart-farm-ai-frontend
npm install
npm run dev
```

---

## 🌍 Language Support

- English
- Hindi
- Telugu
- Odia

AI responses are dynamically generated in the user’s selected language.

---

## 🧠 Future Enhancements

- Mobile app support
- Scheduled weather alerts
- Satellite-based crop analysis
- Analytics dashboard
- JWT-based authentication

---

## 🏆 Contribution

This project was built as part of a hackathon / academic project. Contributions and suggestions are welcome.

Built with ❤️ for Sustainable Agriculture.
