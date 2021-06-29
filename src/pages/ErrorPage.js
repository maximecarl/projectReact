

function ErrorPage({setPagePath}) {
    const handleSetPage = (event) => {
        setPagePath(event.target.id);
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p>Vous pouvez retourner sur la page d'accueil en cliquant sur le bouton ci-dessous.</p>
            <button id="/" onClick={handleSetPage} className='cta cta-primary'>Retourner à l'accueil</button>
            <p>Si le problème persiste, vous pouvez nous contacter</p>
            <button id="/contact" onClick={handleSetPage} className='cta cta-grey'>Nous contacter</button>
        </div>
    );
}

export default ErrorPage;