# Invoice Generator

A professional PDF invoice generator built with Next.js 15.2, React PDF, and Tailwind CSS. Create, preview, and download professional invoices with ease.

## 🚀 Features

- **Professional PDF Generation**: Create high-quality PDF invoices using React PDF
- **Real-time Preview**: Live PDF preview as you type
- **Multiple Products**: Add and manage multiple products/services
- **Form Validation**: Input validation for dates and numerical fields
- **Auto-save**: Automatically saves data to localStorage
- **Default Templates**: Pre-filled with realistic sample data
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2
- **Styling**: Tailwind CSS 4+
- **UI Components**: shadcn/ui
- **PDF Generation**: @react-pdf/renderer
- **Language**: TypeScript
- **Icons**: Lucide React

## 📋 Invoice Fields

### Header Information

- Invoice Number
- Issued Date
- Company Name

### Contact Information

- **From**: Sender details (company, address, contact info)
- **To**: Recipient details (client, address, contact info)

### Financial Details

- **Bank Details**: Account information for payments
- **Products/Services**: Multiple items with:
  - Product name
  - Quantity
  - Unit price
  - Automatic total calculation

### Additional Information

- **Remarks**: Payment terms and additional notes

## 🎯 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd invoice-generator
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

1. **Fill Invoice Details**: Complete all required fields in the left panel
2. **Add Products**: Use the "Add Product" button to add multiple items
3. **Preview**: See your invoice in real-time in the right panel
4. **Download**: Click "Download PDF" in the header to save your invoice
5. **Reset**: Use "Reset to Defaults" to restore sample data

## 🔧 Key Components

- **InvoiceForm**: Main form component with validation
- **InvoicePDF**: PDF document generator using React PDF
- **PDFViewerComponent**: Live PDF preview
- **DownloadButton**: PDF download functionality

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── InvoiceForm.tsx
│   ├── InvoicePDF.tsx
│   ├── PDFViewerComponent.tsx
│   └── DownloadButton.tsx
├── types/
│   └── invoice.ts    # TypeScript interfaces
└── lib/
    └── utils.ts      # Utility functions
```

## 🎨 Customization

### Styling

- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components
- Customize shadcn/ui theme in `components.json`

### PDF Layout

- Edit `src/components/InvoicePDF.tsx` to modify PDF structure
- Adjust styles in the `StyleSheet.create()` object
- Add new fields by updating the `InvoiceData` interface

### Default Data

- Modify `defaultInvoiceData` in `src/types/invoice.ts`
- Update sample content for your business needs

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

- **Netlify**: Connect GitHub repository
- **Railway**: Deploy with one click
- **DigitalOcean**: Use App Platform

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Next.js and React PDF
