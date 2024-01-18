export interface IDateFunctions {
	format(
		date: Date,
		locale?: string,
		options?: Intl.DateTimeFormatOptions
	): string | undefined;
}

export const optionDate: IDateFunctions = {
	// Define the 'optionDate' object which implements IDateFunctions interface
	format(
		date,
		locale = "th-TH",
		options = {
			day: "2-digit",
			month: "long",
			year: "numeric",
		}
	): string | undefined {
		// Start defining the 'format' function

		try {
			// Check if the 'date' input is undefined or null and return undefined if so
			if (date == null) return undefined;

			// Check if the 'date' input is a string, and if so, attempt to format it as a Date object
			if (typeof date === "string") {
				return new Intl.DateTimeFormat(locale, options).format(new Date(date));
			}

			// If the 'date' input is not a string and it's not undefined, check if it's a valid Date object.
			// If it's not a valid Date object, it's considered an invalid date input, and we return undefined.
			if (isNaN(date.getTime())) return undefined;

			// If the 'date' input is a valid Date object, format it using the provided locale and options.
			return new Intl.DateTimeFormat(locale, options).format(date);
		} catch (error) {
			// If an error occurs during the try block (e.g., unexpected errors), catch the error here.
			// Log the error message to the console for debugging purposes.
			console.error("Error formatting date:", error);

			// Return undefined to indicate that an error occurred during date formatting.
			return undefined;
		}
	},
};
