import SearchBar from "components/searchbar";
import { useAddTodo } from "../../../features/todos/hooks/useAddTodo";
import React, { useState } from "react";

export default function FiltersDemo() {
  const { addTodo, isLoading } = useAddTodo();
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    label: "Raw",
    value: "raw",
  });

  const handleSubmit = (searchValue) => {
    const data = {
      title: searchValue, // comes from input
      isCompleted: false,
      category: selectedOption?.label, // comes from dropdown
    };
    addTodo(data);
    setSearchValue(""); // clear input after submit
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex h-[70vh] max-h-[70vh] w-full flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl">What in Your Mind Today?</h1>

      <div className="flex items-center justify-center">
        <div className="flex items-start gap-4">
          {/* Search input */}
          <SearchBar
            value={searchValue} // controlled
            onChange={setSearchValue}
            onSubmit={handleSubmit}
            leftIcon="plus"
            dropdownOptions={[
              { label: "Title", value: "title" },
              { label: "Raw", value: "raw" },
              { label: "Author", value: "author" },
              { label: "Tags", value: "tags" },
            ]}
            size="xl"
            selectedOption={selectedOption}
            onSelectOption={setSelectedOption}
          />
        </div>
      </div>
    </div>
  );
}
