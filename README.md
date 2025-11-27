# CPT: Coding Problem Translator

CPT is a web application designed to assist developers and students in understanding and solving coding problems. Powered by Google's Gemini AI, it provides summaries, translations, and algorithmic hints for coding challenges, supporting both text and image inputs.

## ✨ Features

- **Problem Summary**: Summarizes complex coding problems into simple, easy-to-understand Thai.
- **Translation**: Translates problem descriptions into Thai while preserving technical terminology.
- **Smart Hints**: Provides guidance on algorithms and data structures without revealing the full solution.
- **Multi-modal Input**: 
  - **Text**: Paste your problem description directly.
  - **Image**: Upload screenshots of coding problems.
- **All-in-One Analysis**: Generate a summary, translation, and hints in a single click.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Model**: [Google Gemini](https://deepmind.google/technologies/gemini/) (`gemini-2.5-flash`)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- A Google Gemini API Key (Get one [here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BankTNBD/CPT-Coding-Problem-Translator.git
   cd CPT
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📖 Usage

1. **Input the Problem**:
   - Switch to the **Text** tab to paste a problem description.
   - Switch to the **Image** tab to upload a screenshot of a problem.
2. **Choose an Action**:
   - Click **Summary** to get a brief overview.
   - Click **Translation** to read the problem in Thai.
   - Click **Hint** for algorithmic guidance.
   - Click **Analyze All** for a comprehensive breakdown.
3. **View Results**: The AI-generated analysis will appear in the result panel on the right.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
