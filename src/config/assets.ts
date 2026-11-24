// Registro centralizado de ilustraciones navideñas generadas para la aplicación.
// Al importarlas como módulos, Vite las optimiza y las empaqueta con rutas relativas compatibles con GitHub Pages.

import heroNativityEditorial from '../assets/images/hero_nativity_editorial_1795472561549.jpg';
import pesebreLuzBelen from '../assets/images/pesebre_luz_belen_1795472562620.jpg';
import villancicosMusicaNavidad from '../assets/images/villancicos_musica_navidad_1795472563093.jpg';
import arbolComunidadSolidaridad from '../assets/images/arbol_comunidad_solidaridad_1795472563067.jpg';

export const APP_IMAGES = {
  heroNativity: heroNativityEditorial,
  pesebreLuz: pesebreLuzBelen,
  villancicosMusica: villancicosMusicaNavidad,
  arbolComunidad: arbolComunidadSolidaridad,
} as const;
