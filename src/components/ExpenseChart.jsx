import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ExpenseChart = ({ monthlyIncomeExpenses, hasIncome, hasExpense, isMobile, showChart, setShowChart, formatCurrency }) => (
  <div className="chart-container">
    <div className="chart-header">
      <h2 style={{marginTop:"15git branch -M maingit branch -M mainpx"}}>Monthly Income & Expenses ({new Date().getFullYear()})</h2>
      {isMobile && (
        <button className="chart-toggle" onClick={() => setShowChart(!showChart)} aria-label="Toggle Chart">
          {showChart ? 'Hide Chart' : 'Show Chart'}
        </button>
      )}
    </div>
    {(!isMobile || showChart) && (
      <div className="chart-wrapper">
        {(hasIncome || hasExpense) ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyIncomeExpenses} barGap={8} barCategoryGap={20}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [formatCurrency(value), name === 'totalIncome' ? 'Income' : name === 'totalExpense' ? 'Expense' : name]}
                labelFormatter={(label) => `${label} ${new Date().getFullYear()}`}
              />
              <Legend verticalAlign="top" iconType="circle"/>
              <Bar dataKey="totalIncome" fill="#38a169" name="Income" radius={[8, 8, 0, 0]} isAnimationActive={true} />
              <Bar dataKey="totalExpense" fill="#ef4444" name="Expense" radius={[8, 8, 0, 0]} isAnimationActive={true} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="empty-state chart-empty">
            <p>No income or expenses to display for this year. Add transactions to see your chart!</p>
          </div>
        )}
      </div>
    )}
  </div>
);

export default ExpenseChart; 