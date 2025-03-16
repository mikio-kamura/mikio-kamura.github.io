'use client';
import React, { useEffect, useRef, useState } from 'react';
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
    const [isPC, setIsPC] = useState(true);

    useEffect(() => {
        // クリーンアップ用の関数
        const cleanup = () => {
            if (p5Instance.current) {
                p5Instance.current.remove();
                p5Instance.current = null;
                window.removeEventListener('resize', checkDevice);
            }
        };

        // 既存のインスタンスがあれば削除
        cleanup();

        const checkDevice = () => {
            const isTouchDevice = (
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(hover: none) and (pointer: coarse)').matches
            );
            const isMobileUA = /iPhone|iPad|Android|Mobile/.test(navigator.userAgent);
            setIsPC(!isTouchDevice && !isMobileUA);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        import('p5').then(p5Module => {
            const p5 = p5Module.default;

            const sketch = (p: p5Types) => {
                let img: p5Types.Image[] = [];
                const imgW: number[] = [];
                const imgH: number[] = [];
                let div = 1.5;
                let div2 = 1.6;
                let hw = 200;

                if (window.innerWidth <= 768) {
                    div = 1.8;
                    div2 = 1.4;
                    hw = 170;
                }

                if (window.innerWidth <= 380) {
                    hw = 150;
                }

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
                            window.innerHeight / div2 + (1163 - imgH[num]) / div / 2,
                            imgW[num] / div,
                            imgH[num] / div
                        );
                    }

                    if (window.innerWidth >= 768) {
                        if (img[numY]) {
                            p.push();
                            p.scale(-1, 1);
                            p.translate(-p.width, 0);
                            p.image(
                                img[numY],
                                hw - (802 - imgW[numY]) / div / 2,
                                window.innerHeight / div2 + (1163 - imgH[numY]) / div / 2,
                                imgW[numY] / div,
                                imgH[numY] / div
                            );
                            p.pop();
                        }
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
        <div className={style.container}>
            <div
                ref={containerRef}
                className={style.canvas}
            />
            <p className={style.text}>hand manipulate hand</p>
            {isPC ? (
                <p className={style.text_2}>move your hand to move the hand<span className={style.big}>s</span></p>
            ) : (
                <p className={style.text_2}>drag to grasp</p>
            )}
            <footer className={style.text_3}>@mikio_kamura</footer>
        </div>
    );
};

export default P5Sketch;