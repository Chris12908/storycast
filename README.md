# StoryCast

A three-page accessible microsite for short audio and video stories. Plain HTML, Sass compiled to CSS, and one small vanilla JavaScript file. No frameworks.

- **Design (Figma):** https://www.figma.com/design/gd9w4Tud8Ndn10p4WmwVnF (pages: *Sitemap and hi-fi mockups*, *Wireframes*)


## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Introduces StoryCast, features two stories, clear navigation |
| Story detail | `story/ferry.html` (audio), `story/shadows.html` (video) | One story with media, transcript and related stories |
| About and access | `about.html` | Mission, accessibility features, keyboard help, how to get involved |

## Project structure

```
storycast/
├── index.html
├── about.html
├── story/                  Story detail pages
├── sass/
│   ├── main.scss           Entry point (@use of every partial)
│   ├── _layers.scss        @layer reset, base, layout, components, utilities
│   ├── abstracts/          _colors, _typography, _spacing (design tokens)
│   ├── base/               _reset, _global
│   ├── layout/             _layout (header, footer, grids)
│   └── components/         _nav, _hero, _media-card, _figure, _player
├── css/main.css            Compiled output
├── js/transcript.js        Click-to-seek transcript with live highlight
├── assets/
│   ├── images/             Optimised JPGs
│   └── audio/              Audio file
└── docs/                   Research PDF, documentation PDF, sitemap
```

## Run locally

```bash
npm install -g sass
sass sass/main.scss css/main.css --watch   # compile and watch
python3 -m http.server 8000                 # serve, then open http://localhost:8000
```

## CSS architecture

- **Tokens:** colours, type scale and spacing live in `sass/abstracts/` and feed CSS custom properties.
- **Cascade layers:** `@layer reset, base, layout, components, utilities;` is declared first in `_layers.scss`, and every partial wraps its rules in its layer.
- **BEM:** `.media-card`, `.media-card__title`, `.media-card--video`.
- **Layout:** Grid for page and story layouts, Flexbox for the nav and button groups.
- **Container query:** each story card sits in `.stories__item` (`container-type: inline-size`). The card is stacked when its container is narrow and puts the image beside the text at 34rem, whatever the viewport width.

## Accessibility checklist

| WCAG 2.1 | Requirement | How it is met |
|---|---|---|
| 1.1.1 | Text alternatives | Every `<img>` has descriptive `alt` |
| 1.2.1 / 1.2.3 | Audio and video alternatives | A full transcript on every story page |
| 1.2.2 | Captions | The video story uses a YouTube embed with captions switched on by default (`cc_load_policy=1`) |
| 1.3.1 | Structure | Landmarks (`header`, `nav`, `main`, `aside`, `footer`), `article`, `section`, `figure`; one `h1` per page, no skipped levels |
| 1.4.3 | Contrast | Body text 13.9:1, muted text 6.9:1, links 7.1:1 (all above 4.5:1) |
| 1.4.10 | Reflow | Responsive layouts, no horizontal scroll at 320px |
| 2.1.1 | Keyboard | Everything is reachable by keyboard; transcript lines are real `<button>`s |
| 2.4.1 | Bypass blocks | "Skip to main content" link first in the tab order |
| 2.4.2 / 3.1.1 | Titles and language | Unique `<title>` per page, `lang="en"` |
| 2.4.7 | Focus visible | 3px `:focus-visible` ring with a yellow outer ring on all interactive elements |
| 2.3.3 | Motion | Animation is disabled under `prefers-reduced-motion` |
| 4.1.2 | Name, role, value | `aria-current="page"`, `aria-label` on the nav, `aria-labelledby` on sections; ARIA only where HTML is not enough |



## Media and image notes

- **Audio story** (`ferry.html`): a native `<audio>` element playing the author's own recording (`assets/audio/ferry.mp3`, 0:31), with a transcript whose timestamps follow where each line starts.
- **Video story** (`shadows.html`): an embedded YouTube Short, "The Market of Stolen Shadows" by [Igiri's Baobab Chronicles](https://www.youtube.com/@IGIRISBAOBABCHRONICLES), shown with the channel's captions on and a transcript on the page. The video belongs to its creator and is embedded, not copied. It needs an internet connection to play.
- Transcript wording was tidied from the auto-generated captions; check it against the audio.
- Images: add photographer credits and licences here before publishing.
