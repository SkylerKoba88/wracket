import { LitElement, css, html } from "lit";

class NavBar extends LitElement {
    static styles = css`
        nav {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem;
            gap: 1rem;
            background-color: hsla(323, 100%, 88%, 0.75);
            font-family: 'Freedom';
        }
        a {
            color: black;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 24px;
            font-size: 0.9rem;
            width: fit-content;
        }
        a:hover {
            background-color: hsla(0, 0%, 100%, 0.75);
            transition: background-color 0.6s ease;
        }
        a:active {
            visibility: hidden;
        }
        a:visited {
            color: black;
        }
    `;
    render() {
        return html`
            <nav>
                <a href="/">Home</a>
                <a href="/shop">Shop</a>
                <a href="/gallery">Gallery</a>
                <a href="/about">About</a>
                <a href="/help">Help</a>
                <a href="/cart">Cart</a>
            </nav>
        `;
    }
}

customElements.define("nav-bar", NavBar);