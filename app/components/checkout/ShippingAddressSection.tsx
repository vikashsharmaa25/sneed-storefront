import { HelpCircle } from 'lucide-react';

interface ShippingAddressSectionProps {
  country: string;
  setCountry: (country: string) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  company: string;
  setCompany: (company: string) => void;
  addressLine1: string;
  setAddressLine1: (addr: string) => void;
  addressLine2: string;
  setAddressLine2: (addr: string) => void;
  city: string;
  setCity: (city: string) => void;
  stateName: string;
  setStateName: (state: string) => void;
  postalCode: string;
  setPostalCode: (postalCode: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
}

export function ShippingAddressSection({
  country,
  setCountry,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  company,
  setCompany,
  addressLine1,
  setAddressLine1,
  addressLine2,
  setAddressLine2,
  city,
  setCity,
  stateName,
  setStateName,
  postalCode,
  setPostalCode,
  phone,
  setPhone,
}: ShippingAddressSectionProps) {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-3">Shipping address</h2>

      <div className="space-y-3">
        {/* Country */}
        <div>
          <label htmlFor="country-select" className="block text-[11px] text-gray-500 font-semibold mb-1 uppercase tracking-wider">
            Country/Region
          </label>
          <select
            id="country-select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        {/* Names */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="First name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Company */}
        <input
          type="text"
          placeholder="Company (optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        {/* Address */}
        <div className="relative">
          <input
            type="text"
            placeholder="Address"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none pr-10"
          />
          <span className="absolute right-3 top-3 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
        </div>

        {/* Apartment */}
        <input
          type="text"
          placeholder="Apartment, suite, etc. (optional)"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        {/* City, State, Zip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <select
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
          <input
            type="text"
            placeholder="ZIP code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none pr-10"
          />
          <span className="absolute right-3 top-3 text-gray-400 cursor-help" title="In case we need to contact you about delivery">
            <HelpCircle className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
