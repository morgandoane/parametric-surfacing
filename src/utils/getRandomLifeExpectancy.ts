export function getRandomLifeExpectancy(): number {
	// Example mortality rates for each 5-year age bracket, replace with real data for accuracy
	const mortalityRates = [
		0.0001, // 0-4 years
		0.001, // 5-9 years
		0.001, // 10-14 years
		0.001, // 15-19 years
		0.002, // 20-24 years
		0.003, // 25-29 years
		0.004, // 30-34 years
		0.005, // 35-39 years
		0.007, // 40-44 years
		0.01, // 45-49 years
		0.015, // 50-54 years
		0.02, // 55-59 years
		0.03, // 60-64 years
		0.05, // 65-69 years
		0.07, // 70-74 years
		0.1, // 75-79 years
		0.15, // 80-84 years
		0.25, // 85-89 years
		0.4, // 90-94 years
		0.6, // 95-99 years
		0.8, // 100-104 years
		1.0, // 105+ years, guaranteed passing
	];

	let currentAge = 0;

	for (const rate of mortalityRates) {
		// Check if the individual passes away in this 5-year age bracket
		if (Math.random() < rate) {
			// Return a random age within this 5-year bracket
			return currentAge + Math.floor(Math.random() * 5);
		}
		// Increment the age bracket by 5 years if they survive this one
		currentAge += 5;
	}

	// If all brackets are survived, return the final age
	return currentAge;
}
