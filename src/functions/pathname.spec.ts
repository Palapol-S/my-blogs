import { path } from "./pathname";

describe("pathname.ts", () => {
	it("should split a pathname into segments", () => {
		const pathname = "/path/to/resource";
		const expected = ["path", "to", "resource"];

		const result = path.splitPathname(pathname);

		expect(result).toEqual(expected);
	});

	it("should handle origin pathname and return the second segment", () => {
		const pathname = "/origin/pathname/resource";
		const expected = "pathname";

		const result = path.handleOriginPathname(pathname);

		expect(result).toEqual(expected);
	});

	it("should handle current pathname and return the last segment", () => {
		const pathname = "/path/to/currentPathname";
		const expected = "currentpathname";

		const result = path.handleCurrentPathname(pathname);

		expect(result).toEqual(expected);
	});

	it("should handle the last index of pathname segments", () => {
		const pathname = "/path/to/resource";
		const expected = 2;

		const result = path.handleLastIndex(pathname);

		expect(result).toEqual(expected);
	});

	it("should handle other pathname segments by index", () => {
		const pathname = "/path/to/resource";
		const index = 1;
		const expected = "to";

		const result = path.handleOtherSegment(pathname, index);

		expect(result).toEqual(expected);
	});

	it("should handle out-of-bounds index and return an empty string", () => {
		const pathname = "/path/to/resource";
		const index = 5;
		const expected = "";

		const result = path.handleOtherSegment(pathname, index);

		expect(result).toEqual(expected);
	});

	it("should handle negative index and return an empty string", () => {
		const pathname = "/path/to/resource";
		const index = -1;
		const expected = "";

		const result = path.handleOtherSegment(pathname, index);

		expect(result).toEqual(expected);
	});
});
