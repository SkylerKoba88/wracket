import { LitElement, html, css } from "lit";
import "./item-preview.js";

//change scrolling to be an arrow for desktop and keep draggable for mobile

export class InventoryContainer extends LitElement {
    static properties = {
        items: { type: Array },
        searchQuery: { type: String },
        selected: { type: String }
    };

    constructor() {
        super();
        this.items = [];
        this.searchQuery = '';
        this.selected = 'apparel';
        this.isDragging = false;
        this.dragStartX = 0;
        this.scrollStartX = 0;
    }

    static styles = css`
        *, *::before, *::after {
            box-sizing: border-box;
        }

        .inventory-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: min(100%, calc(100vw - 2rem));
            max-width: 100vw;
            overflow: hidden;
            margin: 1rem auto;
        }
        div.tabs {
            display: flex;
            width: 100%;
        }
        button {
            font-family: "Freedom";
            text-align: center;
            font-size: 1.2rem;
            padding: 0.5rem 2rem;
            border: none;
            flex: 1 1 0;
            min-width: 0;
            background-color: var(--tint);
        }
        button:hover {
            background-color: var(--transparent);
            transition: background-color 0.8s ease;
        }

        button.selected {
            background-color: var(--opaque);
        }
        div.results {
            display: flex;
            flex-wrap: wrap;
            padding: 1.5rem;
            padding-bottom: 2rem;
            gap: 1rem;
            width: 100%;
            background-color: hsla(0, 0%, 100%, 0.75);
        }
        .type-section h3 {
            writing-mode: sideways-lr;
            align-self: center;
            white-space: nowrap;
            margin: 0;
        }
        .type-section {
            display: flex;
            gap: 1.5rem;
            width: 100%;
            min-width: 0;
            align-items: center;
        }
        .type-scroll {
            position: relative;
            width: 100%;
            overflow: hidden;
        }
        .type-items {
            display: flex;
            gap: 1rem;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            touch-action: pan-x;
            cursor: grab;
            user-select: none;
        }
        .type-items::-webkit-scrollbar {
            height: 0;
        }
        .type-scroll::before,
        .type-scroll::after {
            content:"";
            position: absolute;
            top:0;
            bottom:0;
            width:3rem;
            pointer-events: none;
        }
        .type-scroll::before {
            left:0;
            background: linear-gradient(to right, hsla(0, 0%, 100%, 0.9), transparent);
        }
        .type-scroll::after {
            right:0;
            background: linear-gradient(to left, hsla(0, 0%, 100%, 0.9), transparent);
        }
    `;

    async connectedCallback() {
        super.connectedCallback();
        try {
            const response = await fetch('/inventory.json');
            const data = await response.json();
            this.items = data.items;
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    }

    onPointerDown(event) {
        this.isDragging = true;
        this.dragStartX = event.clientX;
        this.scrollStartX = event.currentTarget.scrollLeft;
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.style.cursor = 'grabbing';
    }

    onPointerMove(event) {
        if (!this.isDragging) {
            return;
        }
        const container = event.currentTarget;
        const delta = event.clientX - this.dragStartX;
        container.scrollLeft = this.scrollStartX - delta;
    }

    onPointerUp(event) {
        this.isDragging = false;
        const container = event.currentTarget;
        if (container.hasPointerCapture(event.pointerId)) {
            container.releasePointerCapture(event.pointerId);
        }
        container.style.cursor = 'grab';
    }

    changeCategory(category) {
        this.selected = category;
        document.documentElement.setAttribute('data-theme', this.selected);
    }

    // display different views based on category selected
    render() {
        const filteredAll = this.items.filter(item => item.category === this.selected);
        const groupedByType = filteredAll.reduce((groups, item) => {
            const type = item.type || 'unknown';
            if (!groups[type]) {
                groups[type] = [];
            }
            groups[type].push(item);
            return groups;
        }, {});

        return html `
            <div class="inventory-container">
                <div class="tabs">
                    <button id="apparel" class="${this.selected === 'apparel' ? 'selected': 'not-selected'}" @click=${() => this.changeCategory('apparel')}>Apparel</button>
                    <button id="prints" class="${this.selected === 'prints' ? 'selected': 'not-selected'}" @click=${() => this.changeCategory('prints')}>Prints</button>
                    <button id="functional" class="${this.selected === 'functional' ? 'selected': 'not-selected'}" @click=${() => this.changeCategory('functional')}>Functional</button>
                    <button id="misc" class="${this.selected === 'misc' ? 'selected': 'not-selected'}" @click=${() => this.changeCategory('misc')}>Misc</button>
                </div>

                <div class="results" >
                    ${filteredAll.length > 0 ? Object.entries(groupedByType).map(([type, items]) => html`
                        <div class="type-section">
                            <h3>${type}</h3>
                            <div class="type-scroll">
                                <div class="type-items"
                                    @pointerdown=${this.onPointerDown}
                                    @pointermove=${this.onPointerMove}
                                    @pointerup=${this.onPointerUp}
                                    @pointercancel=${this.onPointerUp}
                                >
                                    ${items.map(item => html`
                                        <item-preview .item=${item}></item-preview>
                                    `)}
                                </div>
                            </div>
                        </div>
                    `) : html`
                        <p style="padding: 1rem">No items in this category yet!</p>
                    `}
                </div>
                
            </div>
        `;
    }
}

customElements.define("inventory-container", InventoryContainer);