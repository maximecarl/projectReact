import {translateType} from '../Staples/TranslateElement';

function TrapAndSpellCard({card, language}) {
    const {name, race, type, desc} = card;

    return (
        <>
            <div className="title">
                <p>{name}</p>
                <img src={process.env.PUBLIC_URL + '/images/attribute-' + race.toLowerCase() + '.png'} alt=''/>
            </div>
            <p>{translateType(type, language) ?? type} | Effet : </p>
            <div className="effectCard">
                {desc.split('\n').map(str => <p key={str}>{str}</p>)}
            </div>
        </>
    )
}

export default TrapAndSpellCard;