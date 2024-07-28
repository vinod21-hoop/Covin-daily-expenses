# Daily Expenses Sharing Application

## Setup and Installation

1. Clone the repository
   ```bash
   git clone <repository_url>
   cd daily-expenses-app

2. Install dependencies

   ```bash
    npm install
    Start the application
    ```
    ```bash
    npm start

3. API Endpoints

# User Endpoints

- POST /api/users: Create a user
- GET /api/users/:id: Retrieve user details

# Expense Endpoints

- POST /api/expenses: Add an expense
- GET /api/expenses/user/:userId: Retrieve individual user expenses
- GET /api/expenses: Retrieve overall expenses
- GET /api/expenses/download: Download balance sheet

# Authentication Endpoints

- POST /api/auth/login: Login and get token

4. Data Validation

- User inputs are validated to ensure proper data entry.
- Percentages in the percentage split method are validated to ensure they add up to 100%.

5. Error Handling

- Proper error handling and input validation are implemented throughout the application.

6. Authorization

- JWT-based authentication is implemented for secure access to expense endpoints.