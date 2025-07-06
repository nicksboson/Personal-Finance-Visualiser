const SummaryCard = ({ totalIncome, totalExpense, netBalance, formatCurrency }) => (
  <section className="summary-section" aria-label="Summary">
    <div className="summary-card">
      <div className="summary-item">
        <span className="summary-label">Total Income</span>
        <span className="summary-value income">{formatCurrency(totalIncome)}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Total Expenses</span>
        <span className="summary-value expense">{formatCurrency(totalExpense)}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Net Balance</span>
        <span className={`summary-value ${netBalance >= 0 ? 'income' : 'expense'}`}>{netBalance >= 0 ? '+' : '-'}{formatCurrency(Math.abs(netBalance))}</span>
      </div>
    </div>
  </section>
);

export default SummaryCard; 