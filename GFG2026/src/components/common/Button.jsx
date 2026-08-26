import { forwardRef, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { initMagneticEffect } from "../../animations/magneticAnimations";

const Button = forwardRef(
  (
    {
      children,
      href,
      onClick,
      type = "button",
      variant = "primary",
      icon: CustomIcon = ArrowUpRight,
      showIcon = true,
      magnetic = true,
      className = "",
      disabled = false,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef(null);
    const buttonRef = forwardedRef || internalRef;

    // Initialize magnetic physics if enabled
    useEffect(() => {
      if (magnetic && buttonRef.current && !disabled) {
        const cleanup = initMagneticEffect(buttonRef.current, 0.25);
        return () => cleanup && cleanup();
      }
    }, [magnetic, disabled, buttonRef]);

    const baseStyles =
      "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-xs md:text-sm font-mono font-medium tracking-tight transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8D46] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer";

    const variants = {
      primary:
        "bg-[#2F8D46] text-white shadow-sm hover:shadow-[0_4px_20px_rgba(47,141,70,0.25)] border border-[#2F8D46]",

      secondary:
        "border border-[#E8ECE9] bg-white text-[#111111] hover:border-[#2F8D46] hover:text-[#2F8D46] shadow-xs",

      dark:
        "bg-[#111111] text-white hover:bg-[#176B36] border border-[#111111]",

      ghost:
        "bg-transparent text-[#5F6368] hover:bg-[#F8FAF9] hover:text-[#111111]",

      code:
        "bg-[#F8FAF9] text-[#111111] border border-[#E8ECE9] hover:border-[#2F8D46] hover:text-[#2F8D46] font-mono",
    };

    const styles = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

    const content = (
      <>
        {/* Animated fill background overlay */}
        <span className="absolute inset-0 z-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Text Content */}
        <span className="relative z-10 flex items-center gap-1.5 transition-transform duration-300 group-hover:-translate-y-[1px]">
          {children}
        </span>

        {/* Dynamic Icon */}
        {showIcon && CustomIcon && (
          <CustomIcon
            size={16}
            strokeWidth={2}
            className="relative z-10 text-current transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </>
    );

    if (href) {
      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.endsWith(".pdf");

      return (
        <a
          ref={buttonRef}
          href={href}
          className={styles}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={buttonRef}
        type={type}
        onClick={onClick}
        className={styles}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;