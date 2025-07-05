

import { useState } from "react"
import { Menu, MessageCircle } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = useLocation().pathname

  const navItems = [
    { href: "/feature", label: "Features" },
    { href: "/privacy", label: "Privacy" },
    { href: "/help", label: "Help Center" },
  ]

  const isAuthPage = pathname === "/login" || pathname === "/register"

  const ThemeToggle = () => {
    const toggleTheme = () => {
      const html = document.documentElement
      if (html.getAttribute("data-theme") === "dark") {
        html.setAttribute("data-theme", "light")
      } else {
        html.setAttribute("data-theme", "dark")
      }
    }

    return (
      <button 
        onClick={toggleTheme}
        className="btn btn-ghost btn-circle"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5">
          <span className="block dark:hidden">🌞</span>
          <span className="hidden dark:block">🌙</span>
        </div>
      </button>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-base-100/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="navbar h-16">
          {/* Logo */}
          <div className="navbar-start">
            <Link 
              to="/" 
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

          {/* Desktop Navigation */}
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1 space-x-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    to={item.href}
                    className="font-medium hover:text-primary relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side actions */}
          <div className="navbar-end space-x-2">
            <ThemeToggle />

            {/* Auth buttons for desktop */}
            <div className="hidden md:flex space-x-2">
              {isAuthPage ? (
                <Link 
                  to={pathname === "/login" ? "/register" : "/login"}
                  className="btn btn-outline"
                >
                  {pathname === "/login" ? "Sign Up" : "Sign In"}
                </Link>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                className="btn btn-ghost btn-circle"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`drawer drawer-end ${isOpen ? "fixed inset-0 z-[60]" : ""}`}>
        <input 
          id="mobile-drawer"
          type="checkbox" 
          className="drawer-toggle" 
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="drawer-side">
          <label 
            htmlFor="mobile-drawer" 
            className="drawer-overlay"
            onClick={() => setIsOpen(false)}
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
            {/* Close button */}
            <button 
              className="btn btn-ghost btn-circle absolute right-2 top-2"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            {/* Navigation items */}
            <div className="mt-12 space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    to={item.href}
                    className="text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </div>

            {/* Auth buttons */}
            <div className="border-t mt-4 pt-4 space-y-2">
              {isAuthPage ? (
                <Link 
                  to={pathname === "/login" ? "/register" : "/login"}
                  className="btn btn-primary w-full"
                  onClick={() => setIsOpen(false)}
                >
                  {pathname === "/login" ? "Sign Up" : "Sign In"}
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="btn btn-outline w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn btn-primary w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </header>
  )
}