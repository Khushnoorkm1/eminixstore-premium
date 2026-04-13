import React from 'react';
import { Construction } from 'lucide-react';

export default function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
      <div className="h-24 w-24 bg-gold-50 dark:bg-gold-900/20 rounded-full flex items-center justify-center">
        <Construction className="h-12 w-12 text-gold-500" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400 font-light max-w-md mx-auto">
          We are currently refining this section to provide you with the most powerful management tools. Check back soon.
        </p>
      </div>
      <button className="bg-teal-800 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-800/20">
        Go to Dashboard
      </button>
    </div>
  );
}
