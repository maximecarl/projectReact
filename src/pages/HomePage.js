import SectionImage from '../components/Sections/SectionImage';
import {contentData} from '../contentData';

function HomePage({language}) {
    const selectedContentData = contentData[language]['/'];

    return (
        <>
            {
                selectedContentData?.sections 
                ?
                    selectedContentData.sections.map(function(section) {
                        return <SectionImage 
                            key={section?.id}
                            imageImportant={section.img}
                            title={section.title}
                            content={section.content}
                            />;
                    })
                : ''
            }
        </>
    );
}

export default HomePage;