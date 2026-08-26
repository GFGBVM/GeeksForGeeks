import { cn } from "../../utils/helpers";

/**
 * Container Component
 *
 * Centralizes max-width constraints and horizontal padding
 * across all section layouts to ensure visual consistency.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Inner section elements
 * @param {string} [props.className=""] - Additional custom Tailwind utility classes
 * @param {"default"|"small"|"large"|"full"} [props.size="default"] - Width size variant
 */
const Container = ({
  children,
  className = "",
  size = "default",
}) => {
  const sizeClasses = {
    small: "max-w-5xl",
    default: "max-w-7xl",
    large: "max-w-[1500px]",
    full: "max-w-none",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10 xl:px-12",
        sizeClasses[size] || sizeClasses.default,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;