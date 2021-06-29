import { useEffect, useState } from 'react';
import {contentData} from '../contentData';

function ContactPage({language}){
    const selectedContentData = contentData[language]['/contact'];
    const [messageSend, setMessageSend] = useState(false);

    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        
        if (event.target.checkValidity()) {
            window.open(`mailto:mcarluer@myges.fr?subject=${title}&body=${content}`, '_blank').focus();
            setMessageSend(true);
            setEmail('');
            setTitle('');
            setContent('');

            setTimeout(() => {
                setMessageSend(false);
            }, 2000);
        }
    }

    return (
        <form 
            method='POST'
            onSubmit={onSubmit}
        >
            <label>
                {selectedContentData?.form[0]} <input name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
            </label>
            <label>
                {selectedContentData?.form[1]} <input name="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} required/>
            </label>
            <label>
                {selectedContentData?.form[2]} <textarea name="content" value={content} onChange={(event) => setContent(event.target.value)} required></textarea>
            </label>
            {
                messageSend
                ? <p style={{textAlign: 'center', color: '#32BF10'}}>{language === 'fr'
                        ? 'Message envoyé'
                        : 'Message sent'}</p>
                : <input className="cta cta-primary" type="submit" value={selectedContentData?.form[3]}/>
            }
        </form>
    );
}

export default ContactPage;