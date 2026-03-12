import styles from "./unauthorized.module.css";

export default function Unauthorized() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.code}>403</h1>
        <p className={styles.message}>
          Você não tem permissão para acessar esta página.
        </p>
        <a href="/login" className={styles.button}>
          Voltar ao Dashboard
        </a>
      </div>
    </div>
  );
}
