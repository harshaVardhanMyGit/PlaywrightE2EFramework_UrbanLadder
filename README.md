# Urban Ladder Playwright Automation Project

Welcome to the **Urban Ladder Playwright Automation Project!**  
This repository demonstrates **advanced Playwright features** through practical automation on the Urban Ladder website. It’s a **public, production-ready** project — already integrated with **API testing, GitHub Actions, Jenkins, and Azure DevOps** — making it a complete learning and reference resource for automation testers.

---

## Project Goals

- **Showcase Advanced Playwright Capabilities:** Leverages the latest Playwright features for UI and API automation.
- **Fully Integrated CI/CD Pipelines:**  
  - **GitHub Actions** for automated test execution on pushes/pull requests.  
  - **Jenkins** for scheduled and manual pipeline triggers.  
  - **Azure DevOps** for scalable cloud test runs.  
- **Educational Resource:** Valuable for both beginners and experienced testers to understand **E2E automation, CI/CD workflows, API validation, and reporting.**
- **Proven Real-World Scenarios:** Covers practical use cases including filters, sorting, cart validation, and API calls.
- **Community Collaboration:** Open to suggestions, issue reports, and pull requests.

---

## Features

- Automated navigation and interaction with the [Urban Ladder](https://www.urbanladder.com/) website.
- Handles UI elements and popups (e.g., signup/login modals).
- Applies filters such as:
  - Price range (using sliders)
  - Storage type
  - Mount type
  - Number of shelves
- Sorts products by price (e.g., **Price: Low to High**).
- Validates product details and adds specific products to the cart.
- Includes **API test cases** for backend validation.
- Generates **HTML test reports** for easy visualization and sharing.
- Integrated with **GitHub Actions**, **Jenkins**, and **Azure DevOps** for automated test runs.

---

## Technologies Used

- **[Playwright](https://playwright.dev/):** Browser automation framework for UI/API testing.
- **Node.js:** For running JavaScript/TypeScript test scripts.
- **HTML Reports:** Rich, interactive test result visualizations.
- **CI/CD Pipelines:** GitHub Actions, Jenkins, and Azure DevOps.

---

## Future Enhancements

- Expand test cases for more product categories and edge cases.
- Add visual regression testing for UI changes.
- Implement advanced error-handling strategies.
- Integrate parallel cross-browser cloud testing services.

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/urban-ladder-playwright-automation.git
   cd urban-ladder-playwright-automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run tests:**
   ```bash
   npx playwright test
   ```

4. **View reports:**  
   After test execution, open the generated HTML report.

5. **Run Cucumber (BDD) tests:**  
   ```bash
   npm run test:cucumber
   ```

---

## Azure Playwright Testing Service Setup

1. **Install Playwright Testing service package:**
   ```bash
   npm init @azure/microsoft-playwright-testing
   ```

2. **Authenticate with Azure CLI:**
   ```bash
   az login
   ```

3. **Set service endpoint (Windows):**
   ```bash
   set PLAYWRIGHT_SERVICE_URL='Your Service URL'
   ```

4. **Run parallel tests in Azure:**
   ```bash
   npx playwright test --config=playwright.service.config.ts --workers=20
   ```

---

## Jenkins Run

Below are screenshots from Playwright test execution in **Jenkins**, showing the build logs and results directly from the Jenkins console output:

<img width="1310" height="620" alt="image" src="https://github.com/user-attachments/assets/acf06bea-7087-4351-9243-f5e5212d88d1" />
<img width="1312" height="582" alt="image" src="https://github.com/user-attachments/assets/a76ae110-13c5-46bb-9257-88e261046759" />

---

## License

MIT License — free to use, modify, and share.

---

*This project is **actively maintained** and already integrated with real CI/CD pipelines, API testing, and cloud execution services.* 🚀
