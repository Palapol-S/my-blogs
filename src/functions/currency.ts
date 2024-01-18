export interface ICurrencyFunctions {
	format(
		number: number,
		locale?: string,
		options?: Intl.NumberFormatOptions
	): string;
}

export const currency: ICurrencyFunctions = {
	// Define the 'currency' object which implements ICurrencyFunctions interface
	format(
		number,
		locale = "th-TH",
		options = {
			style: "currency",
			currency: "THB",
		}
	) {
		// Start defining the 'format' function

		try {
			// Format the 'number' using the provided locale and options and return the result
			return new Intl.NumberFormat(locale, options).format(number);
		} catch (error) {
			// If an error occurs during the try block (e.g., unexpected errors), catch the error here.
			// Log the error message to the console for debugging purposes.
			console.error("Error formatting currency:", error);

			// Return an empty string to indicate that an error occurred during currency formatting.
			return "";
		}
	},
};
