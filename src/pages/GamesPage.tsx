import { GenreList, GameList } from "./GameList";
import styles from "../assets/styles/GamesPage.module.css";

export function GamesPage() {
  return (
    <div className={`page-container ${styles.container}`}>
      <GenreList />
      <GameList />
    </div>
  );
}
