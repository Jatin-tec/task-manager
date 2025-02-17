# Task Manager

## Project Setup Instructions

1. **Clone the repository:**
    ```sh
    git clone https://github.com/jatin-tec/task-manager.git
    ```
2. **Navigate to the project directory:**
    ```sh
    cd task-manager
    ```
3. **Install dependencies:**
    ```sh
    npm install
    ```
4. **Database Migrations:**
    ```sh
    npx prisma generate
    npx prisma db push
    ```
5. **Start the development server:**
    ```sh
    npm start
    ```
6. **Prisma Studio: (Optional)**
    ```sh
    npx prisma studio
    ```


## Features Implemented

- **User Authentication:**
  - Sign up, log in and log out functionality.
  
- **Task Management:**
  - Create, read, update and delete tasks.
  - Mark tasks as completed or pending.
  
- **Task Categorization:**
  - Organize tasks into different categories.
  
- **Due Dates:**
  - Set and manage due dates for tasks.
  
- **Responsive Design:**
  - Mobile-friendly interface.

- **Search Functionality:**
  - Search tasks by title or description.
