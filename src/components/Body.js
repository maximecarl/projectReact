import MainContainer from '../components/MainComponent/MainContainer';
import React, { useEffect, useState } from 'react';
import HomePage from '../pages/HomePage';
import CardsPage from '../pages/CardsPage';
import CardPage from '../pages/CardPage';
import ContactPage from '../pages/ContactPage';
import ErrorPage from '../pages/ErrorPage';

function Body({language}) {
    const [pagePath, setPagePath] = useState(null);
    const [page, setPage] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [outsideFilter, setOutsideFilter] = useState(null);

    //If user refresh the page
    useEffect(() => {
        handleSetPagePath(
            window.location.pathname !== '/card'
            ? window.location.pathname
            : '/cards'
        );
    }, []);

    //If user use the browser previous or next button
    window.onpopstate = ()=> {
        setPagePath(window.location.pathname);
    };

    //If page or language changed
    useEffect(() => {
        let props = {
            language: language,
            setPagePath: handleSetPagePath,
            setSelectedCard: setSelectedCard
        }

        if (pagePath === '/cards') {
            props.outsideFilter = outsideFilter;
        }else {
            setOutsideFilter(null);
        }

        const ComponentName = menuData.filter(function(mapElement) {
            return mapElement.path === pagePath
        })[0]?.component;
        
        setPage(React.createElement(ComponentName ?? ErrorPage, props));
    }, [pagePath, language]);

    const handleSetPagePath = (path) => {
        if (path === pagePath) return;

        setPagePath(path);

        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popState'));
    }

    return (
        <main>
            {
                page
                ? <>
                    <MainContainer 
                        language={language} 
                        menuData={menuData} 
                        setPagePath={handleSetPagePath}
                        setOutsideFilter={setOutsideFilter}
                        />
                    {selectedCard && pagePath === '/card'
                        ? <CardPage language={language} selectedCard={selectedCard}/>
                        : page
                    }
                </>
                : ''
            }
        </main>
    );
}

export default Body;

const menuData = [
    {
        'path': '/',
        'component': HomePage,
        'label': {
            'fr': 'Accueil',
            'en': 'Home'
        },
        'visible': true
    },
    {
        'path': '/cards',
        'component': CardsPage,
        'label': {
            'fr': 'Cartes',
            'en': 'Cards'
        },
        'visible': true
    },
    {
        'path': '/decks',
        'label': {
            'fr': 'Decks',
            'en': 'Decks'
        },
        'visible': false
    },
    {
        'path': '/banlist',
        'label': {
            'fr': 'Banlist',
            'en': 'Banlist'
        },
        'visible': false
    },
    {
        'path': '/contact',
        'component': ContactPage,
        'label': {
            'fr': 'Contact',
            'en': 'Contact'
        },
        'visible': true
    }
]