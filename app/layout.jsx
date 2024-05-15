import "@/estilos/globals.css"

export const metadata = {
  title: "Juego de memoria",
  description: "Poné a prueba tu memoria",
  icons: {
    icon: {
      url: "/favicon.ico",
      type: "image/x-icon"
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-ar">
      <body>
        {children}
      </body>
    </html>
  );
}
