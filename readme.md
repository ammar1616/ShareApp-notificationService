# ShareApp-NotificationService

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)
6. [Usage](#usage)
    - [Send Borrowing Request Notification](#send-borrowing-request-notification)
    - [Send Damage Claim Notification](#send-damage-claim-notification)
    - [Send Due Date Approaching Notification](#send-due-date-approaching-notification)
    - [Send Reset Password Notification](#send-reset-password-notification)
7. [Testing](#testing)
8. [Contributing](#contributing)


## Overview

The Notification Service is a Node.js backend application designed to handle various notification tasks, such as sending emails and WebSocket notifications. It provides a flexible and reliable solution for sending notifications to users based on different events in the system.


## Features

1. **Email Notifications:**
   - Sends emails for borrowing requests, damage claims, due date approaching reminders, and password resets.
   
2. **WebSocket Notifications:**
   - Sends real-time WebSocket notifications to users for immediate alerts.

3. **Robust Error Handling:**
   - Includes comprehensive error handling to ensure reliability and resilience.


## Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- SMTP service for sending emails (e.g., Gmail, SendGrid)
- WebSocket server (optional, for WebSocket notifications)


## Getting Started

Follow these steps to set up and run the project locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ammar1616/Notification-Service.git
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy the `.env.example` file to `.env`.
   - Update the `.env` file with your configuration details, including SMTP service credentials.

4. **Run the Application:**
   ```bash
   npm start
   ```

## Project Structure

The project follows a modular structure:

- **controllers:** Handle business logic for different notification types.
- **helpers:** Contains utility functions for email configuration and WebSocket notifications.
- **middlewares:** Custom middleware functions, including authentication and notification toggling.
- **emailTemplates:** HTML templates for email notifications.
- **routes:** Define API endpoints for sending notifications.
- **startup:** Initialization scripts for setting up routes and error handling.


## Usage

### Send Due Date Approaching Notification:

- **Description:** Notifies a borrower about an approaching due date for a borrowed item.
- **Method:** POST
- **Endpoint:** `/notification-service/dueDateApproaching/`
- **Headers:**
  - `Content-Type`: application/json
  - `x-auth-token`: [your_token_here]
- **Request Body:**
  ```json
  {
    "borrowerEmail": "borrower@example.com",
    "borrowerName": "Alice Smith",
    "itemName": "Book"
  }
  ```
- **Example:**
  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "x-auth-token: [your_token_here]" \
    -d '{"borrowerEmail": "borrower@example.com", "borrowerName": "Alice Smith", "itemName": "Book"}' \
    http://localhost:5000/notification-service/dueDateApproaching/
  ```
- **Response:**  
  - **Status Code:** 200 OK
  - **Body:** 
    ```json
    {
      "message": "Notification sent successfully!"
    }
    ```
- **Notes:** 
  - This endpoint requires a valid authentication token (`x-auth-token` header).
  - Sends a reminder notification to the borrower named Alice Smith about the approaching due date for a borrowed item named Book.

### Send Reset Password Notification:

- **Description:** Notifies a user about a password reset.
- **Method:** POST
- **Endpoint:** `/notification-service/resetPassword/`
- **Headers:**
  - `Content-Type`: application/json
- **Request Body:**
  ```json
  {
    "user": "user@example.com",
    "generatedPassword": "new_password123"
  }
  ```
- **Example:**
  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"user": "user@example.com", "generatedPassword": "new_password123"}' \
    http://localhost:5000/notification-service/resetPassword/
  ```
- **Response:**  
  - **Status Code:** 200 OK
  - **Body:** 
    ```json
    {
      "message": "Notification sent successfully!"
    }
    ```
- **Notes:** 
  - Sends a notification to the user with the email address user@example.com about a password reset. The newly generated password is included in the notification.

### Send Borrowing Request Notification:

- **Description:** Notifies a lender about a new borrowing request.
- **Method:** POST
- **Endpoint:** `/notification-service/borrowingRequest/`
- **Headers:**
  - `Content-Type`: application/json
  - `x-auth-token`: [your_token_here]
- **Request Body:**
  ```json
  {
    "lenderEmail": "lender@example.com",
    "lenderName": "John Doe",
    "borrowerName": "Alice Smith",
    "itemName": "Bike"
  }
  ```
- **Example:**
  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "x-auth-token: [your_token_here]" \
    -d '{"lenderEmail": "lender@example.com", "lenderName": "John Doe", "borrowerName": "Alice Smith", "itemName": "Bike"}' \
    http://localhost:5000/notification-service/borrowingRequest/
  ```
- **Response:**  
  - **Status Code:** 200 OK
  - **Body:** 
    ```json
    {
      "message": "Notification sent successfully!"
    }
    ```
- **Notes:** 
  - This endpoint requires a valid authentication token (`x-auth-token` header).
  - Sends a notification to the lender about a new borrowing request from a borrower named Alice Smith for an item named Bike.

### Send Damage Claim Notification:

- **Description:** Notifies a borrower about a damage claim.
- **Method:** POST
- **Endpoint:** `/notification-service/damageClaim/`
- **Headers:**
  - `Content-Type`: application/json
  - `x-auth-token`: [your_token_here]
- **Request Body:**
  ```json
  {
    "borrowerEmail": "borrower@example.com",
    "borrowerName": "Alice Smith",
    "lenderName": "John Doe",
    "itemName": "Bike"
  }
  ```
- **Example:**
  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "x-auth-token: [your_token_here]" \
    -d '{"borrowerEmail": "borrower@example.com", "borrowerName": "Alice Smith", "lenderName": "John Doe", "itemName": "Bike"}' \
    http://localhost:5000/notification-service/damageClaim/
  ```
- **Response:**  
  - **Status Code:** 200 OK
  - **Body:** 
    ```json
    {
      "message": "Notification sent successfully!"
    }
    ```
- **Notes:** 
  - This endpoint requires a valid authentication token (`x-auth-token` header).
  - Sends a notification to the borrower about a damage claim raised by the lender named John Doe for an item named Bike.

... [similar descriptions for other notification endpoints]


## Testing

To run tests, execute the following command:

```bash
npm test
```

The testing strategy includes unit tests for individual components, ensuring robustness and reliability.

## Contributing

We welcome contributions! Follow these guidelines to contribute to the project:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit.
4. Submit a pull request.

Thanks for Your Interest