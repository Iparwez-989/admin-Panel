# Admin Dashboard
A Next.js dashboard to manage users and products using DummyJSON API.

## Features
- Login & authentication
- Users List & Single User view
- Products List & Single Product view
- Pagination, Search, Category filter
- Responsive UI with Material-UI
- State management using Zustand


## Tech Stack
- Next.js
- Material-UI (MUI)
- Zustand
- DummyJSON API



---

###  **Usage / Login Credentials**
Provide instructions on how to use your app, including login credentials if needed.

```markdown
## Login Credentials
Use the following for testing:
Username: emilys
Password: emilyspass


## Folder Structure
/app
  /login
  /dashboard
  /users
    index.jsx
    [id].jsx
  /products
    index.jsx
    [id].jsx
/components
  Navbar.jsx
  ProductCard.jsx
/store
  authStore.js
  usersStore.js
  productsStore.js


## APIs
- ### Users
- List Users: `GET https://dummyjson.com/users?limit=10&skip=0`
- Search Users: `GET https://dummyjson.com/users/search?q=...`
- Single page user: `GET https://dummyjson.com/users/{id}`
- ### Products
- Products: `GET https://dummyjson.com/products?limit=10&skip=0`
- Search: `GET https://dummyjson.com/products/search?q=...`
- Single Product page: `GET https://dummyjson.com/products/{id}`
- Category filter: `GET https://dummyjson.com/products/category/{category}`
- Auth: `POST https://dummyjson.com/auth/login`




  ## Notes
- Zustand used for state management
- Client-side caching to reduce API calls
- Protected routes redirect unauthenticated users to login

