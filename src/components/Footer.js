import {footerData} from '../contentData';

function Footer({language, setLanguage}) {
    return (
        <footer>
            <p>{footerData[language]} Maxime Carluer</p>
            <select onChange={setLanguage} value={language}>
                <option value='fr'>🇫🇷 Français</option>
                <option value='en'>🇬🇧 English</option>
            </select>
        </footer>
    );
}

export default Footer;