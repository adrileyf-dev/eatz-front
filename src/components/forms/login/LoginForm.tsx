"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./login.module.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.logo}>EATZ</h1>

        <form className={styles.form}>
          <div className={styles.group}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="password">Password</label>

            <div className={styles.passwordField}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className={styles.button}>Sign In</button>
        </form>
        <label>Versão 1.0</label>
      </div>
    </div>
  );
}
