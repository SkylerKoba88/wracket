var u=Object.defineProperty;var g=(r,t,e)=>t in r?u(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var s=(r,t,e)=>g(r,typeof t!="symbol"?t+"":t,e);import{i as h,a as p,b as o}from"./nav-bar-JdtB5jZl.js";class c extends h{constructor(){super(),this.isSearchVisible=!1}onClick(){this.isSearchVisible=!0,this.updateComplete.then(()=>{const t=this.shadowRoot.querySelector("#search-input");t&&t.focus()})}handleSearch(){const e=this.shadowRoot.querySelector("input").value.trim();e&&console.log(`Searching for: ${e}`)}renderResults(){fetch(`/search?query=${encodeURIComponent(this.shadowRoot.querySelector("input").value)}`).then(t=>t.json()).then(t=>{console.log("Search results:",t)}).catch(t=>{console.error("Error fetching search results:",t)})}render(){return o`
            <div class="search-bar">
                <button @click="${this.onClick}">
                    <img class="search-icon" src="/images/search-icon.svg" alt="search icon" width="25" height="25">
                </button>
                
                <input 
                    id="search-input" 
                    type="text" 
                    placeholder="Search..." 
                    class="${this.isSearchVisible?"":"hidden"}"
                />
            </div>
        `}}s(c,"properties",{isSearchVisible:{type:Boolean}}),s(c,"styles",p`
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

    `);customElements.define("search-bar",c);class l extends h{constructor(){super(),this.item={},this.isSoldOut=!1}toggleSoldOut(t){t.quantity==0?this.isSoldOut=!0:this.isSoldOut=!1}render(){return this.toggleSoldOut(this.item),o`
            <div class="item-preview" @click=${()=>{var t;(t=this.item)!=null&&t.id&&(window.location.href=`/pages/product-detail.html?id=${this.item.id}`)}}>
                <div class="img-container ${this.isSoldOut?"soldout":""}">
                    <img id="product" src="${this.item.img}" alt="${this.item.name}" />
                    <div class="overlay">
                        <p>SOLD</p>
                        <img src="/images/soldout.svg" alt="sold out" width="100" height="100">
                        <p>OUT</p>
                    </div>
                </div>

                <div class="text">
                    <h4>${this.item.name}</h4>
                    <div class="item-details">
                        <p>${this.item.description}</p>
                        <p style="width:50%; text-align:end;">Price: $${this.item.price}</p>
                    </div>
                </div>
            </div>
        `}}s(l,"properties",{item:{type:Object},isSoldOut:{type:Boolean}}),s(l,"styles",p`
        .item-preview {
            display: block;
            width: 100%;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            min-width: 250px;
            max-width: 250px;
        }
        .item-preview:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            #product {
                transform: scale(1.05);
            }
        }
        p, h4 {
            padding: 0;
            margin: 0;
        }
        .text {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.5rem;
            justify-content: center;
            text-align: center;
        }
        .item-details {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            text-align: start;
        }
        .img-container {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
        }
        #product {
            width: 100%;
            height: auto;
            display: block;
            justify-self: center;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        .overlay {
            position: absolute;
            top:0;
            bottom: 0;
            left:0;
            right:0;
            background: hsla(0, 0%, 100%, 0.25);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        .overlay p {
            color: white;
            font-family: sans-serif;
            font-weight: bold;
        }
        .overlay img {
            height: 50%;
        }

        .img-container.soldout .overlay {
            opacity: 1;
        }
    `);customElements.define("item-preview",l);class d extends h{constructor(){super(),this.items=[],this.searchQuery="",this.selected="apparel",this.isDragging=!1,this.dragStartX=0,this.scrollStartX=0}async connectedCallback(){super.connectedCallback();try{const e=await(await fetch("/inventory.json")).json();this.items=e.items}catch(t){console.error("Error fetching inventory:",t)}}onPointerDown(t){this.isDragging=!0,this.dragStartX=t.clientX,this.scrollStartX=t.currentTarget.scrollLeft,t.currentTarget.setPointerCapture(t.pointerId),t.currentTarget.style.cursor="grabbing"}onPointerMove(t){if(!this.isDragging)return;const e=t.currentTarget,i=t.clientX-this.dragStartX;e.scrollLeft=this.scrollStartX-i}onPointerUp(t){this.isDragging=!1;const e=t.currentTarget;e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),e.style.cursor="grab"}changeCategory(t){this.selected=t,document.documentElement.setAttribute("data-theme",this.selected)}render(){const t=this.items.filter(i=>i.category===this.selected),e=t.reduce((i,a)=>{const n=a.type||"unknown";return i[n]||(i[n]=[]),i[n].push(a),i},{});return o`
            <div class="inventory-container">
                <div class="tabs">
                    <button id="apparel" class="${this.selected==="apparel"?"selected":"not-selected"}" @click=${()=>this.changeCategory("apparel")}>Apparel</button>
                    <button id="prints" class="${this.selected==="prints"?"selected":"not-selected"}" @click=${()=>this.changeCategory("prints")}>Prints</button>
                    <button id="functional" class="${this.selected==="functional"?"selected":"not-selected"}" @click=${()=>this.changeCategory("functional")}>Functional</button>
                    <button id="misc" class="${this.selected==="misc"?"selected":"not-selected"}" @click=${()=>this.changeCategory("misc")}>Misc</button>
                </div>

                <div class="results" >
                    ${t.length>0?Object.entries(e).map(([i,a])=>o`
                        <div class="type-section">
                            <h3>${i}</h3>
                            <div class="type-scroll">
                                <div class="type-items"
                                    @pointerdown=${this.onPointerDown}
                                    @pointermove=${this.onPointerMove}
                                    @pointerup=${this.onPointerUp}
                                    @pointercancel=${this.onPointerUp}
                                >
                                    ${a.map(n=>o`
                                        <item-preview .item=${n}></item-preview>
                                    `)}
                                </div>
                            </div>
                        </div>
                    `):o`
                        <p style="padding: 1rem">No items in this category yet!</p>
                    `}
                </div>
                
            </div>
        `}}s(d,"properties",{items:{type:Array},searchQuery:{type:String},selected:{type:String}}),s(d,"styles",p`
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
    `);customElements.define("inventory-container",d);
