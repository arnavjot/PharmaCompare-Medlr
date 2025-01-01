# PharmaCompare
PharmaCompare is a web application designed to help users search for medicines, compare their prices across various pharmacies, and manage their favorite medicines. The project features a user-friendly interface, seamless navigation, and support for user authentication, making it a powerful platform for finding the best deals on medications.

---

## Features
- **Search Medicines**: Search for medicines using the search bar with live suggestions.
- **Medicine Details**: View detailed information about a selected medicine, including available pharmacies and their prices.
- **Favorites Management**: Add and remove medicines to/from your favorites.
- **User Authentication**: Sign up, log in, and log out securely.
- **Pharmacy Details**: Compare prices across pharmacies and directly access purchase links.
- **Pagination**: Navigate through search results and pharmacy listings with pagination.
- **Tooltips**: View medicine details in hover-enabled tooltips.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Technologies Used
### Frontend
- React.js
- Vite.js
- Bootstrap for styling
- CSS (index.css for custom styles)

### Backend
- Node.js
- Express.js

### Database
- MongoDB

---

## Setup Instructions

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/arnavjot/PharmaCompare-Medlr.git
    cd PharmaCompare
    ```

2. **Install Dependencies**:
    ```bash
    # For backend
    cd backend
    npm install

    # For frontend
    cd ../frontend
    npm install
    ```

3. **Environment Variables**:
    Create a `.env` file in the `backend` directory with the following:
    ```env
    PORT=5000
    MONGODB_URI=your-mongodb-connection-string
    JWT_SECRET=your-secret-key
    ```

4. **Seed the Database**:
    Run the `seed.js` script to populate the database with initial data:
    ```bash
    cd backend
    node seed.js
    ```

5. **Run the Application**:
    ```bash
    # Start backend
    cd backend
    node server.js

    # Start frontend
    cd ../frontend
    npm run dev
    ```

6. **Access the Application**:
    Open your browser and navigate to `http://localhost:5173`.

---

## Screenshots
### Home Page
<img width="959" alt="image" src="https://github.com/user-attachments/assets/1378cf6c-6fb5-40d0-b72e-cd42ea4b8bb2" />


### Search Results Page
<img width="959" alt="image" src="https://github.com/user-attachments/assets/25b434c6-34fd-41a2-b800-c9846d7dfbf7" />
<img width="959" alt="image" src="https://github.com/user-attachments/assets/8dc9df58-ac23-423e-bd94-49e4186a6a05" />


### Medicine Details Page
**For unauthenticated users**
<img width="959" alt="image" src="https://github.com/user-attachments/assets/68d0569a-8721-4b7b-a1c4-7d88d0b5eed6" />
**For authenticated users**
<img width="959" alt="image" src="https://github.com/user-attachments/assets/2e1cf33f-5b3b-49f4-8c23-ffa114d0bb02" />
<img width="959" alt="image" src="https://github.com/user-attachments/assets/e6b40011-b24e-486b-be77-772e22cb6fcb" />



### Sign Up Page
<img width="959" alt="image" src="https://github.com/user-attachments/assets/2a184c8e-28b9-43f8-b708-31e67a781ab9" />


### Login Page
<img width="959" alt="image" src="https://github.com/user-attachments/assets/c1649398-735f-41b8-8a34-0bca7504a44b" />


### Profile Page
<img width="959" alt="image" src="https://github.com/user-attachments/assets/9a175ea5-7d40-4d28-bea1-438dd2f90305" />


---

## Folder Structure

```
PharmaCompare
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── medicineController.js
│   │   ├── pharmacyController.js
│   │   └── userController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── Medicine.js
│   │   ├── Pharmacy.js
│   │   └── User.js
│   ├── routes
│   │   ├── medicineRoutes.js
│   │   ├── pharmacyRoutes.js
│   │   └── userRoutes.js
│   ├── seed.js
│   └── server.js
├── frontend
│   ├── public
│   │   ├── vite.svg
│   ├── src
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── ErrorAlert.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── MedicineCard.jsx
│   │   │   └── Navbar.jsx
│   │   ├── context
│   │   │   └── AuthContext.jsx
│   │   ├── pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── MedicineDetailsPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── SearchResultsPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
└── README.md
```

---

## Contact

For any questions or feedback, please contact:
- Name: Arnavjot Kaur
- Email: arnavjotkaur.27@gmail.com
- GitHub: [arnavjot](https://github.com/arnavjot)

