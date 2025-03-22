# Jobs Global Task

## Overview
Jobs Global Task is a web application built with **Angular** and **Tailwind CSS** for styling. It follows a modular structure to maintain scalability and reusability across the project.

## Features
- Modular structure using Angular modules
- Shared components and utilities
- Tailwind CSS for styling
- Organized pages for better navigation
- Authentication module for user management
- using signal to manage the Authentication module with effect and more

## Project Structure
```
JOBS-GLOBAL-TASK/
│-- .angular/                # Angular build and cache files
│-- .vscode/                 # VS Code settings (optional)
│-- node_modules/            # Project dependencies
│-- public/                  # Static assets (if any)
│-- src/
│   ├── app/
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/        # Authentication module
│   │   │   ├── jobs-module/ # Job-related features
│   │   ├── pages/           # Application pages
│   │   ├── shared/          # Shared components, directives, guards, pipes, helpers, and services
│   │   ├── app-routing.module.ts  # App routing configuration
│   │   ├── app.component.ts # Root component
│   │   ├── app.module.ts    # Root module
│   ├── assets/              # Static assets (images, fonts, etc.)
│   ├── index.html           # Main entry point
│   ├── main.ts              # Application bootstrap file
│   ├── styles.css           # Global styles
│-- .editorconfig            # Editor configuration for consistent coding style
│-- .gitignore               # Files to be ignored by Git
│-- angular.json             # Angular project configuration
│-- package.json             # Project dependencies and scripts
│-- package-lock.json        # Dependency lock file
│-- tailwind.config.js       # Tailwind CSS configuration
│-- tsconfig.json            # TypeScript compiler configuration
```

## Setup & Installation
### Prerequisites
- Node.js & npm installed
- Angular CLI installed (`npm install -g @angular/cli`)

### Steps to Run the Project
1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd JOBS-GLOBAL-TASK
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Run the development server**
   ```sh
   ng serve
   ```
   The app will be available at `http://localhost:4200/`.

### Building for Production
To build the project for production, run:
```sh
ng build --prod
```

## Coding Guidelines
- **Modular approach:** Feature modules should be inside `modules/`.
- **Reusability:** Shared components, directives, and services should be placed inside `shared/`.
- **Styling:** Use Tailwind CSS for consistent UI design.
- **Routing:** Define routes inside `app-routing.module.ts`.

## Contribution Guidelines
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature X'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

## License
This project is licensed under [MIT License](LICENSE).

---
For any issues, feel free to reach out to the maintainers or create an issue in the repository.

