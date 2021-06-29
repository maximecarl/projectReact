import {translateType} from '../Staples/TranslateElement';

function MonsterCard({card, language}) {
    const {name, desc, type, attribute} = card;
    const {atk, def} = card;

    return (
        <>
            <div className="title">
                <p>{name}</p>
                <img src={process.env.PUBLIC_URL + '/images/attribute-' + attribute.toLowerCase() + '.png'} alt=''/>
            </div>
            <p>{translateType(type, language)} | {type.toUpperCase().includes('NORMAL') ? 'Description' : 'Effet'} :</p>
            <div className="effectCard">
                {desc.split('\n').map(str => <p key={str}>{str}</p>)}
            </div>
            <p className='atkAndDefCard'>ATK/{atk}  {type.toUpperCase().includes('LINK')
                    ? <>LINK-{card.linkval}</>
                    : <>DEF/{def}</>
                }
            </p>
        </>
    )
}

export default MonsterCard;