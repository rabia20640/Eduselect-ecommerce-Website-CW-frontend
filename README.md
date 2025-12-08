# Eduselect - After School Classes Booking App 
Front-End
## Overview    
This is my after-school classes application Eduselect, a vue.js based app i built to let users browse and book after-school classes. My main focus was to create a clean, accessible and user-friendly interface, where parents and students can explore different subjects, add them to a cart and confirm their bookings. 

## Features 
**Navigation sidebar** - Switch between Home, Cart, Checkout and Orders views 
**Class Cards** - Each subject (Maths, Science, Art, English, Drama, Business, Design Technology, etc.) is displayed with a custom icon, price, location and available spaces. 
**Search and sort** - Classes can be filtered by subject, location or price using a live search bar and a sort panel. 
**Cart system** - Users can add multiple classes to the cart and manage them before checkout
**Checkout flow** - Users enter their name phone number to confirm their orders 
**Name** - Users need to enter their name before checking out to successfully confirm order 
**Phone Number** - Users need to enter their phone number before checking out to successfully confirm order 
**Booking confirmation** - A confirmation message appears after checkout and auto-hides after a few seconds 
**Order history** - All confirmed orders are tracked with timestamps and total cost 
**Flat icon design** - Each subject uses a minimalist icon for clarity and consistency 
**Accessibility** - Contrast aware design and keyboard-friendly navigation are applied 

## Tech Stack 
- **Frontend:** Vue.js 3
- **Backend:** Express.js + Node.js
- **Database:** MongoDB Atlas
- **Deployment:** Github Pages (frontend), Render.com (backend)

## Project Structure 
eduselect/
├── .vscode/                # Editor config files
├── src/
│   ├── assets/
│   │   └── images/         # Subject icons
│   ├── Styles.css          # Global styles
│   ├── components/
│   │   ├── Cart.vue
│   │   ├── CheckoutForm.vue
│   │   ├── LessonCard.vue
│   │   ├── LessonGrid.vue
│   │   ├── Orders.vue
│   │   └── SortPanel.vue
│   └── views/
│       ├── App.vue
│       └── EduSelect E - Commerce we... (truncated)
├── Main.js                 # Entry point for Vue app
├── index.html              # HTML template
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Dependency lock file
├── vite.config.js          # Vite build configuration
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation

## Setup Instructions
1. Clone the repository: 
git clone https://github.com/rabia20640/Eduselect-ecommerce-Website-CW-frontend
cd eduselect 

2. Install dependencies: 
npm install 

3. Run app locally: 
npm run dev 

## Validation Rules 
- **Name**: Must be 2–50 characters. Letters only  (spaces, apostrophes `'`, and hyphens `-` allowed).
- **Phone Number**: Must be a valid UK mobile number (starts with `07`, followed by 9 digits).
- **Errors** - displayed inline under the input fields in the checkout form.

## Component Overview 
- Cart.vue → Displays cart items, allows users to remove items, clear the cart, and proceed to checkout.
- CheckoutForm.vue → Collects user name and phone number, applies validation, and emits the checkout event.
- Orders.vue → Shows a list of confirmed orders with timestamps, total cost, and status.
- LessonGrid.vue + LessonCard.vue → Render the available lessons with subject icons, price, location, and space count.
- SortPanel.vue → Provides sorting controls for subject, price, location, and available spaces.

## Functional Testing Checklist
- **Navigation Sidebar**
  - Test: Click links for Home, Cart, Checkout, Orders
  - Expected: Correct view loads; active link highlighted

- **Lesson Display**
  - Test: Open Home view
  - Expected: All lessons render with subject, location, price, spaces, and icons

- **Search by Subject**
  - Test: Type "Math" in search bar
  - Expected: Only Math lessons appear

- **Search by Location**
  - Test: Type "Colindale" in search bar
  - Expected: Lessons in Colindale appear

- **Search by Spaces**
  - Test: Type "spaces:3"
  - Expected: Lessons with ≤ 3 spaces appear

- **Search by Price**
  - Test: Type "50"
  - Expected: Lessons priced ≤ £50 appear

- **Sort Panel**
  - Test: Select "price" + "desc"
  - Expected: Lessons reorder with highest price first

- **Add to Cart**
  - Test: Click "Add" on a lesson
  - Expected: Lesson appears in cart; available spaces decrease

- **Remove from Cart**
  - Test: Click "Remove" on a lesson in cart
  - Expected: Lesson removed; available spaces restored

- **Clear Cart**
  - Test: Click "Clear Cart"
  - Expected: Cart empties; all spaces restored

- **Cart Total**
  - Test: Add multiple lessons
  - Expected: Total price updates correctly

- **Checkout Validation**
  - Test: Enter invalid name (e.g., "123") or phone (e.g., "07123")
  - Expected: Inline error messages appear under inputs

- **Successful Checkout**
  - Test: Enter valid name and phone; click submit
  - Expected: Order created; cart cleared; confirmation message appears then auto-hides

- **Order Creation**
  - Test: Place an order
  - Expected: Order saved with name, phone, items, total, timestamp, status "pending"

- **Orders Page**
  - Test: Navigate to Orders view
  - Expected: All past orders listed with details

- **Booking Confirmation**
  - Test: Complete checkout
  - Expected: Confirmation message shows for 3 seconds, then disappears

- **Accessibility**
  - Test: Navigate with keyboard (Tab, Enter)
  - Expected: Sidebar links, inputs, and buttons are keyboard-friendly

- **Flat Icon Design**
  - Test: View lesson cards
  - Expected: Each subject displays a consistent minimalist icon

## Accessibility Features
- Keyboard-friendly navigation across all views
- High-contrast color scheme for readability
- Inline error messages for screen reader compatibility
- Semantic HTML structure for better assistive tech support