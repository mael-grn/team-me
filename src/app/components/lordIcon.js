"use client";

import {useEffect, useRef, useState} from "react";
import {Player} from "@lordicon/react";

export default function LordIcon({iconName, animationType = 'none'}) {

    const playerRef = useRef(null);
    const ICON = require(`/public/icons/${iconName}.json`);

    const [isLoop, setIsLoop] = useState(animationType === 'loop');
    const [isHover, setIsHover] = useState(animationType === 'hover');

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.playFromBeginning();
        }
    }, [])

    return (
        <span onMouseEnter={() => {
            if (animationType === "hover") playerRef.current.playFromBeginning()
        }}>
            <Player
                ref={playerRef}
                icon={ICON}
                onComplete={() => {
                    if (isLoop) playerRef.current?.playFromBeginning()
                }}
            />
        </span>
    );
}