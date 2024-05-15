'use client'
import React, { useState, useEffect, useRef } from "react";
import Carta from "@/componentes/carta"
import "@/estilos/globals.css"

export default function ArregloCartas() {

    const [arrCartas1, setArrCartas1] = useState([]);
    const [arrCartas2, setArrCartas2] = useState([]);
    const [cartasEncontradas, setCartasEncontradas] = useState(
        { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false }
    ); // Estado para mantener un registro de las cartas encontradas
    const [cartaVisible, setCartaVisible] = useState(false); //para saber si le hacen click o no a la carta
    const [cartasSeleccionadas, setCartasSeleccionadas] = useState([]); //para poder comparar las dos cartas clickeadas
    const [imagenCarta, setImagenCarta] = useState(""); //para setear la imagen correspondiente a la carta
    const [posicionCarta, setPosicionCarta] = useState({ x: 0, y: 0 }); // estado para la posición de la carta
    const [mostrarMatch, setMostrarMatch] = useState(false);
    const [felicitaciones, setFelicitaciones] = useState(false);
    const cartaRef = useRef(null); // Referencia al contenedor de la carta

    //Función flecha que no argumentos
    //Array.From genera un nuevo arreglo, toma dos argumentos: uno iterable (o un arreglo) y una funcion de mapeo opcional
    //{ length: 10 }: Estamos creando un objeto iterable con 10 elementos vacíos.
    //(_, index) => index + 1: Esta es la función de mapeo. Toma dos argumentos, pero estamos ignorando el primero 
    //El segundo argumento index representa el índice del elemento en el arreglo. 
    //La función simplemente devuelve index + 1. 
    //Esto significa que el primer elemento del arreglo tendrá el valor de 1, el segundo el valor de 2, y así sucesivamente.
    //Entonces, Array.from() crea un arreglo con 10 elementos donde cada elemento tiene un valor igual a su índice más 1. 
    //Por lo tanto, cuando llamas a generarNumeros(), obtendrás este arreglo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].
    const generarNumeros = () => {
        return Array.from({ length: 9 }, (_, index) => index + 1);
    };

    const mezclarNumeros = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        const numerosAleatorios1 = mezclarNumeros(generarNumeros());
        const numerosAleatorios2 = mezclarNumeros(generarNumeros());
        setArrCartas1(numerosAleatorios1);
        setArrCartas2(numerosAleatorios2);
    }, []);

    const handleClick = (numero, event) => {
        if (!cartasEncontradas[numero]) {
            setImagenCarta(`./carta_${numero}.png`);
            setPosicionCarta({
                x: event.target.offsetLeft - 75, // Obtener la posición del clic con respecto al contenedor de la carta, ajuste posicion para centrar la img
                y: event.target.offsetTop,
            });

            setCartaVisible(true);
            setCartasSeleccionadas((prevCartas) => [...prevCartas, numero]);

            // Si se han seleccionado dos cartas
            if (cartasSeleccionadas.length === 1) {
                // Obtener los números de las dos cartas
                const carta1 = cartasSeleccionadas[0];
                const carta2 = numero;

                if (carta1 === carta2) {
                    setMostrarMatch(true);
                    setTimeout(() => {
                        setMostrarMatch(false);
                        setCartasEncontradas((prevCartas) => {
                            const nuevasCartasEncontradas = {
                                ...prevCartas,
                                [carta1]: true,
                                [carta2]: true,
                            };

                            // Verifica si todas las cartas han sido encontradas
                            const todasEncontradas = Object.values(nuevasCartasEncontradas).every(Boolean);
                            if (todasEncontradas) {
                                setFelicitaciones(true);
                            }

                            return nuevasCartasEncontradas;
                        });
                    }, 5000);
                }
                setCartasSeleccionadas([]);
            }
        }
    };

    return (
        <div className="contenedor-cartas">
            {arrCartas1.slice(0, 9).map((numero, index) => (
                <Carta
                    key={index}
                    numero={numero}
                    onClick={(event) => handleClick(numero, event)} // Pasa el evento de clic
                    visible={cartasEncontradas[numero]}
                />
            ))}
            {arrCartas2.slice(0, 9).map((numero, index) => (
                <Carta
                    key={index + 9}
                    numero={numero}
                    onClick={(event) => handleClick(numero, event)} // Pasa el evento de clic
                    visible={cartasEncontradas[numero]}
                />
            ))}
            {cartaVisible && (
                <div
                    className="carta-frente"
                    style={{ left: posicionCarta.x, top: posicionCarta.y }}
                    ref={cartaRef} // Asigna la referencia al contenedor de la carta
                >
                    <img
                        src={imagenCarta}
                        alt="Naipe parte de adelante"
                        className="carta-frente"
                    />
                </div>
            )}
            {mostrarMatch && (
                <div className="mensaje-match">It's a match!</div>
            )}
            {felicitaciones && (

                <div className="mensaje-felicitaciones">¡Felicitaciones, has encontrado todas las cartas!</div>
            )}
        </div>
    )
}

