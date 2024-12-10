import React, { useRef } from "react";
import emailjs from "emailjs-com";

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          `${import.meta.env.VITE_DEV_EMAILJS_SERVICE_ID}`, // Replace with your Email.js service ID
          `${import.meta.env.VITE_DEV_EMAILJS_TEMPLATE_ID}`, // Replace with your Email.js template ID
          form.current,
          `${import.meta.env.VITE_DEV_EMAILJS_USER_ID}` // Replace with your Email.js user ID
        )
        .then(
          (result) => {
            console.log("Email sent successfully:", result.text);
          },
          (error) => {
            console.error("Error sending email:", error.text);
          }
        );
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-200"
        >
          Name
        </label>
        <input
          type="text"
          name="user_name"
          id="name"
          required
          className="mt-1 block w-full border border-gray-300 bg-inherit p-1 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-200"
        >
          Email
        </label>
        <input
          type="email"
          name="from_name"
          id="email"
          required
          className="mt-1 block w-full border border-gray-300 bg-inherit p-1 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-200"
        >
          Message
        </label>
        <textarea
          name="message"
          id="message"
          required
          className="mt-1 block w-full border border-gray-300 bg-inherit p-1 rounded-md shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
      >
        Send
      </button>
    </form>
  );
}
