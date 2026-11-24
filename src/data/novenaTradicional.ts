/**
 * ============================================================================
 * TEXTOS TRADICIONALES COMPLETOS DE LA NOVENA DE AGUINALDOS COLOMBIANA
 * ============================================================================
 * Incluye las oraciones tradicionales completas (Fray Fernando de Jesús Larrea
 * y Madre María Ignacia), las nueve consideraciones diarias íntegras, los doce
 * gozos tradicionales con su coro y las reflexiones y actividades familiares.
 */

export interface NovenaDayData {
  dia: number;
  fecha: string;
  titulo: string;
  valorDelDia: 'Amor' | 'Solidaridad' | 'Respeto' | 'Fraternidad' | 'Esperanza' | 'Humildad' | 'Servicio' | 'Gratitud' | 'Unión';
  consideracion: string[];
  reflexion: string;
  preguntasReflexion: string[];
  actividadParticipativa: {
    titulo: string;
    descripcion: string;
    dinamicaGrupal: string;
    compromisoPropuesto: string;
  };
}

export const ORACION_TODOS_LOS_DIAS = {
  titulo: 'Oración para todos los días',
  subtitulo: 'Inicio de la celebración diaria',
  parrafos: [
    'Benignísimo Dios de infinita caridad, que tanto amasteis a los hombres, que les disteis en vuestro Hijo la mejor prenda de vuestro amor, para que hecho hombre en las entrañas de una Virgen, naciese en un pesebre para nuestra salud y remedio; yo, en nombre de todos los mortales, os doy infinitas gracias por tan soberano beneficio.',
    'En retorno de él os ofrezco la pobreza, humildad y demás virtudes de vuestro Hijo humanado, suplicándoos por sus divinos méritos, por las incomodidades en que nació y por las tiernas lágrimas que derramó en el pesebre, que dispongáis nuestros corazones con humildad profunda, con amor encendido, con total desprecio de todo lo terreno, para que Jesús recién nacido tenga en ellos su cuna y more eternamente.',
    'Amén.',
  ],
  jaculatoriaFinal: '(Se reza tres veces el Gloria al Padre, al Hijo y al Espíritu Santo).',
};

export const ORACION_VIRGEN_MARIA = {
  titulo: 'Oración a la Santísima Virgen María',
  subtitulo: 'Contemplación mariana',
  parrafos: [
    'Soberana María, que por vuestras grandes virtudes y especialmente por vuestra humildad, merecisteis que todo un Dios os escogiese por Madre suya, os suplico que vos misma preparéis y dispongáis mi alma y la de todos los que en este tiempo hiciesen esta Novena, para el nacimiento espiritual de vuestro adorado Hijo.',
    '¡Oh dulcísima Madre!, comunicadme algo del profundo recogimiento y divina ternura con que le aguardasteis vos, para que nos hagáis menos indignos de verle, amarle y adorarle por toda la eternidad.',
    'Amén.',
  ],
  jaculatoriaFinal: '(Se rezan tres Avemarías).',
};

export const ORACION_SAN_JOSE = {
  titulo: 'Oración a San José',
  subtitulo: 'Custodio del Niño Jesús',
  parrafos: [
    '¡Oh Santísimo José, esposo de María y padre adoptivo de Jesús! Infinitas gracias doy a Dios porque os escogió para tan altos misterios y os adornó con todos los dones proporcionados a tan excelente grandeza.',
    'Os ruego, por el amor que tuvisteis al Divino Niño, me abracéis en fervorosos deseos de verle y recibirle sacramentalmente, mientras en su divina esencia le veo y le gozo en el cielo.',
    'Amén.',
  ],
  jaculatoriaFinal: '(Se reza un Padrenuestro, un Avemaría y un Gloria).',
};

