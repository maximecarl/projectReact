import React, { useState } from "react";

function QuickSearchButton({label, className, setPagePath, setOutsideFilter}) {
    const searchInput = React.useRef(null);

    const [searchValue, setSearchValue] = useState('');

    const onClickSearch = function() {
      if (document.activeElement === searchInput.current) return;
      quickSearchCard();
    }
    
    const handleSearch = function(event) {
      setSearchValue(event.target.value);
    }

    const checkEnterKey = function(event) {
      if (event.key === 'Enter') {
        quickSearchCard();
      }
    }

    function quickSearchCard() {
      if (searchValue === '') return;

      setOutsideFilter({'fname': searchValue})
      setPagePath('/cards');
    }


    return (
      <button 
        className={[className, 'quickSearchButton'].join(' ')}
        onClick={onClickSearch}
    >
          {label}
          <input 
            value={searchValue} 
            ref={searchInput}
            onChange={handleSearch} 
            onKeyPress={checkEnterKey} 
            type="text"
          />
      </button>
    );
  }
  
  export default QuickSearchButton;