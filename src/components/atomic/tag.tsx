/** @format */

export default function Tag({ label }: { label: string }) {
  const getTagStyles = (label: string): string => {
    const normalizedLabel = label.toUpperCase().replaceAll(/\s+/g, "_");

    const styles: Record<string, string> = {
      IT_TRAINING: "bg-primary-500 text-white",
      IT_SUPPORT: "bg-[#7C3AED] text-white",
      IT_CONSULTANT: "bg-[#F59E0B] text-white",
      UNSET: "bg-gray-400 text-white",

      FULL_BOOKED: "bg-[#EF4444] text-white",
      OPEN_SEAT: "bg-[#00AB17] text-white",
      ON_GOING: "bg-[#D0229F] text-white",
      ENDED: "bg-gray-500 text-white",

      DATA_ANALYTICS: "border border-[#D0229F] text-[#D0229F] capitalize",
      AUTOMATION: "border border-[#4D49FC] text-[#4D49FC] capitalize",
      CYBERSECURITY: "border border-[#B90100] text-[#B90100] capitalize",
      PROJECT_MANAGEMENT: "border border-[#428A00] text-[#428A00] capitalize",
      EMOTIONAL_INTELLIGENCE:
        "border border-[#DF6A0A] text-[#DF6A0A] capitalize",
    };

    return styles[normalizedLabel] || "bg-[#10B981] text-white";
  };

  return (
    <span
      className={`${getTagStyles(
        label,
      )} px-3 py-1 rounded-full text-[10px] font-medium`}
    >
      {label?.replaceAll("_", " ")?.toUpperCase()}
    </span>
  );
}
