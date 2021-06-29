import React from 'react';

//menuData is at the end of the doc
function Header({language, menuData, setPagePath}) {

    return (
        <header className="header-allscreen">
            <div>
                <img src="" alt=""/>
                <ul>
                {
                    menuData?.filter(function(mapElement){
                        return mapElement.visible;
                    })?.map(function(mapElement){
                        return <li 
                            key={mapElement.path} 
                            id={mapElement.path}
                            onClick={() => {setPagePath(mapElement.path)}}
                            className={window.location.pathname === mapElement.path ? 'selected' : ''}
                        >
                            {mapElement.label[language]}
                        </li>;
                    })
                }
                </ul>
            </div>
        </header>
    );
}

export default Header;