import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock, Car, Calculator } from 'lucide-react';
import { CalculationResults } from '../types';

interface ResultsProps {
  results: CalculationResults;
}

const Results: React.FC<ResultsProps> = ({ results }) => {
  const isProfitable = results.netProfit > 0;
  const profitColor = isProfitable ? 'text-black-600' : 'text-black-600';
  const profitBg = isProfitable ? 'bg-gray-100' : 'bg-gray-100';
  const profitIcon = isProfitable ? TrendingUp : TrendingDown;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Main Results */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${profitBg}`}>
            {React.createElement(profitIcon, { className: `h-5 w-5 ${profitColor}` })}
          </div>
          <h2 className="text-xl font-bold text-gray-900">Trip Summary</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Net Profit */}
          <div className={`p-4 rounded-lg ${profitBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className={`text-2xl font-bold ${profitColor}`}>
                  {formatCurrency(results.netProfit)}
                </p>
              </div>
              <DollarSign className={`h-8 w-8 ${profitColor}`} />
            </div>
          </div>

          {/* Hourly Wage */}
          <div className="p-4 bg-[#00009A]/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hourly Wage</p>
                <p className="text-2xl font-bold text-black">
                  {formatCurrency(results.hourlyWage)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-black" />
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Breakdown</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-[#F0F0F0] rounded-lg">
              <Car className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Miles</p>
              <p className="text-lg font-semibold text-gray-900">
                {results.totalMiles.toFixed(1)}
              </p>
            </div>

            <div className="text-center p-3 bg-[#F0F0F0] rounded-lg">
              <Clock className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total Time</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatTime(results.totalTime)}
              </p>
            </div>

            <div className="text-center p-3 bg-[#F0F0F0] rounded-lg">
              <DollarSign className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Fuel Cost</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(results.fuelCost)}
              </p>
            </div>

            <div className="text-center p-3 bg-[#F0F0F0] rounded-lg">
              <Calculator className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Wear & Tear</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(results.wearTearCost)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* IRS Comparison */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#C640FF]/10 rounded-lg">
            <Calculator className="h-5 w-5 text-[#C640FF]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">IRS Standard Rate</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-black rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">IRS Deduction</p>
                <p className="text-2xl font-bold text-[#C640FF]">
                  {formatCurrency(results.irsDeduction)}
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  @ $0.655 per mile
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-[#C640FF]" />
            </div>
          </div>

          <div className="p-4 bg-black rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">IRS Net Profit</p>
                <p className={`text-2xl font-bold ${results.irsNetProfit > 0 ? 'text-[#C640FF]' : 'text-[#C640FF]'}`}>
                  {formatCurrency(results.irsNetProfit)}
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  For tax purposes
                </p>
              </div>
              {results.irsNetProfit > 0 ? (
                <TrendingUp className="h-8 w-8 text-[#C640FF]" />
              ) : (
                <TrendingDown className="h-8 w-8 text-[#C640FF]" />
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-[#F0F0F0] rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> The IRS standard mileage rate includes gas, oil, repairs, tire replacements, 
            insurance, vehicle registration fees, and depreciation. This rate is useful for tax deductions 
            and comparing your actual costs to the government standard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;