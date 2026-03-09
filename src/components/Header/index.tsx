import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Logo */}
        <div className={styles.logo}>DevPortfolio</div>

        {/* Navegação */}
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            INICIO |
          </Link>

          <Link href="/gitrepositorio" className={styles.navLink}>
            REPOSÍTORIOS |
          </Link>

          <Link href="/sobre" className={styles.navLink}>
            SOBRE |
          </Link>

          <Link href="/contato" className={styles.navLink}>
            CONTATO
          </Link>
        </nav>
      </div>
    </header>
  );
}
