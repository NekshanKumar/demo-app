import { NavLink } from "react-router-dom";
import { MdDashboard, MdSpaceDashboard, MdPerson, MdPersonOutline } from "react-icons/md";

const menu = [
  { label: "Dashboard", path: "/dashboard", filledIcon: MdDashboard, outlineIcon: MdSpaceDashboard },
  { label: "User Profile", path: "/userProfile", filledIcon: MdPerson, outlineIcon: MdPersonOutline }
];

export default function Sidebar() {
  return (
    <aside className="h-screen shadow-sidebar p-6 hidden md:flex md:flex-col ">
      <div className="font-bold text-lg text-primary600 mb-4">MyApp</div>
      <nav className="flex-1 mt-[64px]">
        {menu.map(m => (
          <NavLink
            key={m.path}
            to={m.path}
            className={({ isActive }) =>
              `block w-full text-left px-4 py-2 my-2 rounded-lg transition-colors flex mt-4 items-center text-lg font-medium ${
                isActive
                  ? "bg-primary100 font-semibold text-primary600"
                  : "hover:bg-primary200 text-neutral500 group-hover:text-primary500"
              }`
            }
          >
            {({ isActive }) => {
              const IconComponent = isActive ? m.filledIcon : m.outlineIcon;
              return (
                <>
                  <span className="mr-2">
                    <IconComponent />
                  </span>
                  {m.label}
                </>
              );
            }}
          </NavLink>
        ))}
      </nav>
      <div className="mt-4 text-xs text-gray-500">v1.0.0</div>
    </aside>
  );
}
