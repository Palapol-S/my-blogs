export interface IShorterFunctions {
	shortDepartment(department: string | null | undefined): string;
	yearTwoDigits(item: Date): string;
}

export const shorter: IShorterFunctions = {
	shortDepartment(department: string): string {
		switch (department) {
			case "กำกับและดูแลกฎระเบียบ":
				return "RCD";
			case "ขายและสนับสนุนทางเทคนิค":
				return "STD";
			case "ทรัพยากรบุคคล":
				return "HRD";
			case "บริหารสำนักงาน":
				return "AMD";
			case "บริหารโครงการ":
				return "PMD";
			case "บัญชีและการเงิน":
				return "AFD";
			case "สำนักกรรมการผู้จัดการ":
				return "OFP";
			case "สำนักตรวจสอบภายใน":
				return "ADT";
			case "สินทรัพย์ดิจิทัล":
				return "DAD";
			case "เทคโนโลยีสารสนเทศ":
				return "ITG";
			case "Administration":
				return "AMD";
			case "Marketing & Sale Support":
				return "MKT";
			case "Office of President":
				return "OFP";
			case "Software Development":
				return "SDS";
			case "System & Network Solution":
				return "SWD";

			default:
				return "N/A";
		}
	},

	yearTwoDigits(item: Date): string {
		const currentYear = new Date(item).getFullYear();
		const yearTwoDigits = currentYear.toString().slice(-2);
		return yearTwoDigits;
	},
};
