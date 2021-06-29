function SectionImage({imageImportant, title, content}) {
    return (
        <section className="imageContainer-section">
            <div className="imageContainer">
                <img src={process.env.PUBLIC_URL + imageImportant} alt=''/>
            </div>
            <div className="textContainer">
                <h1>{title}</h1>
                {content}
            </div>
        </section>
    );
}

export default SectionImage;