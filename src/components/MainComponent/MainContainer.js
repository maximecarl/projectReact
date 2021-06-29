import Header from '../Header';
import QuickSearchButton from '../Buttons/QuickSearchButton';
import {contentData} from '../../contentData';

function MainContainer({language, menuData, setPagePath, setOutsideFilter}) {
    const selectedContentData = contentData[language][window.location.pathname];

    return (
      <section className="mainContainer-section">
          <Header language={language} menuData={menuData} setPagePath={setPagePath}/>
          {
            selectedContentData?.mainContainer?.title
            ?
            <>
              <h1 className="section-title">{selectedContentData.mainContainer.title}</h1>
              <p>{selectedContentData.mainContainer.content}</p>
              {
                selectedContentData.mainContainer.button
                ?
              (
                () => {
                  switch (selectedContentData?.mainContainer?.button?.type) {
                    case 'searchButton':
                      return <QuickSearchButton 
                        label={selectedContentData.mainContainer.button.label} 
                        language={language} 
                        className={"cta-primary"}
                        setPagePath={setPagePath}
                        setOutsideFilter={setOutsideFilter}
                        />
                    default:
                      return <button className="cta cta-primary">{selectedContentData.mainContainer.button.label}</button>;
                  }
                }
              )()
              : ''
              }
            </>
            : <>
              <h1 className="section-title">Erreur</h1>
              <p>La page que vous cherchez n'existe pas</p>
            </>
        }
      </section>
    );
  }
  
  export default MainContainer;