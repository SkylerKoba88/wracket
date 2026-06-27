import { LitElement, html, css } from "lit";

export class SearchBar extends LitElement {
    static properties = {
        isSearchVisible: { type: Boolean }
    };

    constructor() {
        super();
        this.isSearchVisible = false;
    }

  static styles = css`
        .search-bar {
            display: flex;
            align-items: center;
            font-family: sans-serif;
            font-style: italic;
            font-size: 0.8rem;
            background-color: hsla(323, 100%, 88%, 0.75);
            width: fit-content;
            border-radius: 24px;
            justify-self: center;
            justify-content: center;
            margin: 1rem 0;
        }
        button {
            transition: background-color 0.6s ease;
            padding: 0.5rem;
            background: none;
            border: none;
            border-radius: inherit;
            flex-shrink: 0;
        }
        input#search-input {
            padding: 0.5rem;
            background-color: transparent;
            border: none;
            color: black;
            width: 200px;
            max-width: 200px;
            transform: translateX(0);
            transition: opacity 0.25s ease, transform 0.25s ease, width 0.25s ease;
            overflow: hidden;
        }
        #search-input::placeholder {
            color: black;
            opacity: 0.5;
            font-style: italic;
        }
        input#search-input.hidden {
            display: block;
            width: 0;
            max-width: 0;
            padding-left: 0;
            padding-right: 0;
            opacity: 0;
            transform: translateX(-8px);
            pointer-events: none;
        }
        input#search-input:focus {
            outline: none;
        }

    `

    onClick() {
        this.isSearchVisible = true;
        this.updateComplete.then(() => {
            const input = this.shadowRoot.querySelector('#search-input');
            if (input) {
                input.focus();
            }
        });
    }

    handleSearch() {
        const searchInput = this.shadowRoot.querySelector('input');
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log(`Searching for: ${searchTerm}`);
        }
    }

    renderResults() {
        fetch (`/search?query=${encodeURIComponent(this.shadowRoot.querySelector('input').value)}`)
            .then(response => response.json())
            .then(data => {
                console.log('Search results:', data);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    }

    render() {
        return html`
            <div class="search-bar">
                <button @click="${this.onClick}">
                    <img class="search-icon" src="/images/search-icon.svg" alt="search icon" width="25" height="25">
                </button>
                
                <input 
                    id="search-input" 
                    type="text" 
                    placeholder="Search..." 
                    class="${this.isSearchVisible ? '' : 'hidden'}"
                />
            </div>
        `
    }
}

customElements.define("search-bar", SearchBar);