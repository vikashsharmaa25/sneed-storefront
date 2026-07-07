import { useState, useEffect } from 'react';
import { useCart } from '~/lib/cart-context';
import { useAuth } from '~/lib/auth-context';
import { placeOrder } from '~/lib/api/orders.client';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

// Component imports
import { EmptyCheckout } from '~/components/checkout/EmptyCheckout';
import { CheckoutHeader } from '~/components/checkout/CheckoutHeader';
import { ContactSection } from '~/components/checkout/ContactSection';
import { ShippingAddressSection } from '~/components/checkout/ShippingAddressSection';
import { OrderSummary } from '~/components/checkout/OrderSummary';

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [emailOffers, setEmailOffers] = useState(true);
  const [country, setCountry] = useState('United States');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  // Prefill email from Firebase auth user
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  // Calculate totals
  const subtotal = totalPrice;
  const tax = subtotal * 0.18; // 18% GST/Tax
  const shippingCost = 0; // Free shipping
  const grandTotal = subtotal + shippingCost + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload = {
      customerEmail: email,
      customerFirstName: firstName,
      customerLastName: lastName,
      phone,
      currency: 'USD',
      shippingMethod: 'Standard Shipping',
      shippingCost,
      shippingAddress: {
        addressLine1,
        addressLine2: addressLine2 || '',
        city,
        state: stateName,
        postalCode,
        country,
      },
      billingAddress: {
        addressLine1,
        addressLine2: addressLine2 || '',
        city,
        state: stateName,
        postalCode,
        country,
      },
      items: items.map((item) => ({
        productId: item.product_id,
        productVariantId: item.product_variant_id,
        quantity: item.quantity,
      })),
    };

    try {
      await placeOrder(payload);
      toast.success('Order placed successfully!');
      await clearCart();
      void navigate('/');
    } catch (err: any) {
      console.error('Order placement failed:', err);
      const msg = err?.message || 'Failed to place order. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return <EmptyCheckout />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Left Column - Form inputs */}
        <div className="lg:col-span-7 px-4 py-8 sm:px-8 lg:px-16 lg:py-12 flex flex-col items-end border-r border-gray-200">
          <div className="max-w-xl w-full">
            {/* Header / Brand Logo & Breadcrumbs */}
            <CheckoutHeader />

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={(e) => { void handleSubmit(e); }} className="space-y-6">
              {/* Contact section */}
              <ContactSection
                email={email}
                setEmail={setEmail}
                emailOffers={emailOffers}
                setEmailOffers={setEmailOffers}
                user={user}
              />

              {/* Shipping Address section */}
              <ShippingAddressSection
                country={country}
                setCountry={setCountry}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                company={company}
                setCompany={setCompany}
                addressLine1={addressLine1}
                setAddressLine1={setAddressLine1}
                addressLine2={addressLine2}
                setAddressLine2={setAddressLine2}
                city={city}
                setCity={setCity}
                stateName={stateName}
                setStateName={setStateName}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
                phone={phone}
                setPhone={setPhone}
              />

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-8">
                <Link
                  to="/cart"
                  className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return to cart
                </Link>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#1877f2] hover:bg-[#166fe5] text-white text-sm font-semibold py-3 px-6 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2 shadow-xs"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <OrderSummary
          items={items}
          totalItems={totalItems}
          subtotal={subtotal}
          tax={tax}
          shippingCost={shippingCost}
          grandTotal={grandTotal}
        />
      </div>
    </div>
  );
}
