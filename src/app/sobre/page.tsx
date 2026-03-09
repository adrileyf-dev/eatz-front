import styles from "./sobre.module.css";

export default function Sobre() {
  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h1 className={styles.title}>Sobre a EATZ</h1>

        <p className={styles.text}>
          A <strong>EATZ</strong> é uma plataforma focada em oferecer
          experiências gastronômicas modernas, conectando pessoas a restaurantes
          incríveis.
        </p>

        <p className={styles.text}>
          Nosso objetivo é facilitar pedidos, reservas e descobertas de novos
          sabores de forma simples e rápida.
        </p>

        <button className={styles.button}>Saiba mais</button>
      </section>
    </main>
  );
}
