import React from 'react';
import { Calculator } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#00009A] rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Karnue Kalculator
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#C640FF]/10 rounded-full">
              <span className="text-sm font-medium text-[#C640FF]">
                Smart Profit Calculator
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-300">
              Make informed driving decisions
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;