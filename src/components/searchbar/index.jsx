import React, { useState } from "react";
import { BsX, BsSearch, BsPlusCircle, BsCheck } from "react-icons/bs";

const SearchBar = ({
  placeholder = "What’s on your mind?",
  onSearch,
  value: controlledValue,
  onChange,
  size = "full",
  className = "",
  leftIcon = "search",
  showClearIcon = true,
  dropdownOptions = [],
  selectedOption, // <-- parent controls this
  onSelectOption, // <-- parent updates this
}) => {
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isControlled = controlledValue !== undefined;
  const searchValue = isControlled ? controlledValue : query;

  const handleChange = (e) => {
    const val = e.target.value;
    if (!isControlled) setQuery(val);
    onSearch?.(val);
    onChange?.(val);
  };

  const clearSearch = () => {
    if (!isControlled) setQuery("");
    onSearch?.("");
    onChange?.("");
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const sizeMap = {
    sm: "w-48",
    md: "w-80",
    lg: "w-96",
    xl: "w-[40rem]",
    full: "w-full",
  };

  const LeftIcon =
    leftIcon === "search"
      ? BsSearch
      : leftIcon === "plus"
      ? BsPlusCircle
      : null;

  return (
    <div className={`relative ${sizeMap[size]} ${className}`}>
      {/* Input */}
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search"
        className="w-full rounded-xl border py-3 pl-24 pr-10 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Left Icon */}
      {LeftIcon && (
        <button
          type="button"
          onClick={leftIcon === "plus" ? toggleDropdown : undefined}
          className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-2 text-gray-600 hover:text-gray-800"
          aria-label={leftIcon === "plus" ? "Toggle dropdown" : "Search icon"}
        >
          <LeftIcon size={20} />
          {leftIcon === "plus" && selectedOption && (
            <span className="text-sm font-medium">{selectedOption.label}</span>
          )}
        </button>
      )}

      {/* Clear button */}
      {showClearIcon && searchValue && (
        <button
          onClick={clearSearch}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <BsX size={20} />
        </button>
      )}

      {/* Dropdown menu */}
      {leftIcon === "plus" && (
        <div
          className={`absolute left-0 z-50 mt-2 w-52 origin-top rounded-lg border bg-white
      shadow-lg transition-all duration-200
      ${
        dropdownOpen
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-95 opacity-0"
      }`}
        >
          {dropdownOptions.length > 0 ? (
            dropdownOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onSelectOption?.(opt); // parent updates
                  setDropdownOpen(false);
                }}
                className={` flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                  selectedOption?.value === opt.value
                    ? "bg-gray-100 font-semibold"
                    : ""
                }`}
              >
                {opt.label}
                <span>
                  {selectedOption?.value === opt.value ? (
                    <BsCheck size={20} />
                  ) : (
                    ""
                  )}
                </span>
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">No options</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
