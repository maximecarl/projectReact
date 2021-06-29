import { useEffect, useState } from "react";
import FullCard from "../components/Cards/FullInfos.js/FullCard";
import LoadingElement from '../components/Staples/LoadingElement';
import NoResultElement from '../components/Staples/NoResultElement';

const API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

function CardPage({language, selectedCard}){
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchCard = function() {
        let cardId = selectedCard;

        let lastCalled = true;
        setLoading(true);
        const fetchTypes = () => {
            fetch(encodeURI(
                    API_URL 
                    + (language !== 'en' ? '?language=' + language : '') 
                    + (language !== 'en' ? '&' : '?')
                    + 'id=' + cardId
                    )
                )
            .then((response) => response.json())
            .then((data) => {
                if (!data?.data?.length) return;
                
                lastCalled && setCard(data.data[0]);
                setLoading(false);
            });
        };
        fetchTypes();
    }

    useEffect(function() {
        searchCard();
    }, []);
    
    return(
        <>
            {
                loading
                ? <LoadingElement language={language}/>
                : card
                    ? <FullCard card={card} language={language}/>
                    : <div className='noResultWrapper'>
                        <NoResultElement language={language}/>
                        </div>
            }
        </>
    );
}

export default CardPage;