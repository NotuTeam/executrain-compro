/** @format */

// Base Skeleton Component
export const Skeleton = ({
  className = "",
  rounded = false,
}: {
  className?: string;
  rounded?: boolean;
}) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${
        rounded ? "rounded-full" : "rounded-lg"
      } ${className}`}
      style={{
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
};

// Service Card Skeleton
export const ServiceCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-start gap-5 text-center flex-1">
      <div className="w-full rounded-3xl p-5 md:p-8 flex flex-col items-center justify-center gap-3 md:gap-5 min-h-[250px] md:min-h-[350px] bg-white border-gray-200">
        <Skeleton className="w-[80px] h-[80px] md:w-[120px] md:h-[120px]" />
        <Skeleton className="h-6 md:h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
};

// Service Detail Tab Skeleton
export const ServiceDetailSkeleton = () => {
  return (
    <div className="pt-[5%] px-[5%] md:px-[7%] lg:px-[10%] w-full">
      <div className="space-x-3 md:space-x-6 lg:space-x-8 border-b-2 border-slate-300 pb-3 flex overflow-x-auto">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-8 w-32 shrink-0" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 md:mt-8">
        <div className="flex flex-col justify-center order-2 md:order-1 space-y-4">
          <Skeleton className="h-12 md:h-16 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="p-[5%] md:p-[10%] order-1 md:order-2">
          <Skeleton className="w-full aspect-video" />
        </div>
      </div>
    </div>
  );
};

// Product Card Skeleton
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 pt-3">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" rounded />
        </div>
      </div>
    </div>
  );
};

// Schedule Card Skeleton
export const ScheduleCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="w-16 h-8" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
};

// Testimonial Card Skeleton
export const TestimonialCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16" rounded />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="h-4 w-20" />
    </div>
  );
};

// Partner Logo Skeleton
export const PartnerLogoSkeleton = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <Skeleton className="w-32 h-16" />
    </div>
  );
};

// Statistic Card Skeleton
export const StatisticCardSkeleton = () => {
  return (
    <div className="text-center space-y-3">
      <Skeleton className="h-12 w-24 mx-auto" />
      <Skeleton className="h-5 w-32 mx-auto" />
    </div>
  );
};

// Table Row Skeleton
export const TableRowSkeleton = () => {
  return (
    <tr className="border-b border-gray-200">
      {[1, 2, 3, 4, 5].map((i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
};

// List Item Skeleton
export const ListItemSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
      <Skeleton className="w-12 h-12" rounded />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="w-20 h-8" />
    </div>
  );
};

// Add shimmer animation keyframes
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;
  document.head.appendChild(style);
}
