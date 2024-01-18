import { match as matchFunction } from "./match";

describe("match.ts", () => {
	it("should count zero matching segments for entirely different paths", () => {
		const original = "path/to/resource";
		const match = "another/path/to/different/resource";
		const replace = "/";
		const expected = 0; // There are no matching segments

		const result = matchFunction.countMatchingSegments(
			original,
			match,
			replace
		);

		expect(result).toEqual(expected);
	});

	it("should handle empty strings and spaces in paths", () => {
		const original = "path/ to/some/ resource";
		const match = "path/ to/ some/ other/ resource";
		const replace = "/";
		const expected = 2; // Two matching segments, with spaces included

		const result = matchFunction.countMatchingSegments(
			original,
			match,
			replace
		);

		expect(result).toEqual(expected);
	});

	it("should handle paths with trailing slashes", () => {
		const original = "path/to/some/resource/";
		const match = "path/to/some/other/resource";
		const replace = "/";
		const expected = 3; // Three matching segments, even with trailing slashes

		const result = matchFunction.countMatchingSegments(
			original,
			match,
			replace
		);

		expect(result).toEqual(expected);
	});

	it("should handle paths with backslashes as separators", () => {
		const original = "path\\to\\some\\resource";
		const match = "path\\to\\some\\other\\resource";
		const replace = "\\";
		const expected = 3; // Three matching segments with backslashes as separators

		const result = matchFunction.countMatchingSegments(
			original,
			match,
			replace
		);

		expect(result).toEqual(expected);
	});

	it("should handle undefined and null inputs", () => {
		const original = undefined;
		const match = null;
		const replace = "/";
		const expected = 0; // No matching segments for undefined and null

		const result = matchFunction.countMatchingSegments(
			original,
			match,
			replace
		);

		expect(result).toEqual(expected);
	});
});
