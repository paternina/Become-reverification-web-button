import { LitElement, html, css } from "lit-element";

export default class BecomeSpinner extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
      }

      svg {
        width: 100%;
        heigth: 100%;
        animation: rotate 2s linear infinite;
        transform-origin: center center;
      }

      circle {
        stroke: white;
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        stroke-linecap: round;
        stroke-width: 5px;
      }

      @keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -35px;
        }
        100% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -124px;
        }
      }
    `;
  }

  render() {
    return html`
      <svg viewBox="25 25 50 50">
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokewidth="2"
          strokemiterlimit="10"
        />
      </svg>
    `;
  }
}

customElements.define("become-spinner", BecomeSpinner);
