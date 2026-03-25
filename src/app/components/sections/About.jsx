"use client";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="About"
      className="py-20 bg-gray-50 dark:bg-neutral-900 font-roboto"
    >
      {/* Section Heading */}
      <h1 className="text-3xl md:text-4xl font-semibold text-[#0F9D58] dark:text-[#34A853] text-center mb-12">
        About Us
      </h1>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 lg:px-8">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/logo.jpg"
            alt="GeeksforGeeks Student Chapter BVM"
            width={360}
            height={360}
            className="rounded-lg shadow-md object-contain bg-white p-4"
            priority
          />
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
            GeeksforGeeks Student Chapter – BVM
          </h2>

          <p className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed text-justify">
            The GeeksforGeeks Student Chapter at Birla Vishvakarma Mahavidyalaya
            aims to cultivate a strong coding culture among students interested
            in computer science and core technical domains. Through workshops,
            hands-on sessions, and collaborative learning opportunities, we
            enable students to strengthen their problem-solving skills and grow
            as confident developers.
          </p>
        </div>
      </div>
    </section>
  );
}