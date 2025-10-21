'use client';

import { useEffect } from 'react';

export default function SuccessPage() {
  useEffect(() => {
    // Redirect to your app's success URL
    window.location.href = 'yourapp://payment/success';
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p>Returning to app...</p>
    </div>
  );
}
