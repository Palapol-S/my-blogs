import { search } from "./search";

describe("search.ts", () => {
	const data = [
		{ name: "Alice", age: 30 },
		{ name: "Bob", age: 25 },
		{ name: "Charlie", age: 35 },
		{ name: "David", age: 28 },
	];

	it("find should return the first matching item based on a custom selection", () => {
		const select = (person: { name: string; age: number }) => person.age > 30;
		const result = search.find(data, select);
		expect(result).toEqual({ name: "Charlie", age: 35 });
	});

	it("find should return undefined when no item matches the custom selection", () => {
		const select = (person: { name: string; age: number }) => person.age > 40;
		const result = search.find(data, select);
		expect(result).toBeUndefined();
	});

	it("filter should return an array of items that match a custom selection", () => {
		const select = (person: { name: string; age: number }) => person.age < 30;
		const result = search.filter(data, select);
		expect(result).toEqual([
			{ name: "Bob", age: 25 },
			{ name: "David", age: 28 },
		]);
	});

	it("some should return true when at least one item matches a custom selection", () => {
		const select = (person: { name: string; age: number }) => person.age < 30;
		const result = search.some(data, select);
		expect(result).toBe(true);
	});

	it("some should return false when no item matches a custom selection", () => {
		const select = (person: { name: string; age: number }) => person.age > 40;
		const result = search.some(data, select);
		expect(result).toBe(false);
	});
});
