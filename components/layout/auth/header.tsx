interface HeaderProps {
  heading: string;
  label: string;
}

export const Header = ({ label, heading }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{heading}</h1>
        <p className="text-gray-500">{label}</p>
      </div>
    </div>
  );
};
