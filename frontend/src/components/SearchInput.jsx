import styled from "styled-components";

const SearchInput = () => {
  return (
    <StyledWrapper>
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Search"
        />
        <button className="search__button" aria-label="Search">
          <svg
            className="search__icon"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
            </g>
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .search {
    display: flex;
    align-items: center;
  }

  .search__input {
    background-color: #edebebff;
    border: none;
    color: #969696;
    font-size: 0.9rem;
    padding: 0.9rem 1rem;
    border-radius: 999px;
    width: 25em;
    transition: all 0.3s ease;
  }

  .search__input:focus {
    outline: none;
    background-color: #f0eeee;
    box-shadow: 0 0 0.5em #00000013;
  }

  .search__button {
    border: none;
    background: transparent;
    margin-left: -3.2rem;
    cursor: pointer;
  }

  .search__icon {
    height: 1.2em;
    width: 1.2em;
    fill: #999;
  }
`;

export default SearchInput;
