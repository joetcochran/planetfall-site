// Registry of hand-ported rule modules. Add a module per area as routines get ported.
import * as ship from './ship.js';
import * as kalamontee from './kalamontee.js';
import * as survival from './survival.js';
import * as floyd from './floyd.js';
import * as connectors from './connectors.js';
import * as lower from './lower.js';
import * as tower from './tower.js';
import * as lawanda from './lawanda.js';
import * as biolab from './biolab.js';

// Later modules override earlier ones for the same object/verb (survival's CHRONOMETER replaces ship's).
// tower must follow ship (its I-RANDOM-INTERRUPTS wraps ship's); lower/tower/lawanda/biolab share a few identical
// pseudo and verb defaults, so their relative order does not matter for those.
const modules = [ship, kalamontee, survival, floyd, connectors, lower, tower, lawanda, biolab];
export const rules = {
  objects: Object.assign({}, ...modules.map(m => m.objects ?? {})),
  rooms: Object.assign({}, ...modules.map(m => m.rooms ?? {})),
  exits: Object.assign({}, ...modules.map(m => m.exits ?? {})),
  interrupts: Object.assign({}, ...modules.map(m => m.interrupts ?? {})),
  describers: Object.assign({}, ...modules.map(m => m.describers ?? {})),
  clocks: Object.assign({}, ...modules.map(m => m.clocks ?? {})),         // which -> g => minutes left before that survival clock bites (DIAGNOSE)
  helpers: Object.assign({}, ...modules.map(m => m.helpers ?? {})),       // cross-area routines (e.g. FLOYD-REVEAL-CARD-F)
  pseudos: Object.assign({}, ...modules.map(m => m.pseudos ?? {})),       // room PSEUDO scenery routines by name (REACTOR-BUTTON-PSEUDO)
  menus: Object.assign({}, ...modules.map(m => m.menus ?? {})),           // click-menu entries per object id or PSEUDO routine: 'VERB' or { verb, when?, number? }
  visible: Object.assign({}, ...modules.map(m => m.visible ?? {})),       // id or routine -> g => boolean: hide a drawn object/scenery word for now
  exitDoors: Object.assign({}, ...modules.map(m => m.exitDoors ?? {})),   // door checked by a routine exit (POD-EXIT-F -> POD-DOOR)
  exitVisible: Object.assign({}, ...modules.map(m => m.exitVisible ?? {})), // routine -> (g, dir) => boolean: hide an exit that can only refuse
  exitLabels: Object.assign({}, ...modules.map(m => m.exitLabels ?? {})),
  notTargets: Object.assign({}, ...modules.map(m => m.notTargets ?? {})), // id -> true: never offered as a generated "use this on ..." target // routine -> g => string | null: what the compass writes after a routine exit whose destination it cannot name
  names: Object.assign({}, ...modules.map(m => m.names ?? {})),
  panelDoors: Object.assign({}, ...modules.map(m => m.panelDoors ?? {})), // room -> { DIR: door }: a door drawn on a plain exit's panel
  exitOpen: Object.assign({}, ...modules.map(m => m.exitOpen ?? {})),
  waitFor: Object.assign({}, ...modules.map(m => m.waitFor ?? {})),       // key -> { label, when(g) }: a "Wait for ..." quick button     // routine -> (g, exit) => boolean: when a door's exit panel reads open           // id -> g => proper name | null (Floyd, once introduced)
  showBlocked: Object.assign({}, ...modules.map(m => m.showBlocked ?? {})), // room -> [directions]: blocked exits kept on the compass (story replies)
  orders: Object.assign({}, ...modules.map(m => m.orders ?? {})),         // actor -> [{ label, cmd, when? }]: orders on the actor's menu
  topics: Object.assign({}, ...modules.map(m => m.topics ?? {})),         // actor -> g => [ids]: the actor's "Ask about…" submenu
  topicNames: Object.assign({}, ...modules.map(m => m.topicNames ?? {})), // id -> g => label: how a topic reads in "Ask about…"
  pseudoWords: Object.assign({}, ...modules.map(m => m.pseudoWords ?? {})), // room -> [{ word, routine }]: scenery words the source lacks
  objectWords: Object.assign({}, ...modules.map(m => m.objectWords ?? {})), // object id -> { synonyms, adjectives }: labels the prose prints that the source never made words
  dynamicOrders: Object.assign({}, ...modules.map(m => m.dynamicOrders ?? {})), // actor -> g => [{ label, cmd }]: orders that depend on the moment
  uses: modules.flatMap(m => m.uses ?? []),                                 // two-object click-menu entries [{verb, prso:[ids], prsi:[ids], label}]
  verbs: Object.assign({}, ...modules.map(m => m.verbs ?? {})),           // extra/overriding verb defaults
  vocabulary: modules.flatMap(m => m.vocabulary ?? []),                     // extra parser phrases [phrase, VERB, needsObject, prep?]
  setup(g) { for (const m of modules) m.setup?.(g); },
};
