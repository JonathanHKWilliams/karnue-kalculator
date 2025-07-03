import React, { useState, useEffect } from 'react';
import { Car, DollarSign, Clock, Fuel, Calculator as CalcIcon, Info } from 'lucide-react';
import { TripInputs, CalculationResults } from '../types';
import { calculateProfitability } from '../utils/calculations';

interface CalculatorProps {
  onResultsChange: (results: CalculationResults) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onResultsChange }) => {
  const [inputs, setInputs] = useState<TripInputs>({
    grossFare: 0,
    pickupDistance: 0,
    tripDistance: 0,
    returnDistance: 0,
    autoReturn: true,
    tripTime: 0,
    gasPrice: 3.50,
    wearTearRate: 0.23,
  });

  const [results, setResults] = useState<CalculationResults>({
    totalMiles: 0,
    paidMiles: 0,
    totalTime: 0,
    fuelCost: 0,
    wearTearCost: 0,
    totalCosts: 0,
    netProfit: 0,
    hourlyWage: 0,
    irsDeduction: 0,
    irsNetProfit: 0,
  });

  useEffect(() => {
    const newResults = calculateProfitability(inputs);
    setResults(newResults);
    onResultsChange(newResults);
  }, [inputs, onResultsChange]);

  const handleInputChange = (field: keyof TripInputs, value: number | boolean) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAutoReturnToggle = () => {
    const newAutoReturn = !inputs.autoReturn;
    setInputs(prev => ({
      ...prev,
      autoReturn: newAutoReturn,
      returnDistance: newAutoReturn ? prev.tripDistance : prev.returnDistance
    }));
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#00009A]/10 rounded-lg">
          <CalcIcon className="h-5 w-5 text-[#00009A]" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Trip Calculator</h2>
      </div>

      <div className="space-y-6">
        {/* Trip Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Car className="h-4 w-4" />
            Trip Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Gross Fare
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  value={inputs.grossFare || ''}
                  onChange={(e) => handleInputChange('grossFare', parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00009A] focus:border-transparent bg-[#F0F0F0]"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Trip Time (minutes)
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  value={inputs.tripTime || ''}
                  onChange={(e) => handleInputChange('tripTime', parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00009A] focus:border-transparent bg-[#F0F0F0]"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Distance Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Distance Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Pickup Distance (miles)
              </label>
              <input
                type="number"
                step="0.1"
                value={inputs.pickupDistance || ''}
                onChange={(e) => handleInputChange('pickupDistance', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00009A] focus:border-transparent bg-[#F0F0F0]"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Trip Distance (miles)
              </label>
              <input
                type="number"
                step="0.1"
                value={inputs.tripDistance || ''}
                onChange={(e) => handleInputChange('tripDistance', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00009A] focus:border-transparent bg-[#F0F0F0]"
                placeholder="0.0"
              />
            </div>
          </div>

          {/* Return Trip Toggle */}
          <div className="p-4 bg-[#F0F0F0] rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium text-gray-700">Return Trip</h4>
                <button className="text-gray-400 hover:text-gray-600">
                  <Info className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAutoReturnToggle}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#00009A] focus:ring-offset-2 ${
                  inputs.autoReturn ? 'bg-[#00009A]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                    inputs.autoReturn ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <span>Auto-calculate return distance</span>
              {inputs.autoReturn && (
                <span className="text-[#00009A] font-medium">
                  ({inputs.tripDistance} miles)
                </span>
              )}
            </div>

            {!inputs.autoReturn && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Custom Return Distance (miles)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.returnDistance || ''}
                  onChange={(e) => handleInputChange('returnDistance', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00009A] focus:border-transparent bg-white"
                  placeholder="0.0"
                />
              </div>
            )}
          </div>
        </div>

        {/* Cost Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Fuel className="h-4 w-4" />
            Cost Settings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Gas Price per Gallon
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  value={inputs.gasPrice || ''}
                  onChange={(e) => handleInputChange('gasPrice', parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00009A] focus:border-transparent bg-[#F0F0F0]"
                  placeholder="3.50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Wear & Tear per Mile
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  value={inputs.wearTearRate || ''}
                  onChange={(e) => handleInputChange('wearTearRate', parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00009A] focus:border-transparent bg-[#F0F0F0]"
                  placeholder="0.23"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;