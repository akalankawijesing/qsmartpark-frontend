
type Props = {
    firstName: string;
    lastName: string;
    className?: string;
}

export default function InitialsAvatar({ firstName, lastName, className = '' }: Props) {
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
  const charCodeSum = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
  const bgColor = colors[charCodeSum % colors.length];

  return (
    <div
      className={`${bgColor} text-white rounded-xl flex items-center justify-center font-bold select-none ${className}`}
      title={`${firstName} ${lastName}`}
    >
      {initials}
    </div>
  );
}
