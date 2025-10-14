"use client";

import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoiceData } from "@/types/invoice";
import InvoicePDF from "./InvoicePDF";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
	data: InvoiceData;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ data }) => {
	return (
		<PDFDownloadLink
			document={<InvoicePDF data={data} />}
			fileName={`invoice-${data.invoiceNumber || "invoice"}.pdf`}
		>
			{({ loading }) => (
				<Button disabled={loading} className="flex items-center gap-2">
					<Download className="w-4 h-4" />
					{loading ? "Generating..." : "Download PDF"}
				</Button>
			)}
		</PDFDownloadLink>
	);
};

export default DownloadButton;
