import { optionDate } from "./date";

describe("date.ts", () => {
	it("should format a Date with a custom time", () => {
		const date = new Date("2023-10-31T14:30:45");
		const locale = "en-US";
		const options: Intl.DateTimeFormatOptions = {
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		};
		const expected = "October 31, 2023 at 02:30:45 PM"; // This is the expected output with time

		const result = optionDate.format(date, locale, options);

		expect(result).toEqual(expected);
	});

	it("should handle an invalid date input", () => {
		const date = new Date("invalid date");
		const locale = "en-US";
		const options: Intl.DateTimeFormatOptions = {
			day: "numeric",
			month: "long",
			year: "numeric",
		};

		const result = optionDate.format(date, locale, options);

		expect(result).toBeUndefined();
	});

	it("should format a Date with UTC timezone", () => {
		const date = new Date("2023-10-31T14:30:45Z"); // UTC time
		const locale = "en-US";
		const options: Intl.DateTimeFormatOptions = {
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			timeZoneName: "short",
		};
		const expected = "October 31, 2023 at 09:30:45 PM GMT+7"; // Expected output with UTC timezone

		const result = optionDate.format(date, locale, options);

		expect(result).toEqual(expected);
	});

	it("should format a Date with a custom timezone", () => {
		const date = new Date("2023-10-31T14:30:45");
		const locale = "en-US";
		const options: Intl.DateTimeFormatOptions = {
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			timeZoneName: "short",
			timeZone: "America/New_York", // Eastern Time Zone
		};
		const expected = "October 31, 2023 at 03:30:45 AM EDT"; // Expected output with Eastern Time Zone

		const result = optionDate.format(date, locale, options);

		expect(result).toEqual(expected);
	});
});
