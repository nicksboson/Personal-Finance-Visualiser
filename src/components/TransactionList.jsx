import TransactionItem from './TransactionItem';

const TransactionList = ({ sortedTransactions, formatCurrency, getReadableDate, handleEdit, handleDelete }) => (
  <div className="transactions-container">
    <h2>Recent Records</h2>
    {sortedTransactions.length === 0 ? (
      <div className="empty-state">
        <p>No records yet. Add your first income or expense above!</p>
      </div>
    ) : (
      <div className="transactions-list">
        {sortedTransactions.map((transaction) => (
          <TransactionItem
            key={transaction._id}
            transaction={transaction}
            formatCurrency={formatCurrency}
            getReadableDate={getReadableDate}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    )}
  </div>
);

export default TransactionList; 