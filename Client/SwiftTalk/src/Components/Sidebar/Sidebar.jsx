// -----------------------------
// src/components/Sidebar/Sidebar.jsx
// -----------------------------
import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/Logo_swiftTalk.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  Moon,
  Sun,
  UserPlus,
  Settings,
  Edit,
  MessageCircle,
} from "lucide-react";
import { RxAvatar } from "react-icons/rx";
import SearchPerson from "../SearchPerson/SearchPerson";
import { logout, setTheme, setToken } from "../../redux/UserRedux";
import axios from "axios";

const Sidebar = () => {
  // ---------- Redux ----------
  const {
    Theme,                 
    SocketConnection,
    ...userState           
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // ---------- Local ----------
  const [openSearch, setOpenSearch] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const userEndRef = useRef(null);
  const navigate = useNavigate();

  // ---------- Side‑effects ----------
  useEffect(() => {
    // Apply DaisyUI theme to the whole document
    document.documentElement.setAttribute("data-theme", Theme);
  }, [Theme]);

  useEffect(() => {
    userEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allUsers]);

  useEffect(() => {
    if (!SocketConnection) return;

    SocketConnection.emit("sidebar", userState.user_id);
    SocketConnection.on("conversation", (data) => {
      const formatted = data.map((c) => ({
        ...c,
        userDetails:
          c.receiver._id !== userState.user_id ? c.receiver : c.sender,
      }));
      setAllUsers(formatted);
    });

    // cleanup
    return () => SocketConnection.off("conversation");
  }, [SocketConnection, userState.user_id]);

  // ---------- Handlers ----------
  const toggleTheme = () =>
    dispatch(setTheme(Theme === "light" ? "dark" : "light"));

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/logout",
        {},
        { withCredentials: true }
      );
      if (data.status === 200) {
        localStorage.clear();
        dispatch(logout());
        dispatch(setToken(null));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- Render ----------
  return (
    <div className="px-3 py-2 h-screen flex flex-col justify-between bg-base-100">
      {/* ---------- Header ---------- */}
      <header className="h-14 border-b-2 border-base-300 flex items-center justify-between">
        <div className="navbar-start">
            <Link 
              href="/" 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <MessageCircle className="h-5 w-5 text-primary-content" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-950 bg-clip-text text-transparent">
                SwiftTalk
              </span>
            </Link>
          </div>

        <Link
          to="/login"
          title="Logout"
          className="h-10 w-10 rounded-md flex items-center justify-center hover:bg-base-200"
        >
          <LogOut onClick={handleLogout} className="w-5 h-5" />
        </Link>
      </header>

      {/* ---------- Conversation list ---------- */}
      <section className="flex-1 overflow-y-auto">
        <div className="p-4 border-b-2 border-white/20 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-base-content">
              Messages
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-base-200"
                title="Toggle theme"
              >
                {Theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setOpenSearch(true)}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-base-200"
                title="Add person"
              >
                <UserPlus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {allUsers.map((c) => (
          <Link to={`/home/${c.userDetails._id}`} key={c.userDetails._id}>
            <div className="mx-1 my-1 mb-2 py-2 px-3 rounded-md flex items-center  hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer border-0 border-base-100 bg-base-200 hover:bg-base-300">
              {c.userDetails.photoUrl ? (
                <img
                  src={c.userDetails.photoUrl}
                  alt="Profile"
                  className="h-12 w-12 rounded-full"
                />
              ) : (
                <RxAvatar className="h-12 w-12 rounded-full" />
              )}

              <div className="flex flex-col  ml-3 flex-grow">
<p className={`${Theme === 'dark' ? 'text-white' : 'text-black'} font-semibold truncate`}>                  {c.userDetails.name || "Guest"}
                </p>
                <p className="text-xs line-clamp-1">
                  {c.lastMessage?.text || "📎 Attachment"}
                </p>
              </div>

              {c.countUnseen > 0 && (
                <span className="ml-auto badge badge-primary">
                  {c.countUnseen}
                </span>
              )}
            </div>
          </Link>
        ))}

        <div ref={userEndRef} />
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="p-4 border-t border-base-300 bg-base-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {userState.PhotoUrl ? (
              <img
                src={userState.PhotoUrl}
                alt={userState.username}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <RxAvatar className="h-10 w-10 rounded-full" />
            )}

            <div className="min-w-0">
              <p className="font-semibold text-base-content truncate">
                {userState.username || "Guest"}
              </p>
              <p className="text-xs text-success">Online</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-base-200"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-base-200"
              title="Edit profile"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {openSearch && <SearchPerson isOpen={() => setOpenSearch(false)} />}
    </div>
  );
};

export default Sidebar;
