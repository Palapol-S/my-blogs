export interface ISearchFunctions {
	find<T>(data: T[], select: (item: T) => boolean): T | undefined;
	filter<T>(data: T[], select: (item: T) => boolean): T[];
	some<T>(data: T[], select: (item: T) => boolean): boolean;
}

export const search: ISearchFunctions = {
	// Define the 'search' object which implements ISearchFunctions interface
	find(data, select) {
		// Start defining the 'find' function

		try {
			// Try to find the first item in the array that matches the selection criteria.
			return data.find(select);
		} catch (error) {
			// Handle any unexpected errors during the find operation.
			console.error("Error during find operation:", error);
			return undefined; // Return undefined in case of an error
		}
	},

	filter(data, select) {
		// Start defining the 'filter' function

		try {
			// Try to filter the array based on the selection criteria.
			return data.filter(select);
		} catch (error) {
			// Handle any unexpected errors during the filter operation.
			console.error("Error during filter operation:", error);
			return []; // Return an empty array in case of an error
		}
	},

	some(data, select) {
		// Start defining the 'some' function

		try {
			// Try to check if at least one item in the array matches the selection criteria.
			return data.some(select);
		} catch (error) {
			// Handle any unexpected errors during the some operation.
			console.error("Error during some operation:", error);
			return false; // Return false in case of an error
		}
	},
};
