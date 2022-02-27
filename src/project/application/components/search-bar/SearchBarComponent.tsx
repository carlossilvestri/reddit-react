import { useRef } from "react";
import "./search-bar.scss";

interface SearchBarProps {
  placeholder: string;
  handleSearch: (e: any) => void;
}

export const SearchBarComponent = ({
  placeholder,
  handleSearch,
}: SearchBarProps) => {
  const searchInput = useRef(null);
  return (
    <>
      <div>
        <div className="barra-container">
          <input
            type="text"
            className="btn-buscar"
            onClick={() => handleSearch(searchInput)}
          />
          <input
            type="search"
            className="barra-buscar"
            ref={searchInput}
            placeholder={placeholder}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch(searchInput);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
