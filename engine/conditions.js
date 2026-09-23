// Evaluates the parsed ZIL condition trees stored in world.json description branches
// against the live game state. Only the forms that appear in room descriptions are
// supported; anything else evaluates to false and is reported through onUnknown.
//
// Atoms: ",NAME" is a global (object/room id or a game global), ".NAME" a local,
// "T" true, [] false, digits a number.
export function evaluate(node, g, onUnknown = () => {}) {
  if (Array.isArray(node)) {
    if (!node.length) return false;
    const [head, ...args] = node;
    const val = x => evaluate(x, g, onUnknown);
    switch (head) {
      case 'FSET?': return g.fsetP(val(args[0]), ref(args[1], g));   // the object may be named through a global (,SPOUT-PLACED)
      case 'NOT': return !val(args[0]);
      case 'AND': return args.every(val);
      case 'OR': return args.some(val);
      case 'EQUAL?': case '==?': { const a = val(args[0]); return args.slice(1).some(b => val(b) === a); }
      case 'IN?': return g.loc(val(args[0])) === val(args[1]);   // either side may be ,HERE or another global holding an id
      case 'G?': return val(args[0]) > val(args[1]);
      case 'L?': return val(args[0]) < val(args[1]);
      case '0?': return !val(args[0]);
      case 'PROB': return g.prob(val(args[0]));
      default: onUnknown(head); return false;
    }
  }
  if (node === 'T') return true;
  if (/^-?\d+$/.test(node)) return Number(node);
  if (node.startsWith(',')) {
    const id = node.slice(1);
    if (g.objects[id] || g.rooms.has(id)) return id;        // object/room reference
    const v = g.getg(id); return v === undefined ? false : v;
  }
  if (node.startsWith('.')) { onUnknown(node); return false; }
  return node;
}
// Bare identifier from an atom like ",POD-DOOR" or ",OPENBIT".
function ref(node, g) { void g; return typeof node === 'string' ? node.replace(/^[,.]/, '') : node; }
