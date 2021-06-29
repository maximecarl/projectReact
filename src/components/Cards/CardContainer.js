import MonsterCard from './MonsterCard';
import TrapAndSpellCard from './TrapAndSpellCard';
import SkillCard from './SkillCard';

function CardContainer({card, language, onClickCard}) {
    return (
        <li className="card" onClick={() => onClickCard(card.id)}>
            <div className="imgContainer">
                {
                    card.card_images[0]
                    ? <img id={card.card_images[0].id} src={card.card_images[0].image_url} alt=""/>
                    : ''
                }
            </div>
            <div className="textContainer">
                {
                    function() {
                        switch (true) {
                            case card.type.toUpperCase().includes('MONSTER'):
                                return <MonsterCard card={card} language={language}/>;
                            case card.type.toUpperCase().includes('TRAP') || card.type.toUpperCase().includes('SPELL'):
                                return <TrapAndSpellCard card={card} language={language}/>;
                            case card.type.toUpperCase().includes('SKILL'):
                                return <SkillCard card={card} language={language}/>;
                            default:
                                console.log('Type de carte inconnu : ' + card);
                                return '';
                        }
                    }()
                }
            </div>
        </li>
    )
}

export default CardContainer;