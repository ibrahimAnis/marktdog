---
title: "🎟️ Building a 3D Circular Stadium Seat Booking System with Three.js and Supabase"
date: "2025-02-14"
---

## Introduction

In this blog, we will create a **3D interactive stadium seat booking system** using **Three.js** for rendering, **Supabase** for real-time seat management, and **event handling** to select and book seats dynamically. This system can be used for cricket, football, or any stadium-based ticketing platform.

![Stadium 3D Render](https://upload.wikimedia.org/wikipedia/commons/4/42/Cricket_stadium_3D_render.jpg)

---

## 🚀 Features

- **3D Circular Stadium Model** with tiered seating.
- **Seat Selection** with real-time updates.
- **Supabase Integration** for storing seat status.
- **Click to Book** mechanism with visual seat updates.
- **Camera Controls** for navigation.
- **Fully Responsive Web App**.

---

## 🛠️ Tech Stack

- [Three.js](https://threejs.org/) - 3D rendering engine.
- [Supabase](https://supabase.com/) - Backend database and authentication.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Primary scripting language.
- [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) - Graphics rendering.

---

## 📥 Setting Up the Project

### Install Dependencies

```sh
npm install three @supabase/supabase-js
```

### Import Libraries

```javascript
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
```

---

## 🌍 Creating the 3D Circular Stadium

### Initialize the Scene

```javascript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 50, 100);
camera.lookAt(0, 0, 0);
```

### Adding Lights

```javascript
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
```

### Creating a Circular Seating Arrangement

```javascript
const seats = [];
const numRows = 10;
const seatsPerRow = 30;
const radius = 20;

for (let row = 0; row < numRows; row++) {
  for (let i = 0; i < seatsPerRow; i++) {
    const angle = (i / seatsPerRow) * Math.PI * 2;
    const seatGeometry = new THREE.BoxGeometry(1, 1, 1);
    const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);

    seat.position.set(
      Math.cos(angle) * (radius + row * 1.5),
      row * 1.2,
      Math.sin(angle) * (radius + row * 1.5)
    );
    seat.name = `Seat-${row}-${i}`;
    seats.push(seat);
    scene.add(seat);
  }
}
```

---

## 🔗 Connecting to Supabase for Real-Time Seat Booking

### Supabase Setup

Create a Supabase project and a `seats` table with columns:

- `id` (Primary Key)
- `seat_name` (Text, Unique)
- `is_booked` (Boolean)

### Supabase Client Setup

```javascript
const SUPABASE_URL = "https://your-supabase-url.supabase.co";
const SUPABASE_KEY = "your-supabase-anon-key";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
```

### Fetch Booked Seats

```javascript
async function fetchBookedSeats() {
  const { data, error } = await supabase
    .from("seats")
    .select("seat_name, is_booked");
  if (error) console.error(error);
  data.forEach((seat) => {
    const seatObj = scene.getObjectByName(seat.seat_name);
    if (seat.is_booked) seatObj.material.color.set(0xff0000);
  });
}
fetchBookedSeats();
```

### Booking a Seat

```javascript
async function bookSeat(seat) {
  const { error } = await supabase
    .from("seats")
    .upsert([{ seat_name: seat.name, is_booked: true }]);
  if (!error) seat.material.color.set(0xff0000);
}
```

---

## 🎮 Adding Interactivity

### Detect Seat Clicks

```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(seats);
  if (intersects.length > 0) bookSeat(intersects[0].object);
});
```

---

## 📸 Demo

![Live Demo GIF](https://media.giphy.com/media/26n6x8B3L6vXzvZ3i/giphy.gif)

---

## 📌 Conclusion

- We built a **3D stadium model**.
- Integrated it with **Supabase for real-time seat booking**.
- Added **interactivity for seat selection**.

🚀 Try it out and enhance it further by adding **seat categories, pricing, and user authentication!**

🔗 References:

- [Three.js Documentation](https://threejs.org/docs/)
- [Supabase Guide](https://supabase.com/docs)
- [MDN WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
