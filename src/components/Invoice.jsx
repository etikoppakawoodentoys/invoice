import React from 'react';

function Invoice({
  billedTo,
  date,
  invoiceNo,
  items,
  subtotal,
  cgst,
  sgst,
  totalWithTax,
  paymentInfo,
  footerNote,
  contact,
  logoUrl,
  signatureUrl,
}) {
  const formatCurrency = (val) => {
    if (val === 0 || val === undefined || val === null) return '₹ 0';
    return `₹ ${Number(val).toLocaleString('en-IN')}`;
  };

  return (
    <div className="invoice">
      <div className="invoice-header">
        <div className="invoice-brand" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Company Logo"
              style={{ maxHeight: '55px', maxWidth: '120px', objectFit: 'contain' }}
            />
          )}
          <div>
            <h2>INVOICE</h2>
            <div className="sub">Tax Invoice</div>
          </div>
        </div>
        <div className="invoice-meta">
          <div className="invoice-no">
            <span>INVOICE NO.</span> {invoiceNo || '—'}
          </div>
          <div className="date-text">
            <strong>DATE:</strong> {date || '—'}
          </div>
        </div>
      </div>

      <div className="invoice-body">
        <div className="invoice-billed">
          <div className="label">BILLED TO:</div>
          <div className="value">{billedTo || '—'}</div>
        </div>

        <div className="invoice-table-wrap">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>DESCRIPTION</th>
                <th style={{ textAlign: 'center' }}>QUANTITY</th>
                <th style={{ textAlign: 'right' }}>PRICE</th>
                <th style={{ textAlign: 'right' }}>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan="4">No items added</td>
                </tr>
              ) : (
                items.map((item) => {
                  const total = (item.quantity || 0) * (item.price || 0);
                  return (
                    <tr key={item.id}>
                      <td>{item.description || '—'}</td>
                      <td style={{ textAlign: 'center' }}>{item.quantity || 0}</td>
                      <td style={{ textAlign: 'right' }}>{formatCurrency(item.price)}</td>
                      <td style={{ textAlign: 'right' }}>{formatCurrency(total)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="invoice-totals">
          <div className="inv-total-line">
            <span>Subtotal:</span>
            <span className="amount">{formatCurrency(subtotal)}</span>
          </div>
          <div className="inv-total-line">
            <span>CGST (2.5%):</span>
            <span className="amount">{formatCurrency(cgst)}</span>
          </div>
          <div className="inv-total-line">
            <span>SGST (2.5%):</span>
            <span className="amount">{formatCurrency(sgst)}</span>
          </div>
          <div className="inv-total-line grand">
            <span>Grand Total:</span>
            <span className="amount">{formatCurrency(totalWithTax)}</span>
          </div>
        </div>

        {/* SIGNATURE */}
        <div className="invoice-signature">
          <div className="sig-label">Authorised Signatory</div>
          {signatureUrl ? (
            <img src={signatureUrl} alt="Signature" className="sig-image" />
          ) : (
            <div style={{ fontSize: '13px', color: '#9bb1c4', fontStyle: 'italic' }}>— upload signature —</div>
          )}
          <div className="sig-name" style={{ fontWeight: '700', fontSize: '14px' }}>
            Akina Pavan Kalyan
          </div>
        </div>

        {paymentInfo && (
          <div className="invoice-payment">
            <div className="pay-label">PAYMENT INFORMATION</div>
            <div className="pay-content">{paymentInfo}</div>
          </div>
        )}

        {footerNote && (
          <div className="invoice-footer-note">{footerNote}</div>
        )}

        <div className="invoice-footer">
          <div className="thankyou">THANK YOU FOR YOUR BUSINESS</div>
          <div className="contact" style={{ whiteSpace: 'pre-line', lineHeight: '2.0' }}>
            {contact || '—'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;