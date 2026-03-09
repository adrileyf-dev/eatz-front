"use client";

import { Eye, EyeOff } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./register.module.css";

import { useToast } from "@/contexts/ToastContext";
import { registerAction } from "@/service/serviceRegister";

type RegisterState = {
  success: boolean;
  error: string | null;
};

export default function RegisterForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState<
    RegisterState | null,
    FormData
  >(registerAction, null);

  // controla sucesso / erro
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      showToast("Registro realizado com sucesso", "success");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    }

    if (state.error) {
      showToast(state.error, "error");
    }
  }, [state, router, showToast]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.logo}>EATZ</h1>

        <form action={formAction} className={styles.form}>
          <div className={styles.group}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Seu nome"
              required
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="password">Password</label>

            <div className={styles.passwordField}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
              />

              <button
                type="button"
                className={styles.showButton}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.group}>
            <label htmlFor="role">Role</label>

            <select id="role" name="role" defaultValue="STAFF">
              <option value="ADMIN">ADMIN</option>
              <option value="STAFF">STAFF</option>
            </select>
          </div>

          <button type="submit" className={styles.button} disabled={isPending}>
            {isPending ? "Criando conta..." : "Create Account"}
          </button>
        </form>

        <p className={styles.footer}>
          Já tem conta? <a href="/login">Entrar</a>
        </p>
      </div>
    </div>
  );
}
