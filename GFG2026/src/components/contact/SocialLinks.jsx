import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import contactData from "../../data/contact";

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
};

/**
 * SocialLinks Component
 * 
 * Renders interactive social link badges styled with Forest Mint 
 * hover states and scale transitions for community interaction.
 */
const SocialLinks = () => {
  return (
    <div className="flex flex-wrap gap-3">
      {Object.entries(contactData.socials || {}).map(([platform, url]) => {
        const Icon = socialIcons[platform];

        if (!Icon || !url) return null;

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GFG BVM on ${platform}`}
            className="contact-social-link group flex h-12 w-12 items-center justify-center rounded-full border border-[#DCE5E0] bg-white text-[#4B6354] shadow-xs transition-all duration-300 hover:border-[#1E513B] hover:bg-[#1E513B] hover:text-white hover:shadow-md"
          >
            <Icon
              size={17}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;