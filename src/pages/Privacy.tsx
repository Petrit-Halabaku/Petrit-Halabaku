import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">
        Privacy Policy
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-semibold mt-6 mb-4">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We collect information that you provide directly to us, including when
          you fill out forms, communicate with us, or interact with our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use the information we collect to provide, maintain, and improve
          our services, communicate with you, and comply with legal obligations.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          3. Information Sharing
        </h2>
        <p className="mb-4">
          We do not sell, trade, or otherwise transfer your personally
          identifiable information to third parties without your consent.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Data Security</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to
          maintain the security of your personal information.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
