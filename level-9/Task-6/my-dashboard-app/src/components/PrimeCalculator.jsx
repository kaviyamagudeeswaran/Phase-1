import React, { useMemo } from "react";

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const PrimeCalculator = ({ limit }) => {
  const primeNumbers = useMemo(() => {
    console.log("Calculating Prime Numbers...");
    let primes = [];
    for (let i = 2; i <= limit; i++) {
      if (isPrime(i)) primes.push(i);
    }
    return primes;
  }, [limit]);

  return (
    <div>
      <h3>Prime Numbers up to {limit}:</h3>
      <p className="result">{primeNumbers.length} primes found.</p>
    </div>
  );
};

export default PrimeCalculator;
