## How to Run the Application
### Install dependencies
npm install
npm run dev

## Third-Party Libraries Used
### react-window
Purpose: Virtualization of long lists and optimization of their rendering.
Justification: Allows rendering only the visible part of the order list, significantly improving performance when working with a large number of items. Used to implement “infinite” scrolling and smooth list display without lags.

### ESLint and Prettier
Used to maintain a consistent code style, automatically check code quality, and organize imports correctly. They ensure clean and readable code, simplify collaborative development, and make project maintenance easier.

### Notifications
Implemented friendly error messages using react-toastify.
This eliminates the need to manually handle UI messages for errors.

## Order Display Logic
The project implements the following logic for displaying user orders:
Since there is no linking field between users and orders, it was decided to display orders based on the user’s gender:
For women (gender === 'Female'), the last 3 orders are shown.
For men, the first 3 orders are shown.
This logic was chosen to demonstrate filtering and order display functionality even in the absence of an explicit link between orders and users.

## Added Lazy Loading for Orders
Implemented lazy loading of user orders in UserDetails.
Orders are now displayed in chunks (default 3 orders per chunk).
Users can click "Load More" to fetch the next chunk of orders.

## Reason for Not Using a State Manager
No separate state manager (e.g., Redux or Zustand) is used in this project because:
- The data is simple and limited to a list of users and orders.
- All filtering and display logic is handled locally within components.
- Adding a state manager would not provide significant benefits and would only complicate the project structure.
- This approach keeps the project lightweight and easy to understand for a test assignment.

## Reason for Not Using React Router
React Router is not used because:
- The application is a small test project with minimal navigation.
- Navigation is handled simply via component state (e.g., selecting a user and going back), so a full routing library is unnecessary.
- Avoiding React Router reduces complexity and keeps the codebase straightforward for demonstration purposes.

## Limitations
The project does not implement persistence of user selection or filters on page reload.
All selected users and applied filters are reset when the page is refreshed.
Reason: the test task did not require maintaining state between reloads, so I decided not to complicate the implementation and focus on demonstrating the functionality of components and the filtering logic.

### Testing
Unit tests are not yet implemented due to limited time (only a few hours were allocated for this task).

### Design
The UI uses a simple and minimalistic design.
Since the task didn’t provide any design mockups, a basic layout was implemented to keep the focus on functionality and not overcomplicate the solution.