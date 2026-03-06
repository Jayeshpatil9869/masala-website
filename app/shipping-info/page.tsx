export const metadata = {
  title: 'Shipping Info | Gurukrupa Gruh Udyog',
  description: 'Shipping Information for Gurukrupa Gruh Udyog.',
};

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen bg-brand-cream/40 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-6">Shipping Info</h1>
          <div className="w-16 h-1 bg-brand-orange rounded-full mb-8"></div>
          <div className="prose prose-lg text-gray-600 font-body max-w-none space-y-6">
            <p>
              At <strong>Gurukrupa Gruh Udyog</strong>, we currently operate primarily as a prominent manufacturer and supplier for retail outlets and wholesale distributors across Maharashtra and surrounding regions.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">1. Direct-to-Consumer Shipping</h2>
            <p>
              For individual customers seeking our rich and pure spices, we handle orders and direct shipping inquiries on a case-by-case basis through our dedicated consumer WhatsApp line. Because we deal in varying weights, fragile packaging, and distances, exact shipping costs will be calculated and provided accurately by our team before you confirm your order and make any payment.
            </p>

            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">2. Wholesale & Bulk Shipping</h2>
            <p>
              If you are a retailer, distributor, or a restaurant looking to procure bulk quantities, we have an established logistics network capable of fulfilling vast wholesale requirements. Our standard dispatch time for bulk orders is <strong>3 to 5 business days</strong> following payment confirmation to ensure freshly ground stock is prepared. Shipping terms are Ex-Works (EXW) from our Malegaon facility, unless individually negotiated.
            </p>

            <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">3. Delivery Areas</h2>
            <p>
              Currently, we facilitate strong logistics across Maharashtra state, with expanding routes throughout India for wholesale partners. We do not support international delivery at this time.
            </p>
            
            <hr className="my-8 border-gray-100" />
            
            <p className="text-sm">
              For any rapid logistics and exact quote questions based on your pin code, contact our dispatch team at <a href="tel:+919657586213" className="font-bold text-brand-orange hover:underline">+91 9657586213</a>.
            </p>          </div>
        </div>
      </div>
    </div>
  );
}
