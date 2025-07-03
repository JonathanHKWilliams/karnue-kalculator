export interface TripInputs {
  grossFare: number;
  pickupDistance: number;
  tripDistance: number;
  returnDistance: number;
  autoReturn: boolean;
  tripTime: number;
  gasPrice: number;
  wearTearRate: number;
}

export interface CalculationResults {
  totalMiles: number;
  paidMiles: number;
  totalTime: number;
  fuelCost: number;
  wearTearCost: number;
  totalCosts: number;
  netProfit: number;
  hourlyWage: number;
  irsDeduction: number;
  irsNetProfit: number;
}