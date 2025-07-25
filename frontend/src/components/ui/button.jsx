export function Button({ children, className, size, variant, ...props }) {
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-3 text-lg",
    icon: "p-2",
  };

  const variants = {
    outline: "border border-gray-300 hover:bg-gray-100",
    solid: "bg-blue-500 text-white hover:bg-blue-600",
  };

  return (
    <button
      className={`rounded-lg transition ${sizes[size] || sizes.md} ${
        variants[variant] || variants.solid
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
