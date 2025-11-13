import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 py-4 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <div className="text-xs sm:text-sm text-gray-600">
            <p>&copy; 2025 MovieApp. All rights reserved.</p>
          </div>
          
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link 
              to="/privacy-policy" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400">•</span>
            <a 
              href="mailto:support@movieapp.com" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Contact us"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
