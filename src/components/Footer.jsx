import { FiMessageCircle, FiMail } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { useState } from "react";
import FormModal from "./FormModal";

export default function Footer() {
  const [activeForm, setActiveForm] = useState(null);

  const FORM_TYPES = {
    FEEDBACK: "feedback",
    CONTACT: "contact",
  };

  return (
    <div className="bg-cream border-t border-gold/20 mt-16 py-10 px-6">

      <div className="max-w-5xl mx-auto text-center">

        {/* Heading */}
        <div className="flex flex-col items-center mb-6">
          <FaHeart className="text-gold text-lg mb-2" />
          <h3 className="font-heading text-lg">Happy to Serve You</h3>

          {/* Divider */}
          <div className="flex items-center gap-3 mt-3 w-full max-w-sm">
            <div className="flex-1 h-[1px] bg-gold"></div>
            <FaStar className="text-gold text-xs" />
            <div className="flex-1 h-[1px] bg-gold"></div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* Feedback */}
          <div
            onClick={() => setActiveForm(FORM_TYPES.FEEDBACK)}
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition"
          >
            <div className="flex justify-center mb-2">
              <FiMessageCircle className="text-magenta text-lg" />
            </div>

            <p className="font-body">Feedback</p>
            <p className="text-sm text-gray-500">
              Help us improve your experience
            </p>
          </div>

          {/* Contact */}
          <div
            onClick={() => setActiveForm(FORM_TYPES.CONTACT)}
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition"
          >
            <div className="flex justify-center mb-2">
              <FiMail className="text-magenta text-lg" />
            </div>

            <p className="font-body">Contact</p>
            <p className="text-sm text-gray-500">
              Questions or suggestions?
            </p>
          </div>

        </div>

        {/* Footer Line */}
        <div className="mt-6 text-xs text-gray-500">
          © 2026 Travlure • Crafted for personalized discovery
        </div>

      </div>

      {/* Modal */}
      <FormModal
        type={activeForm}
        onClose={() => setActiveForm(null)}
      />
    </div>
  );
}