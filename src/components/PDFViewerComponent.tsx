"use client";

import React, { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { InvoiceData } from "@/types/invoice";
import InvoicePDF from "./InvoicePDF";

interface PDFViewerProps {
	data: InvoiceData;
}

const PDFViewerComponent: React.FC<PDFViewerProps> = ({ data }) => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return (
			<div className="h-full flex flex-col">
				<div className="flex-1 border rounded-lg overflow-hidden bg-gray-50 p-4">
					<div className="bg-white shadow-lg rounded-lg p-6 h-full overflow-y-auto">
						<div className="text-center">
							<p>Loading PDF preview...</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="h-full flex flex-col">
			<div className="flex-1 border rounded-lg overflow-hidden bg-gray-50">
				<PDFViewer width="100%" height="100%" className="rounded-lg">
					<InvoicePDF data={data} />
				</PDFViewer>
			</div>
		</div>
	);
};

export default PDFViewerComponent;
