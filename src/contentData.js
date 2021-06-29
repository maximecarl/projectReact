export const contentData = {
    'fr': {
        '/': {
            'mainContainer': {
                'title': 'Une gestion améliorée',
                'content': 'Utilisez l\'outil de recherche de cartes le plus intuitif et optimisé actuellement disponible',
                'button': {
                    'type': 'searchButton',
                    'label': 'Recherche rapide'
                }
            },
            'sections': [
                {
                    'id': 'reactApi',
                    'img': '/images/sectionReact.png',
                    'title': 'Mon utilisation de React',
                    'content': <div>
                            <p>J'ai utilisé 2 API différentes pour construire ce site : </p>
                            <ul>
                                <li style={{marginRight: '10px'}}><a className="cta cta-primary" href="https://db.ygoprodeck.com/api-guide/" target="_blank" rel="noreferrer">YGO PRO Deck</a></li>
                                <li><a className="cta cta-primary" href="https://docs.pokemontcg.io/" target="_blank" rel="noreferrer">Pokemon TCG</a></li>
                            </ul>
                            <p>
                                La première m'a permis de créer une liste complète des cartes Yu-Gi-Oh avec la possibilité de filtrer les résultats.
                                Pour y accéder, il vous suffit de cliquer sur l'onglet "Cartes".
                            </p>
                            <p>
                                La seconde API est utilisée dans le détail d'une carte. Pour y accéder :<br/>
                                1) Allez dans la liste des cartes avec l'onglet "Cartes", puis cliquez sur une carte ;<br/>
                                2) Cliquez le bouton de recherche de carte Pokémon, l'application recherche avec des filtres personnalisées la carte qui correspond 
                                au maximum à la carte Yu-Gi-Oh acutellement chargée.
                            </p>
                        </div>
                }
            ]
        },
        '/cards': {
            'mainContainer': {
                'title': 'Recherche des cartes',
                'content': 'Utilisez l\'outil de recherche de cartes le plus intuitif actuellement disponible'
            }
        },
        '/card': {
            'mainContainer': {
                'title': 'Détail de carte',
                'content': 'Vous trouverez ci-dessous toutes les informations concernant la carte que vous avez sélectionner'
            }
        },
        '/contact': {
            'mainContainer': {
                'title': 'Me contacter',
                'content': 'N\'hésitez pas à m\'envoyer un message si vous souhaitez échanger sur un sujet quelconque'
            },
            'form': ['Email', 'Titre', 'Message', 'Envoyer']
        }
    },
    'en': {
        '/': {
            'mainContainer': {
                'title': 'A better management',
                'content': 'Use the most intuitive card finder available',
                'button': {
                    'type': 'searchButton',
                    'label': 'Quick search'
                }
            },
            'sections': [
                {
                    'id': 'reactApi',
                    'img': '/images/sectionReact.png',
                    'title': 'How do I used React ?',
                    'content': <div>
                            <p>I used 2 different API to create this website : </p>
                            <ul>
                                <li><a className="cta cta-primary" href="https://db.ygoprodeck.com/api-guide/" rel="noreferrer">YGOPRODeck</a></li>
                                <li><a className="cta cta-primary" href="https://docs.pokemontcg.io/" target="_blank" rel="noreferrer">Pokemon TCG</a></li>
                            </ul>
                            <p>
                                The first one allowed me to create a complete list of Yu-Gi-Oh cards, with the ability to filter the results.
                                To access to it, simply click on the "Cards" tab.
                            </p>
                            <p>
                                The second API is used in the detail of a card. To get there :<br/>
                                1) Go to the list of cards with the "Cards" tab, then click on a card;<br/>
                                2) Click on the Pokémon card search button, the application searches with personalized filters the card that matches
                                the most to the currently loaded Yu-Gi-Oh card.
                            </p>
                        </div>
                }
            ]
        },
        '/cards': {
            'mainContainer': {
                'title': 'Search cards',
                'content': 'Use the most intuitive and optimized card finder available'
            }
        },
        '/card': {
            'mainContainer': {
                'title': 'Card details',
                'content': 'You will find below all the information about the card you have selected'
            }
        },
        '/contact': {
            'mainContainer': {
                'title': 'Contact me',
                'content': 'Do not hesitate to send me a message if you wish to discuss about any subject'
            },
            'form': ['Email', 'Title', 'Message', 'Send']
        }
    }
}

export const formFiltersCard = {
    'fr': [
        {
            'id': 'researchName',
            'label': 'Rechercher par nom',
            'placeholder': 'Ex: magicien sombre'
        },
        {
            'id': 'researchType',
            'label': 'Rechercher par type',
            'defaultValue': 'Tous les types'
        },
        {
            'id': 'submit',
            'label': 'Rechercher'
        }
    ],
    'en': [
        {
            'id': 'researchName',
            'label': 'Research by name',
            'placeholder': 'Ex: dark magician'
        },
        {
            'id': 'researchType',
            'label': 'Research by type',
            'defaultValue': 'All types'
        },
        {
            'id': 'submit',
            'label': 'Research'
        }
    ]
}

export const footerData = {
    'fr': 'Site réalisé par',
    'en': 'Website created by'
}

export const translationCards = {
    'fr': {
        'MONSTER': 'Monstre',
        'CARD': 'Carte',
        'NORMAL': 'Normal',
        'EFFECT': 'à Effet',
        'TUNER': 'Syntoniseur',
        'LINK': 'Lien',
        'PENDULUM': 'Pendule',
        'RITUAL': 'Rituel',
        'SPELL': 'Magie',
        'TRAP': 'Piège',
        'SPIRIT': 'Esprit',
        'TOKEN': 'Jeton',
        'SKILL': 'Capacité'
    }
}

export const staplesContent = {
    'fr': {
        'LOADING': 'Chargement...',
        'NO_RESULT': 'Pas de résultat',
        'PROCESS': 'Recherche en cours...'
    },
    'en': {
        'LOADING': 'Loading...',
        'NO_RESULT': 'No result',
        'PROCESS': 'Processing...'
    }
}