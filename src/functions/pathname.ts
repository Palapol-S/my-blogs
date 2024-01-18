export interface IPathnameFunctions {
	splitPathname(pathname: string): string[];
	handleOriginPathname(pathname: string): string;
	handleCurrentPathname(pathname: string): string;
	handleLastIndex(pathname: string): number;
	handleOtherSegment(pathname: string, index: number): string;
}

export const path: IPathnameFunctions = {
	// Define the 'path' object which implements IPathnameFunctions interface
	splitPathname(pathname) {
		// Start defining the 'splitPathname' function

		// Split the pathname using '/' as a separator and remove empty segments
		return pathname.split("/").filter((segment) => segment !== "");
	},

	handleOriginPathname(pathname) {
		// Start defining the 'handleOriginPathname' function

		const split = this.splitPathname(pathname);
		// Use the 'splitPathname' function to split the pathname into segments

		return split[1]?.toLocaleLowerCase() || "";
		// Return the second segment of the pathname in lowercase or an empty string if not available
	},

	handleCurrentPathname(pathname) {
		// Start defining the 'handleCurrentPathname' function

		const split = this.splitPathname(pathname);
		// Use the 'splitPathname' function to split the pathname into segments

		return split[split.length - 1].toLocaleLowerCase() || "";
		// Return the last segment of the pathname in lowercase or an empty string if not available
	},

	handleLastIndex(pathname) {
		// Start defining the 'handleLastIndex' function

		const split = this.splitPathname(pathname);
		// Use the 'splitPathname' function to split the pathname into segments

		return split.length - 1;
		// Return the index of the last segment of the pathname
	},

	handleOtherSegment(pathname, index) {
		// Start defining the 'handleOtherSegment' function

		const split = this.splitPathname(pathname);
		// Use the 'splitPathname' function to split the pathname into segments

		if (index >= 0 && index < split.length) {
			// Check if the provided index is within the valid range
			return split[index].toLocaleLowerCase();
			// Return the segment at the specified index in lowercase
		}

		return "";
		// Return an empty string if the provided index is out of bounds
	},
};
