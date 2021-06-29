import { useEffect, useState } from "react";
import CompareWithPokemon from "../../ComparePokemon/CompareWithPokemon";
import {translateType} from '../../Staples/TranslateElement';

function FullCard({card, language}) {
    const [selectedCard, setSelectedCard] = useState(card);
    const [loadedLanguage, setLoadedLanguage] = useState(language);

    useEffect(() => {
        //Loaded only if language is changed
        if (loadedLanguage !== language) {
            const fetchTypes = () => {
                fetch(encodeURI(
                        'https://db.ygoprodeck.com/api/v7/cardinfo.php'
                        + (language !== 'en' ? '?language=' + language : '') 
                        + (language !== 'en' ? '&' : '?')
                        + 'id=' + card.id
                        )
                    )
                .then((response) => response.json())
                .then((data) => {
                    setSelectedCard(data.data[0]);
                });
            };
            fetchTypes();
            setLoadedLanguage(language);
        }
    }, [language]);

    return (
        <>
            <div className='fullCard'>
                <img className='cardFullSize' id={selectedCard.card_images[0].id} src={selectedCard.card_images[0].image_url} alt=""/>
                <div className='cardContentContainer'>
                    <TitleCard card={selectedCard}/>
                    <DescriptionCard card={selectedCard} language={language}/>
                    <div style={{width: '100%', marginTop: '20px'}}>
                        <CompareWithPokemon card={selectedCard} language={language}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FullCard;


function TitleCard({card}) {
    return (
        <div className='cardTitlecontainer'>
            <h2 className='cardTitle'>
                {card.name} <br/>{
                    card?.name_en
                    ? <span className='originalTitle'>
                        ({card?.name_en})
                    </span>
                    : ''
                }
            </h2>
            {
                function() {
                    switch (true) {
                        case card.type.toUpperCase().includes('MONSTER'):
                            return <img src={process.env.PUBLIC_URL + '/images/attribute-' + card.attribute.toLowerCase() + '.png'} alt=''/>;
                        case card.type.toUpperCase().includes('TRAP') || card.type.toUpperCase().includes('SPELL'):
                            return <img src={process.env.PUBLIC_URL + '/images/attribute-' + card.race.toLowerCase() + '.png'} alt=''/>;
                        default:
                            return '';
                    }
                }()
            }
        </div>
    )
}

function DescriptionCard({card, language}) {
    return <div>
        <p>{translateType(card.type, language)}</p>
        <i>{card.desc}</i>
        {card.type.toUpperCase().includes('MONSTER')
            ? <p style={{textAlign: 'end'}}>ATK/{card.atk}  {card.type.toUpperCase().includes('LINK')
                ? <>LINK-{card.linkval}</>
                : <>DEF/{card.def}</>
            }</p>
            : ''
        }

        <div className='listArticlesContainer'>
            {card?.card_prices
                ? <article style={{flex: 1}}>
                    <h3>Prix le plus bas :</h3>
                    <ul>
                        <li>Amazon : {card.card_prices[0].amazon_price}€</li>
                        <li>CardMarket : {card.card_prices[0].cardmarket_price}€</li>
                        <li>Ebay : {card.card_prices[0].ebay_price}€</li>
                        <li>TCG Player : {card.card_prices[0].tcgplayer_price}€</li>
                    </ul>
                </article>
                : ''}

            {card?.card_sets?.length
                ? <article style={{flex: 2}}>
                    <h3>Obtenable dans les sets suivants :</h3>
                    <ul>
                        {card.card_sets.filter((cardSet) => {return cardSet.set_price > 0})
                        .map(function(cardSet, index) {
                            return <li key={cardSet.set_code + '_' + index}>
                                <p>{cardSet.set_name} ({cardSet.set_code}) : {cardSet.set_rarity}<br/>
                                Prix : {cardSet.set_price}
                                </p>
                            </li>
                        })}
                    </ul>
                </article>
                : ''}
        </div>
    </div>;
}