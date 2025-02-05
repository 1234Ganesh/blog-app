import React from "react";

const Terms = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto py-12 px-6 text-gray-800">
        <h1 className="text-4xl font-bold text-center mb-6">
          Terms and Conditions
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Last Updated: February 2024
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-700">
            Welcome to GK Blog. By accessing or using our website, you agree to
            be bound by these Terms and Conditions. Please read them carefully.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            2. User Responsibilities
          </h2>
          <p className="text-gray-700">
            You agree to use this website in a lawful manner and not engage in
            any harmful activities, including spam, hacking, or content
            plagiarism.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">3. Content Ownership</h2>
          <p className="text-gray-700">
            All content published on this blog is owned by GK Blog. Unauthorized
            copying or distribution is strictly prohibited.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">4. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify these Terms at any time. Any changes
            will be updated on this page, and it is your responsibility to
            review them periodically.
          </p>
        </section>

        <section className="text-center mt-8">
          <p className="text-gray-600">
            If you have any questions, please contact us at{" "}
            <a
              href="mailto:support@gkblog.com"
              className="text-blue-600 hover:underline"
            >
              support@gkblog.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
