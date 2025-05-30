# Guida Architettura Boolshop React (post-refactor)

## 1. Struttura delle cartelle principali

- **/components/**
  - Componenti riutilizzabili e atomici (es. filtri, card, grid, loader, error message)
  - Sottocartelle per gruppi logici: `/filters/`, `/albums/`
- **/hooks/**
  - Custom hook per fetch e stato di risorse (album, artisti, generi, range prezzo)
- **/contexts/**
  - Context per stato globale (filtri, loading, error)
- **/pages/**
  - Pagine principali (listing, dettaglio, carrello, ecc.)
- **/layout/**
  - Layout condivisi (header, footer, container)

## 2. Gestione filtri e stato

- **FilterContext**: gestisce lo stato globale dei filtri (formato, genere, artista, prezzo, ricerca, ordinamento).
- **useFilter**: custom hook per accedere e modificare i filtri da qualsiasi componente figlio del provider.
- **FilterProvider**: avvolge le pagine di listing per fornire lo stato filtri a tutti i componenti figli.

## 3. Fetch dati e custom hook

- **useAlbums(format, filter)**: recupera la lista album dal backend, opzionalmente filtrando per formato e altri parametri. Gestisce loading/error globali.
- **useGenres, useArtists, usePriceRange**: recuperano rispettivamente generi, artisti e range prezzo dal backend.
- Tutti i custom hook sono pensati per essere riutilizzabili e facilmente estendibili.

## 4. Componenti filtri

- **FormatSelect, GenreSelect, ArtistSelect**: select atomici per ogni filtro, ricevono dati e callback come props.
- **PriceRangeFilter**: wrapper per lo slider di prezzo, riceve min/max/value/onChange.
- **SearchInput**: input testuale con submit per la ricerca.
- **AlbumFilters**: (opzionale) wrapper che compone i filtri atomici.

## 5. Visualizzazione album

- **AlbumGrid**: visualizza la lista di album come griglia di card.
- **AlbumCard**: visualizza i dettagli di un singolo album.

## 6. Pagine di listing

- **AlbumListPage**: componente generico per tutte le pagine di listing (tutti, CD, vinili). Accetta prop `format` per filtrare lato backend. Tutta la logica di filtri, fetch e rendering è centralizzata qui.
- Le vecchie pagine duplicate (CardCd, CardVinyl) sono deprecate.

## 7. Gestione errori e loading

- **Loader**: spinner di caricamento riutilizzabile.
- **ErrorMessage**: messaggio di errore riutilizzabile.
- ContextLoader e ContextError permettono di gestire loading/error globali.

## 8. Best practice

- Tutta la logica di fetch e stato è separata dalla UI.
- I filtri sono istantanei (eccetto la ricerca testuale, che si applica solo al submit).
- Lo slider prezzo applica il filtro solo al rilascio.
- Tutti i componenti sono riutilizzabili e facilmente estendibili.
- La struttura delle cartelle è pensata per scalabilità e manutenzione.

## 9. Come aggiungere un nuovo filtro o feature

1. Aggiungi il nuovo campo nello stato del FilterContext.
2. Crea un nuovo componente filtro atomico in `/components/filters/`.
3. Integra il nuovo filtro in `AlbumListPage` e aggiorna la logica di filtraggio.
4. Se serve fetch dal backend, crea un nuovo custom hook in `/hooks/`.

## 10. Debug e troubleshooting

- Se un filtro non funziona, controlla che sia gestito sia nello stato del context che nella funzione di filtraggio.
- Se lo slider prezzo dà errore, verifica che i valori min/max siano numerici (vedi `usePriceRange`).
- Se la fetch fallisce, controlla che il backend sia avviato e che le rotte siano corrette.

---

Per domande o modifiche, segui la struttura e i pattern già presenti. Tutto il codice è pensato per essere leggibile, modulare e facilmente estendibile.
