import React, { useState, useMemo } from 'react'
import InvoiceForm from './components/InvoiceForm'
import InvoicePreview from './components/InvoicePreview'

// Default data (matches your screenshot)
const DEFAULT_ITEMS = [
  { id: 1, description: 'Balaji Keychains', quantity: 15, price: 35 },
  { id: 2, description: 'Wooden Doll Keychains', quantity: 12, price: 30 },
  { id: 3, description: 'Mini Friends Key Chain Pack', quantity: 12, price: 30 },
];

const DEFAULT_STATE = {
  billedTo: `Komuravelli Praneetha\nC-403, Vertex pride apartment\nJai bharatnager, NIZAMPET road,\nnear jntu metro station, Kukatpally\nHyderabad, 500085\n+91 9492420766`,
  date: '15 June, 2026',
  invoiceNo: 'ORD-20260615-0002',
  items: DEFAULT_ITEMS,
  paymentInfo: `- Union Bank of India\n- Account Name: AKINA PAVANKALYAN\n- Account No: 191612010003116`,
  footerNote: 'ALL THE ABOVE TOYS ARE MADE UP OF ANKUDU WOOD (Ivory Wood)',
  contact: '+91 9154884214\nEtikoppaka, 531082, AP, India\nwww.etikoppakatoys.store',
};

const DEFAULT_LOGO = '/logo.png';
const DEFAULT_SIGNATURE = '/signature.png';

function App() {
  const [billedTo, setBilledTo] = useState(DEFAULT_STATE.billedTo);
  const [date, setDate] = useState(DEFAULT_STATE.date);
  const [invoiceNo, setInvoiceNo] = useState(DEFAULT_STATE.invoiceNo);
  const [items, setItems] = useState(DEFAULT_STATE.items);
  const [paymentInfo, setPaymentInfo] = useState(DEFAULT_STATE.paymentInfo);
  const [footerNote, setFooterNote] = useState(DEFAULT_STATE.footerNote);
  const [contact, setContact] = useState(DEFAULT_STATE.contact);
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO);
  const [signatureUrl, setSignatureUrl] = useState(DEFAULT_SIGNATURE);

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + (it.quantity || 0) * (it.price || 0), 0);
  }, [items]);

  // ---- GST Calculations ----
  const cgst = subtotal * 0.025;
  const sgst = subtotal * 0.025;
  const totalWithTax = subtotal + cgst + sgst;

  const updateItem = (id, field, value) => {
    setItems(prev =>
      prev.map(it =>
        it.id === id
          ? { ...it, [field]: field === 'quantity' || field === 'price' ? parseFloat(value) || 0 : value }
          : it
      )
    );
  };

  const removeItem = (id) => {
    if (items.length <= 1) return;
    setItems(prev => prev.filter(it => it.id !== id));
  };

  const addItem = () => {
    const maxId = items.reduce((max, it) => Math.max(max, it.id), 0);
    setItems(prev => [...prev, { id: maxId + 1, description: '', quantity: 1, price: 0 }]);
  };

  const resetAll = () => {
    setBilledTo(DEFAULT_STATE.billedTo);
    setDate(DEFAULT_STATE.date);
    setInvoiceNo(DEFAULT_STATE.invoiceNo);
    setItems(DEFAULT_STATE.items.map(it => ({ ...it })));
    setPaymentInfo(DEFAULT_STATE.paymentInfo);
    setFooterNote(DEFAULT_STATE.footerNote);
    setContact(DEFAULT_STATE.contact);
    setLogoUrl(DEFAULT_LOGO);
    setSignatureUrl(DEFAULT_SIGNATURE);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          📄 Invoice Generator
          <span>v2</span>
          <small>real‑time preview</small>
        </h1>
        <div className="header-actions">
          <button className="btn-reset" onClick={resetAll}>↺ Reset</button>
          <button className="btn-print" onClick={() => window.print()}>🖨️ Print</button>
        </div>
      </header>

      <div className="dashboard">
        <InvoiceForm
          billedTo={billedTo}
          setBilledTo={setBilledTo}
          date={date}
          setDate={setDate}
          invoiceNo={invoiceNo}
          setInvoiceNo={setInvoiceNo}
          items={items}
          updateItem={updateItem}
          removeItem={removeItem}
          addItem={addItem}
          subtotal={subtotal}
          paymentInfo={paymentInfo}
          setPaymentInfo={setPaymentInfo}
          footerNote={footerNote}
          setFooterNote={setFooterNote}
          contact={contact}
          setContact={setContact}
          logoUrl={logoUrl}
          setLogoUrl={setLogoUrl}
          signatureUrl={signatureUrl}
          setSignatureUrl={setSignatureUrl}
        />
        <InvoicePreview
          billedTo={billedTo}
          date={date}
          invoiceNo={invoiceNo}
          items={items}
          subtotal={subtotal}
          cgst={cgst}
          sgst={sgst}
          totalWithTax={totalWithTax}
          paymentInfo={paymentInfo}
          footerNote={footerNote}
          contact={contact}
          logoUrl={logoUrl}
          signatureUrl={signatureUrl}
        />
      </div>
    </div>
  );
}

export default App;