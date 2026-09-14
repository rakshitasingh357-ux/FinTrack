import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Target,
  FileText,
  ChartNoAxesCombined,
  User,
  Settings,
  LogOut,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={17} />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <ArrowLeftRight size={17} />,
    },
    {
      name: "Budgets",
      path: "/budgets",
      icon: <Wallet size={17} />,
    },
    {
      name: "Goals",
      path: "/goals",
      icon: <Target size={17} />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FileText size={17} />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <ChartNoAxesCombined size={17} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={17} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={17} />,
    },
  ];

  return (
    <nav className="navbar">
      <div
        className="navbar-brand"
        onClick={() => navigate("/")}
      >
        <div className="brand-icon">
          F
        </div>

        <span>FinTrack</span>
      </div>

      <div className="navbar-links">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            {link.icon}

            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        <LogOut size={18} />
      </button>
    </nav>
  );
}

export default Navbar;