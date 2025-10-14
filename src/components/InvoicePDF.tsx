"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { InvoiceData } from "@/types/invoice";

const styles = StyleSheet.create({
	page: {
		flexDirection: "column",
		backgroundColor: "#FFFFFF",
		padding: 40,
		fontFamily: "Helvetica",
		fontSize: 10,
		lineHeight: 1.4,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 30,
	},
	invoiceTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
	},
	invoiceDate: {
		fontSize: 10,
		color: "#666",
	},
	companyName: {
		fontSize: 14,
		fontWeight: "bold",
	},
	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 11,
		fontWeight: "bold",
		marginBottom: 8,
	},
	sectionContent: {
		fontSize: 10,
		lineHeight: 1.3,
	},
	twoColumn: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	leftColumn: {
		width: "48%",
	},
	rightColumn: {
		width: "48%",
	},
	table: {
		marginTop: 20,
		marginBottom: 20,
	},
	tableHeader: {
		flexDirection: "row",
		backgroundColor: "#F5F5F5",
		padding: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#DDD",
	},
	tableRow: {
		flexDirection: "row",
		padding: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#EEE",
		lineHeight: 1,
	},
	tableCell: {
		fontSize: 10,
	},
	productCell: {
		width: "50%",
	},
	quantityCell: {
		width: "20%",
		textAlign: "center",
	},
	priceCell: {
		width: "15%",
		textAlign: "right",
	},
	totalCell: {
		width: "15%",
		textAlign: "right",
	},
	summaryBox: {
		backgroundColor: "#F8F8F8",
		padding: 15,
		marginTop: 20,
		borderRadius: 5,
		width: "40%",
		alignSelf: "flex-end",
	},
	summaryTitle: {
		fontSize: 11,
		fontWeight: "bold",
		marginBottom: 10,
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
	},
	summaryTotal: {
		fontSize: 11,
		fontWeight: "bold",
		borderTopWidth: 1,
		borderTopColor: "#DDD",
		paddingTop: 5,
		marginTop: 5,
	},
	pageNumber: {
		position: "absolute",
		bottom: 20,
		right: 40,
		fontSize: 9,
		color: "#666",
	},
});

interface InvoicePDFProps {
	data: InvoiceData;
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({ data }) => {
	const subtotal = data.products.reduce((sum, product) => {
		const quantity =
			typeof product.quantity === "string"
				? parseFloat(product.quantity) || 0
				: product.quantity;
		const unitPrice =
			typeof product.unitPrice === "string"
				? parseFloat(product.unitPrice) || 0
				: product.unitPrice;
		return sum + quantity * unitPrice;
	}, 0);
	const total = subtotal;

	if (!data.products || data.products.length === 0) {
		return (
			<Document>
				<Page size="A4" style={styles.page}>
					<View style={styles.header}>
						<View>
							<Text style={styles.companyName}>{data.companyName}</Text>
						</View>
						<View>
							<Text style={styles.invoiceTitle}>
								Invoice: {data.invoiceNumber}
							</Text>
							<Text style={styles.invoiceDate}>
								Issued on: {data.issuedDate}
							</Text>
						</View>
					</View>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>No products added</Text>
						<Text style={styles.sectionContent}>
							Please add at least one product to generate the invoice.
						</Text>
					</View>
				</Page>
			</Document>
		);
	}

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<View>
						<Text style={styles.companyName}>{data.companyName}</Text>
					</View>
					<View>
						<Text style={styles.invoiceTitle}>
							Invoice: {data.invoiceNumber}
						</Text>
						<Text style={styles.invoiceDate}>Issued on: {data.issuedDate}</Text>
					</View>
				</View>

				<View style={styles.twoColumn}>
					<View style={styles.leftColumn}>
						<Text style={styles.sectionTitle}>From</Text>
						<View style={styles.sectionContent}>
							<Text>{data.from}</Text>
						</View>
					</View>
					<View style={styles.rightColumn}>
						<Text style={styles.sectionTitle}>To</Text>
						<View style={styles.sectionContent}>
							<Text>{data.to}</Text>
						</View>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Bank details</Text>
					<View style={styles.sectionContent}>
						<Text>{data.bankDetails}</Text>
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Remarks</Text>
					<Text style={styles.sectionContent}>{data.remarks}</Text>
				</View>

				<View style={styles.table}>
					<View style={styles.tableHeader}>
						<Text style={[styles.tableCell, styles.productCell]}>Product</Text>
						<Text style={[styles.tableCell, styles.quantityCell]}>
							Quantity
						</Text>
						<Text style={[styles.tableCell, styles.priceCell]}>Unit Price</Text>
						<Text style={[styles.tableCell, styles.totalCell]}>Total</Text>
					</View>
					<View
						render={() =>
							data.products.map((product, index) => {
								const quantity =
									typeof product.quantity === "string"
										? parseFloat(product.quantity) || 0
										: product.quantity;
								const unitPrice =
									typeof product.unitPrice === "string"
										? parseFloat(product.unitPrice) || 0
										: product.unitPrice;
								const total = quantity * unitPrice;

								return (
									<View key={index} style={styles.tableRow}>
										<View style={styles.productCell}>
											<Text style={styles.tableCell}>{product.name}</Text>
										</View>
										<Text style={[styles.tableCell, styles.quantityCell]}>
											{quantity}
										</Text>
										<Text style={[styles.tableCell, styles.priceCell]}>
											${unitPrice.toFixed(2)}
										</Text>
										<Text style={[styles.tableCell, styles.totalCell]}>
											$ {total.toFixed(2)}
										</Text>
									</View>
								);
							})
						}
					/>
				</View>

				<View style={styles.summaryBox}>
					<Text style={styles.summaryTitle}>Invoice Summary</Text>
					<View style={[styles.summaryRow, styles.summaryTotal]}>
						<Text style={styles.tableCell}>Total:</Text>
						<Text style={styles.tableCell}>$ {total.toFixed(2)}</Text>
					</View>
				</View>

				<Text
					style={styles.pageNumber}
					render={({ pageNumber, totalPages }) =>
						`${pageNumber} / ${totalPages}`
					}
					fixed
				/>
			</Page>
		</Document>
	);
};

export default InvoicePDF;
