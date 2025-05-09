# Chicken Rice Restaurant - Frontend

This is the Frontend application for the Chicken Rice Restaurant management system, built with Angular 17.

## Technologies Used

- Angular 17.3.0
- Angular Material 19.2.4
- NgRx Component Store 19.0.1
- TailwindCSS 4.0.14
- Flowbite 3.1.2
- ng-zorro-antd 19.1.0
- JWT Authentication (@auth0/angular-jwt)

## System Requirements

- Node.js (Latest LTS version)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd repo_nha_hang_com_ga_FE
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Server

```bash
npm start
```
The application will run at `http://localhost:4200/`

### Build

```bash
npm run build
```
Output will be generated in the `dist/` directory

### SSR (Server-Side Rendering)

```bash
npm run serve:ssr:repo_nha_hang_com_ga
```

## Project Structure

```
src/
├── app/           # Contains components, services, and main application logic
├── assets/        # Contains static resources (images, fonts, etc.)
├── styles.scss    # Global styles
└── main.ts        # Application entry point
```

## Key Features

- Order Management
- Menu Management
- User Authentication (JWT)
- Responsive UI with TailwindCSS
- UI Components from Angular Material and ng-zorro-antd

## Testing

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT License](LICENSE)
