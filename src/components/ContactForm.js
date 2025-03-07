import { useRef, useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_ty6mi6e", // ✅ Your Service ID
        "template_twqpskh", // ✅ Your Template ID
        form.current,
        "dJaGeHq8hEwBATSU1" // ✅ Your Public Key
      )
      .then(
        () => {
          setMessage("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error("EMAILJS ERROR:", error);
          setMessage("❌ Something went wrong. Please try again.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <section className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">📩 Contact Us</h2>
              <p className="text-center text-muted">
                Have a question? Fill out the form below and we'll get back to
                you soon.
              </p>

              {message && (
                <div className="alert alert-info text-center">{message}</div>
              )}

              <form
                ref={form}
                onSubmit={sendEmail}
                className="needs-validation"
                noValidate
              >
                {/* Name Field */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    placeholder="Write your message here..."
                    rows="4"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
