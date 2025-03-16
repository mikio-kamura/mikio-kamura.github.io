'use client';
import P5Sketch from '../components/P5Sketch';
import style from "./page.module.css";

export const metadata = {
  openGraph: {
    title: "hand manipulate hand",
    description:
      "made by mikio, with p5.js",
    images: [{
      url: "/ogp/ogp.png", // 🌟 静的画像の指定
      width: 1200,
      height: 630
    }],
  },
};

export default function Home() {
  return (
    <div className={style.page}>
      <P5Sketch />
    </div>
  );
}
