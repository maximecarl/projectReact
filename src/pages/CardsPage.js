import { useEffect, useState } from 'react';
import ResultCardList from '../components/Cards/ResultCardList';
import FilterCards from '../components/Filters/FilterCards';
import LoadingElement from '../components/Staples/LoadingElement';
import NoResultElement from '../components/Staples/NoResultElement';

const API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

function CardsPage({language, setPagePath, setSelectedCard, outsideFilter}){
    const [dataCards, setDataCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterValues, setFilterValues] = useState({
        'fname': outsideFilter?.fname ?? '',
        'type': ''
    });
    
    useEffect(function() {
        searchCard();
    }, [language]);

    function buildFilters() {
        let arrayParams = [];
        for (let param in filterValues) {
            if (filterValues[param] && filterValues[param] !== '') {
                arrayParams.push(
                    param + '=' + filterValues[param]
                );
            }
        }

        return arrayParams.join('&');
    }

    const searchCard = function() {
        let lastCalled = true;
        setLoading(true);
        const fetchTypes = () => {
            fetch(encodeURI(
                    API_URL 
                    + (language !== 'en' ? '?language=' + language : '') 
                    + (language !== 'en' ? '&' : '?')
                    + buildFilters()
                    )
                )
            .then((response) => response.json())
            .then((data) => {
                lastCalled && setDataCards(data.data ?? []);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error : ' + error);
            });
        };
        fetchTypes();
    }

    const onClickCard = (idCard) => {
        setSelectedCard(idCard);
        setPagePath('/card');
    }

    return (
        <div className="doubleContainers">
            {
                loading
                ? <LoadingElement language={language}/>
                : <>
                    <FilterCards language={language} onSubmit={searchCard} values={filterValues} setValues={setFilterValues}/>
                    {
                        dataCards.length
                        ? <ResultCardList 
                            data={dataCards} 
                            language={language} 
                            onClickCard={onClickCard}
                            />
                        : <div className='noResultWrapper'>
                            <NoResultElement language={language}/>
                            </div>
                    }
                </>
            }
        </div>
    );
}

export default CardsPage;