export const GOZOS_TRADICIONALES = {
  titulo: 'Gozos',
  subtitulo: 'Aspiraciones para la venida del Niño Jesús',
  coro: '¡Dulce Jesús mío, mi Niño adorado! ¡Ven a nuestras almas, ven no tardes tanto!',
  estrofas: [
    {
      numero: 1,
      versos: [
        '¡Oh, Sapiencia suma del Dios soberano,',
        'que a infantil alcance te rebajas sacro!',
        '¡Oh, Divino Niño, ven para enseñarnos',
        'la prudencia que hace verdaderos sabios!',
      ],
    },
    {
      numero: 2,
      versos: [
        '¡Oh, Adonaí potente que a Moisés hablando,',
        'de Israel al pueblo diste los mandatos!',
        '¡Ah, ven prontamente para rescatarnos,',
        'y que un niño débil muestre fuerte el brazo!',
      ],
    },
    {
      numero: 3,
      versos: [
        '¡Oh, raíz sagrada de Jesé que en lo alto',
        'presentas al orbe tu fragante nardo!',
        '¡Dulcísimo Niño que has sido llamado',
        'Lirio de los valles, Bella flor del campo!',
      ],
    },
    {
      numero: 4,
      versos: [
        '¡Llave de David que abre al desterrado',
        'las cerradas puertas de regio palacio!',
        '¡Sácanos, oh Niño, con tu blanca mano,',
        'de la cárcel triste que labró el pecado!',
      ],
    },
    {
      numero: 5,
      versos: [
        '¡Oh, lumbre de Oriente, Sol de eternos rayos,',
        'que entre las tinieblas tu esplendor veamos!',
        '¡Niño tan precioso, dicha del cristiano,',
        'luzca la sonrisa de tus dulces labios!',
      ],
    },
    {
      numero: 6,
      versos: [
        '¡Espejo sin mancha, Santo de los santos,',
        'sin igual imagen del Dios soberano!',
        '¡Borra nuestras culpas, salva al desterrado,',
        'y en forma de niño, da al mísero amparo!',
      ],
    },
    {
      numero: 7,
      versos: [
        '¡Rey de las naciones, Emmanuel preclaro,',
        'de Israel anhelo, Pastor del rebaño!',
        '¡Niño que apacientas con suave cayado',
        'ya la oveja arisca, ya el cordero manso!',
      ],
    },
    {
      numero: 8,
      versos: [
        '¡Ábranse los cielos y llueva de lo alto',
        'bienhechor rocío como riego santo!',
        '¡Ven hermoso Niño, ven Dios humanado!',
        '¡Luce hermosa estrella, brota flor del campo!',
      ],
    },
    {
      numero: 9,
      versos: [
        '¡Ven, que ya María previene sus brazos,',
        'do su niño vean, en tiempo cercano!',
        '¡Ven, que ya José, con anhelo sacro,',
        'se dispone a hacerse de tu amor sagrario!',
      ],
    },
    {
      numero: 10,
      versos: [
        '¡Del débil auxilio, del doliente amparo,',
        'consuelo del triste, luz del desterrado!',
        '¡Vida de mi vida, mi dueño adorado,',
        'mi constante amigo, mi divino hermano!',
      ],
    },
    {
      numero: 11,
      versos: [
        '¡Véante mis ojos, de ti enamorados!',
        '¡Bese ya tus plantas, bese ya tus manos!',
        '¡Prosternado en tierra, te tiendo los brazos,',
        'y aún más que mis frases, te dice mi llanto!',
      ],
    },
    {
      numero: 12,
      versos: [
        '¡Ven Salvador nuestro, por quien suspiramos!',
        '¡Ven a nuestras almas, ven no tardes tanto!',
      ],
    },
  ],
};

export const ORACION_NINO_JESUS = {
  titulo: 'Oración al Niño Jesús',
  subtitulo: 'Cierre de la oración diaria',
  parrafos: [
    'Acordaos, ¡oh dulcísimo Niño Jesús!, que dijisteis a la venerable Margarita del Santísimo Sacramento, y en persona suya a todos vuestros devotos, estas palabras tan consoladoras para nuestra pobre humanidad agobiada y doliente: «Todo lo que quieras pedir, pídelo por los méritos de mi infancia y nada te será negado».',
    'Llenos de confianza en Vos, ¡oh Jesús, que sois la misma verdad!, venimos a exponeros toda nuestra miseria. Ayudadnos a llevar una vida santa, para conseguir una eternidad bienaventurada. Concedednos, por los méritos infinitos de vuestra encarnación y de vuestra infancia, la gracia de la cual tenemos tanta necesidad.',
    'Nos entregamos a Vos, ¡oh Niño omnipotente!, seguros de que no quedará frustrada nuestra esperanza, y de que en virtud de vuestra divina promesa, acogeréis y despacharéis favorablemente nuestra súplica.',
    'Amén.',
  ],
};

