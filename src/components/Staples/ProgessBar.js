import {staplesContent} from '../../contentData';

function ProgressBar({percentage, language}) {

    return (
        <div className='progressBarWrapper'>
            <p>{staplesContent[language]['PROCESS']}</p>
            <div className='progressBarContainer'>
                <div></div>
                <div style={{width: percentage + '%'}}></div>
            </div>
        </div>
    )
}

export default ProgressBar;