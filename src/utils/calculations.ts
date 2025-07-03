import { TripInputs, CalculationResults } from '../types';

// IRS standard mileage rate for 2024
const IRS_RATE = 0.655;

// Average fuel efficiency (miles per gallon)
const AVERAGE_MPG = 25;

export function calculateProfitability(inputs: TripInputs): CalculationResults {
  const {
    grossFare,
    pickupDistance,
    tripDistance,
    returnDistance,
    autoReturn,
    tripTime,
    gasPrice,
    wearTearRate,
  } = inputs;

  // Calculate distances
  const actualReturnDistance = autoReturn ? tripDistance : returnDistance;
  const totalMiles = pickupDistance + tripDistance + actualReturnDistance;
  const paidMiles = tripDistance;

  // Calculate costs
  const fuelCost = (totalMiles / AVERAGE_MPG) * gasPrice;
  const wearTearCost = totalMiles * wearTearRate;
  const totalCosts = fuelCost + wearTearCost;

  // Calculate profits
  const netProfit = grossFare - totalCosts;
  const hourlyWage = tripTime > 0 ? (netProfit / tripTime) * 60 : 0;

  // IRS calculations
  const irsDeduction = totalMiles * IRS_RATE;
  const irsNetProfit = grossFare - irsDeduction;

  return {
    totalMiles,
    paidMiles,
    totalTime: tripTime,
    fuelCost,
    wearTearCost,
    totalCosts,
    netProfit,
    hourlyWage,
    irsDeduction,
    irsNetProfit,
  };
}