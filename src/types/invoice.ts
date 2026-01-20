export interface InvoiceData {
	// Invoice header
	invoiceNumber: string;
	issuedDate: string;
	companyName: string;

	// From section - one field
	from: string;

	// To section - one field (current recipient)
	to: string;

	// Recipients list (stored separately in localStorage)
	recipients?: string[];

	// Bank details - one field
	bankDetails: string;

	// Remarks
	remarks: string;

	// Products/Services
	products: {
		name: string;
		quantity: number | string;
		unitPrice: number | string;
	}[];
}

export const emptyInvoiceData: InvoiceData = {
	invoiceNumber: "",
	issuedDate: "",
	companyName: "",
	from: "",
	to: "",
	recipients: [],
	bankDetails: "",
	remarks: "",
	products: [
		{
			name: "",
			quantity: 1,
			unitPrice: 0,
		},
	],
};

export const defaultInvoiceData: InvoiceData = {
	invoiceNumber: "INV-2024-001",
	issuedDate: "2024-01-15",
	companyName: "Tech Solutions Inc.",
	from: `Tech Solutions Inc.
123 Business Street
Suite 100
New York, NY 10001
United States

Phone: +1 (555) 123-4567
Email: billing@techsolutions.com
Website: www.techsolutions.com`,
	to: `ABC Company Ltd.
456 Client Avenue
Floor 5
Los Angeles, CA 90210
United States

Contact: John Smith
Phone: +1 (555) 987-6543
Email: john.smith@abccompany.com`,
	recipients: [
		`ABC Company Ltd.
456 Client Avenue
Floor 5
Los Angeles, CA 90210
United States

Contact: John Smith
Phone: +1 (555) 987-6543
Email: john.smith@abccompany.com`,
		`XYZ Corporation
789 Business Park
Suite 200
San Francisco, CA 94102
United States

Contact: Jane Doe
Phone: +1 (555) 111-2222
Email: jane.doe@xyzcorp.com`,
	],
	bankDetails: `Account Holder: Tech Solutions Inc.
Bank Name: First National Bank
Account Number: 1234567890
Routing Number: 021000021
SWIFT Code: FNBKUS33
Bank Address: 789 Financial District
New York, NY 10004`,
	remarks: `Payment terms: Net 30 days
Thank you for your business!
For any questions regarding this invoice, please contact our billing department.`,
	products: [
		{
			name: "Web Development Services",
			quantity: 40,
			unitPrice: 75.0,
		},
		{
			name: "UI/UX Design",
			quantity: 20,
			unitPrice: 85.0,
		},
		{
			name: "Project Management",
			quantity: 15,
			unitPrice: 60.0,
		},
	],
};
