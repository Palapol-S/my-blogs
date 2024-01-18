import { currency } from "./currency";

describe("currency.ts", () => {
	it("should format a number as currency using default values", () => {
		const number = 1000;
		const expected = "฿1,000.00"; // This is the expected output based on default values

		const result = currency.format(number);

		expect(result).toEqual(expected);
	});

	it("should format a negative number as currency using custom locale and options", () => {
		const number = -1000;
		const locale = "en-US";
		const options = {
			style: "currency",
			currency: "USD",
		};
		const expected = "-$1,000.00"; // This is the expected output with a negative number

		const result = currency.format(number, locale, options);

		expect(result).toEqual(expected);
	});

	it("should format a zero value as currency with custom options", () => {
		const number = 0;
		const locale = "th-TH";
		const options = {
			style: "currency",
			currency: "THB",
		};
		const expected = "฿0.00"; // This is the expected output with zero value

		const result = currency.format(number, locale, options);

		expect(result).toEqual(expected);
	});

	it("should format a number with minimum fractional digits", () => {
		const number = 1000.5;
		const locale = "ja-JP";
		const options = {
			style: "currency",
			currency: "JPY",
			minimumFractionDigits: 2,
		};
		const expected = "￥1,000.50"; // This is the expected output with minimumFractionDigits set to 2

		const result = currency.format(number, locale, options);

		expect(result).toEqual(expected);
	});

	it("should handle an undefined locale gracefully", () => {
		const number = 1000;
		const locale = undefined;
		const options = {
			style: "currency",
			currency: "JPY",
		};
		const expected = "¥1,000"; // This is the expected output with an undefined locale

		const result = currency.format(number, locale, options);

		expect(result).toEqual(expected);
	});
});
