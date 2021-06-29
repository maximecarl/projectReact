import {staplesContent} from '../../contentData';

function NoResultElement({language}) {
    return <div className="noResultContainer">
        <div>
            <img src={process.env.PUBLIC_URL + '/images/eye.png'} alt=""/>
        </div>
        {staplesContent[language]['NO_RESULT']}
    </div>
}

export default NoResultElement;