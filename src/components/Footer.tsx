import React from 'react';
import { Heart, Shield, TrendingUp } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <Heart className="h-5 w-5 text-[#C640FF]" />
              <span className="font-medium text-[#C640FF]">Built for Drivers</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering rideshare drivers with transparent financial insights 
              to make better decisions on every trip.
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-[#C640FF]" />
              <span className="font-medium text-[#C640FF]">Privacy First</span>
            </div>
            <p className="text-sm text-gray-400">
              All calculations are performed locally. Your trip data 
              never leaves your device.
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-[#C640FF]" />
              <span className="font-medium text-[#C640FF]">Maximize Earnings</span>
            </div>
            <p className="text-sm text-gray-400">
              Smart calculations help you understand true profitability 
              and optimize your driving strategy.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Karnue Kalculator. Built with integrity for the rideshare community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;