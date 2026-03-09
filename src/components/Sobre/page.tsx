import styles from "./page.module.css";

export default function TsxPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Guia TSX</h1>
        <p>Usando TypeScript com React no Next.js</p>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2>O que é TSX?</h2>
          <p>
            TSX permite escrever JSX com tipagem TypeScript, trazendo mais
            segurança ao código.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Exemplo</h2>

          <pre className={styles.code}>
            {`type Props = {
  nome: string;
};

export function Hello({ nome }: Props) {
  return <h1>Olá, {nome}</h1>;
}`}
          </pre>
        </section>

        <button className={styles.button}>Começar</button>
      </main>
    </div>
  );
}
