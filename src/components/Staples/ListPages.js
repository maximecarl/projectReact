import { useEffect, useState } from "react";

function ListPages({data, pageIndex, setNbResult, goToPage}) {
    const [nbLocalResult, setLocalNbResult] = useState(10);
    const [listButtons, setListButtons] = useState([]);

    const handleSetNbResult = function(event) {
        setNbResult(event);
        setLocalNbResult(event.target.value);
    }


    function setPagesIndexes() {
        let lastValuePossible = Math.ceil(data.length / nbLocalResult);
        let maxIndex = Math.ceil(data.length / nbLocalResult);

        var listValues = [];
        var showFirstEllipsis = false;
        var showLastEllipsis = false;
        var showFirst = true;
        var showLast = true;
        switch (true) {
            case maxIndex <= 3:
                listValues = [1,2,3].slice(0, maxIndex);
                showFirst = false;
                showLast = false;
                showFirstEllipsis = false;
                showLastEllipsis = false;
                break;
            case pageIndex < 3:
                listValues = [1,2,3, parseInt(pageIndex) + 1];
                showFirst = false;
                showLastEllipsis = true;
                break;
            case ((maxIndex - pageIndex) < 2):
                listValues = [maxIndex - 2, maxIndex - 1, maxIndex, maxIndex];
                showLast = false;
                showFirstEllipsis = true;
                break;
            default:
                listValues = [parseInt(pageIndex) - 1, pageIndex, parseInt(pageIndex) + 1, parseInt(pageIndex) + 1];
                showLastEllipsis = true;
                showFirstEllipsis = true;
                break;
        }

        let localListButtons = [
            {
                'name': 'previous',
                'value': pageIndex > 1 ? pageIndex - 1 : 1,
                'isVisible': maxIndex > 1
            },
            {
                'name': 'first',
                'value': 1,
                'isVisible': showFirst
            },
            {
                'name': 'ellipsis',
                'value': '...',
                'ellipsisName': 'firstEllipsis',
                'isVisible': showFirstEllipsis
            },
            {
                'name': 'possible1',
                'value': listValues[0],
                'isVisible': listValues[0]
            },
            {
                'name': 'possible2',
                'value': listValues[1],
                'isVisible': listValues[1]
            },
            {
                'name': 'possible3',
                'value': listValues[2],
                'isVisible': listValues[2]
            },
            {
                'name': 'ellipsis',
                'value': '...',
                'ellipsisName': 'lastEllipsis',
                'isVisible': showLastEllipsis
            },
            {
                'name': 'last',
                'value': lastValuePossible,
                'isVisible': showLast
            },
            {
                'name': 'next',
                'value': listValues[listValues.length - 1],
                'isVisible': maxIndex > 1
            }
        ];

        setListButtons(localListButtons);
    }

    const changePage = function(valuePage) {
        goToPage(valuePage);
    }

    function findGetParameter(parameterName, defaultValue) {
        return new URLSearchParams(window.location.search).get(parameterName) ?? defaultValue;
    }
    useEffect(function() {
        let queryResult = findGetParameter('nbResult', 10);
        handleSetNbResult({target: {value: queryResult}});
    }, []);

    useEffect(function() {
        setPagesIndexes();
    }, [nbLocalResult, pageIndex]);

    return (
        data 
        ? <div className="listPagesContainer">
            <div>
                {
                    listButtons?.filter(function(buttonElement){
                        return buttonElement.isVisible;
                    })
                    ?.map(function(buttonElement) {
                        if (buttonElement.name === 'ellipsis') return <button key={buttonElement.ellipsisName} className="ellipsisButton">...</button>;
                        return <button onClick={function() {changePage(buttonElement.value)}} key={buttonElement.name} 
                            className={(pageIndex === buttonElement.value ? 'selected' : '')
                                + (buttonElement.name === 'previous' ? ' previous': '')
                                + (buttonElement.name === 'next' ? ' next': '')
                            }
                            >
                            {
                                buttonElement.name === 'previous'
                                ? '<'
                                : buttonElement.name === 'next' 
                                    ? '>'
                                    : buttonElement.value
                            }
                        </button>;
                    })
                }
            </div>
            <div>
                <label>
                    <select onChange={handleSetNbResult} value={nbLocalResult}>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='20'>20</option>
                        <option value='30'>30</option>
                        <option value='50'>50</option>
                    </select>
                    Cartes / Page
                </label>
            </div>
        </div>
        : ''
    )
}

export default ListPages;