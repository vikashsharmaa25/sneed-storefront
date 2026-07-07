import { useAuth } from '~/lib/auth-context';

interface ContactSectionProps {
  email: string;
  setEmail: (email: string) => void;
  emailOffers: boolean;
  setEmailOffers: (offers: boolean) => void;
  user: any;
}

export function ContactSection({
  email,
  setEmail,
  emailOffers,
  setEmailOffers,
  user,
}: ContactSectionProps) {
  const { openAuthModal } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium text-gray-900">Contact</h2>
        {!user && (
          <button 
            type="button" 
            onClick={() => openAuthModal('login')} 
            className="text-xs text-blue-600 hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Sign in
          </button>
        )}
      </div>
      <div className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
        />
        <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={emailOffers}
            onChange={(e) => setEmailOffers(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
          />
          Email me with news and offers
        </label>
      </div>
    </div>
  );
}
