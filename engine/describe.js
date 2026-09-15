// Turns a room's description segment tree (from world.json) into text for the current state.
import { evaluate } from './conditions.js';

export function describeRoom(g, room) {
  const parts = [];
  const emit = segs => {
    for (const s of segs) {
      if (s.type === 'text') parts.push(s.text);
      else if (s.type === 'break') parts.push('\n');
      else if (s.type === 'door') parts.push(g.fsetP(s.object, 'OPENBIT') ? 'open' : 'closed');
      else if (s.type === 'value') { const v = g.getg(s.of); parts.push(v === undefined ? (g.notes.add('value ' + s.of), '?') : s.format === 'description' ? g.name(v) : String(v)); }   // <TELL D ,X> names the object a global holds
      else if (s.type === 'call') { const name = s.expression.replace(/^<|>$/g, '').split(' ')[0]; const fn = g.rules.describers?.[name]; if (fn) parts.push(fn(g)); else g.notes.add('describer ' + name); }
      else if (s.type === 'branch') {
        for (const c of s.cases) {
          if (c.condition === 'else' || evaluate(c.tree, g, h => g.notes.add('condition ' + h))) { emit(c.segments); break; }
        }
      }
    }
  };
  emit(room.description.segments);
  return parts.join('').replace(/[ \t]+\n/g, '\n').replace(/\n+$/, '').replace(/  +/g, ' ').trim();
}
