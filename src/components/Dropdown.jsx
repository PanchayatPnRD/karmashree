import { Children,cloneElement,useState, useRef, useEffect } from "react";
import classNames from "classnames";

// Dropdown Component
export const Dropdown = ({ children, Button }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  function handleClick(){
    setIsOpen(e=>!e)
    // onClick()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none "
          onClick={handleClick}
        >
          {Button}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1 divide-y"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* Render the children with the isVisible state and toggleVisibility function */}
            {Children.map(children, (child) =>
              cloneElement(child, { isOpen, setIsOpen })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Dropdown Item Component
export const DropdownItem = ({ children, onClick, className ,isOpen, setIsOpen}) => {
  
  function handleClick() {
    setIsOpen(!isOpen)
    onClick()
  }

  return (
    <a
      href="#"
      className={classNames(
        "flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        "focus:outline-none focus:bg-gray-100 focus:text-gray-900",
        className
      )}
      onClick={handleClick}
      role="menuitem"
    >
      {children}
    </a>
  );
};

// Usage Example



