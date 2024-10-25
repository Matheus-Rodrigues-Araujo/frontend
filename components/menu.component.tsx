import Link from "next/link";

const Menu = () => {
    return (
      <nav>
        <div className="p-4 bg-gray-100 w-56 rounded-md min-h-screen shadow-md">
          <ul className="space-y-2">
            <li className="text-lg">
              <Link href="" className="text-blue-600 hover:text-blue-800">
                Products
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  };

export default Menu;
