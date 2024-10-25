import Link from "next/link";

const Nav = () => {
  return (
    <header className="w-full h-24 px-6 flex justify-between items-center bg-gray-900 shadow-md">
      <Link href="/" className="text-3xl font-bold text-white">
        Brand
      </Link>
      <div className="flex items-center gap-8">
        <input
          type="text"
          placeholder="Search..."
          className="h-9 w-64 px-4 text-sm text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link
          href="/"
          className="text-white font-semibold text-md hover:text-blue-400 transition-colors"
        >
          Sign out
        </Link>
      </div>
    </header>
  );
};

export default Nav;
