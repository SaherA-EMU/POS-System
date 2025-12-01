import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Html&Css/style/TransactionHistory.css";

export default function TransactionHistory() {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/sales/history")
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="transaction-page">
      <button
        className="transaction-back"
        onClick={() => navigate("/SalesMenu")}
      >
        Back
      </button>

      <h2 className="transaction-title">Transaction History</h2>

      <div className="transaction-container">
        <div className="transaction-header">
          <span>Sale #</span>
          <span>Date</span>
          <span>Payment</span>
          <span>Total</span>
        </div>

        <div className="transaction-list">
          {sales.length === 0 && (
            <p className="empty-msg">No transactions found.</p>
          )}

          {sales.map(sale => (
            <div key={sale.sale_id} className="transaction-row">
              <span>{sale.sale_id}</span>
              <span>{new Date(sale.sale_date).toLocaleString()}</span>
              <span>{sale.payment_mmethod || sale.payment_type}</span>
              <span>${Number(sale.total_amount).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
