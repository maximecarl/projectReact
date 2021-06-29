import { useEffect, useState } from 'react';
import CardContainer from './CardContainer';
import ListPages from '../Staples/ListPages';

function ResultCardList({data, language, onClickCard}) {
    const [dataToShow, setDataToShow] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [nbResult, setNbResult] = useState(10);

    function findGetParameter(parameterName, defaultValue) {
        return new URLSearchParams(window.location.search).get(parameterName) ?? defaultValue;
    }

    const goToPage = function(pageIndexObtained) {
        let localPageIndex = pageIndexObtained > 1 ? pageIndexObtained : 1;

        let begin = (localPageIndex - 1) * nbResult;
        let end = localPageIndex * nbResult;

        setPageIndex(localPageIndex);
        setDataToShow(data.length ? data.slice(begin, end) : []);
    }

    useEffect(function() {
        goToPage(parseInt(findGetParameter('pageIndex'), 1));
    }, [nbResult, language]);

    const handleSetNbResultParent = function(event) {
        setNbResult(event.target.value);
    }

    return (
        <div className="cardsListContainer">
            <ul className="cardsList">
                {
                    dataToShow.map(function(card) {
                        return <CardContainer 
                            key={card.id} 
                            card={card} 
                            language={language} 
                            onClickCard={onClickCard}
                        />
                    })
                }
            </ul>
            <ListPages data={data} pageIndex={pageIndex} setNbResult={handleSetNbResultParent} goToPage={goToPage}/>
        </div>
    )
}

export default ResultCardList;