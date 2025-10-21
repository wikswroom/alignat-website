'use client';

import { useEffect } from 'react';

export default function CancelPage() {
  useEffect(() => {
    // Redirect to your app's cancel URL
    window.location.href = 'yourapp://payment/cancel';
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p>Returning to app...</p>
    </div>
  );
}
