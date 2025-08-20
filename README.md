# SoftUni Angular Project

# 🏍️ MotoRush

Welcome to **MotoRush** —  
Discover, Buy & Sell Motorbikes  
The Ultimate Marketplace for Riders!  

Find the perfect motorbike for your next adventure or list yours for sale today and connect with buyers near you.  

> Think of MotoRush as the **mobile.bg for motorbikes**!  

---

## 🌟 Features

✅ Create an account and log in securely  
✅ Add, edit, and delete **motorbike listings**  
✅ View listings with images and detailed info  
✅ Search and filter motorbikes  
✅ Add motorbikes to your **watchlist**  
✅ Comment on listings  
✅ See your own listings and watchlist in your profile  

---

## 🧠 Tech Stack

| Frontend        | 
|-----------------|
| Angular 20      |
| Angular Router  |
| Angular Signals |
| RxJS            |
| Standalone Components |

---

## 📦 Installation & Setup

1. Clone this repository  
2. Install dependencies:

```bash
npm install
```

3. Project is split into two folders:

### 🖥️ Client

```bash
cd client
ng serve
```

Runs at: `http://localhost:4200/`

### 🌐 Server

```bash
cd server
node server.js
```

Runs at: `http://localhost:3030/`

---

## 👤 User Guide

### 👥 Registration & Login

- Go to **Register** to create a new account  
- Use your credentials to **Log in**  

---

### 🛵 Listings

After logging in, you can:  

- Add a new motorbike listing  
- Upload images and fill in all bike details (year, engine, horsepower, etc.)  
- Edit or delete your own listings  
- Listings are visible on the home page for everyone  

---

### 🔎 Search & Filter

- Use the search bar to find specific motorbikes  
- Filter by brand, category, location, and more  

---

### ❤️ Watchlist

- Add motorbikes to your **Watchlist**  
- View them later from your **Profile**  

---

### 💬 Comments

- Comment on any listing to ask questions or give feedback  

---

### 👤 Profile Page

- See all your created listings  
- See what you have added to your watchlist  
- Log out anytime  

---

## 🧪 Developer Notes

- Built with **Angular 20 standalone components & signals**  
- Forms are used for everything: login, register, search, add/edit listings  
- All fields are required and validated before submission  
- Error messages are shown in the UI when something goes wrong  
- Route protection is implemented (e.g., edit/delete only by owners)  

---

## 🚧 Known Limitations

- No file/image upload yet (uses image URLs only)  
- Not optimized for production (for learning purposes only)  

---

## 🎓 Project Info

This is an **Angular course project** for **SoftUni**  

---

## 📄 License

This project is for **educational purposes only**.  
No license included.