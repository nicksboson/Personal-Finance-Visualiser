const TransactionItem = ({ transaction, formatCurrency, getReadableDate, handleEdit, handleDelete }) => (
  <div
    className="transaction-item"
    tabIndex={0}
    aria-label={`Transaction: ${transaction.description}, ${transaction._recordType === 'income' ? 'Income' : 'Expense'}, ${formatCurrency(transaction.amount)}, on ${getReadableDate(transaction.date)}`}
  >
    <div className="transaction-info">
      <h3>{transaction.description}</h3>
      <p className="transaction-date">{getReadableDate(transaction.date)}</p>
    </div>
    <div className="transaction-amount">
      <span className={`amount ${transaction._recordType === 'income' ? 'income' : 'expense'}`}>
        {transaction._recordType === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
      </span>
      <span className={`badge ${transaction._recordType}`}>{transaction._recordType === 'income' ? 'Income' : 'Expense'}</span>
    </div>
    <div className="transaction-actions">
      <button
        onClick={() => handleEdit(transaction)}
        className="btn-edit"
        title="Edit record"
        aria-label="Edit Record"
      >
        <span role="img" aria-label="Edit">✏️</span>
      </button>
      <button
        onClick={() => handleDelete(transaction._id, transaction._recordType)}
        className="btn-delete"
        title="Delete record"
        aria-label="Delete Record"
      >
        <span role="img" aria-label="Delete">🗑️</span>
      </button>
    </div>
  </div>
);

export default TransactionItem; 