import { useEffect, useState } from "react";
import NoResultElement from "../Staples/NoResultElement";
import ProgressBar from "../Staples/ProgessBar";

const API_PKM_URL = 'https://api.pokemontcg.io/v2/cards?q='
const pokemonTypeMatching = {
    '': "Colorless",
    'DARK': "Darkness",
    'DRAGON': "Dragon",
    'LIGHT': "Fairy",
    'EARTH': "Fighting",
    'FIRE': "Fire",
    'GRASS': "Grass",
    'WIND': "Lightning",
    'DIVINE': "Metal",
    'PSYCHIC': "Psychic",
    'WATER': "Water"
}

function CompareWithPokemon({card, language}) {
    const [error, setError] = useState(false);
    const [statePercent, setStatePercent] = useState(0);
    const [resultComparaison, setResultComparaison] = useState(null);
    const [values, setValues] = useState({});
    const [matchingValue, setMatchingValue] = useState(0);
    const [prices, setPrices] = useState([]);

    function searchPokmeonCard() {
        setStatePercent(40);
        let {type} = card;
        let arrayFilter = [];

        if (type.toUpperCase().includes('MONSTER')) {
            let {race, level, attribute, atk, def} = card;
            let globalForce = Math.round(
                (
                    atk / 1.5 
                    + (def ? def : 100) / 2
                )
            /100) * 10;

            let localValues = {
                'hp' : '[* TO ' + globalForce + ']',
                'types': race.toUpperCase().includes('DRAGON')
                    ? pokemonTypeMatching['DRAGON']
                    : pokemonTypeMatching[attribute] ?? 'Colorless'
            }
            setValues(localValues);
            for (let keyValue in localValues) {
                arrayFilter.push(
                    keyValue + ':' + localValues[keyValue]
                );
            }

            const fetchTypes = () => {
                fetch(encodeURI(
                        API_PKM_URL + arrayFilter.join(' AND ') + '&orderBy=-hp'
                    ))
                .then((response) => response.json())
                .then((data) => {
                    setStatePercent(60);
                    if (data?.data?.length) {
                        var calculatedMatchingValue = 0;
                        var calcultatedPrice = 0;
                        var nbPrices = 0;
                        for (let typeCard in data.data[0].tcgplayer.prices) {
                            for (let price in data.data[0].tcgplayer.prices[typeCard]) {
                                calcultatedPrice += data.data[0].tcgplayer.prices[typeCard][price];
                                nbPrices ++;
                            }
                        }
                        calcultatedPrice = (calcultatedPrice / nbPrices).toFixed(2);;
                        var calcultatedYGOPrice = 0;
                        nbPrices = 0;
                        card.card_prices.forEach(function(priceType) {
                            for (let price in priceType) {
                                calcultatedYGOPrice += parseFloat(priceType[price]);
                                nbPrices ++;
                            }
                        });
                        calcultatedYGOPrice = (calcultatedYGOPrice / nbPrices).toFixed(2);

                        //Matching the type (always true usually)
                        if (data.data[0].types.includes(localValues.types)) calculatedMatchingValue += 20;
                        //Matching Hp and strength
                        if (data.data[0].hp === globalForce) {
                            calculatedMatchingValue += 50;
                        }else {
                            calculatedMatchingValue += (50 - (globalForce / data.data[0].hp) * 12);
                        }
                        //Matching the price
                        var ratioPrice = Math.abs(calcultatedYGOPrice / calcultatedPrice);
                        calculatedMatchingValue += ratioPrice < 1 
                            ? 15 * ratioPrice
                            : ratioPrice < 15 
                                ? 15 - ratioPrice 
                                : 0;
                        //Power card with high atk and level because of the low chance to find same HP value
                        calculatedMatchingValue += (atk/683.26) * ((level ? level : 1)/4);
                    
                        setMatchingValue(calculatedMatchingValue.toFixed(1));
                        setPrices([ratioPrice.toFixed(1), calcultatedPrice, calcultatedYGOPrice]);
                        
                        setResultComparaison(data.data[0]);
                    }else {
                        setStatePercent(99);
    
                        setTimeout(function() {
                            setStatePercent(100);
                        }, 1000);
                    }
                }).catch((error) => {
                    console.log(error);
                    setError(true);
                    setStatePercent(100);
                });
            };
            fetchTypes();
        }else {
            let localValues = {
                'supertype': 'trainer'
            }
            setValues(localValues);

            for (let keyValue in localValues) {
                arrayFilter.push(
                    keyValue + ':' + localValues[keyValue]
                );
            }

            const fetchTypes = () => {
                fetch(encodeURI(
                        API_PKM_URL + arrayFilter.join(' AND ')
                    ))
                .then((response) => response.json())
                .then((data) => {
                    setMatchingValue(matchingValue + 50);

                    var sum = 1;
                    card.id
                        .toString()
                        .split('')
                        .forEach(function(partNumber) {
                            if (partNumber > 7) {
                                sum *= parseInt(partNumber);
                            }else {
                                sum += parseInt(partNumber);
                            }
                        });
                    if (sum > data.data.length && sum > 120) {
                        sum = Math.round(sum / 100);
                    }

                    setResultComparaison(sum < data.data.length
                        ? data.data[sum]
                        : data.data[1]);
                })
                .catch((error) => {
                    console.log(error);
                    setError(true);
                    setStatePercent(100);
                })
            }
            fetchTypes();
        }
    }

    const sendComparaison = function() {
        searchPokmeonCard();
        setStatePercent(1);

        setTimeout(function() {
            setStatePercent(statePercent + 10);
        });
    }

    useEffect(function() {
        if (resultComparaison) {
            setStatePercent(99);
    
            setTimeout(function() {
                setStatePercent(100);
            }, 1000);
        }
    }, [resultComparaison]);

    return (
        <div className='compareWithPokemonContainer'>
            {
                statePercent < 1
                ?
                    <div className='compareWithPokemonButtonContainer'>
                        <p>Trouver son équivalent Pokémon</p>
                        <button onClick={sendComparaison}>GO !</button>
                    </div>
                : ''
            }
            {
                statePercent > 0 && statePercent < 100
                ? <>
                    <ProgressBar percentage={statePercent} language={language}/>
                </>
                : ''
            }
            {
                statePercent > 99 
                ? resultComparaison 
                    ? matchingValue 
                        ?
                            <div className='compareWithPokemonResultContainer'>
                                <div className='compareWithPokemonResultMatchingValue'>
                                    {matchingValue}%
                                </div>
                                <img src={resultComparaison?.images.small} alt={resultComparaison.name}/>
                                {
                                    card.type.toUpperCase().includes('MONSTER')
                                    ? <>
                                        <div className='compareWithPokemonRaison'>
                                            <h2>Votre carte</h2>
                                            <p>
                                                Force évalué : {Math.round(
                                                    (
                                                        card.atk / 1.5 
                                                        + (card?.def ? card.def : 100) / 2
                                                    )
                                                /100) * 10}
                                            </p>
                                            <p>
                                                Type cohérent : {values.types}
                                            </p>
                                            <p>
                                                Ratio de prix : {prices[0]}x
                                            </p>
                                        </div>
                                    </>
                                    : ''
                                }
                                {
                                    card.type.toUpperCase().includes('SKILL')
                                    ? <>
                                        <div className='compareWithPokemonRaison'>
                                            <h2>Votre carte</h2>
                                            <p>
                                                Les cartes capacités sont très <br/>
                                                particulières et ne peuvent pas <br/>
                                                être comparés avec d'autres cartes.
                                            </p>
                                        </div>
                                    </>
                                    : ''
                                }
                                {
                                    card.type.toUpperCase().includes('SPELL') || card.type.toUpperCase().includes('TRAP')
                                    ? <>
                                        <div className='compareWithPokemonRaison'>
                                            <h2>Votre carte</h2>
                                            <p>
                                                Votre carte qui est une carte {card.type.toUpperCase().includes('SPELL') ? 'Magie' : 'Piège'} permet<br/>
                                                d'améliorer votre jeu, à l'image des cartes <br/>
                                                Pokémon Trainer.
                                            </p>
                                        </div>
                                    </>
                                    : ''
                                }
                                </div>
                        : <NoResultElement language={language}/>
                    : <NoResultElement language={language}/>
                : ''
            }   
            {
                error ? 'L\'API a renvoyé une erreur, veuillez réessayer plus tard' : ''
            }
        </div>
    )
}

export default CompareWithPokemon;