export const DIAS_NOVENA: NovenaDayData[] = [
  {
    dia: 1,
    fecha: '16 de diciembre',
    titulo: 'El Verbo eterno en el seno del Padre y su venida al mundo',
    valorDelDia: 'Amor',
    consideracion: [
      'En el principio de los tiempos el Verbo reposaba en el seno de su Padre en lo más alto de los cielos; allí era la causa, a la par que el modelo de toda creación. En esas profundidades de una incalculable eternidad permanecía el Niño de Belén. Allí es donde debemos datar la genealogía del Eterno que no tiene antepasados, y contemplar la vida de complacencia infinita que allí llevaba.',
      'La vida del Verbo Eterno en el seno de su Padre era una vida maravillosa y sin embargo, ¡misterio sublime!, busca otra morada, una mansión creada. No era porque en su mansión eterna faltase algo a su infinita felicidad sino porque su misericordia infinita anhelaba la redención y la salvación del género humano, que sin Él no podía verificarse.',
      'El pecado de Adán había ofendido a un Dios y esa ofensa infinita no podía ser condonada sino por los méritos del mismo Dios. La raza de Adán había desobedecido y merecido un castigo eterno; era pues, necesario para salvarla y satisfacer su culpa, que Dios, sin dejar el cielo, tomase la forma del hombre sobre la tierra y con la obediencia a los designios de su Padre, expiase aquella desobediencia, ingratitud y rebeldía.',
      'Era necesario en las miras de su amor que tomase la forma, las debilidades e ignorancias sistemáticas del hombre; que creciese para darle crecimiento espiritual; que sufriese, para morir a sus pasiones y a su orgullo y por eso el Verbo Eterno ardiendo en deseos de salvar al hombre resolvió hacerse hombre también y así redimir al culpable.',
    ],
    reflexion:
      'El primer día de la Novena nos recuerda que el amor verdadero nace en el hogar. En nuestra familia, amar significa cuidar con ternura a quienes tenemos cerca, escuchar con paciencia a padres, hijos y abuelos, y hacer de nuestra casa un lugar cálido y acogedor.',
    preguntasReflexion: [
      '¿Qué gestos concretos de amor y ternura podemos regalar hoy a nuestra familia?',
      '¿Cómo cuidamos el buen trato y la alegría cuando compartimos la mesa o descansamos juntos?',
      '¿Qué significa para nuestra familia preparar el corazón para recibir al Niño Jesús?',
    ],
    actividadParticipativa: {
      titulo: 'El Buzón Familiar de las Buenas Palabras',
      descripcion:
        'Cada miembro de la familia escribe una cualidad bonita o un agradecimiento para otro familiar y lo deja junto al pesebre.',
      dinamicaGrupal:
        'Sentados en círculo alrededor del pesebre o del árbol de Navidad, cada integrante toma el nombre de otro familiar al azar y le expresa en voz alta un agradecimiento sincero por un momento vivido este año.',
      compromisoPropuesto:
        'Comenzar cada día en casa con un saludo cariñoso, un abrazo y palabras amables.',
    },
  },
  {
    dia: 2,
    fecha: '17 de diciembre',
    titulo: 'La Anunciación y la humildad de la Santísima Virgen María',
    valorDelDia: 'Humildad',
    consideracion: [
      'El Verbo eterno se halla a punto de tomar su naturaleza creada en la santa casa de Nazaret, en donde moraba María Santísima. Cuando la sombra del Altísimo vino a cubrirla, solo ella con su humildad admiraba a los cielos y a la tierra y atraía las miradas de la Trinidad Santísima sobre sí.',
      'A la hora en que el Arcángel San Gabriel le anunció el misterio de la Encarnación, respondió la Virgen con profunda humildad: «He aquí la esclava del Señor, hágase en mí según tu palabra».',
      'En aquel instante el Verbo eterno se revistió de nuestra naturaleza humana en las purísimas entrañas de María, sin perder su naturaleza divina. Y así comenzó el Dios infinito a ser un niño pequeño y desvalido, oculto en el seno de su Madre, enseñándonos que la verdadera grandeza reside en la humildad y la obediencia generosa al bien.',
    ],
    reflexion:
      'La humildad hace que la convivencia familiar sea serena y feliz. Reconocer cuando nos equivocamos, pedir perdón con sencillez y agradecer las tareas cotidianas de cada quien fortalece los lazos de nuestro hogar.',
    preguntasReflexion: [
      '¿Por qué la humildad y la sencillez evitan discusiones innecesarias en casa?',
      '¿A qué persona de nuestra familia debemos agradecerle hoy por su trabajo silencioso de todos los días?',
      '¿Cómo podemos imitar la generosidad de María cuando alguien en casa necesita una mano?',
    ],
    actividadParticipativa: {
      titulo: 'Estrellas de Ayuda Silenciosa',
      descripcion:
        'Cada integrante elige una estrella de papel o compromiso y realiza una tarea del hogar sin que nadie se lo pida.',
      dinamicaGrupal:
        'En familia, conversan brevemente sobre aquellos gestos discretos (cocinar, ordenar, cuidar a alguien, escuchar) que sostienen el hogar cada día, y se dan un aplauso de gratitud mutua.',
      compromisoPropuesto:
        'Realizar hoy un favor o tarea de la casa de manera alegre y desinteresada.',
    },
  },
  {
    dia: 3,
    fecha: '18 de diciembre',
    titulo: 'La vida oculta del Niño Jesús en el seno de María',
    valorDelDia: 'Respeto',
    consideracion: [
      'Así había comenzado la vida encarnada del Niño. Consideremos el alma gloriosa y el cuerpo santo que había tomado, la adoración de la Santísima Trinidad y la alegría del cielo entero al contemplar el gran misterio.',
      'Contemplemos los nueve meses que pasó el Verbo divino en el seno de su Madre, en continuo silencio, oración y ofrecimiento por la salvación de todos los hombres. Desde aquel primer instante amaba a cada ser humano con amor personal y profundo.',
      'Su alma santa estaba llena de gracia y sabiduría, y desde aquel sagrario viviente ofrecía al Padre eterno sus primeros latidos, enseñándonos el valor inmenso de la vida interior, del recogimiento y del respeto sagrado hacia toda vida humana.',
    ],
    reflexion:
      'Contemplar el silencio y el recogimiento de Jesús nos invita a cultivar el respeto en familia: respetar los tiempos de descanso, valorar la opinión de niños y mayores, y hablar siempre con suavidad y consideración.',
    preguntasReflexion: [
      '¿Cómo cuidamos la escucha atenta cuando nuestros hijos, padres o abuelos nos cuentan algo importante?',
      '¿Qué podemos hacer para dejar el celular a un lado y mirarnos a los ojos al conversar en casa?',
      '¿De qué manera cuidamos el tono de voz y las palabras en nuestras conversaciones familiares?',
    ],
    actividadParticipativa: {
      titulo: 'Momento sin Pantallas y Escucha en Familia',
      descripcion:
        'Acordar un espacio diario sin teléfonos ni televisores para rezar la novena, cenar y conversar mirándonos a los ojos.',
      dinamicaGrupal:
        'Por parejas dentro de la familia (por ejemplo, abuelo y nieto, o hermanos), cada uno cuenta durante un minuto su recuerdo favorito de Navidades pasadas mientras el otro escucha con total atención.',
      compromisoPropuesto:
        'Escuchar sin interrumpir y cuidar con respeto nuestras palabras en el hogar.',
    },
  },
  {
    dia: 4,
    fecha: '19 de diciembre',
    titulo: 'La obediencia y mansedumbre del Niño Jesús',
    valorDelDia: 'Fraternidad',
    consideracion: [
      'Desde el seno de su Madre comenzó el Niño Jesús a poner en práctica su entera sumisión a Dios, que continuó sin la menor interrupción durante toda su vida. Adoraba a su Eterno Padre, le amaba, se sometía a su voluntad; aceptaba con resignación el estado en que se hallaba conociendo toda su debilidad, toda su humillación, todas sus incomodidades.',
      '¿Quién de nosotros hubiera querido retroceder a un estado semejante con el pleno goce de la razón y de la reflexión? ¿Quién hubiera podido soportar voluntariamente un martirio tan prolongado, tan penoso de cuerpo y de alma?',
      'Por ahí empezó el Divino Niño su vida dolorosa y humilde; y es así como empezó a anonadarse delante de su Padre, a enseñarnos lo que Dios merece por parte de su criatura, a expiar nuestro orgullo, origen de todos nuestros pecados, y a hacernos sentir toda la deformidad y toda la malicia de la soberbia.',
    ],
    reflexion:
      'La fraternidad familiar florece cuando dejamos atrás el orgullo y elegimos perdonar con rapidez. Entre hermanos, primos, padres e hijos, siempre es más importante el cariño que tener la razón.',
    preguntasReflexion: [
      '¿En qué momentos el orgullo o el mal genio nos alejan de las personas que más amamos?',
      '¿A qué familiar o amigo cercano podemos llamar o abrazar hoy para reconciliarnos?',
      '¿Cómo podemos hacer que los preparativos navideños en casa sean una fiesta de colaboración?',
    ],
    actividadParticipativa: {
      titulo: 'El Abrazo de Reconciliación y Alegría',
      descripcion:
        'Compartir un gesto de perdón, una llamada a un familiar lejano o un detalle hecho a mano para unir más a la familia.',
      dinamicaGrupal:
        'Entre todos, inventan una copla o verso navideño corto con la palabra FRATERNIDAD o FAMILIA y la cantan antes de los villancicos.',
      compromisoPropuesto:
        'Resolver cualquier desacuerdo familiar con diálogo sereno y sin guardar rencores.',
    },
  },
  {
    dia: 5,
    fecha: '20 de diciembre',
    titulo: 'Las virtudes interiores y el amor al prójimo',
    valorDelDia: 'Solidaridad',
    consideracion: [
      'Ya hemos visto la vida que llevaba el Niño Jesús en el seno de su purísima Madre; veamos hoy toda la vida que llevaba también María durante el mismo espacio de tiempo. Necesidad hay de que nos detengamos en ella si queremos comprender, en cuanto es posible, la sublime maravilla de la Encarnación y el modo como debemos corresponder a ella.',
      'María no cesaba de aspirar por el momento en que gozaría de esa visión beatífica terrestre, la faz de Dios encarnado. Estaba a punto de ver aquella faz humana que debía iluminar el cielo durante toda la eternidad.',
      'Iba a leer el amor filial en aquellos mismos ojos cuyos rayos debían esparcir para siempre la felicidad en millones de elegidos. Iba a ver aquel rostro todos los días, a todas horas, cada instante, durante muchos años. Iba a verle en el espectáculo de la infancia, en la majestad de la juventud, en la calma reflexiva de la edad madura.',
    ],
    reflexion:
      'La mirada tierna de María nos invita a abrir los ojos hacia las necesidades de nuestros vecinos y de las familias cercanas. La solidaridad en casa se vive enseñando a pequeños y grandes la alegría de compartir.',
    preguntasReflexion: [
      '¿Qué familia, vecino o adulto mayor cercano agradecería hoy una visita, una llamada o un plato de comida?',
      '¿Qué juguetes, ropa en buen estado o alimentos podemos reunir en casa para donar con cariño?',
      '¿Qué ejemplo de generosidad queremos sembrar en los más pequeños de nuestra familia?',
    ],
    actividadParticipativa: {
      titulo: 'El Regalo Solidario de Nuestra Familia',
      descripcion:
        'Reunir en casa un detalle, alimento o regalo sencillo para compartirlo con una familia o persona que lo necesite antes del 24 de diciembre.',
      dinamicaGrupal:
        'Cada miembro de la familia propone una acción solidaria concreta que puedan cumplir juntos durante los próximos días, y eligen una para llevar a cabo en equipo.',
      compromisoPropuesto:
        'Compartir con alegría algo valioso de nuestro tiempo o bienes con quien más lo necesite.',
    },
  },
  {
    dia: 6,
    fecha: '21 de diciembre',
    titulo: 'El decreto de César Augusto y la confianza en la Providencia',
    valorDelDia: 'Esperanza',
    consideracion: [
      'Jesús había sido concebido en Nazaret, domicilio de José y de María, y allí era de creerse que había de nacer, según todas las probabilidades. Mas Dios lo tenía dispuesto de otra manera, y los profetas habían anunciado que el Mesías nacería en Belén de Judá, ciudad de David.',
      'Para que se cumpliese aquella predicción, Dios se sirvió de un medio que no parecía tener relación alguna con este objeto, a saber: la orden dada por el emperador César Augusto de que todos los súbditos del imperio romano se empadronasen en el lugar de donde eran originarios.',
      'María y José, descendientes de David, no vacilaron en emprender un largo y penoso viaje en lo más crudo del invierno. Así nos enseña la Providencia que incluso en medio de las dificultades e imprevistos, Dios guía los pasos de quienes confían en el bien.',
    ],
    reflexion:
      'Incluso cuando el año trae preocupaciones o cambios inesperados, la esperanza mantiene unido el hogar. Confiar en Dios y apoyarnos unos a otros nos da fuerzas para mirar el año nuevo con ilusión.',
    preguntasReflexion: [
      '¿Qué sueños e ilusiones compartimos como familia para el año que viene?',
      '¿Cómo nos damos ánimo unos a otros cuando alguno está cansado o preocupado?',
      '¿Qué nos enseña el camino de María y José sobre permanecer unidos frente a las pruebas?',
    ],
    actividadParticipativa: {
      titulo: 'Estrellas de Esperanza para el Nuevo Año',
      descripcion:
        'Cada miembro de la familia escribe un deseo o propósito bueno para el hogar y lo cuelga en el árbol de Navidad.',
      dinamicaGrupal:
        'Turnándose junto al árbol, cada persona lee en voz alta una bendición o buen deseo para el resto de la familia para el próximo año.',
      compromisoPropuesto:
        'Regalar palabras de aliento, fe y tranquilidad en casa cuando surja alguna preocupación.',
    },
  },
  {
    dia: 7,
    fecha: '22 de diciembre',
    titulo: 'El viaje de María y José hacia Belén',
    valorDelDia: 'Servicio',
    consideracion: [
      'Representémonos el viaje de María y José hacia Belén, llevando consigo aún no nacido al Creador del universo, hecho hombre. Contemplemos la humildad y la obediencia de aquel Divino Niño que, aunque de raza judía y habiendo amado durante siglos a su pueblo con una predilección inexplicable, obedece así a un príncipe extranjero que forma el censo de población de su provincia, como si hubiese para Él en esa circunstancia algo que le halagase, y quisiera apresurarse a aprovechar la ocasión de hacerse empadronar oficial y auténticamente como súbdito en el momento en que venía al mundo.',
      '¿No es extraño que la humillación, que causa tan profundo horror a las criaturas, sea para el Creador una especie de atractivo irresistible? ¡Ah! ¡Que los hombres no comprendan esto! ¡Que no se apresuren a abandonar para siempre el orgullo y a buscar el servicio humilde de los demás!',
    ],
    reflexion:
      'El viaje de María y José fue un camino de cuidado mutuo. En nuestro hogar, servir con amor es colaborar en los oficios, preparar juntos la comida navideña y estar atentos a quien necesita descanso.',
    preguntasReflexion: [
      '¿Cómo podemos repartir con mayor justicia y alegría las tareas de la casa durante estas fiestas?',
      '¿Qué pequeño servicio haría hoy más liviano el día de papá, mamá, abuelos o hijos?',
      '¿Qué aprendemos del cuidado atento de San José hacia María durante todo el camino?',
    ],
    actividadParticipativa: {
      titulo: 'Cocina y Hogar Compartido en Familia',
      descripcion:
        'Preparar juntos una bebida caliente, natilla, buñuelos o un detalle navideño repartiendo tareas entre grandes y chicos.',
      dinamicaGrupal:
        'Organizar un breve equipo familiar de diez minutos para dejar la sala y el pesebre ordenados y listos para recibir a los invitados de la novena.',
      compromisoPropuesto:
        'Ofrecer nuestra ayuda voluntaria en casa antes de que nos la pidan.',
    },
  },
  {
    dia: 8,
    fecha: '23 de diciembre',
    titulo: 'La llegada a Belén y la búsqueda de posada',
    valorDelDia: 'Gratitud',
    consideracion: [
      'Llegan a Belén José y María buscando hospedaje en los mesones, pero no encuentran cabida, por ser muchos los forasteros que habían acudido al empadronamiento, y quizá por ser pobre su apariencia. Sin embargo, nada pudo turbar la paz interior de los que estaban fijos en Dios.',
      'Si José experimentaba tristeza cuando era rechazado de casa en casa, porque pensaba en María y en el Niño, sonreíase también con santa tranquilidad cuando fijaba la mirada en su casta esposa, y el ruido de cada puerta que se cerraba ante ellos era una dulce melodía para sus oídos.',
      'Eso era lo que había venido a buscar. El deseo de esas humillaciones era lo que había contribuido a hacerle tomar la forma humana. ¡Oh Divino Niño de Belén! Estos días que tantos han pasado en fiestas y diversiones o descansando muellemente en cómodas y ricas mansiones, ha sido para vuestros padres un día de fatiga y vejaciones de toda clase. ¡Ay! El espíritu de Belén es el de un mundo que ha olvidado a Dios.',
    ],
    reflexion:
      'Recordar las puertas cerradas en Belén despierta en nuestra familia una profunda gratitud por nuestro techo, nuestro alimento y la compañía de quienes amamos, invitándonos a recibir siempre con hospitalidad a quienes nos visitan.',
    preguntasReflexion: [
      '¿Por qué tres bendiciones de este año damos gracias a Dios como familia?',
      '¿A qué personas que viven lejos o están solas podemos invitar o llamar mañana en Nochebuena?',
      '¿Cómo abrimos las puertas de nuestro corazón para dejar entrar la paz de Jesús?',
    ],
    actividadParticipativa: {
      titulo: 'Tarjetas de Gratitud Familiar',
      descripcion:
        'Escribir mensajes breves de agradecimiento para los integrantes del hogar y para familiares que viven en otras ciudades.',
      dinamicaGrupal:
        'Cada participante nombra en voz alta una cosa buena que agradece de este año y graba un saludo corto o nota de voz para enviarlo a un ser querido lejano.',
      compromisoPropuesto:
        'Agradecer explícitamente por los alimentos, el hogar y la compañía de nuestra familia.',
    },
  },
  {
    dia: 9,
    fecha: '24 de diciembre',
    titulo: 'El nacimiento del Niño Jesús en el portal de Belén',
    valorDelDia: 'Unión',
    consideracion: [
      'La noche ha cerrado del todo en las campiñas de Belén. Desechados por los hombres y viéndose sin abrigo, María y José han salido de la inhospitalaria población, y se han refugiado en una gruta que se encontraba al pie de la colina. Seguía a la Reina de los Ángeles el jumento que le había servido de cabalgadura durante el viaje, y en aquella cueva hallaron un manso buey, dejado ahí probablemente por alguno de los caminantes que habían ido a buscar hospedaje en la ciudad.',
      'El Divino Niño, desconocido por sus criaturas racionales, va a tener que acudir a los irracionales para que calienten con su tibio aliento la atmósfera helada de esa noche de invierno, y le manifiesten con esto y con su humilde actitud el respeto y la adoración que le había negado Belén. La rojiza linterna que José tenía en la mano iluminaba tenuemente aquel pobrísimo recinto, ese pesebre lleno de paja, que es figura profética de las maravillas del altar y de la íntima y prodigiosa unión eucarística que Jesús ha de contraer con los hombres.',
      'María está en adoración en medio de la gruta, y así van pasando silenciosamente las horas de esa noche llena de misterios. Pero ha llegado la medianoche, y de repente vemos dentro de ese pesebre, poco antes vacío, al Niño esperado, vaticinado, deseado durante cuatro mil años con tan inefables anhelos. A sus pies se postra su Santísima Madre, en los transportes de una adoración de la cual nada puede dar idea. José también se le acerca y le rinde el homenaje con que inaugura su misterioso e imponderable oficio de padre adoptivo del Redentor de los hombres.',
      'La multitud de ángeles que descienden del cielo a contemplar esa maravilla sin par, deja estallar su alegría y hace vibrar en los aires las armonías de esa «Gloria in Excelsis», que es el eco de adoración que se produce en torno al trono del Altísimo, hecha perceptible por un instante a los oídos de la pobre tierra. Convocados por ellos, vienen en tropel los pastores de la comarca a adorar al «recién nacido» y a prestarle sus humildes ofrendas. Ya brilla en Oriente la misteriosa estrella de Jacob; y ya se pone en marcha hacia Belén la caravana espléndida de los Reyes Magos, que dentro de pocos días vendrán a depositar a los pies del Divino Niño el oro, el incienso y la mirra, que son símbolos de la caridad, de la oración y de la mortificación. ¡Oh, adorado Niño! Nosotros también los que hemos hecho esta Novena para prepararnos al día de vuestra Navidad, queremos ofreceros nuestra pobre adoración; no la rechacéis: venid a nuestras almas, venid a nuestros corazones llenos de amor. Encended en ellos la devoción a vuestra Santa Infancia, no intermitente y solo circunscrita al tiempo de vuestra Navidad, sino siempre y en todos los tiempos; devoción que fiel y celosamente propagada nos conduzca a la vida eterna, librándonos del pecado y sembrando en nosotros todas las virtudes cristianas.',
    ],
    reflexion:
      '¡Ha llegado la Nochebuena! Alrededor del pesebre celebramos el regalo más grande: nuestra familia unida. Que la luz del Niño Jesús ilumine la casa de la familia Garrido Rocha y de todos nuestros seres queridos, llenándonos de paz, salud y fraternidad durante todo el año.',
    preguntasReflexion: [
      '¿Qué momento de estos nueve días de Novena en familia recordaremos con más cariño?',
      '¿Qué propósito de unión queremos cuidar juntos desde esta Nochebuena en adelante?',
      '¿Por qué personas vivas o que ya están en el cielo elevamos hoy una oración especial en familia?',
    ],
    actividadParticipativa: {
      titulo: 'Arrullo al Niño Jesús y Abrazo de Nochebuena',
      descripcion:
        'Colocar la figura del Niño Jesús en el pesebre, cantar los Gozos y villancicos y darse un abrazo fraterno en familia.',
      dinamicaGrupal:
        'El integrante más pequeño o el mayor de la casa coloca con cariño al Niño Jesús en el pesebre mientras todos cantan «A la Nanita Nana» o «Noche de Paz», seguido de la lectura de los compromisos del muro familiar y un gran abrazo de Navidad.',
      compromisoPropuesto:
        'Mantener vivo el espíritu de paz, unión y amor de la Navidad en nuestro hogar todos los días del año.',
    },
  },
];

export interface NovenaSectionMeta {
  id: number;
  clave: string;
  titulo: string;
  tituloCorto: string;
}

export const SECCIONES_DIA: NovenaSectionMeta[] = [
  { id: 1, clave: 'oracion-todos', titulo: '1. Oración para todos los días', tituloCorto: 'Todos los días' },
  { id: 2, clave: 'consideracion', titulo: '2. Consideración del día', tituloCorto: 'Consideración' },
  { id: 3, clave: 'virgen-maria', titulo: '3. Oración a la Santísima Virgen María', tituloCorto: 'Virgen María' },
  { id: 4, clave: 'san-jose', titulo: '4. Oración a San José', tituloCorto: 'San José' },
  { id: 5, clave: 'gozos', titulo: '5. Gozos', tituloCorto: 'Gozos' },
  { id: 6, clave: 'nino-jesus', titulo: '6. Oración al Niño Jesús', tituloCorto: 'Niño Jesús' },
  { id: 7, clave: 'reflexion', titulo: '7. Reflexión o mensaje del día', tituloCorto: 'Reflexión' },
  { id: 8, clave: 'actividad', titulo: '8. Actividad en familia y compromiso', tituloCorto: 'Participación' },
];
