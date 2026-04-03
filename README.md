# Flower Shop Management System

## Overview
This project is a full-stack web application developed using React, Node.js, Express, and MongoDB.  
The system allows users to register, log in, and manage flower products through full CRUD operations.

---

## Features

### Authentication
- Register
- Login
- Logout

### User Management
- Profile Update

### Flower Management (CRUD)
- Add Flower
- View Flowers
- Update Flower
- Delete Flower

---

## Tech Stack
- Frontend: React  
- Backend: Node.js + Express  
- Database: MongoDB  
- Version Control: GitHub  

---

## Project Structure
backend/
frontend/

---

## How to Run the Project

### Backend
```bash
cd backend
npm install
npm run dev
 ###  frontend
 cd frontend
npm install
npm start
Deployment

The application is deployed on an AWS EC2 instance.

Backend runs on port 5001
Frontend runs on port 3000
The application is managed using PM2
Process Management (PM2)

PM2 is used as a production process manager for Node.js applications.

It ensures that the application:

Runs continuously
Restarts automatically if it crashes
Stays online in production
###commands used:
pm2 start server.js --name backend
pm2 start "serve -s build -l 3000" --name frontend
pm2 save

CI/CD

GitHub Actions is used to automate the build and deployment process.

The pipeline includes:

Installing dependencies
Building the frontend
Running backend tests
Deploying the application using PM2

Notes

This project demonstrates a complete full-stack development workflow, including:

Frontend and backend integration
Deployment on AWS EC2
CI/CD automation using GitHub Actions
Process management using PM2

The system is fully functional in the local environment and successfully deployed to the EC2 instance.

```bash
git add README.md
git commit -m "Final README update"
git push origin main