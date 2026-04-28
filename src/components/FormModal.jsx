import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

export default function FormModal({ type, onClose }) {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (type) {
      setSubmitted(false);
      setRating(0);
    }
  }, [type]);

  if (!type) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#f4ede2] rounded-2xl p-6 w-full max-w-md shadow-lg relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-heading mb-4 text-center">
          {type === "contact" ? "Contact Us" : "Feedback"}
        </h2>

        {/* SUCCESS STATE */}
        {submitted ? (
          <div className="text-center py-6">
            <h3 className="font-heading text-lg mb-2">
              {type === "feedback" ? "Thank you!" : "Got it!"}
            </h3>

            <p className="text-body text-gray-600">
              {type === "feedback"
                ? "We appreciate your feedback."
                : "We'll reach out to you soon."}
            </p>

            <button
              onClick={onClose}
              className="mt-4 bg-magenta text-white px-4 py-2 rounded-lg hover:opacity-90"
            >
              Close
            </button>
          </div>
        ) : (
          /* FORM */
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            {/* Name */}
            <div className="grid grid-cols-2 gap-2">
              <input
                required
                placeholder="First Name"
                className="p-2 rounded-lg bg-white text-sm outline-none"
              />
              <input
                required
                placeholder="Last Name"
                className="p-2 rounded-lg bg-white text-sm outline-none"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full p-2 rounded-lg bg-white text-sm outline-none"
            />

            {/* Mobile */}
            <input
              type="tel"
              required
              pattern="[0-9]{10}"
              placeholder="Mobile (10 digits)"
              className="w-full p-2 rounded-lg bg-white text-sm outline-none"
            />

            {/* CONDITIONAL FIELDS */}
            {type === "feedback" ? (
              <>
                {/* Star Rating */}
                <div>
  <div className="w-full p-2 rounded-lg bg-white flex items-center justify-between">
    
    <span className="text-sm text-gray-500">
      Rating
    </span>

    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          onClick={() => setRating(star)}
          className={`cursor-pointer text-lg transition ${
            star <= rating
              ? "text-yellow-400"
              : "text-gray-300 hover:text-yellow-300"
          }`}
        />
      ))}
    </div>

  </div>
</div>

                <textarea
                  required
                  placeholder="Your Review"
                  className="w-full p-2 rounded-lg bg-white text-sm outline-none"
                />

                <textarea
                  placeholder="Suggestions (optional)"
                  className="w-full p-2 rounded-lg bg-white text-sm outline-none"
                />
              </>
            ) : (
              <textarea
                required
                placeholder="Your Message / Query"
                className="w-full p-2 rounded-lg bg-white text-sm outline-none"
              />
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-magenta text-white py-2 rounded-lg mt-2 hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}