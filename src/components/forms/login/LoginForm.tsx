"use client";

import { Eye, EyeOff } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import styles from "./login.module.css";

import { ServiceLogin } from "@/service/categorie/serviceLogin";
import { useRouter } from "next/navigation";

import { getUserLog } from "@/libs/libsUtil";
const user = await getUserLog();

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(ServiceLogin, null);
  const router = useRouter();
  //const { showToast } = useToast();

  // controla sucesso / erro

  // controla sucesso / erro
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      //  showToast(`${state.message}`, "success");

      router.push("/dashboard");
    }

    if (state.error) {
      //showToast(state.error, "error");
    }
  }, [state, router]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.logo}>EATZ</h1>

        <form className={styles.form} action={formAction}>
          <div className={styles.group}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="seu@email.com"
              required
              role="alert"
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
          {state?.error && <div className={styles.error}>{state.error}</div>}
        </form>
        <label>Versão 1.0</label>
      </div>
    </div>
  );
}
