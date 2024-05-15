import Image from "next/image"
import React from "react";

export default function Carta({ numero, onClick, visible }) {

    return (
        <div onClick={onClick}>

            {visible ? (
                <img
                    src={`./carta_${numero}.png`}
                    alt={`Carta ${numero}`}
                    className="visible"
                />
            ) : (
                <Image
                    src="/lomonaipe.jpg"
                    width={150}
                    height={210}
                    alt="Naipe parte de atrás"
                    priority
                />
            )}
        </div>
    );
}
