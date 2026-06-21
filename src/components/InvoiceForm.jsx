import React, { useRef } from 'react';

function InvoiceForm({
  billedTo, setBilledTo,
  date, setDate,
  invoiceNo, setInvoiceNo,
  items, updateItem, removeItem, addItem,
  subtotal,
  cgst,           // 👈 new
  sgst,           // 👈 new
  totalWithTax,   // 👈 new
  paymentInfo, setPaymentInfo,
  footerNote, setFooterNote,
  contact, setContact,
  logoUrl, setLogoUrl,
  signatureUrl, setSignatureUrl,
}) {
  const logoInputRef = useRef(null);
  const sigInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setSignatureUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoUrl(null);
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  const removeSignature = () => {
    setSignatureUrl(null);
    if (sigInputRef.current) sigInputRef.current.value = '';
  };

  return (
    <section className="form-card">
      <h2>⚙️ Invoice Details</h2>

      {/* LOGO UPLOAD */}
      <div className="form-group">
        <label>Company Logo</label>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            style={{ flex: 1, padding: '8px 0' }}
          />
          {logoUrl && (
            <button type="button" onClick={removeLogo} className="remove-file-btn">✕ Remove</button>
          )}
        </div>
        {logoUrl && (
          <div style={{ marginTop: '8px' }}>
            <img src={logoUrl} alt="Logo preview" style={{ maxHeight: '60px', maxWidth: '100%', borderRadius: '8px' }} />
          </div>
        )}
      </div>

      {/* SIGNATURE UPLOAD */}
      <div className="form-group">
        <label>Authorised Signatory (Signature)</label>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            ref={sigInputRef}
            type="file"
            accept="image/*"
            onChange={handleSignatureUpload}
            style={{ flex: 1, padding: '8px 0' }}
          />
          {signatureUrl && (
            <button type="button" onClick={removeSignature} className="remove-file-btn">✕ Remove</button>
          )}
        </div>
        {signatureUrl && (
          <div style={{ marginTop: '8px' }}>
            <img src={signatureUrl} alt="Signature preview" style={{ maxHeight: '50px', maxWidth: '180px', borderRadius: '4px' }} />
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Billed To</label>
        <textarea
          rows="5"
          value={billedTo}
          onChange={(e) => setBilledTo(e.target.value)}
          placeholder="Name, address, phone…"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Date</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="15 June, 2026"
          />
        </div>
        <div className="form-group">
          <label>Invoice No.</label>
          <input
            type="text"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
            placeholder="ORD-20260615-0002"
          />
        </div>
      </div>

      <div className="items-section">
        <div className="items-header">
          <h3>📦 Line Items</h3>
          <span className="badge">{items.length}</span>
        </div>

        {items.map((item) => (
          <div key={item.id} className="item-row">
            <input
              type="text"
              value={item.description}
              onChange={(e) => updateItem(item.id, 'description', e.target.value)}
              placeholder="Description"
            />
            <input
              type="number"
              min="0"
              step="1"
              value={item.quantity || ''}
              onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
              placeholder="Qty"
            />
            <input
              type="number"
              min="0"
              step="1"
              value={item.price || ''}
              onChange={(e) => updateItem(item.id, 'price', e.target.value)}
              placeholder="Price"
            />
            <button
              className="remove-btn"
              onClick={() => removeItem(item.id)}
              disabled={items.length <= 1}
            >
              ✕
            </button>
          </div>
        ))}

        <button className="add-item-btn" onClick={addItem}>+ Add item</button>
      </div>

      {/* TOTALS – now with CGST & SGST */}
      <div className="totals-form">
        <div className="total-line-form">
          <span>Subtotal</span>
          <span className="amount">₹ {subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="total-line-form">
          <span>CGST (2.5%)</span>
          <span className="amount">₹ {cgst.toLocaleString('en-IN')}</span>
        </div>
        <div className="total-line-form">
          <span>SGST (2.5%)</span>
          <span className="amount">₹ {sgst.toLocaleString('en-IN')}</span>
        </div>
        <div className="total-line-form total-final">
          <span>Grand Total</span>
          <span className="amount">₹ {totalWithTax.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '18px' }}>
        <label>Payment Information</label>
        <textarea
          rows="3"
          value={paymentInfo}
          onChange={(e) => setPaymentInfo(e.target.value)}
          placeholder="- Union Bank&#10;- Account Name: ..."
        />
      </div>

      <div className="form-group">
        <label>Footer Note</label>
        <input
          type="text"
          value={footerNote}
          onChange={(e) => setFooterNote(e.target.value)}
          placeholder="ALL THE ABOVE TOYS ARE MADE UP OF ANKUDU WOOD"
        />
      </div>

      <div className="form-group">
        <label>Contact / Footer</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="+91 9154884214 Etikoppaka..."
        />
      </div>
    </section>
  );
}

export default InvoiceForm;