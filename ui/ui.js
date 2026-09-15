// Panels: transcript, verb menu, compass strip, inventory, command line, status bar, debug panel.
// The UI never touches game state directly; every action goes through onCommand(command).
import { verbsFor, usesFor, VERB_LABELS, verbLabel, exitChoices, menuEntries, numberEntries, numberLabel, numberCommand, putInto, throwAt, doorVerbs, quickButtons, ordersFor, topicsFor, topicLabel } from '../engine/parser.js';

const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const DIR_LABEL = { NORTH: 'N', SOUTH: 'S', EAST: 'E', WEST: 'W', NE: 'NE', NW: 'NW', SE: 'SE', SW: 'SW', UP: 'Up', DOWN: 'Down', IN: 'In', OUT: 'Out' };

export class UI {
  constructor(root, g, { onCommand, onRestart, onJump }) {
    this.g = g; this.onCommand = onCommand;
    this.transcript = root.querySelector('#transcript');
    this.menu = root.querySelector('#menu');
    this.compass = root.querySelector('#compass');
    this.inventory = root.querySelector('#inventory');
    this.status = root.querySelector('#status');
    this.hoverLabel = root.querySelector('#hover');
    this.deathOverlay = root.querySelector('#death');
    this.toast = root.querySelector('#toast');
    const input = root.querySelector('#command');
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && input.value.trim()) { onCommand({ text: input.value.trim() }); input.value = ''; } });
    // Three ways to restart, because RESTART used to point at a button only the debug panel had: the HUD link a
    // player can see, the debug panel's button, and the death screen's.
    root.querySelector('#restart-hud').onclick = onRestart;
    root.querySelector('#restart').onclick = onRestart;
    root.querySelector('#restart2').onclick = onRestart;
    root.querySelector('#look').onclick = () => onCommand({ verb: 'LOOK' });
    root.querySelector('#inv').onclick = () => onCommand({ verb: 'INVENTORY' });
    root.querySelector('#wait').onclick = () => onCommand({ verb: 'WAIT' });
    this.leave = root.querySelector('#leave');
    this.leave.onclick = () => { const v = g.inVehicle(); if (v) onCommand({ verb: 'DISEMBARK', prso: v }); };
    this.takeAll = root.querySelector('#takeall');
    this.takeAll.onclick = () => onCommand({ verb: 'TAKE', all: true });
    this.dropAll = root.querySelector('#dropall');
    this.dropAll.onclick = () => onCommand({ verb: 'DROP', all: true });
    this.sleep = root.querySelector('#sleep');
    this.sleep.onclick = () => onCommand({ verb: 'SLEEP' });
    this.waitFor = root.querySelector('#waitfor');   // "Wait for the elevator" (parser.quickButtons, core.waitFor)
    this.waitFor.onclick = () => { const b = quickButtons(g).find(x => x.key.startsWith('waitfor-')); if (b) onCommand(b.cmd); };
    root.querySelector('#diagnose').onclick = () => onCommand({ verb: 'DIAGNOSE' });
    root.querySelector('#save').onclick = () => onCommand({ verb: 'SAVE' });
    this.restore = root.querySelector('#restore');
    this.restore.onclick = () => onCommand({ verb: 'RESTORE' });
    this.restore2 = root.querySelector('#restore2');
    this.restore2.onclick = () => onCommand({ verb: 'RESTORE' });
    // Debug: jump to any room.
    const jump = root.querySelector('#jump');
    for (const r of [...g.world.rooms].sort((a, b) => a.name.localeCompare(b.name))) { const o = el('option', null, `${r.name} · ${r.id}`); o.value = r.id; jump.appendChild(o); }
    jump.onchange = () => { if (jump.value) onJump(jump.value); jump.value = ''; };
    root.querySelector('#toggle-debug').onclick = () => root.querySelector('#debug').classList.toggle('open');
    this.flags = root.querySelector('#flags');
    document.addEventListener('pointerdown', e => { if (!this.menu.contains(e.target)) this.hideMenu(); }, true);
  }
  say(text) { this.transcript.querySelectorAll('.latest').forEach(n => n.classList.remove('latest')); const p = el('p', 'note latest', text); this.transcript.appendChild(p); this.scroll(); }
  append(messages, echo) {
    this.transcript.querySelectorAll('.latest').forEach(n => n.classList.remove('latest'));
    const block = el('div', 'turn latest');
    if (echo) block.appendChild(el('p', 'echo', '> ' + echo));
    for (const m of messages) {
      if (m.kind === 'break') { block.appendChild(el('br')); continue; }
      const p = el('p', m.kind === 'room' ? 'room' : m.kind === 'event' ? 'event' : m.kind === 'warning' ? 'warning' : m.kind === 'death' ? 'death' : 'text');
      for (const [i, line] of m.text.split('\n').entries()) { if (i) p.appendChild(el('br')); p.appendChild(document.createTextNode(line)); }
      block.appendChild(p);
    }
    this.transcript.appendChild(block); this.scroll();
  }
  scroll() { this.transcript.scrollTop = this.transcript.scrollHeight; }
  // An item is { label, run } or { label, number: true, run(n) } or { label, sub: [items] }: a submenu opens in place
  // ("Put in…" on a container lists the things that fit, "Throw at…" on an actor lists what you carry).
  showMenu(x, y, title, items) {
    this.menu.replaceChildren(el('div', 'title', title));
    for (const it of items) {
      if (it.sub) { const b = el('button', 'sub', it.label); b.onclick = () => this.showMenu(x, y, `${title} · ${it.label.replace(/…$/, '')}`, it.sub); this.menu.appendChild(b); continue; }
      if (it.number) {   // a dial or keyboard entry: a number field plus its button
        const row = el('div', 'number'), input = el('input'), b = el('button', null, it.label);
        input.type = 'number'; input.min = '0'; input.placeholder = '0';
        b.onclick = () => { const n = parseInt(input.value, 10); if (!Number.isFinite(n)) { input.focus(); return; } this.hideMenu(); it.run(n); };
        input.addEventListener('keydown', e => { if (e.key === 'Enter') b.click(); });
        row.append(input, b); this.menu.appendChild(row); continue;
      }
      const b = el('button', null, it.label); b.onclick = () => { this.hideMenu(); it.run(); }; this.menu.appendChild(b);
    }
    this.menu.hidden = false;
    // Clamp to the viewport using the rendered size so long titles or many items never fall off the bottom edge.
    const { offsetWidth: w, offsetHeight: h } = this.menu;
    this.menu.style.left = Math.max(0, Math.min(x, innerWidth - w - 8)) + 'px'; this.menu.style.top = Math.max(0, Math.min(y, innerHeight - h - 8)) + 'px';
  }
  hideMenu() { this.menu.hidden = true; }
  // Verb menu for an object, including "Put in ..." targets and a free-text prompt.
  objectMenu(x, y, id) {
    const g = this.g;
    const items = verbsFor(g, id).map(v => ({ label: verbLabel(g, id, v), run: () => this.onCommand({ verb: v, prso: id }) }));
    for (const e of numberEntries(g, id)) items.push({ label: numberLabel(e), number: true, run: n => this.onCommand(numberCommand(e.verb, id, n)) });
    const put = putInto(g, id);   // an open container offers the held things that fit, one submenu
    if (put.length) items.push({ label: 'Put in…', sub: put.map(o => ({ label: g.name(o), run: () => this.onCommand({ verb: 'PUT', prso: o, prsi: id }) })) });
    const thrown = throwAt(g, id);   // an actor offers what you carry, one submenu
    if (thrown.length) items.push({ label: 'Throw at…', sub: thrown.map(o => ({ label: g.name(o), run: () => this.onCommand({ verb: 'THROW', prso: o, prsi: id }) })) });
    for (const u of usesFor(g, id)) items.push({ label: u.label, run: () => this.onCommand({ verb: u.verb, prso: id, prsi: u.prsi }) });   // rule-declared two-object actions
    for (const o of ordersFor(g, id)) items.push({ label: o.label, run: () => this.onCommand(o.cmd) });   // orders to an actor ("Ask Floyd to get the board")
    const topics = topicsFor(g, id);   // an actor's conversation topics, one submenu
    if (topics.length) items.push({ label: 'Ask about…', sub: topics.map(t => ({ label: topicLabel(g, t), run: () => this.onCommand({ verb: 'TELL', prso: id, prsi: t }) })) });
    this.showMenu(x, y, g.name(id), items);
  }
  // Menu for a scenery word: the parser's PSEUDO-OBJECT stands in for it, so record which routine it means.
  pseudoMenu(x, y, p) {
    const g = this.g;
    const pseudo = { word: p.word, routine: p.routine };
    const pick = () => { g.state.pseudo = pseudo; };
    const items = [{ label: 'Examine', run: () => { pick(); this.onCommand({ verb: 'EXAMINE', prso: 'PSEUDO-OBJECT' }); } }];
    for (const e of menuEntries(g, p.routine)) {
      if (e.hidden || e.verb === 'EXAMINE') continue;
      if (e.number) items.push({ label: numberLabel(e), number: true, run: n => { pick(); this.onCommand(numberCommand(e.verb, 'PSEUDO-OBJECT', n, pseudo)); } });
      else items.push({ label: VERB_LABELS[e.verb] ?? e.verb, run: () => { pick(); this.onCommand({ verb: e.verb, prso: 'PSEUDO-OBJECT' }); } });
    }
    this.showMenu(x, y, p.label ?? p.word, items);
  }
  exitMenu(x, y, entry) {
    const g = this.g; const e = entry.exit; const items = [];
    const dirs = [e.direction, ...entry.aliases];
    for (const d of dirs) items.push({ label: `Go ${DIR_LABEL[d]}` + (e.target && g.state.rooms[e.target]?.touched ? ` (${g.name(e.target)})` : ''), run: () => this.onCommand({ verb: 'WALK', dir: d }) });
    if (e.door) for (const v of doorVerbs(g, e.door)) items.push({ label: `${VERB_LABELS[v]} ${g.name(e.door)}`, run: () => this.onCommand({ verb: v, prso: e.door }) });   // minus what the door refuses
    this.showMenu(x, y, e.door ? g.name(e.door) : `Exit ${DIR_LABEL[e.direction]}`, items);
  }
  refresh() {
    const g = this.g;
    // Compass strip: every exit but the blocked ones (parser.exitChoices), with door state.
    this.compass.replaceChildren();
    for (const e of exitChoices(g)) {
      const b = el('button', 'dir ' + e.kind + (e.door ? (e.open ? ' open' : ' closed') : ''), DIR_LABEL[e.direction]);
      b.title = e.target ? (g.state.rooms[e.target].touched ? g.name(e.target) : 'unexplored') : e.kind === 'blocked' ? 'blocked' : 'special';
      b.onclick = () => this.onCommand({ verb: 'WALK', dir: e.direction });
      this.compass.appendChild(b);
    }
    // Inventory
    this.inventory.replaceChildren(el('h3', null, 'Inventory'));
    const walk = (container, depth) => {
      for (const id of g.contents(container)) {
        const b = el('button', 'item', g.name(id) + (g.fsetP(id, 'WORNBIT') ? ' (worn)' : '')); b.style.marginLeft = depth * 12 + 'px';
        b.onclick = ev => this.objectMenu(ev.clientX, ev.clientY, id); this.inventory.appendChild(b);
        if (g.seeInside(id)) walk(id, depth + 1);
      }
    };
    walk('ADVENTURER', 0);
    if (!g.contents('ADVENTURER').length) this.inventory.appendChild(el('p', 'muted', 'Empty-handed.'));
    // Status, and the way out of a vehicle (safety web, bed, ...) without having to find it in the scene.
    const v = g.inVehicle(), quick = new Map(quickButtons(g).map(b => [b.key, b]));
    this.leave.hidden = !quick.has('leave'); if (quick.has('leave')) this.leave.textContent = quick.get('leave').label;
    this.takeAll.hidden = !quick.has('takeall'); this.dropAll.hidden = !quick.has('dropall'); this.sleep.hidden = !quick.has('sleep'); this.restore.hidden = !quick.has('restore');
    if (quick.has('sleep')) this.sleep.textContent = quick.get('sleep').label;
    const wf = [...quick.values()].find(b => b.key.startsWith('waitfor-')); this.waitFor.hidden = !wf; if (wf) this.waitFor.textContent = wf.label;
    const part = g.partOfDay();   // morning / afternoon / dusk / evening / night, once on the planet
    this.status.textContent = `${g.here().name}${v ? ', in the ' + g.name(v) : ''}${part ? ' · ' + part : ''} · time ${g.state.time} · turn ${g.state.turn} · score ${g.state.score}`;
    this.deathOverlay.hidden = !g.state.dead;
    if (g.state.dead) {   // FINISH (a completed game) also stops play, but is a win, not a death
      const won = !!g.state.finished; this.deathOverlay.querySelector('#death-title').textContent = won ? 'You have won' : 'You have died';
      const t = this.deathOverlay.querySelector('#death-text'); t.hidden = !won; if (won) t.textContent = `Score ${g.state.score}, day ${g.getg('DAY')}.`;
      this.deathOverlay.classList.toggle('won', won);
      this.restore2.hidden = won || !g.state.saveSlot;   // FINISH offers RESTORE: the saved game, when there is one
    }
    // Debug flags
    const s = g.state; const q = s.queue.filter(x => x.enabled).map(x => `${x.name}:${x.tick}`).join(' ');
    this.flags.textContent = `here=${s.here} time=${s.time} elapsed=${s.elapsed}\nglobals ${JSON.stringify(s.globals)}\nqueue ${q}\nnotes ${[...g.notes].join(', ') || 'none'}`;
  }
  // Deliberate deviation (user decision, 2026-09-11, round six): points are announced by a green notice over the view;
  // the original only changed the status line, and every click playtester missed their score going up.
  notice(text, ms = 6000) {
    this.toast.textContent = text;
    this.toast.hidden = false; this.toast.classList.remove('show'); void this.toast.offsetWidth; this.toast.classList.add('show');
    clearTimeout(this.toastTimer); this.toastTimer = setTimeout(() => { this.toast.hidden = true; }, ms);
  }
  scoreNotice(delta, score) {
    this.toast.textContent = `${delta > 0 ? '+' : ''}${delta} point${Math.abs(delta) === 1 ? '' : 's'} · score ${score}`;
    this.toast.hidden = false; this.toast.classList.remove('show'); void this.toast.offsetWidth; this.toast.classList.add('show');
    clearTimeout(this.toastTimer); this.toastTimer = setTimeout(() => { this.toast.hidden = true; }, 3500);
  }
  setHover(p) { this.hoverLabel.textContent = p ? (p.kind === 'exit' ? `Exit ${DIR_LABEL[p.direction]}${p.exit.door ? ' · ' + this.g.name(p.exit.door) : ''}` : this.g.name(p.id)) : ''; }
}
