import Image from "next/image";

type ChonccIconProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 40,
};

export function ChonccIcon({ size = "md", className = "" }: ChonccIconProps) {
  const pixelSize = sizeMap[size];

  return (
    <Image
      src="/icon.svg"
      alt="Choncc"
      width={pixelSize}
      height={pixelSize}
      className={className}
      priority
    />
  );
}
