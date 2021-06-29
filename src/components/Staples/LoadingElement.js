import {staplesContent} from '../../contentData';

function LoadingElement({language}) {
    return <div className="loadingContainer">
        <div>
            <img src={process.env.PUBLIC_URL + '/images/eye.png'} alt=""/>
            <img src={process.env.PUBLIC_URL + '/images/loading.png'} alt=""/>
        </div>
        {staplesContent[language]['LOADING']}
    </div>
}

export default LoadingElement;