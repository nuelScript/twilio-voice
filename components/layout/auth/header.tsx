import Image from "next/image";

interface HeaderProps {
  heading: string;
  label: string;
}

export const Header = ({ label, heading }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="relative w-[180px] h-[31px] mb-6">
        <Image
          src="/assets/logo.svg"
          alt="speak-out-for-children-logo"
          className="object-contain"
          fill
          sizes="100%"
        />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{heading}</h1>
        <p className="text-gray-500">{label}</p>
      </div>
    </div>
  );
};
