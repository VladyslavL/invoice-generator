"use client";

import React, { useState, useEffect } from "react";
import { defaultInvoiceData, InvoiceData } from "@/types/invoice";
import InvoiceForm from "@/components/InvoiceForm";
import PDFViewerComponent from "@/components/PDFViewerComponent";
import DownloadButton from "@/components/DownloadButton";
import { Button } from "@/components/ui/button";
import { RotateCcw, Github } from "lucide-react";

export default function Home() {
	const [isClient, setIsClient] = useState(false);
	const [invoiceData, setInvoiceData] =
		useState<InvoiceData>(defaultInvoiceData);

	useEffect(() => {
		setIsClient(true);
	}, []);

	console.log(invoiceData.products.length);

	// Load data from localStorage on component mount
	useEffect(() => {
		const savedData = localStorage.getItem("invoiceData");
		if (savedData) {
			try {
				const parsedData = JSON.parse(savedData);
				setInvoiceData(parsedData);
			} catch (error) {
				console.error("Error parsing saved invoice data:", error);
			}
		}
	}, []);

	// Save data to localStorage whenever invoiceData changes
	useEffect(() => {
		localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
	}, [invoiceData]);

	const resetToDefaults = () => {
		setInvoiceData(defaultInvoiceData);
		localStorage.setItem("invoiceData", JSON.stringify(defaultInvoiceData));
	};

	return (
		<div className="min-h-screen bg-gray-100 p-4">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between flex-wrap gap-4 items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800">
						Invoice Generator
					</h1>

					<div className="flex items-center flex-wrap gap-4">
						<Button
							variant="outline"
							onClick={() =>
								window.open(
									"https://github.com/vladyslavl/invoice-generator",
									"_blank"
								)
							}
							className="flex items-center gap-2"
						>
							<Github className="w-4 h-4" />
							GitHub
						</Button>
						<Button
							variant="outline"
							onClick={resetToDefaults}
							className="flex items-center gap-2"
						>
							<RotateCcw className="w-4 h-4" />
							Reset to Defaults
						</Button>

						{isClient && <DownloadButton data={invoiceData} />}
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
					{/* Left Panel - Form */}
					<div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
						<InvoiceForm data={invoiceData} onChange={setInvoiceData} />
					</div>

					{/* Right Panel - PDF Preview */}
					<div className="bg-white rounded-lg shadow-lg p-6">
						<PDFViewerComponent data={invoiceData} />
					</div>
				</div>
			</div>
		</div>
	);
}
