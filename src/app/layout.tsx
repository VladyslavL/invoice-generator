import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Invoice Generator - Professional PDF Invoice Creator",
	description:
		"Create professional PDF invoices with ease. Generate, preview, and download invoices for your business needs.",
	keywords: [
		"invoice",
		"PDF",
		"generator",
		"business",
		"billing",
		"professional",
	],
	authors: [{ name: "Invoice Generator Team" }],
	creator: "Invoice Generator",
	publisher: "Invoice Generator",
	robots: "index, follow",
	openGraph: {
		title: "Invoice Generator - Professional PDF Invoice Creator",
		description:
			"Create professional PDF invoices with ease. Generate, preview, and download invoices for your business needs.",
		type: "website",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "Invoice Generator - Professional PDF Invoice Creator",
		description:
			"Create professional PDF invoices with ease. Generate, preview, and download invoices for your business needs.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
