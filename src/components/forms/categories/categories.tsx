"use client";

import { Button } from "@/components/ui/button";
import styles from "./categories.module.css";

export default function CategoryForm() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.logo}>EATZ</h1>
        <h2 className={styles.title}>Cadastrar Categoria</h2>

        <form className={styles.form}>
          <div className={styles.group}>
            <label htmlFor="name">Nome da Categoria</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Ex: Bebidas"
              required
            />
          </div>

          <Button className={styles.button} type="submit">
            {" "}
            Cadastrar
          </Button>
        </form>

        <label className={styles.version}>Versão 1.0</label>
      </div>
    </div>
  );
}
