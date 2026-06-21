import React from 'react';
import Invoice from './Invoice';

function InvoicePreview({
  billedTo, date, invoiceNo, items, subtotal, cgst, sgst, totalWithTax,
  paymentInfo, footerNote, contact,
  logoUrl, signatureUrl,
}) {
  return (
    <section className="preview-card">
      <div className="preview-label">📋 Invoice Preview</div>
      <Invoice
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
    </section>
  );
}

export default InvoicePreview;