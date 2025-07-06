import React, { useEffect } from 'react';

const TransactionForm = ({
  formData,
  formErrors,
  editingTransaction,
  onChange,
  onSubmitExpense,
  onSubmitIncome,
  onCancel,
  loading,
  formType,
  setFormType
}) => {
  // Ensure negative sign for expense
  useEffect(() => {
    if (formType === 'expense') {
      if (formData.amount && parseFloat(formData.amount) > 0) {
        onChange({ ...formData, amount: '-' + Math.abs(formData.amount) });
      }
    } else if (formType === 'income') {
      if (formData.amount && parseFloat(formData.amount) < 0) {
        onChange({ ...formData, amount: Math.abs(formData.amount) });
      }
    }
    // eslint-disable-next-line
  }, [formType]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'amount') {
      // For expense, always keep negative; for income, always positive
      if (formType === 'expense') {
        value = '-' + Math.abs(value);
      } else {
        value = Math.abs(value);
      }
    }
    onChange({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === 'expense') {
      onSubmitExpense(e);
    } else {
      onSubmitIncome(e);
    }
  };

  return (
    <section className="form-section">
      <div className="form-container">
        <h2>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h2>
        <div className="form-toggle">
          <button
            className={`toggle-btn${formType === 'expense' ? ' active' : ''}`}
            onClick={() => setFormType('expense')}
            type="button"
            disabled={loading}
          >
            Expense
          </button>
          <button
            className={`toggle-btn${formType === 'income' ? ' active' : ''}`}
            onClick={() => setFormType('income')}
            type="button"
            disabled={loading}
          >
            Income
          </button>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off" className="transaction-form" aria-label="Transaction Form">
          <div className="form-group">
            <label htmlFor="amount">Amount *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              disabled={loading}
              placeholder={formType === 'expense' ? "Enter negative amount" : "Enter amount"}
              className={formErrors.amount ? 'error' : ''}
              aria-label="Amount"
              aria-invalid={!!formErrors.amount}
            />
            {formErrors.amount && <span className="error-text">{formErrors.amount}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter description"
              className={formErrors.description ? 'error' : ''}
              aria-label="Description"
              aria-invalid={!!formErrors.description}
            />
            {formErrors.description && <span className="error-text">{formErrors.description}</span>}
            <small>{formData.description.length}/100 characters</small>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              disabled={loading}
              className={formErrors.date ? 'error' : ''}
              aria-label="Date"
              aria-invalid={!!formErrors.date}
            />
            {formErrors.date && <span className="error-text">{formErrors.date}</span>}
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading} aria-label={editingTransaction ? 'Update Transaction' : formType === 'expense' ? 'Add Expense' : 'Add Income'}>
              {editingTransaction ? <><span role="img" aria-label="Update">🔄</span> Update Transaction</> : <><span role="img" aria-label="Add">➕</span> {formType === 'expense' ? 'Add Expense' : 'Add Income'}</>}
            </button>
            {editingTransaction && (
              <button type="button" onClick={onCancel} className="btn-secondary" disabled={loading} aria-label="Cancel Edit">
                <span role="img" aria-label="Cancel">❌</span> Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default TransactionForm; 