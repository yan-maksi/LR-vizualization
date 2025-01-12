# LR-vizualization
Create code that displays the loss of linear regression in the console, Without using the https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js library

Hola! Te cuento sobre este proyecto que hice para ver cómo funciona una regresión lineal 👋
Es básicamente una página web donde puedes ver cómo una línea "aprende" a ajustarse a unos puntos. Es como cuando tratas de dibujar una línea que pase lo más cerca posible de varios puntos, pero la computadora lo hace sola.
Lo chido es que:

Puedes ver en vivo cómo la línea se va moviendo hasta encontrar la mejor posición
Hay una gráfica que te muestra qué tan bien o mal lo está haciendo
Puedes jugar con algunos controles para que aprenda más rápido o más lento
Todo se ve en la pantalla con dibujitos (los puntos en azul y la línea en rojo)

Lo hice usando JavaScript normal (sin frameworks ni cosas raras) y le puse Canvas para los dibujos. También lo metí en Docker para que sea más fácil de correr en cualquier computadora.
Para probarlo, usé datos bien simples - son solo 4 puntos que siguen un patrón de multiplicar por 2:

data = [
    [1, 2], [2, 4], [3, 6], [4, 8], [6, 19] 
];

Es como un juguete educativo, pero ayuda bastante a entender cómo las computadoras pueden encontrar patrones en datos. Si alguna vez te preguntaste cómo funcionan esas cosas de "machine learning", esto te da una idea básica y divertida.
Lo mejor es que puedes cambiar algunas cosas como:

Qué tan rápido quieres que aprenda
Cuántas veces quieres que lo intente
Qué tan preciso quieres que sea

Y todo se ve en tiempo real, así que es bastante entretenido ver cómo va mejorando poco a poco.
