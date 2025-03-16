'use client';
import P5Sketch from '../components/P5Sketch';
import style from "./page.module.css";

export default function Home() {
  return (
    <div className={style.page}>
      <P5Sketch />
    </div>
  );
}
