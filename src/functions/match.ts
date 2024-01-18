import { isEqual } from "lodash";

export interface IMatchFunctions {
	countMatchingSegments(
		original: string | undefined | null,
		match: string | undefined | null,
		replace?: string
	): number;

	isEqualMatchingSegments(
		original: string | undefined | null,
		match: string | undefined | null,
		replace?: string
	): boolean;
}

export const match: IMatchFunctions = {
	// Define the 'match' object which implements IMatchFunctions interface
	countMatchingSegments(original, match, replace = "/") {
		// Start defining the 'countMatchingSegments' function

		try {
			if (original == null || match == null) {
				// Check if either 'original' or 'match' is null or undefined
				return 0; // Return 0 if either input is null or undefined
			}

			const segments1 = original.split(replace).filter((item) => item !== "");
			// Split 'original' into segments using the 'replace' separator and remove empty segments
			const segments2 = match.split(replace).filter((item) => item !== "");
			// Split 'match' into segments using the 'replace' separator and remove empty segments

			const matchCount = segments1.reduce((count, segment, index) => {
				return count + (segment === segments2[index] ? 1 : 0);
				// Compare corresponding segments of 'original' and 'match' and count matching segments
			}, 0);

			return matchCount; // Return the count of matching segments
		} catch (error) {
			console.error("Error counting matching segments:", error);
			return 0; // Handle any unexpected errors and return 0
		}
	},

	isEqualMatchingSegments(original, match, replace = "/") {
		// Start defining the 'isEqualMatchingSegments' function

		try {
			if (original == null || match == null) {
				// Check if either 'original' or 'match' is null or undefined
				return false; // Return false if either input is null or undefined
			}

			const segments1 = original.split(replace).filter((item) => item !== "");
			// Split 'original' into segments using the 'replace' separator and remove empty segments
			const segments2 = match.split(replace).filter((item) => item !== "");
			// Split 'match' into segments using the 'replace' separator and remove empty segments

			return isEqual(segments1, segments2);
			// Compare the arrays of segments from 'original' and 'match' and return true if they are equal, false otherwise
		} catch (error) {
			console.error("Error comparing matching segments:", error);
			return false; // Handle any unexpected errors and return false
		}
	},
};
