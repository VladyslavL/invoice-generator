"use client";

import React, { useState } from "react";
import { InvoiceData } from "@/types/invoice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Plus, Save } from "lucide-react";

interface InvoiceFormProps {
	data: InvoiceData;
	onChange: (data: InvoiceData) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ data, onChange }) => {
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [newRecipient, setNewRecipient] = useState("");

	// Функція валідації дати
	const validateDate = (dateString: string): boolean => {
		if (!dateString) return true; // Порожня дата допустима
		const regex = /^\d{4}-\d{2}-\d{2}$/;
		if (!regex.test(dateString)) return false;
		const date = new Date(dateString);
		return date instanceof Date && !isNaN(date.getTime());
	};

	// Функція валідації чисел
	const validateNumber = (value: string | number): boolean => {
		if (typeof value === "number") return value >= 0;
		if (typeof value === "string") {
			if (value === "") return true; // Порожній рядок допустимий
			const num = parseFloat(value);
			return !isNaN(num) && num >= 0;
		}
		return false;
	};

	const handleChange = (field: string, value: string | number) => {
		const newData = { ...data };

		if (field.includes(".")) {
			const [parent, child] = field.split(".");
			(newData as unknown as Record<string, Record<string, string | number>>)[
				parent
			][child] = value;
		} else {
			(newData as unknown as Record<string, string | number>)[field] = value;
		}

		onChange(newData);
	};

	const handleProductChange = (
		index: number,
		field: string,
		value: string | number,
	) => {
		const newData = { ...data };
		newData.products[index] = { ...newData.products[index], [field]: value };
		onChange(newData);
	};

	const addProduct = () => {
		const newData = { ...data };
		newData.products.push({
			name: "",
			quantity: 1,
			unitPrice: 0,
		});
		onChange(newData);
	};

	const removeProduct = (index: number) => {
		const newData = { ...data };

		// Не дозволяємо видалити останній продукт
		if (newData.products.length > 1) {
			newData.products.splice(index, 1);
			onChange(newData);
		}
	};

	// Функція для вибору отримувача зі списку
	const handleSelectRecipient = (value: string) => {
		const newData = { ...data };
		newData.to = value;
		onChange(newData);
	};

	// Функція для додавання нового отримувача
	const handleAddNewRecipient = () => {
		if (!newRecipient.trim()) return;

		const newData = { ...data };
		const recipients = newData.recipients || [];

		// Додаємо нового отримувача, якщо його ще немає
		if (!recipients.includes(newRecipient.trim())) {
			newData.recipients = [...recipients, newRecipient.trim()];
		}

		// Встановлюємо нового отримувача як поточного
		newData.to = newRecipient.trim();
		onChange(newData);

		// Скидаємо стан
		setNewRecipient("");
		setIsAddingNew(false);
	};

	// Функція для оновлення поточного отримувача
	const handleUpdateCurrentRecipient = (value: string) => {
		const newData = { ...data };
		const recipients = newData.recipients || [];
		const currentIndex = recipients.indexOf(data.to);

		if (currentIndex !== -1) {
			// Оновлюємо існуючого отримувача в масиві
			newData.recipients = [...recipients];
			newData.recipients[currentIndex] = value;
		}

		// Оновлюємо поточного отримувача
		newData.to = value;
		onChange(newData);
	};

	return (
		<div className="space-y-6">
			{/* Invoice Header */}
			<Card>
				<CardHeader>
					<CardTitle>
						<h2>Invoice Header</h2>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="invoiceNumber">Invoice Number</Label>
							<Input
								id="invoiceNumber"
								value={data.invoiceNumber}
								onChange={(e) => handleChange("invoiceNumber", e.target.value)}
							/>
						</div>
						<div>
							<Label htmlFor="issuedDate">Issued Date</Label>
							<Input
								id="issuedDate"
								type="text"
								value={data.issuedDate}
								onChange={(e) => {
									const value = e.target.value;
									// Дозволяємо тільки цифри, дефіси та порожній рядок
									if (
										value === "" ||
										/^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(value)
									) {
										handleChange("issuedDate", value);
									}
								}}
								placeholder="YYYY-MM-DD"
								className={
									!validateDate(data.issuedDate) && data.issuedDate
										? "border-red-500"
										: ""
								}
							/>
							{!validateDate(data.issuedDate) && data.issuedDate && (
								<p className="text-red-500 text-sm mt-1">
									Please enter a valid date (YYYY-MM-DD)
								</p>
							)}
						</div>
					</div>
					<div>
						<Label htmlFor="companyName">Company Name</Label>
						<Input
							id="companyName"
							value={data.companyName}
							onChange={(e) => handleChange("companyName", e.target.value)}
							placeholder="Enter company name..."
						/>
					</div>
				</CardContent>
			</Card>

			{/* From Section */}
			<Card>
				<CardHeader>
					<CardTitle>
						<h2>From (Sender)</h2>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Textarea
						value={data.from}
						onChange={(e) => handleChange("from", e.target.value)}
						placeholder="Enter sender information..."
						rows={6}
					/>
				</CardContent>
			</Card>

			{/* To Section */}
			<Card>
				<CardHeader>
					<CardTitle>
						<h2>To (Recipient)</h2>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Select existing recipient or add new */}
					<div>
						<Label htmlFor="recipientSelect">Select Recipient</Label>
						<div className="flex gap-2">
							<Select value={data.to} onValueChange={handleSelectRecipient}>
								<SelectTrigger id="recipientSelect" className="flex-1">
									<SelectValue placeholder="Select a recipient..." />
								</SelectTrigger>
								<SelectContent>
									{(data.recipients || []).map((recipient, index) => {
										// Отримуємо перший рядок для відображення в селекті
										const firstLine =
											recipient.split("\n")[0] || `Recipient ${index + 1}`;
										return (
											<SelectItem key={index} value={recipient}>
												{firstLine}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							<Button
								type="button"
								variant="outline"
								size="icon"
								onClick={() => setIsAddingNew(!isAddingNew)}
								title="Add new recipient"
							>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
					</div>

					{/* Add new recipient form */}
					{isAddingNew && (
						<div className="border rounded-lg p-4 space-y-3 bg-gray-50">
							<Label>New Recipient Information</Label>
							<Textarea
								value={newRecipient}
								onChange={(e) => setNewRecipient(e.target.value)}
								placeholder="Enter new recipient information..."
								rows={5}
							/>
							<div className="flex gap-2">
								<Button
									type="button"
									onClick={handleAddNewRecipient}
									size="sm"
									className="flex items-center gap-2"
								>
									<Save className="h-4 w-4" />
									Save & Select
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => {
										setIsAddingNew(false);
										setNewRecipient("");
									}}
									size="sm"
								>
									Cancel
								</Button>
							</div>
						</div>
					)}

					{/* Edit current recipient */}
					<div>
						<Label htmlFor="recipientDetails">Current Recipient Details</Label>
						<Textarea
							id="recipientDetails"
							value={data.to}
							onChange={(e) => handleUpdateCurrentRecipient(e.target.value)}
							placeholder="Enter recipient information..."
							rows={5}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Bank Details */}
			<Card>
				<CardHeader>
					<CardTitle>
						<h2>Bank Details</h2>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Textarea
						value={data.bankDetails}
						onChange={(e) => handleChange("bankDetails", e.target.value)}
						placeholder="Enter bank details..."
						rows={7}
					/>
				</CardContent>
			</Card>

			{/* Remarks */}
			<Card>
				<CardHeader>
					<CardTitle>
						<h2>Remarks</h2>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Textarea
						value={data.remarks}
						onChange={(e) => handleChange("remarks", e.target.value)}
						placeholder="Enter remarks..."
						rows={4}
					/>
				</CardContent>
			</Card>

			{/* Products/Services */}
			<Card>
				<CardHeader>
					<CardTitle>
						<h2>Products/Services</h2>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{data.products.map((product, index) => (
						<div key={index} className="border rounded-lg p-4 space-y-4">
							<div className="flex justify-between items-center">
								<h3 className="font-medium">Product {index + 1}</h3>
								{data.products.length > 1 && (
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={() => removeProduct(index)}
										className="text-red-600 hover:text-red-700"
									>
										Remove
									</Button>
								)}
							</div>
							<div>
								<Label htmlFor={`productName-${index}`}>Product Name</Label>
								<Input
									id={`productName-${index}`}
									value={product.name}
									onChange={(e) =>
										handleProductChange(index, "name", e.target.value)
									}
									placeholder="Enter product name..."
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor={`quantity-${index}`}>Quantity</Label>
									<Input
										id={`quantity-${index}`}
										type="text"
										value={product.quantity}
										onChange={(e) => {
											const value = e.target.value;
											// Дозволяємо цифри, крапку та порожній рядок
											if (value === "" || /^[\d.]*$/.test(value)) {
												handleProductChange(index, "quantity", value);
											}
										}}
										placeholder="Enter quantity..."
										className={
											!validateNumber(product.quantity) ? "border-red-500" : ""
										}
									/>
									{!validateNumber(product.quantity) &&
										product.quantity !== "" && (
											<p className="text-red-500 text-sm mt-1">
												Quantity must be a positive number
											</p>
										)}
								</div>
								<div>
									<Label htmlFor={`unitPrice-${index}`}>Unit Price</Label>
									<Input
										id={`unitPrice-${index}`}
										type="text"
										value={product.unitPrice}
										onChange={(e) => {
											const value = e.target.value;
											// Дозволяємо цифри, крапку та порожній рядок
											if (value === "" || /^[\d.]*$/.test(value)) {
												handleProductChange(index, "unitPrice", value);
											}
										}}
										placeholder="Enter unit price..."
										className={
											!validateNumber(product.unitPrice) ? "border-red-500" : ""
										}
									/>
									{!validateNumber(product.unitPrice) &&
										product.unitPrice !== "" && (
											<p className="text-red-500 text-sm mt-1">
												Price must be a positive number
											</p>
										)}
								</div>
							</div>
						</div>
					))}
					<Button
						type="button"
						variant="outline"
						onClick={addProduct}
						className="w-full"
					>
						+ Add Product
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default InvoiceForm;
