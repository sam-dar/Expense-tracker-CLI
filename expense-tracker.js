#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');

const program = new Command();
const dataFile = path.join(__dirname, 'expenses.json');

// Load expenses
function loadExpenses() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
  }
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
}

// Save expenses
function saveExpenses(expenses) {
  fs.writeFileSync(dataFile, JSON.stringify(expenses, null, 2));
}

// Add an expense
program
  .command('add')
  .description('Add a new expense')
  .requiredOption('--description <description>', 'Expense description')
  .requiredOption('--amount <amount>', 'Expense amount')
  .option('--category <category>', 'Expense category')
  .action((options) => {
    const expenses = loadExpenses();
    const newExpense = {
      id: expenses.length + 1,
      date: new Date().toISOString().split('T')[0],
      description: options.description,
      amount: parseFloat(options.amount),
      category: options.category || 'General'
    };
    expenses.push(newExpense);
    saveExpenses(expenses);
    console.log(`Expense added successfully (ID: ${newExpense.id})`);
  });

// List all expenses
program
  .command('list')
  .description('List all expenses')
  .action(() => {
    const expenses = loadExpenses();
    console.log('ID  Date       Description  Amount  Category');
    expenses.forEach((exp) => {
      console.log(`${exp.id}   ${exp.date}  ${exp.description}  $${exp.amount}  ${exp.category}`);
    });
  });

// Update an expense
program
  .command('update')
  .description('Update an existing expense')
  .requiredOption('--id <id>', 'Expense ID')
  .option('--description <description>', 'New description')
  .option('--amount <amount>', 'New amount')
  .option('--category <category>', 'New category')
  .action((options) => {
    const expenses = loadExpenses();
    const expense = expenses.find(exp => exp.id === parseInt(options.id));
    if (!expense) return console.log('Expense not found.');

    if (options.description) expense.description = options.description;
    if (options.amount) expense.amount = parseFloat(options.amount);
    if (options.category) expense.category = options.category;

    saveExpenses(expenses);
    console.log('Expense updated successfully');
  });

// Export to CSV
program
  .command('export')
  .description('Export expenses to CSV')
  .action(() => {
    const expenses = loadExpenses();
    const csv = parse(expenses);
    fs.writeFileSync(path.join(__dirname, 'expenses.csv'), csv);
    console.log('Expenses exported to expenses.csv');
  });

// View summary
program
  .command('summary')
  .description('View expense summary')
  .option('--month <month>', 'Month number (1-12)')
  .action((options) => {
    const expenses = loadExpenses();
    let filtered = expenses;

    if (options.month) {
      filtered = expenses.filter(exp => new Date(exp.date).getMonth() + 1 === parseInt(options.month));
    }

    const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);

    if (options.month) {
      console.log(`Total expenses for month ${options.month}: $${total}`);
    } else {
      console.log(`Total expenses: $${total}`);
    }
  });

// Delete an expense
program
  .command('delete')
  .description('Delete an expense by ID')
  .requiredOption('--id <id>', 'Expense ID')
  .action((options) => {
    let expenses = loadExpenses();
    expenses = expenses.filter(exp => exp.id !== parseInt(options.id));
    saveExpenses(expenses);
    console.log('Expense deleted successfully');
  });

program.parse(process.argv);
