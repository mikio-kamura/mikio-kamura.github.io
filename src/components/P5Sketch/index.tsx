'use client';
import React, { useEffect, useRef } from 'react';
import type p5Types from 'p5';

import style from './index.module.scss';

const imageSizes: [number, number][] = [
    [798, 1163], [802, 1163], [800, 1163], [760, 1117],
    [743, 1082], [739, 1053], [709, 932], [706, 924],
    [704, 924], [680, 909], [679, 921], [692, 924],
    [683, 903], [702, 860], [702, 866], [659, 837]
];

const P5Sketch = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const p5Instance = useRef<any>(null); // p5インスタンスを保持するref

    useEffect(() => {
        // クリーンアップ用の関数
        const cleanup = () => {
            if (p5Instance.current) {
                p5Instance.current.remove();
                p5Instance.current = null;
            }
        };

        // 既存のインスタンスがあれば削除
        cleanup();

        import('p5').then(p5Module => {
            const p5 = p5Module.default;

            const sketch = (p: p5Types) => {
                let img: p5Types.Image[] = [];
                const imgW: number[] = [];
                const imgH: number[] = [];
                const div = 2;
                const hw = 200;
                const hh = 200;

                p.preload = () => {
                    for (let i = 0; i < 16; i++) {
                        img[i] = p.loadImage(`/images/${i + 1}.png`);
                    }

                    imageSizes.forEach(([w, h], i) => {
                        imgW[i] = w;
                        imgH[i] = h;
                    });
                };

                p.setup = () => {
                    const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
                    if (containerRef.current) {
                        canvas.parent(containerRef.current);
                    }
                    p.imageMode(p.CENTER);
                };

                p.windowResized = () => {
                    p.resizeCanvas(window.innerWidth, window.innerHeight);
                }

                p.draw = () => {
                    p.background(220);

                    let num = p.int(p.map(p.mouseX, 0, p.width, 0, 15));
                    num = p.constrain(num, 0, 15);

                    let numY = p.int(p.map(p.mouseY, 0, p.width, 0, 15));
                    numY = p.constrain(numY, 0, 15);

                    if (img[num]) {
                        p.image(
                            img[num],
                            hw - (802 - imgW[num]) / div / 2,
                            window.innerHeight / 2 + (1163 - imgH[num]) / div / 2,
                            imgW[num] / div,
                            imgH[num] / div
                        );
                    }

                    if (window.innerWidth >= 650 && img[numY]) {
                        p.push();
                        p.scale(-1, 1);
                        p.translate(-p.width, 0);
                        p.image(
                            img[numY],
                            hw - (802 - imgW[numY]) / div / 2,
                            window.innerHeight / 2 + (1163 - imgH[numY]) / div / 2,
                            imgW[numY] / div,
                            imgH[numY] / div
                        );
                        p.pop();
                    }
                };
            };

            // 新しいインスタンスを作成し、refに保存
            p5Instance.current = new p5(sketch);
        });

        // コンポーネントのアンマウント時にクリーンアップ
        return cleanup;
    }, []);

    return (
        <div
            ref={containerRef}
            className={style.container}
        />
    );
};

export default P5Sketch;