import { css } from "styled-components";

const Variables = css`
  :root {
    /* Primary Color Family - Sky Blue */
    --white: rgb(255, 255, 255);
    --primary: hsl(216, 45%, 97%);
    --primary-50: hsl(197, 100%, 97%);
    --primary-100: hsl(198, 100%, 92%);
    --primary-150: hsl(199, 100%, 90%);
    --primary-200: hsl(199, 100%, 86%);
    --primary-300: hsl(200, 97%, 78%);
    --primary-400: hsl(201, 90%, 67%);
    --primary-500: hsl(203, 89%, 53%);
    --primary-600: hsl(207, 81%, 45%);
    --primary-700: hsl(209, 77%, 37%);
    --primary-800: hsl(209, 72%, 30%);
    --primary-900: hsl(211, 69%, 25%);

    /* Accent Color */
    --accent-100: hsl(12, 100%, 95%);
    --accent-300: hsl(10, 90%, 76%);
    --accent-500: hsl(8, 82%, 63%);
    --accent-700: hsl(6, 72%, 50%);

    /* Neutral Colors */
    --neutral-50: hsl(210, 20%, 98%);
    --neutral-100: hsl(210, 15%, 95%);
    --neutral-200: hsl(210, 10%, 90%);
    --neutral-300: hsl(210, 8%, 80%);
    --neutral-400: hsl(210, 6%, 70%);
    --neutral-500: hsl(210, 4%, 60%);
    --neutral-600: hsl(210, 4%, 40%);
    --neutral-700: hsl(210, 6%, 25%);
    --neutral-800: hsl(
      205.71428571428572,
      6.542056074766359%,
      20.980392156862745%
    );
    --neutral-900: hsl(210, 8%, 15%);
    --neutral-950: hsl(216, 9.803921568627452%, 10%);

    /* border */
    --b-c: #253046bd;
    --b-f: #4a5565;
    --darken: #000;

    /* Semantic Colors */
    --success-100: hsla(143.05882352941177, 100%, 50%, 0.175);
    --success-500: hsl(142, 72%, 45%);
    --info-100: hsl(
      20,
      57%,
      94%
    );
    --info-500: hsl(34.90909090909091, 72.0524017467249%, 44.90196078431373%);
    --danger-100: hsl(0, 57.142857142857174%, 94.50980392156862%);
    --danger-500: hsl(0, 72%, 45%);

    --dash-primary: #101828;
    --dash-darken: #080d18;
    --dash-secondary: #171f2f;
    --dash-third: #1e2636;
    --dash-active: #172142;

    /* Gradients */
    --gradient-primary: linear-gradient(
      135deg,
      var(--primary-400) 0%,
      var(--primary-600) 100%
    );

    /* Shadows */
    --shadow-sm: 0 1px 3px hsla(210, 8%, 15%, 0.1);
    --shadow-md: 0 4px 6px hsla(210, 8%, 15%, 0.1);
    --shadow-lg: 0 10px 15px hsla(210, 8%, 15%, 0.1);
    --shadow-primary: 0 4px 15px hsla(203, 89%, 53%, 0.2);

    /* Base font size */
    --font-size-root: 10px;

    /* Font size variables  */
    --text-xxs: 0.8rem; /* 8px */
    --text-xs: 1rem; /* 10px */
    --text-sm: 1.2rem; /* 12px */
    --text-base: 1.4rem; /* 14px */
    --text-md: 1.5rem; /* 16px */
    --text-lg: 1.7rem; /* 20px - h4/subheaders */
    --text-xl: 2rem; /* 24px - h3 */
    --text-xxl: 3rem; /* 30px - h2 */
    --text-xxxl: 4rem; /* 38px - h1 */
    --text-giant: 4.4rem; /* 48px - display text */
    --text-big: 7rem; 

    /* Alternative naming convention */
    --text-micro: var(--text-xxs);
    --text-caption: var(--text-xs);
    --text-body: var(--text-base);
    --text-lead: var(--text-md);
    --text-h4: var(--text-lg);
    --text-h3: var(--text-xl);
    --text-h2: var(--text-xxl);
    --text-h1: var(--text-xxxl);
    --text-display: var(--text-giant);

    /* line height */
    --leading-tight: 1.2;
    --leading-normal: 1.5;
    --leading-loose: 1.8;

    /* Border radius scale */
    --radius-xxs: 0.2rem; /* 2px - subtle rounding */
    --radius-xs: 0.4rem; /* 4px - small elements */
    --radius-sm: 0.8rem; /* 8px - default radius */
    --radius-md: 1.1rem; /* 12px - cards/containers */
    --radius-lg: 1.6rem; /* 16px - large containers */
    --radius-xl: 2.4rem; /* 24px - extra large */
    --radius-xxl: 3.2rem; /* 32px - pill shapes */
    --radius-round: 50%; /* Perfect circles */

    /* Semantic radius */
    --radius-button: var(--radius-xs);
    --radius-input: var(--radius-xxs);
    --radius-card: var(--radius-sm);
    --radius-modal: var(--radius-md);
    --radius-avatar: var(--radius-round);
    --radius-pill: var(--radius-xxl);

    /* Transition durations (ms) */
    --duration-instant: 50ms; /* Micro-interactions */
    --duration-quick: 100ms; /* Hover states */
    --duration-base: 200ms; /* Standard transitions */
    --duration-slow: 300ms; /* Complex animations */
    --duration-enter: 400ms; /* Element entrance */
    --duration-exit: 300ms; /* Element exit */

    /* Easing functions */
    --ease-standard: cubic-bezier(0.4, 0, 0.2, 1); /* Default motion */
    --ease-decelerate: cubic-bezier(0, 0, 0.2, 1); /* Entering elements */
    --ease-accelerate: cubic-bezier(0.4, 0, 1, 1); /* Exiting elements */
    --ease-sharp: cubic-bezier(0.4, 0, 0.6, 1); /* Quick actions */
    --ease-smooth: cubic-bezier(0.28, 0.11, 0.32, 1); /* Premium feel */

    /* Transition properties */
    --transition-hover: all var(--duration-quick) var(--ease-standard);
    --transition-active: all var(--duration-instant) var(--ease-sharp);
    --transition-color: color var(--duration-base) var(--ease-decelerate);
    --transition-transform: transform var(--duration-base)
      var(--ease-decelerate);
    --transition-opacity: opacity var(--duration-slow) var(--ease-accelerate);

    /* Semantic transitions */
    --transition-button: background-color var(--duration-base)
        var(--ease-standard),
      transform var(--duration-quick) var(--ease-sharp);

    --transition-card: box-shadow var(--duration-slow) var(--ease-decelerate),
      transform var(--duration-base) var(--ease-standard);

    --transition-modal: opacity var(--duration-enter) var(--ease-decelerate),
      transform var(--duration-enter) var(--ease-decelerate);

    --transition-input: border-color var(--duration-base) var(--ease-standard),
      box-shadow var(--duration-quick) var(--ease-sharp);

    /* border */

    --border-dark-xs: 1px solid #1d2939;
    --border-light-sm: 1px solid var(--neutral-300);
  }
`;

export default Variables;
