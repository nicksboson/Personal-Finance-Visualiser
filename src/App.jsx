import React, { useEffect, useState } from 'react';
import { format, format as formatDate, parseISO } from 'date-fns';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import TransactionForm from './components/TransactionForm';
import ExpenseChart from './components/ExpenseChart';
import TransactionList from './components/TransactionList';
import Footer from './components/Footer';
import { fetchTransactions, addTransaction, updateTransaction, deleteTransaction, fetchMonthlySummary, fetchIncomes, addIncome, updateIncome, deleteIncome, fetchMonthlyIncomes } from './api.js';
import './App.css';

// Helper to get today's date as yyyy-MM-dd string (local time, no timezone issues)
const getTodayString = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Helper to get yyyy-MM-dd string from a Date
const toDateString = (date) => date.toISOString().split('T')[0];

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: getTodayString()
  });
  const [formErrors, setFormErrors] = useState({});
  const [showChart, setShowChart] = useState(true); // For mobile collapsible chart
  const [monthlyIncomeExpenses, setMonthlyIncomeExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [flash, setFlash] = useState(null);
  const [formType, setFormType] = useState('expense');
  const [incomes, setIncomes] = useState([]);

  // Load transactions, incomes, and monthly summary from backend
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchTransactions(),
      fetchMonthlySummary(),
      fetchIncomes(),
      fetchMonthlyIncomes()
    ])
      .then(([txs, monthly, incs, monthlyIncs]) => {
        setTransactions(txs);
        setMonthlyIncomeExpenses(mergeMonthlyData(monthly, monthlyIncs));
        setIncomes(incs);
        setLoading(false);
      })
      .catch((err) => {
        showFlash('danger', 'Failed to load data from server');
        setLoading(false);
      });
  }, []);

  // Merge monthly expenses and incomes for chart
  const mergeMonthlyData = (expenses, incomes) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = Array.from({ length: 12 }, (_, i) => ({
      month: months[i],
      totalExpense: 0,
      totalIncome: 0
    }));
    expenses.forEach(item => {
      const idx = item._id - 1;
      if (idx >= 0 && idx < 12) {
        data[idx].totalExpense = item.totalExpense;
        // If the old endpoint had income, ignore it (we use the new one)
      }
    });
    incomes.forEach(item => {
      const idx = item._id - 1;
      if (idx >= 0 && idx < 12) {
        data[idx].totalIncome = item.totalIncome;
      }
    });
    return data;
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.amount || formData.amount === '') {
      errors.amount = 'Amount is required';
    } else if (isNaN(formData.amount)) {
      errors.amount = 'Amount must be a valid number';
    } else if (parseFloat(formData.amount) === 0) {
      errors.amount = 'Amount cannot be zero';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length > 100) {
      errors.description = 'Description cannot exceed 100 characters';
    }
    if (!formData.date) {
      errors.date = 'Date is required';
    } else if (formData.date > getTodayString()) {
      errors.date = 'Date cannot be in the future';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Helper to show flash
  const showFlash = (type, message) => {
    setFlash({ type, message, onClose: () => setFlash(null) });
    setTimeout(() => setFlash(null), 2500);
  };

  // Helper to fetch and merge monthly data for chart
  const refreshMonthlyChart = async () => {
    const [monthly, monthlyIncs] = await Promise.all([
      fetchMonthlySummary(),
      fetchMonthlyIncomes()
    ]);
    setMonthlyIncomeExpenses(mergeMonthlyData(monthly, monthlyIncs));
  };

  // Handle expense form submit
  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (editingTransaction) {
        const updated = await updateTransaction(editingTransaction._id, {
          amount: parseFloat(formData.amount),
          description: formData.description.trim(),
          date: formData.date
        });
        setTransactions(prev => prev.map(t => t._id === updated._id ? updated : t));
        setEditingTransaction(null);
        showFlash('success', 'Expense updated successfully!');
      } else {
        const created = await addTransaction({
          amount: parseFloat(formData.amount),
          description: formData.description.trim(),
          date: formData.date
        });
        setTransactions(prev => [created, ...prev]);
        showFlash('success', 'Expense added successfully!');
      }
      await refreshMonthlyChart();
      setFormData({ amount: '', description: '', date: getTodayString() });
      setFormErrors({});
    } catch (err) {
      showFlash('danger', 'Failed to save expense');
    }
    setLoading(false);
  };

  // Handle income form submit
  const handleSubmitIncome = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (editingTransaction) {
        const updated = await updateIncome(editingTransaction._id, {
          amount: parseFloat(formData.amount),
          description: formData.description.trim(),
          date: formData.date
        });
        setIncomes(prev => prev.map(i => i._id === updated._id ? updated : i));
        setEditingTransaction(null);
        showFlash('success', 'Income updated successfully!');
      } else {
        const created = await addIncome({
          amount: parseFloat(formData.amount),
          description: formData.description.trim(),
          date: formData.date
        });
        setIncomes(prev => [created, ...prev]);
        showFlash('success', 'Income added successfully!');
      }
      await refreshMonthlyChart();
      setFormData({ amount: '', description: '', date: getTodayString() });
      setFormErrors({});
    } catch (err) {
      showFlash('danger', 'Failed to save income');
    }
    setLoading(false);
  };

  // Handle edit transaction
  const handleEdit = (record) => {
    setEditingTransaction(record);
    setFormType(record._recordType);
    setFormData({
      amount: Math.abs(record.amount).toString(),
      description: record.description,
      date: record.date.slice(0, 10)
    });
  };

  // Handle delete transaction
  const handleDelete = async (id, type) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setLoading(true);
      setError(null);
      try {
        if (type === 'expense') {
          await deleteTransaction(id);
          setTransactions(prev => prev.filter(t => t._id !== id));
        } else {
          await deleteIncome(id);
          setIncomes(prev => prev.filter(i => i._id !== id));
        }
        await refreshMonthlyChart();
        showFlash('success', 'Record deleted successfully!');
      } catch (err) {
        showFlash('danger', 'Failed to delete record');
      }
      setLoading(false);
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setFormData({ amount: '', description: '', date: getTodayString() });
    setFormErrors({});
  };

  // Combine and sort all records for display
  const allRecords = [
    ...transactions.map(t => ({ ...t, _recordType: 'expense' })),
    ...incomes.map(i => ({ ...i, _recordType: 'income' }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calculate summary using both arrays
  const totalIncome = incomes.reduce((sum, i) => sum + Math.abs(i.amount), 0);
  const totalExpense = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netBalance = totalIncome - totalExpense;

  // Format currency in INR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  // For accessibility: readable date
  const getReadableDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Empty state helpers
  const hasIncome = transactions.some(t => t.amount > 0);
  const hasExpense = transactions.some(t => t.amount < 0);

  // Responsive: collapsible chart on mobile
  const isMobile = window.innerWidth < 768;

  return (
    <div className="app">
      <Header flash={flash} />
      <SummaryCard
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        netBalance={netBalance}
        formatCurrency={formatCurrency}
      />
      <main className="main-content">
        {loading && <div className="loading-spinner">Loading...</div>}
        <TransactionForm
          formData={formData}
          formErrors={formErrors}
          editingTransaction={editingTransaction}
          onChange={setFormData}
          onSubmitExpense={handleSubmitExpense}
          onSubmitIncome={handleSubmitIncome}
          onCancel={handleCancelEdit}
          loading={loading}
          formType={formType}
          setFormType={setFormType}
        />
        <section className="data-section">
          <ExpenseChart
            monthlyIncomeExpenses={monthlyIncomeExpenses}
            hasIncome={incomes.length > 0}
            hasExpense={transactions.length > 0}
            isMobile={isMobile}
            showChart={showChart}
            setShowChart={setShowChart}
            formatCurrency={formatCurrency}
          />
          {allRecords.length === 0 && !loading ? (
            <div className="empty-state">No records yet. Add your first income or expense!</div>
          ) : (
            <TransactionList
              sortedTransactions={allRecords}
              formatCurrency={formatCurrency}
              getReadableDate={getReadableDate}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              loading={loading}
            />
          )}
        </section>
      </main>
      <Footer />
      </div>
  );
}

export default App;
