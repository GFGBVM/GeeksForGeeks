import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import contactData from "../../data/contact";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import SocialLinks from "./SocialLinks";
import { initContactAnimation } from "./ContactAnimation";
import { useGSAP } from "../../hooks/useGSAP";

/**
 * Contact Component
 * 
 * Interactive contact hub featuring a deep forest primary CTA card,
 * detailed outreach metadata, and social connection endpoints.
 */
const Contact = () => {
  const sectionRef = useRef(null);
  const [isSending, setIsSending] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const cleanup = initContactAnimation(sectionRef.current);
    return () => cleanup?.();
  }, sectionRef);

  return (
    <section
      ref={sectionRef}
      id="Contact"
      className="contact-section relative overflow-hidden bg-[#F4F7F5] py-24 select-none sm:py-32 lg:py-40"
    >
      {/* Background Radial Glow */}
      <div
        className="contact-glow pointer-events-none absolute left-[-15%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#1E513B]/[0.06] blur-[120px]"
        aria-hidden="true"
      />

      <Container>
        {/* Heading */}
        <div className="contact-heading">
          <SectionHeading
            number="04"
            eyebrow="Contact Us"
            title={
              <>
                Let's
                <br />
                build
                <span className="text-[#1E513B]"> together.</span>
              </>
            }
            description={contactData.description}
          />
        </div>

        {/* Main Content Layout */}
        <div className="contact-content mt-16 grid grid-cols-1 gap-10 lg:mt-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* Main CTA Card */}
          <div className="contact-cta relative overflow-hidden rounded-3xl bg-[#0D1F15] p-8 sm:p-12 lg:p-16">
            {/* Ambient Inner Glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#1E513B]/30 blur-[80px]"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#A3C9B6]">
                Have an idea?
              </span>

              <h3 className="mt-6 max-w-xl font-montserrat text-4xl font-extrabold leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                Let's make
                <br />
                something
                <br />
                <span className="text-[#1E513B]">meaningful.</span>
              </h3>

              <p className="mt-7 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
                Whether you want to collaborate on a workshop, sponsor an event, partner with the chapter, or connect with our developers — reach out.
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSending(true);

                  // Pause Lenis if present while modal is shown
                  try { window.__LENIS?.stop(); } catch (err) {}

                  // After a short confirm delay, open mail client and close modal
                  setTimeout(() => {
                    try {
                      window.location.href = `mailto:${contactData.email}`;
                    } catch (err) {
                      // fallback
                      window.open(`mailto:${contactData.email}`, "_blank");
                    }

                    setIsSending(false);

                    try { window.__LENIS?.start(); } catch (err) {}
                  }, 650);
                }}
                className="contact-email-button group mt-9 inline-flex items-center gap-3 rounded-full bg-[#1E513B] px-7 py-4 font-montserrat text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#286E50] hover:shadow-[0_8px_25px_rgba(30,81,59,0.35)]"
              >
                Send us an email
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>

            {/* Decorative Brackets Watermark */}
            <div
              className="absolute bottom-5 right-7 font-mono text-5xl font-bold text-white/[0.04] sm:text-7xl"
              aria-hidden="true"
            >
              &lt;gfg&gt;
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="contact-details flex flex-col justify-between">
            <div>
              <p className="mb-7 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E513B]">
                Reach Us
              </p>

              <div className="space-y-7">
                {/* Address Item */}
                <div className="contact-detail-item flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#DCE5E0] bg-white text-[#1E513B] shadow-xs">
                    <MapPin size={17} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="font-montserrat text-xs font-bold uppercase tracking-[0.12em] text-[#0D1F15]">
                      Address
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-[#4B6354]">
                      {contactData.address.institution}
                      <br />
                      {contactData.address.line}
                      <br />
                      {contactData.address.state}
                    </p>
                  </div>
                </div>

                {/* Email Item */}
                <div className="contact-detail-item flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#DCE5E0] bg-white text-[#1E513B] shadow-xs">
                    <Mail size={17} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="font-montserrat text-xs font-bold uppercase tracking-[0.12em] text-[#0D1F15]">
                      Email
                    </p>

                    <a
                      href={`mailto:${contactData.email}`}
                      className="mt-2 block text-sm text-[#4B6354] transition-colors hover:text-[#1E513B]"
                    >
                      {contactData.email}
                    </a>
                  </div>
                </div>

                {/* Phone / Tech Support Item */}
                <div className="contact-detail-item flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#DCE5E0] bg-white text-[#1E513B] shadow-xs">
                    <Phone size={17} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="font-montserrat text-xs font-bold uppercase tracking-[0.12em] text-[#0D1F15]">
                      Technical Queries
                    </p>

                    <a
                      href={`tel:${contactData.technicalQueries.phone}`}
                      className="mt-2 block text-sm text-[#4B6354] transition-colors hover:text-[#1E513B]"
                    >
                      {contactData.technicalQueries.name}
                    </a>

                    <p className="mt-1 text-xs text-[#8A9B90]">
                      {contactData.technicalQueries.designation}
                      {" · "}
                      {contactData.technicalQueries.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="contact-socials mt-14 lg:mt-0">
              <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E513B]">
                Follow The Community
              </p>

              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Simple transient confirmation modal shown when opening mail client */}
        {isSending && (
          <div className="fixed inset-0 z-[6000] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

            <div className="relative z-10 w-[90%] max-w-sm rounded-xl bg-white p-6 text-center shadow-lg">
              <p className="mb-2 font-montserrat text-lg font-semibold text-[#0D1F15]">Opening mail client</p>
              <p className="text-sm text-[#4B6354]">A new email window will open in your mail app.</p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Contact;