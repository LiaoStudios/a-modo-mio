// Menu dei due locali.
// Osteria: dal menu pubblicato su osteriaamodomio.it (i dolci cambiano ogni giorno).
// Taverna: dal menu pubblicato su TheFork (aggiornato 13 ottobre 2026).
import type { VenueId } from './venues'

export interface Dish {
  name: string
  desc?: string
  price: string
  star?: boolean
}

export interface MenuSection {
  id: string
  title: string
  note?: string
  dishes: Dish[]
}

const osteria: MenuSection[] = [
  {
    id: 'antipasti',
    title: 'Antipasti',
    dishes: [
      { name: 'Mousse di mortadella', desc: 'Con granella di pistacchio e streghe bolognesi fatte in casa', price: '7' },
      { name: 'Polpettine fritte al sapore di tortellino', price: '8' },
      { name: 'Bastoncini di polenta fritta', desc: 'Con squacquerone di Romagna', price: '7' },
      { name: 'Assaggio di crescentine', desc: 'Prosciutto crudo di Parma, mortadella Bologna e pecorino dolce dei colli bolognesi', price: '12' },
      { name: 'Sformatino di spinaci', desc: 'Crema di Parmigiano Reggiano 36 mesi', price: '7' },
      { name: 'Tartare di Fassona piemontese', desc: 'Battuta al coltello, con tuorlo d’uovo', price: '13' },
      { name: 'Stecchini fritti alla petroniana', price: '9' },
    ],
  },
  {
    id: 'primi',
    title: 'Primi piatti',
    note: 'Pasta fresca tirata a mano',
    dishes: [
      { name: 'Il Re — Tortellino in brodo di cappone', price: '16', star: true },
      { name: 'La Regina — Tagliatella al ragù bolognese', price: '11', star: true },
      { name: 'Lasagne verdi alla bolognese', price: '15' },
      { name: 'Balanzoni verdi “a Modo Mio”', desc: 'Mousse di squacquerone, composto di cipolla e aceto balsamico', price: '15' },
      { name: 'Tortellino in crema di Parmigiano Reggiano 36 mesi', price: '16' },
      { name: 'Tortelloni ricotta e spinaci', desc: 'Crema di Castelmagno, zafferano, pistacchio e aceto balsamico', price: '14' },
      { name: 'Passatelli in brodo di cappone', price: '13' },
      { name: 'Passatelli asciutti', desc: 'Guanciale, scalogno e zucchine croccanti su fonduta di fossa', price: '13' },
      { name: 'Gramigna paglia e fieno', desc: 'Con ragù di salsiccia', price: '11' },
      { name: 'Strette verdi alla romagnola', desc: 'Crudo croccante, scorza e succo di limone', price: '12' },
    ],
  },
  {
    id: 'secondi',
    title: 'Secondi & griglia',
    dishes: [
      { name: 'Gran Grigliata “a Modo Mio”', desc: 'Salsiccia, costine, coppone, picanha irlandese e mortadella alla brace', price: '24', star: true },
      { name: 'Tagliata di Wagyu', desc: 'Circa 300 g', price: '29' },
      { name: 'Tagliata di Chianina', desc: 'Circa 300 g', price: '25' },
      { name: 'Tagliata di Picanha irlandese', price: '22' },
      { name: 'Gran Cotoletta di vitello alla bolognese', price: '19' },
      { name: 'La crescentinata', desc: 'Crescentine a volontà con salumi, formaggi, giardiniera e cipolle borettane', price: '24' },
      { name: 'Costolette d’agnello a scottadito', price: '20' },
      { name: 'Galletto ruspante alla diavola', desc: 'Cotto a bassa temperatura', price: '19' },
      { name: 'Polpette alla bolognese', desc: 'Con zucchine ripiene', price: '18' },
      { name: 'Salsiccia alla griglia', desc: 'Con patate al forno o fritte', price: '13' },
    ],
  },
  {
    id: 'contorni',
    title: 'Contorni',
    dishes: [
      { name: 'Cestino di crescentine fritte', price: '6' },
      { name: 'Verdure miste alla griglia', price: '6' },
      { name: 'Patatine fritte o al forno', price: '6' },
      { name: 'Cicoria ripassata in padella', price: '6' },
      { name: 'Friggione bolognese', price: '6' },
      { name: 'Champignon saltati con pomodorini', price: '6' },
    ],
  },
  {
    id: 'dolci',
    title: 'Dolci',
    note: 'Fatti in casa ogni giorno: chiedete le proposte del giorno in sala.',
    dishes: [],
  },
]

