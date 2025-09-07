import React, { useState, useRef, useEffect } from "react";

function useOutsideAlerter(ref, setX) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, setX]);
}

const SelectDropdown = ({ options = [], placeholder = "Select an option" }) => {
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useOutsideAlerter(wrapperRef, setOpen);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-64">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center px-4 py-2 bg-white border rounded-lg shadow-sm"
      >
        <span>{selected ? selected.label : placeholder}</span>
        <span className="ml-2">▾</span>
      </button>

      {/* Dropdown list */}
      <div
        className={`absolute left-0 mt-1 w-full bg-white border rounded-lg shadow-lg transition-all duration-200 ease-in-out origin-top ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => handleSelect(opt)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectDropdown;
