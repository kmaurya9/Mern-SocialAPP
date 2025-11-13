import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: November 5, 2025</p>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Welcome to MovieApp (we, our, or us). This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information when you use our website.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information:</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Name and email address</li>
                  <li>Profile picture</li>
                  <li>Password (encrypted)</li>
                  <li>Search history</li>
                  <li>Movie reviews and ratings</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Usage Information:</h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Pages viewed</li>
                  <li>Time spent on site</li>
                  <li>Click patterns</li>
                  <li>Device information</li>
                  <li>IP address</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and improve our services</li>
              <li>To personalize your experience</li>
              <li>To process transactions</li>
              <li>To send marketing communications (with your consent)</li>
              <li>To comply with legal obligations</li>
              <li>To protect against fraud</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Third-Party Services</h2>
            <p>
              We use third-party services including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
              <li><strong>TMDB API</strong> - For movie database information</li>
              <li><strong>Cloudinary</strong> - For image hosting</li>
              <li><strong>MongoDB</strong> - For data storage</li>
            </ul>
            <p className="mt-3">
              These services have their own privacy policies. We encourage you to review them.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="mt-3 p-4 bg-gray-100 rounded">
              <p className="font-medium">MovieApp Support</p>
              <p>Email: privacy@movieapp.com</p>
            </div>
          </section>
          
          <section className="border-t-2 border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the last updated date.
            </p>
          </section>
        </div>
        
        <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-gray-700">
            <strong>By using MovieApp, you agree to the terms outlined in this Privacy Policy.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
