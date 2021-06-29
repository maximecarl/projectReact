import {translateType} from '../Staples/TranslateElement';

function SkillCard({card, language}) {
    const {name, desc} = card;
    const {race} = card;

    return (
        <>
            <p className="title">{name} - {race}</p>
            <p>{translateType(card.type, language)} | Effet : </p>
            <div className="effectCard">
                {desc.split('\n').map(str => <p key={str}>{str}</p>)}
            </div>
        </>
    )
}

export default SkillCard;