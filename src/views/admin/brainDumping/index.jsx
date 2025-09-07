import SearchBar from "components/searchbar";
import React, { useState } from "react";

export default function FiltersDemo() {
  const [selectedOption, setSelectedOption] = useState({ label: "Raw", value: "raw" });

  return (
    <div className="flex h-[70vh] max-h-[70vh] w-full flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl">What in Your Mind Today?</h1>

      <div className="flex items-center justify-center">
        <div className="flex items-start gap-4">
          {/* Search input */}
          <SearchBar
            leftIcon="plus"
            dropdownOptions={[
              { label: "Title", value: "title" },
              { label: "Raw", value: "raw" },
              { label: "Author", value: "author" },
              { label: "Tags", value: "tags" },
            ]}
            size="xl"
            selectedOption={selectedOption}
            onSelectOption={setSelectedOption} // control state
          />
        </div>
      </div>
    </div>
  );
}
