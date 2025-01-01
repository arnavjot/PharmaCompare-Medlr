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
<img width="959" alt="image" src="https://github.com/user-attachments/assets/07240335-a535-447b-902d-3aeb188a9cce" />


### Search Results Page
<img width="959" alt="image" src="https://github.com/user-attachments/assets/2e5b75a1-3f6f-49c0-89d4-16b3ce9c5f0a" />
<img width="959" alt="image" src="https://github.com/user-attachments/assets/26bb343c-90e1-4221-a378-6292682051f4" /> 

**Sort By Price : High to Low**
<img width="959" alt="image" src="https://github.com/user-attachments/assets/a0b14f26-66b2-49bc-85aa-dcde9aea31e5" />



### Medicine Details Page
**For unauthenticated users**
<img width="957" alt="image" src="https://github.com/user-attachments/assets/37bb2996-8f86-4286-a51f-efc9cbfa1371" />

**For authenticated users**
<img width="959" alt="image" src="https://github.com/user-attachments/assets/3d62a85f-59de-4df1-aa35-ff5f9ee0f0f2" />
<img width="959" alt="image" src="https://github.com/user-attachments/assets/6a9e99b4-e1d4-4735-876e-b2eccf93b268" />


### Signup Page
<img width="959" alt="image" src="https://github.com/user-attachments/assets/3d321597-201c-4c59-bdda-665a84e34660" />


### Login Page
<img width="959" alt="image" src="https://github.com/user-attachments/assets/127a429f-3e13-47e3-8a19-8830f1f5477b" />


### Profile Page
<img width="959" alt="image" src="https://github.com/user-attachments/assets/dcf745c0-96d4-4ae8-b196-e8c130d400ad" />


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

