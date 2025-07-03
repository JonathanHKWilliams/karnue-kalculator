import { useState } from 'react';
import Header from './components/Header';
import Calculator from './components/Calculator';
import Results from './components/Results';
import Footer from './components/Footer';
import { CalculationResults } from './types';

function App() {
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

  const handleResultsChange = (newResults: CalculationResults) => {
    setResults(newResults);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Calculate Your Trip Profitability
          </h2>
          <p className="text-lg text-gray-600">
            Enter your trip details to see your true earnings after all costs. 
            Make data-driven decisions for every ride.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Calculator onResultsChange={handleResultsChange} />
          </div>
          
          <div className="space-y-6">
            <Results results={results} />
          </div>
        </div>

        {/* How it Works Section */}
        <div className="mt-12 bg-white rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Real Cost Calculation</h4>
              <p className="text-sm text-gray-600">
                We calculate your actual costs including fuel consumption based on average MPG, 
                wear and tear on your vehicle, and unpaid miles for pickup and return trips.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">IRS Standard Rate</h4>
              <p className="text-sm text-gray-600">
                Compare your actual costs to the IRS standard mileage rate of $0.655 per mile, 
                which includes all vehicle expenses and is useful for tax planning.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Return Trip Options</h4>
              <p className="text-sm text-gray-600">
                Toggle between automatic calculation (assuming you return to your starting point) 
                or manual entry for custom return distances.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Real-Time Updates</h4>
              <p className="text-sm text-gray-600">
                All calculations update instantly as you type, giving you immediate feedback 
                on trip profitability and hourly earnings.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;