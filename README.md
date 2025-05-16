# Expense Tracker CLI (Node.js)

This is a simple command-line expense tracker application built using Node.js. It allows you to manage your expenses directly from the terminal.
It is inspired from the Expense Tracker project https://roadmap.sh/projects/expense-tracker
 featured in the Backend Roadmap from roadmap.sh.



## Features

* Add, update, delete, and list expenses.
* Categorize expenses (e.g., Food, Transport, etc.).
* View expense summaries for all expenses or for a specific month.
* Export expenses to a CSV file.

## Prerequisites

* Node.js installed on your system.

## Setup

1. Clone this repository or download the script.
2. Make the script executable (Linux/Mac):

   ```bash
   chmod +x expense-tracker.js
   ```
3. Install dependencies:

   ```bash
   npm install commander json2csv
   ```

## Usage

Run the CLI using the following command:

```bash
node expense-tracker.js <command>
```

### Commands

* **Add an Expense:**

  ```bash
  node expense-tracker.js add --description "Lunch" --amount 20 --category "Food"
  ```

* **List All Expenses:**

  ```bash
  node expense-tracker.js list
  ```

* **Update an Expense:**

  ```bash
  node expense-tracker.js update --id 1 --description "Brunch" --amount 25
  ```

* **Delete an Expense:**

  ```bash
  node expense-tracker.js delete --id 1
  ```

* **View Expense Summary:**

  ```bash
  node expense-tracker.js summary
  ```

* **View Monthly Expense Summary:**

  ```bash
  node expense-tracker.js summary --month 5
  ```

* **Export Expenses to CSV:**

  ```bash
  node expense-tracker.js export
  ```

## Data Storage

* Expenses are stored in a JSON file (`expenses.json`) in the same directory.
* The CSV file (`expenses.csv`) is also saved in the same directory when exported.

## Error Handling

* The application handles invalid IDs, missing descriptions, and invalid amounts gracefully.
## Project URL
[Project URL](https://github.com/sam-dar/Expense-tracker-CLI)