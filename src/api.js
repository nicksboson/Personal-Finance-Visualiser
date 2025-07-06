const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Fetch all transactions
export const fetchTransactions = async () => {
  const res = await fetch(`${API_URL}/api/transactions`);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
};

// Add a new transaction
export const addTransaction = async (transaction) => {
  const res = await fetch(`${API_URL}/api/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
  if (!res.ok) throw new Error('Failed to add transaction');
  return res.json();
};

// Update a transaction
export const updateTransaction = async (id, transaction) => {
  const res = await fetch(`${API_URL}/api/transactions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
  if (!res.ok) throw new Error('Failed to update transaction');
  return res.json();
};

// Delete a transaction
export const deleteTransaction = async (id) => {
  const res = await fetch(`${API_URL}/api/transactions/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete transaction');
  return res.json();
};

// Fetch monthly income/expense summary
export const fetchMonthlySummary = async () => {
  const res = await fetch(`${API_URL}/api/transactions/monthly-expenses`);
  if (!res.ok) throw new Error('Failed to fetch monthly summary');
  return res.json();
};

// --- Income API ---
export const fetchIncomes = async () => {
  const res = await fetch(`${API_URL}/api/income`);
  if (!res.ok) throw new Error('Failed to fetch incomes');
  return res.json();
};

export const addIncome = async (income) => {
  const res = await fetch(`${API_URL}/api/income`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(income),
  });
  if (!res.ok) throw new Error('Failed to add income');
  return res.json();
};

export const updateIncome = async (id, income) => {
  const res = await fetch(`${API_URL}/api/income/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(income),
  });
  if (!res.ok) throw new Error('Failed to update income');
  return res.json();
};

export const deleteIncome = async (id) => {
  const res = await fetch(`${API_URL}/api/income/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete income');
  return res.json();
};

export const fetchMonthlyIncomes = async () => {
  const res = await fetch(`${API_URL}/api/income/monthly-incomes`);
  if (!res.ok) throw new Error('Failed to fetch monthly incomes');
  return res.json();
}; 