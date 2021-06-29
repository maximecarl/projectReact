import {translationCards} from '../../contentData';

export function translateType(typeCard, language) {
    if (language === 'en') return typeCard;
    const exploadedType = typeCard.split(' ');
    if (typeCard.toUpperCase().includes('MONSTER')) {
        return translationCards[language]['MONSTER'] + ' ' + exploadedType.map(function(typeElement) {
            if (typeElement.toUpperCase() === 'MONSTER') return '';
            return translationCards[language][typeElement.toUpperCase()] ?? typeElement;
        }).join(' ');
    }else if (typeCard.toUpperCase().includes('CARD')) {
        return translationCards[language]['CARD'] + ' ' + exploadedType.map(function(typeElement) {
            if (typeElement.toUpperCase() === 'CARD') return '';
            return translationCards[language][typeElement.toUpperCase()] ?? typeElement;
        }).join(' ');
    }else {
        return exploadedType.map(function(typeElement) {
            if (typeElement.toUpperCase() === 'CARD') return '';
            return translationCards[language][typeElement.toUpperCase()] ?? typeElement;
        }).join(' ');
    }
}