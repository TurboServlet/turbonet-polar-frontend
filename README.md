# MaiTurbo Polar Frontend Project

This project is the frontend part of MaiTurbo Polar, built with Vue 3 and Vite. It uses Tailwind CSS and DaisyUI for styling. The project is cleanly structured, easy to maintain and extend, supports backend API integration, basic permission control, and multilingual switching.

## Attribution

This project is owned by the TurboServlet project group. © TurboServlet 2025. All rights reserved.  
For any displayed content, logos, or service marks that may infringe rights, please contact us at ctrlcvs@uwu.cat.

## Tech Stack

- Vue 3
- Vite
- TypeScript / JavaScript
- Tailwind CSS
- DaisyUI
- Autoprefixer
- Vue Router
- Vue I18n
- Axios

## Project Structure

```
├── public/         # Static assets
├── src/
│   ├── assets/     # css, js, fonts, i18n config files
│   ├── components/ # Common components
│   ├── layouts/    # Layouts
│   └── views/      # Views
├── main.js         # Project entry & routing
└── App.vue         # Root component
```

## Installation & Running

Clone the project and install dependencies:

```bash
git clone https://github.com/TurboServlet/turbonet-polar-frontend.git
cd maiturbo-polar-frontend
npm install
```

Run in development mode:

```bash
npm run dev
```

Access at: http://localhost:5173

## Build & Deploy

To build for production:

```bash
npm run build
```

The build output will be in the `dist/` folder. You can deploy it to any static hosting service, such as:

- Nginx
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Preview production build locally:

```bash
npm run preview
```

## Usage Notes

- Language configurations are located in `src/assets/locales/`
- Routing is configured in `main.js`
- Permission control can be extended via route guards
- Custom themes can be configured via DaisyUI or by modifying Tailwind config files

## Requirements

Recommended: Node.js ≥ 18.x, npm ≥ 9.x

## License

The non-software components of this project (e.g., documentation, images) are licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

## Contact

If you have any questions, please open an issue or reach out via:

Email: ctrlcvs@uwu.cat  
GitHub: [Ctrlcvs](https://github.com/CtrlcvsNya)
