import { useState } from "react";
import {formFiltersCard} from '../../contentData';

import {translateType} from '../Staples/TranslateElement';

const possibleTypes = [
    'Skill Card',
    'Spell Card',
    'Trap Card',
    'Normal Monster',
    'Normal Tuner Monster',
    'Effect Monster',
    'Tuner Monster',
    'Flip Monster',
    'Flip Effect Monster',
    'Flip Tuner Effect Monster',
    'Spirit Monster',
    'Union Effect Monster',
    'Gemini Monster',
    'Pendulum Effect Monster',
    'Pendulum Normal Monster',
    'Pendulum Tuner Effect Monster',
    'Ritual Monster',
    'Ritual Effect Monster',
    'Toon Monster',
    'Fusion Monster',
    'Synchro Monster',
    'Synchro Tuner Monster',
    'Synchro Pendulum Effect Monster',
    'XYZ Monster',
    'XYZ Pendulum Effect Monster',
    'Link Monster',
    'Pendulum Flip Effect Monster',
    'Pendulum Effect Fusion Monster',
    'Token'
]

function FilterCards({language, onSubmit, values, setValues}) {
    const [n, setN] = useState(0);

    function findGetParameter(parameterName, defaultValue) {
      return new URLSearchParams(window.location.search).get(parameterName) ?? defaultValue;
    }

    const onChange = function(event) {
        let localValues = values;

        localValues[event.target.name] = event.target.value;

        setValues(localValues);
        setN(n+1);
    }

    const checkEnterKey = function(event) {
        if (event.key === 'Enter') {
            onSubmit();
        }
    }

    return (
        <div className="filterCardsContainer">
            <div className='form'>
                <input type='hidden' name='lang' value={language}/>
                <label>
                    {formFiltersCard[language][0]['label']}
                    <input 
                        type="text" 
                        id="fname" 
                        name="fname"
                        placeholder={formFiltersCard[language][0]['placeholder']}
                        value={values?.fname} 
                        onChange={onChange}
                        onKeyPress={checkEnterKey}
                    />
                </label>
                <label>
                    {formFiltersCard[language][1]['label']}
                    <select 
                        id="type" 
                        name="type" 
                        value={values?.type}
                        onChange={onChange}
                    >
                        <option value=''>{formFiltersCard[language][1]['defaultValue']}</option>
                        {
                            possibleTypes?.map(function(possibleType) {
                                return <option key={possibleType} value={possibleType}>
                                    {translateType(possibleType, language)}
                                </option>
                            }).sort()
                        }
                    </select>
                </label>
                <button className="cta cta-primary" onClick={onSubmit}>
                    {formFiltersCard[language][formFiltersCard[language].length - 1]['label']}
                </button>
            </div>
        </div>
    )
}

export default FilterCards;