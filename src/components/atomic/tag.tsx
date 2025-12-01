/** @format */

export default function Tag({ label }: { label: string }) {
  const getTagStyles = (label: string): string => {
    const normalizedLabel = label.toUpperCase().replace(/\s+/g, "_");

    const styles: Record<string, string> = {
      IT_TRAINING: "bg-[#00AEEF] text-white",
      IT_SUPPORT: "bg-[#7C3AED] text-white",
      IT_CONSULTANT: "bg-[#F59E0B] text-white",
      UNSET: "bg-gray-400 text-white",

      FULL_BOOKED: "bg-[#EF4444] text-white",
      OPEN_SEAT: "bg-[#10B981] text-white",
      ON_GOING: "bg-[#D0229F] text-white",
      ENDED: "bg-gray-500 text-white",
    };

    return styles[normalizedLabel] || "bg-gray-300 text-gray-700";
  };

  return (
    <span
      className={`${getTagStyles(
        label
      )} px-3 py-1 rounded-full text-[10px] font-medium`}
    >
      {label}
    </span>
  );
}
