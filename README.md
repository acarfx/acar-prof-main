# Acar-Prof-Main

**ACAR Professional Moderation, Promotion & Coin System Bot**

A Discord bot featuring an automated promotion system, coin economy, moderation tools, registration workflows, and a clean modular architecture. Customizable and extensible for your needs.

---

## 🚀 Features

* **Automated Promotions & Coin System**
  Users can earn coins and be promoted automatically based on their tagged status, message activity, voice activity, and registration data. The system supports toggling these features ON/OFF.

* **Advanced Moderation & Penalty Dashboard**
  Includes enhanced logging, punishment tracking, and structured penalty handling mechanisms.

* **Smart Registration System**

  * **Tagged-only mode enabled:** If a user does not have the required tag, registration is blocked automatically.
  * **Tagged-only mode disabled:** Registration is allowed if the user's gender data is provided.

* **Plug-and-Play Database Adaptability**
  You can switch out the database platform quickly. Edit only the internals of functions in `./Reference/acarDatabase.js`, without touching the system’s logic.

* **Invite System Placeholder**
  Invite-based rewards are not included due to potential exploitation (e.g., J4J abuse). A separate module may be implemented in the future.

* **Guard Bot & Auto-channel Setup (Upcoming)**
  Future updates will include deployment with a guard bot, automatic channel creation, and MongoDB/MySQL integration.

---

## ⚙️ Setup & Configuration

1. **Explore Settings**
   Review all files in `./acar/Settings/`. Misconfigurations (like missing role IDs or incorrect channel names) can break the system.

2. **Channel Configuration (`kanallar.json`)**
   Channel names inside `kanallar.json` must match your server’s log channel names. (Automatic setup coming soon.)

3. **Role & Promotion Logic**
   In `./acar/Reference/acarDatabase.js`, you can customize behavior for “Monarch” and “Knaves” role types—specifically around handling “Hammer” role grants.

4. **Promotion Levels (`terfisystem.js`)**
   Define rank levels using:

   ```js
   yetkipuan: [
     { rol: "first_role_id", seviye: "0" },
     { rol: "second_role_id", seviye: "1" },
     ...
     { rol: "seventh_role_id", seviye: "6" },
   ]
   ```

   Example toggle: if `getir.seviye === 2` (third rank), give the user a `teleportHammer` role if they don’t already have it.

---

## 🛠 Roadmap

* MongoDB/MySQL support
* Guard bot integration
* Auto-channel creation
* Separate invite system module

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📑 Summary

| Component                 | Description                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------- |
| **Promotion + Coin**      | Automatic promotions and coin rewards based on tag, messages, voice, and registration |
| **Moderation**            | Advanced punishment and moderation system                                             |
| **Registration**          | Tag-based gating or gender-verified automatic registration                            |
| **Database**              | Adaptable `acarDatabase.js` for your DB of choice                                     |
| **Invite System**         | Not included by default (planned separately)                                          |
| **Guard & Auto-channels** | Upcoming features (MongoDB/MySQL, auto-channel, guard bot)                            |
| **Setup**                 | Customize `Settings/`, `kanallar.json`, DB handler, and `terfisystem.js` logic        |
| **License**               | MIT                                                                                   |
