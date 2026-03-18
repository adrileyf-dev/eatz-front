import { Html } from "next/document";
import styles from "./teste.module.css";
import { AxeIcon } from "lucide-react";

export default function Sobre() {
  return (
    <div className={styles.title}>
      Teste de desenvolvimento
      <ul className={styles.card}>
        <ol>Nome</ol>
        <ol>Telefone</ol>
        <ol>Endereço</ol>
        <ol>Cpf</ol>
      </ul>
      <button className="btn">
        <AxeIcon />
        Gravar
      </button>
    </div>
  );
}