const taverna: MenuSection[] = [
  {
    id: 'stuzzicheria',
    title: 'La stuzzicheria',
    dishes: [
      { name: 'Cestino di crescentine fritte', price: '6' },
      { name: 'Cestino di crescenta bolognese', price: '6' },
      { name: 'Crema fritta', price: '6' },
      { name: 'Bastoncini di polenta fritta', desc: 'Con squacquerone di Romagna', price: '7' },
      { name: 'Le lorde', desc: 'Patate fritte con buccia, crudo croccante e crema di parmigiano', price: '7' },
      { name: 'Mousse di mortadella', desc: 'Con granella di pistacchio e streghe bolognesi fatte in casa', price: '7' },
      { name: 'Polpettine fritte al sapore di tortellino', desc: 'Con salsa a modo mio', price: '8', star: true },
      { name: 'Tortellino fritto', price: '8', star: true },
      { name: 'Stecchini fritti alla petroniana', desc: 'Con salsa a modo mio', price: '9' },
      { name: 'Il toccio', desc: 'Tre ciotole — ragù bolognese, ragù di salsiccia, friggione — con pane fatto in casa da… toccio!', price: '12' },
    ],
  },
  {
    id: 'imbottiti',
    title: 'Gli imbottiti',
    dishes: [
      { name: 'Bologna Burger', desc: 'Bun soffice artigianale, smash burger con ripieno di tortellino e friggione, con patate lorde', price: '16', star: true },
      { name: 'Bun con cotoletta alla bolognese', desc: 'Crudo di Parma e crema di parmigiano, con patate fritte e salsa a modo mio', price: '14' },
      { name: 'Componilo tu', desc: 'Crescenta bolognese o doppia crescentina fritta, farcita a modo… tuo! Salumi da 2,5 €, formaggi 2 €, verdure e salse da 0,5 €', price: '6' },
    ],
  },
  {
    id: 'primi',
    title: 'Primi piatti',
    dishes: [
      { name: 'La Regina — Tagliatella al ragù bolognese', price: '12', star: true },
      { name: 'Gramigna bianca', desc: 'Salsiccia e crema di parmigiano', price: '11' },
      { name: 'Tortelloni ricotta e spinaci', desc: 'Burro e salvia oppure al ragù bolognese', price: '14' },
      { name: 'Tortellini in crema di parmigiano', price: '16' },
    ],
  },
  {
    id: 'secondi',
    title: 'Secondi piatti',
    dishes: [
      { name: 'La crescentinata', desc: 'Crescentine fritte con tagliere di salumi artigianali, formaggi, pomodori secchi e carciofi', price: '24', star: true },
      { name: 'Gran cotoletta di vitello alla bolognese', price: '19' },
      { name: 'Tartare di Fassona', desc: 'Battuta al coltello, worcester, senape ed erba cipollina', price: '15' },
      { name: 'Polpette alla bolognese', desc: 'Sugo di pomodoro e pane da toccio fatto in casa', price: '15' },
      { name: 'Tagliere di formaggi del territorio', desc: 'Con miele e confetture', price: '15' },
      { name: 'Tagliata di pollo alla brace', desc: 'Verdure grigliate e salsa allo yogurt', price: '12' },
    ],
  },
  {
    id: 'contorni',
    title: 'Contorni',
    dishes: [
      { name: 'Friggione', price: '6' },
      { name: 'Patate al forno', price: '6' },
      { name: 'Patate fritte con buccia', price: '6' },
      { name: 'Verdure miste alla griglia', price: '6' },
    ],
  },
  {
    id: 'dolci',
    title: 'Dolci',
    dishes: [
      { name: 'Crema di mascarpone', desc: 'Con scaglie di cioccolato', price: '6' },
      { name: 'Crema fritta', price: '6' },
      { name: 'Zuppa inglese', price: '6' },
      { name: 'Tiramisù', price: '6' },
      { name: 'Crêpes alla Nutella e cioccolato bianco', price: '6' },
      { name: 'Sorbetto al limone', price: '6' },
    ],
  },
  {
    id: 'bere',
    title: 'Da bere',
    dishes: [
      { name: 'Birre Biren 50 cl', desc: 'Pilsner, Weißbier, Märzen, Doppelbock', price: '7' },
      { name: 'Biren “Melanie” — birra al miele 50 cl', price: '8' },
      { name: 'Pignoletto “a Modo Mio” 75 cl', price: '12,5' },
      { name: 'Sangiovese / Trebbiano della casa', desc: '¼ · ½ · 1 litro', price: '4,5 · 6,5 · 12,5' },
      { name: 'Calice di vino della casa', price: '3,5' },
      { name: 'Bibite in vetro 33 cl', price: '3,5' },
      { name: 'Amari, grappe e distillati', desc: 'Oltre 20 etichette al bicchiere', price: 'da 4' },
      { name: 'Caffè', price: '2' },
    ],
  },
]

export const menus: Record<VenueId, MenuSection[]> = { osteria, taverna }
