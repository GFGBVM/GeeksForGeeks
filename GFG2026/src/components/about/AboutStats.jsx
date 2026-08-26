import { stats } from "../../data/stats";

/**
 * AboutStats Component
 *
 * Displays key statistical metrics driven by `src/data/stats.js`.
 */
const AboutStats = () => {
  return (
    <div
      className="
        about-stats
        mt-20
        grid
        grid-cols-2
        border-y
        border-[#DCE5E0]
        sm:mt-28
        lg:grid-cols-4
      "
    >
      {stats.map((stat, index) => {
        const isLastRowMobile = index >= stats.length - (stats.length % 2 || 2);

        return (
          <div
            key={stat.id || index}
            className={`
              about-stat
              group
              relative
              py-8
              sm:py-10
              lg:py-12
              ${index % 2 === 0 ? "border-r border-[#DCE5E0]" : ""}
              ${!isLastRowMobile ? "border-b border-[#DCE5E0] lg:border-b-0" : ""}
              ${index !== stats.length - 1 ? "lg:border-r lg:border-[#DCE5E0]" : ""}
            `}
          >
            <div className="px-5 sm:px-7 lg:px-8">
              {/* Metric Value */}
              <div className="flex items-baseline gap-1">
                <span
                  className="
                    font-montserrat
                    text-4xl
                    font-extrabold
                    tracking-tight
                    text-[#0D1F15]
                    transition-colors
                    duration-300
                    group-hover:text-[#1E513B]
                    sm:text-5xl
                    lg:text-6xl
                  "
                >
                  {stat.value}
                </span>

                {stat.suffix && (
                  <span
                    className="
                      font-montserrat
                      text-xl
                      font-bold
                      text-[#1E513B]
                      sm:text-2xl
                    "
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Metric Label */}
              <p
                className="
                  mt-3
                  font-mono
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#4B6354]
                  sm:text-[11px]
                "
              >
                {stat.label}
              </p>

              {/* Optional Metric Description */}
              {stat.description && (
                <p
                  className="
                    mt-2
                    hidden
                    max-w-[190px]
                    text-xs
                    leading-relaxed
                    text-[#4B6354]/80
                    sm:block
                  "
                >
                  {stat.description}
                </p>
              )}
            </div>

            {/* Bottom Accent Line on Hover */}
            <div
              className="
                absolute
                bottom-0
                left-0
                h-[2px]
                w-0
                bg-[#1E513B]
                transition-all
                duration-500
                group-hover:w-full
              "
            />
          </div>
        );
      })}
    </div>
  );
};

export default AboutStats;