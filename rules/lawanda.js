// Hand-ported rules for the Lawanda complex, office and lab side: the platform escalator and the fork,
// the infirmary (Lazarus, the red spool, the medicine), the library lobby and library (terminal and its
// menu tree, spool reader, spools), the planetary defense and course control rooms (access panel, the
// seven fromitz boards, the cube and the bedistors), the ProjCon office (mural, logo, Floyd's remark),
// the computer room print-out, lab storage (uniform, combination paper), the radiation lock doors, the
// radiation lab and its lamp, the lab office (desk, memo, the three buttons) and the scenery words those
// rooms list.
// Each block names the ZIL routine it ports (comptwo.zil / compone.zil / globals.zil / verbs.zil).
//
// Not here (rules/biolab.js, another porter): BIO-LOCK-*, BIO-LAB, MINI-BOOTH, ROBOT-HOLE, the strip,
// STATION-384, CRYO-ANTEROOM and their interrupts. This module queues I-NUKED-BLUE (RADIATION-LAB-F) and
// I-UNFLOOD (FUNGICIDE-BUTTON-F) exactly as the source does and leaves the interrupts to that module.
// floyd.js already ports COMPUTER-ACTION, FLOYD-THROUGH-HOLE and the "Floyd, take board" hand-over; nothing
// it exports is redefined here. V-TYPE is ported in full here and in biolab.js (both faithful; the later
// module in rules/index.js wins, and biolab's reaches the library through helpers['LIBRARY-TYPE']). The shared
// one-line pseudos (EQUIPMENT-, TOILET-, IN-BOOTH-, CRACK-PSEUDO) and V-FLUSH also appear in lower.js /
// biolab.js with the same text.
//
// Verb ids: ZIL V-LAMP-ON / V-LAMP-OFF are TURN-ON / TURN-OFF (floyd.js); V-CLIMB-FOO ("climb escalator")
// arrives as CLIMB-ON; "look behind" is mapped to LOOK-UNDER by kalamontee.js, so MURAL-PSEUDO accepts both.
import { YUKS } from '../engine/core.js';
import { itake } from '../engine/verbs.js';
import { resolve } from '../engine/parser.js';

const here = (g, ...rooms) => rooms.includes(g.state.here);
const obj = ctx => ctx.rarg === 'M-OBJECT';
const is = (ctx, ...verbs) => verbs.includes(ctx.verb);
const D = (g, id) => g.name(id);
const notHolding = (g, id) => g.tell(`You're not holding the ${D(g, id)}.`);      // NOT-HOLDING
const alreadyOpen = g => g.tell("It's already open!");                             // ALREADY-OPEN
const isClosed = g => g.tell('It is closed!');                                     // IS-CLOSED
const noClose = g => g.tell("There's no way to close it.");                        // NO-CLOSE
const anymore = g => g.tell("You can't see that anymore.");                        // ANYMORE
const thisIsIt = (g, id) => { g.state.lastObject = id; };                          // THIS-IS-IT
const floydHere = g => g.isIn('FLOYD', g.state.here);
// The PUT syntaxes carry (HELD CARRIED HAVE): the parser takes the object first and, failing that, says so.
const haveIt = (g, ctx, id) => { if (g.held(id) || itake(g, { ...ctx, prso: id, silent: true }) === true) return true; g.tell(`You don't have the ${D(g, id)}.`); thisIsIt(g, id); return false; };

// PRINT-CONTENTS (verbs.zil): "a X, a Y, and a Z"; a single item becomes "it".
function printContents(g, container) {
  const items = g.contents(container);
  const parts = items.map((id, i) => (i === 0 ? '' : ', ' + (i === items.length - 1 ? 'and ' : '')) + 'a ' + D(g, id));
  if (items.length === 1) thisIsIt(g, items[0]);
  return parts.join('');
}

// --- the library terminal's screens (comptwo.zil globals) ------------------------------------------
const NO_MEANING = 'The terminal feeps, and a message briefly appears on the screen explaining that typing that character has no meaning at the moment.';
const SCREEN_CLEARS = 'The screen clears and a different menu appears:';
const TEXT_APPEARS = 'The screen clears and some text appears:';
const MORE_INFO = '"Foor moor deetaald infoormaashun on xis tapik, konsult xe liibrereein foor xe aproopreeit spuulz. Tiip zeeroo tuu goo tuu aa hiiyur levul."';
const LOW_END = '"Yuu hav reect xe loowist levul uv xe liibreree indeks. Pleez tiip zeeroo tuu goo tuu aa hiiyur levul. If yuu reekwiir asistins, kawl xe liibrereein."';
const MAIN_MENU = '    1. Histooree\n    2. Kulcur\n    3. Teknolojee\n    4. Jeeografee\n    5. Xe Prajekt\n    6. Inturlajik Gaamz';
const MENUS = {
  1: '    0. Maan Menyuu\n    1. Raashul Orijinz\n    2. Graat Hiiaatus\n    3. Riiz uv xe Nuu Teknakrasee',                                                        // HISTORY-MENU
  2: '    0. Maan Menyuu\n    1. Lituracur\n    2. Art\n    3. Muusik',                                                                                             // CULTURE-MENU
  3: '    0. Maan Menyuu\n    1. Medisin\n    2. Agrikultcur\n    3. Tranzportaashun\n    4. Roobotiks\n    5. Planateree Sistumz',                                  // TECHNOLOGY-MENU
  4: '    0. Maan Menyuu\n    1. Planit Landmasiz\n    2. Undursee Reejunz\n    3. Spaas Kolooneez',                                                                 // GEOGRAPHY-MENU
  5: '    0. Maan Menyuu\n    1. Orijinz uv xe Dizeez\n    2. Xe Instalaashunz\n    3. Prajekt Kuntrool\n',                                                          // PROJECT-MENU
  6: '    0. Maan Menyuu\n    1. Zoork\n    2. Dedliin and Witnis\n    3. Starkros and Suspendid',                                                                   // INTERLOGIC-MENU
};
const TEXTS = {
  11: '"Xe aancint lejindz saa xat ships frum xe Sekund Yuunyun wuns fild ar skiis and wil wun daa kum agen. Madern siientists, huu wuns dismist suc lejindz and felt xat liif eevolvd heer on Resida, now feel xat ar planit wuz reelee setuld bii men uv xe Sekund Yuunyun."',
  12: '"Wexur oor not xe lejindz uv xe Sekund Yuunyun ar truu, arkeeoloojists ar surtin xat aa peereeid uv hii teknoolojikul and sooshul deevelupmint egzistid xowzindz uv yeerz agoo, but foor sum reezin sivilizaashun slid intuu aa dark aaj lasteeng senshureez."',
  13: '"Wixin xe last fiiv senshureez, xe riiz uv xe Nuu Teknakrasee haz reeturnd sivilizaashun tuu xe levul ataand beefoor xe Hiiaatus. Sooshul histooreeunz xink xat wen xe Dizeez struk, ar raas had aceevd aa levul uv sufistikaashun eekwal tuu xe pree-Hiiaatus."',
  21: '"Menee volyuumz on xe deevelupmint uv Residan lituracur ar on fiil in xe liibreree. Alsoo, kopeez uv awl graat wurks uv riiteeng, sum daateeng bak tuu xe mixikul daaz uv xe Sekund Yuunyun, ar lookaatid heer."',
  22: '"Histoorikul studeez and reeproodukshunz uv Residan art ar avaalibul heer foor awl xree maajur peereeids uv art deevelupmint: xe Primitiv peereeid, xe Renasans peereeid uv xe urlee poost-Hiiaatus, and xe moost reesint peereeid uv videeoo and laazur art."',
  23: '"Reekoordeengz uv awl impoortint kompoozishunz uv xe last fiiv hundrid yeerz ar lookaatid in xe liibrereez data banks."',
  31: '"Awl maajur dizeezuz hav bin kyuuribul foor oovur aa senshuree. Xe deevelupmint uv kriioojeniks now alowz dokturz tuu put paashints in staasis until aa kyuur iz fownd. Avurij Residan liif ekspektinsee iz now 147 revooluushunz."',
  32: '"Durt farmeeng iz awl but obsooleet, wix moost fuud kumeeng frum xe hiidrooponiks kompleksiz oor xe undurwatur aljee farmz."',
  33: '"Planateree travul iz noormulee priivit skuutur foor shoort hops, and aarbus foor longur trips.  Spaas travul haz reesintlee bin revooluushuniizd bii xe invenshun uv nuukleeur-fyuuld enjinz."',
  34: '"Untoold senshureez agoo, entiir teemz uv roobots wur reekwiird tuu purfoorm eevin xe simplist tasks...wun roobot wud handul viszuuwul funkshunz, wun roobot wud handul awditooree funkshunz, and soo foorx. Now, xanks tuu advansis in mineeatshurizaashun, xeez tasks kan bee purfoormd bii singul roobots, suc az xe multiipurpis B-19 seereez."',
  35: '"Xe priimeree Planateree Sistumz ar Kors Kuntrool (foor maantaaneeng an iideel kliimit), Deefens (foor destroieeng pootenshulee daanjuris meeteeoorz), and xe reesintlee adid Prajekt Kuntrool (foor monitureeng proogres uv Xe Prajekt)."',
  41: '"Sins xe staabulizaashun uv xe oorbit uv Resida, preesiislee 47.79 pursent uv xe planits surfis iz land. Xe land iz diviidid intuu tuu priimeree landmasiz, Andoor and Fruulik, plus siks lesur landmasiz. Xe gloobul kapitul, Pilandoor, iz on xe eesturn koost uv Andoor."',
  42: '"Xe furst undursee habutats wur oopind in 2992, and tuudaa, neerlee tuu senshureez laatur, abowt 9 pursent uv Residaz popyuulaashun livz in wun uv xe twentee sprawleeng undursee siteez."',
  43: '"Alxoo setulmints hav bin establisht on Fristin, and on sevrul uv xe muunz uv xe gas jiiunt Blustin, xe vast majooritee uv of-woorldurz liv in xe spaas kolooneez establisht at Residaz troojin points."',
  51: '"Xe oorijin uv Xe Dizeez haz bin linkt tuu xe Sentur foor Advanst Kriioojenik Reesurc, wic wuz kondukteeng reesurc intuu waaz uv ekstendeeng xe Kriioojenik peereeid indefinitlee. Alxoo xis reesurc wuz aa sukses, sumhow Xe Dizeez wuz reeleest and beegan spredeeng."',
  52: '"Xe tuu kompleksiz wur establisht on xe twin peek platooz uv Kalamontee and Lawanda. Xeez lookaashunz wur coozin beekawz xaar hiit wud maak transpoortaashun and komyuunikaashunz eezeeur, and soo xat xe vast reeakturz and kriioojeniks caamburz kud bee kunstruktid in xe mowntinz beeloo."',
  53: '"Faaz Wun: xe kunstrukshun uv xe Kalamontee and Lawanda Kompleksiz. Faaz Tuu: mass kriioojenik freezeeng uv Residan popyuulaashun. Faaz Xree: siimultaaneeus monitureeng uv kriioojeniks wiil awtoomaatid reesurc iz konduktid bii inkrediblee soofistikaatid kumpyuuturiizd fasiliteez. Faaz Foor: reeviivul and inokyuulaashun uv xe popyuulaashun."',
  61: '"Xe Zoork triloojee, an adventshur klasik, taaks plaas in aa deeliitful but daanjuris undurgrownd seteeng."',
  62: '"Dedliin iz xe furst graat misturee uv xe kumpyuutur aaj, and Witnis iz its wurxee suksesur."',
  63: '"Starkros iz Infookamz miind-bendeeng siiens-fikshun adventshur. Suspendid iz aa kriioojenik siiens-fikshun niitmaar."',
};
// The highest entry each menu answers to (typing above it is NO-MEANING; the culture menu's check is
// against 4, as in the source, so "4" there prints nothing).
const MENU_TOP = { 0: 6, 1: 3, 2: 3, 3: 5, 4: 3, 5: 3, 6: 3 };
const MENU_SKIP = { 2: 4 };

// The spool reader's texts (comptwo.zil globals)
const SPOOL_FITS = 'The spool fits neatly into the opening.';
const SOME_INFO = ' Some information appears on the screen.';
const GREEN_TEXT = '"Oonlee peepul wix propur traaneeng shud piilot xe helikopturz. Reekwiird ekwipmint inkluudz aa Helikoptur Akses Kard and aa Kuntrool Panul Kee. Xeez kan bee obtaand frum Tranzportaashun Stoorij."\nThe rest is all very technical.';
const RED_TEXT = '"Xe jestaashun peereeid uv Xe Dizeez, folooweeng ekspoozur, vaareez treemenduslee frum pursin tuu pursin, raanjeeng frum wun daa tuu sevrul rootaashunz. Wuns xe furst simptumz ar shoon, dex alwaaz okurz in aat tuu ten daaz.\nXe priimeree simptum iz aa hii feevur. Xe sekunderee simptum iz aa sharp inkrees in xe amownt uv sleep needid eec niit."\nThe rest of the information is about symptoms which can be detected only by using complicated medical procedures.';
const FAINT_SOUND = 'You hear the faint sound of a relay clicking.';

// EXAMINE-BOARD / PUT-BOARD / BOARD-SHOCK (comptwo.zil)
const EXAMINE_BOARD = 'Like most fromitz boards, it is a twisted maze of silicon circuits. It is square, approximately seventeen centimeters on each side.';
const PUT_BOARD = 'The card clicks neatly into the socket.';
const boardShock = g => g.tell('You jerk your hand back as you receive a powerful shock from the fromitz board.');

// LIBRARY-TYPE (comptwo.zil): the terminal's menu tree, driven by P-NUMBER. Exported as helpers['LIBRARY-TYPE']
// for biolab.js's V-TYPE, which passes the raw command (no PRSO) with P-NUMBER already read from the text.
function libraryType(g, ctx) {
  const isNumber = ctx.prso === 'INTNUM' || (!ctx.prso && /\d/.test(ctx.text ?? ''));
  if (!isNumber) return numbersOnly(g);
  const level = g.getg('MENU-LEVEL'), n = g.getg('P-NUMBER');
  const showMenu = (lvl, text) => { g.setg('MENU-LEVEL', lvl); g.tell(SCREEN_CLEARS); g.setg('SCREEN-TEXT', text); g.tell(text); };
  const showText = (lvl) => { g.setg('MENU-LEVEL', lvl); g.tell(TEXT_APPEARS); g.setg('SCREEN-TEXT', TEXTS[lvl]); g.tell(TEXTS[lvl]); g.crlf(); g.tell(MORE_INFO); };
  if (level === 0) {
    if (n === 0 || n > 6) g.tell(NO_MEANING);
    else showMenu(n, MENUS[n]);
    return;
  }
  if (level >= 1 && level <= 6) {
    if (n === 0) showMenu(0, MAIN_MENU);
    else if (n <= MENU_TOP[level]) {
      showText(level * 10 + n);
      if (level === 6 && n === 1 && floydHere(g)) {
        g.setg('FLOYD-SPOKE', true);
        g.tell('Floyd, peering over your shoulder, says "Oh, I love that game! Solved every problem, except couldn\'t figure out how to get into white house."');
      }
    } else if (n > (MENU_SKIP[level] ?? MENU_TOP[level])) g.tell(NO_MEANING);
    return;
  }
  if (level > 10 && level < 70) {   // inside a text: only 0 goes back up to that menu
    const parent = Math.floor(level / 10);
    if (n === 0) showMenu(parent, MENUS[parent]);
    else g.tell(LOW_END);
  }
}
// NUMBERS-ONLY (verbs.zil)
function numbersOnly(g) { g.tell('This keyboard only has numeric keys. You can type numbers on it, but not words.'); }

export const rooms = {
  // INFIRMARY-F (comptwo.zil): Floyd finds the Lazarus breast plate. LDESC is in world.json.
  INFIRMARY(g, ctx) {
    if (ctx.rarg === 'M-END' && !g.getg('LAZARUS-FLAG') && floydHere(g) && g.fsetP('FLOYD', 'RLANDBIT') && g.prob(30)) {
      g.setg('LAZARUS-FLAG', true); g.move('LAZARUS-PART', g.state.here); g.move('FLOYD', 'FORK'); g.setg('FLOYD-FOLLOW', false); g.setg('FLOYD-SPOKE', true);
      g.tell('Floyd, rummaging in a corner, finds something and carries it to the center of the room to examine it in the brighter light. It seems to be the breast plate of a robot, along with some connected inner circuitry. The entire piece is bent and rusting. Floyd stares at it in complete silence. A moment later, he begins sobbing quietly, awkwardly excuses himself, and runs out of the room. You look at the breast plate, and notice the name "Lazarus" engraved on it.', 'event');
    }
    return false;
  },
  // PROJCON-OFFICE-F (comptwo.zil): M-LOOK is in world.json (COMPUTER-FIXED picks the mural or the elevator).
  'PROJCON-OFFICE'(g, ctx) {
    if (ctx.rarg === 'M-END' && floydHere(g) && !g.getg('MURAL-FLAG')) {
      g.setg('MURAL-FLAG', true); g.setg('FLOYD-SPOKE', true);
      g.tell('Floyd surveys the mural and scratches his head. "I don\'t remember seeing this before," he comments.', 'event');
    }
    return false;
  },
  // RADIATION-LAB-F (comptwo.zil): the first visit starts the radiation clock. depends on: I-NUKED-BLUE (rules/biolab.js)
  'RADIATION-LAB'(g, ctx) {
    if (ctx.rarg === 'M-ENTER' && !g.state.rooms['RADIATION-LAB'].touched) g.queue('I-NUKED-BLUE', 50);
    return false;
  },
  // LAB-OFFICE-F (comptwo.zil): M-LOOK is in world.json; with the office door open the Bio Lab's mutants pour in
  // unless the lab has just been flooded with fungicide. depends on: LAB-FLOODED is cleared by I-UNFLOOD (rules/biolab.js)
  'LAB-OFFICE'(g, ctx) {
    if (ctx.rarg === 'M-END' && g.fsetP('OFFICE-DOOR', 'OPENBIT')) {
      if (g.getg('LAB-FLOODED')) g.tell('Through the open doorway you can see the Bio Lab. It seems to be filled with a light mist. Horrifying biological nightmares stagger about making choking noises.', 'event');
      else g.jigsUp('Mutated monsters from the Bio Lab pour into the office. You are devoured.');
    }
    return false;
  },
  // PLANETARY-DEFENSE-F and PLANETARY-COURSE-CONTROL-F are M-LOOK only and render from world.json.
  // LAWANDA-PLATFORM-F is in connectors.js.
};

// GOO-style shared handler for the two library spools: RED-SPOOL-F / GREEN-SPOOL-F (comptwo.zil)
function spool(g, ctx) {
  const id = ctx.prso;
  if (!obj(ctx) || !is(ctx, 'TAKE') || !g.isIn(id, 'SPOOL-READER') || !g.fsetP('SPOOL-READER', 'ONBIT')) return false;
  g.move(id, 'ADVENTURER'); g.fclear(id, 'TRYTAKEBIT'); g.tell('The screen goes blank as you take the spool.');
  return true;
}
// RAD-DOOR-EAST-F / RAD-DOOR-WEST-F share one shape (BOTH-DOORS, DOOR-OPENS, DOOR-CLOSES are comptwo.zil globals).
function radDoor(g, ctx, door, other) {
  if (!obj(ctx)) return false;
  if (is(ctx, 'OPEN')) {
    if (g.fsetP(door, 'OPENBIT')) alreadyOpen(g);
    else if (g.fsetP(other, 'OPENBIT')) g.tell('A very bored-sounding recorded voice explains that, in order to prevent contamination, both lock doors cannot be open simultaneously.');
    else { g.fset(door, 'OPENBIT'); g.tell('The door opens.'); }
    return true;
  }
  if (is(ctx, 'CLOSE')) { if (g.fsetP(door, 'OPENBIT')) { g.fclear(door, 'OPENBIT'); g.tell('The door closes.'); } else isClosed(g); return true; }
  return false;
}
// BOARD-F (comptwo.zil): the four boards seated in the access panel. Only the second one comes out, and only
// while the defense system is still broken; what you get is the fried board (or the cracked one you put in).
function board(g, ctx) {
  if (!obj(ctx)) return false;
  if (is(ctx, 'TAKE')) {
    if (ctx.prso !== 'SECOND-BOARD' || g.getg('DEFENSE-FIXED')) { boardShock(g); return true; }
    g.tell('The fromitz board slides out of the panel, producing an empty socket for another board.');
    g.remove('SECOND-BOARD'); g.setg('ACCESS-PANEL-FULL', false);
    g.move(g.getg('ITS-CRACKED') === true ? 'CRACKED-BOARD' : 'FRIED-BOARD', 'ADVENTURER');
    thisIsIt(g, 'FRIED-BOARD');
    return true;
  }
  if (is(ctx, 'EXAMINE')) { g.tell(EXAMINE_BOARD); return true; }
  return false;
}

export const objects = {
  // The emergency ration (setup below). It eats like the goo in the survival kit (GOO-F, survival.js), minus the kit:
  // it is a sealed pack, so it is eaten from the hand.
  'RATION-PACK'(g, ctx) {
    if (ctx.rarg !== 'M-OBJECT') return false;
    if (ctx.verb === 'EAT') {
      if (g.getg('HUNGER-LEVEL') === 0) { g.tell("Thanks, but you're not hungry."); return true; }
      if (!g.held('RATION-PACK')) { g.tell("You're not holding the ration."); return true; }
      g.remove('RATION-PACK'); g.state.elapsed = 15; g.setg('HUNGER-LEVEL', 0); g.queue('I-HUNGER-WARNINGS', 1450);
      g.tell('You tear the seal and work through a block of something pale and faintly sweet. It is not a meal anyone would choose, but it is a meal, and there is enough moisture in it to see off your thirst as well.');
      return true;
    }
    if (ctx.verb === 'EXAMINE' || ctx.verb === 'READ') {
      g.tell('A flat foil pack the size of a paperback, sealed and stamped with a red cross and the words "Emurjinsee Raashun -- Wun Meel."');
      return true;
    }
    return false;
  },
  // RED-SPOOL-F / GREEN-SPOOL-F
  'RED-SPOOL': spool, 'GREEN-SPOOL': spool,

  // MEDICINE-F (comptwo.zil): the disease-suppression medicine. Eating it is the cure hook survival.js's
  // I-SICKNESS-WARNINGS reads: SICKNESS-LEVEL drops by two and LOAD-ALLOWED rises by twenty.
  MEDICINE(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'TASTE', 'EAT', 'POUR')) {
      if (!g.isIn('MEDICINE-BOTTLE', 'ADVENTURER')) { notHolding(g, 'MEDICINE-BOTTLE'); thisIsIt(g, 'MEDICINE-BOTTLE'); return true; }
      if (!g.fsetP('MEDICINE-BOTTLE', 'OPENBIT')) { g.tell('The bottle is closed.'); return true; }
      if (is(ctx, 'TASTE')) { g.tell('It tastes fairly bitter.'); return true; }
      if (is(ctx, 'EAT')) {
        g.remove('MEDICINE'); g.state.elapsed = 15;
        // Deliberate deviation (user decision, 2026-09-11, round six): the source subtracts 2 from SICKNESS-LEVEL even
        // below zero (and adds 20 to LOAD-ALLOWED regardless), so a player dosed on the first day of fever read "You are
        // a bit sick and feverish." from DIAGNOSE forever after. The level stops at zero, the strength returned matches
        // the levels cured (10 each, as I-SICKNESS-WARNINGS took it), and the effect is said.
        const was = g.getg('SICKNESS-LEVEL') ?? 0, now = Math.max(0, was - 2);
        g.setg('SICKNESS-LEVEL', now); g.setg('LOAD-ALLOWED', g.getg('LOAD-ALLOWED') + 10 * (was - now));
        g.tell('The medicine tasted extremely bitter.' + (was === 0 ? '' : now === 0 ? ' After a few moments the fever breaks, and you feel your strength returning.' : ' After a few moments your fever eases a little, and you feel somewhat stronger.'));
        return true;
      }
      // POUR
      g.remove('MEDICINE');
      const prsi = ctx.prsi ?? 'GROUND';
      if (prsi === 'FUNNEL-HOLE') {   // depends on: CHEMICAL-FLUID-F, FLASK, CHEMICAL-REQUIRED (comm room / lab area)
        const x = g.isIn('CHEMICAL-FLUID', 'FLASK');
        g.setg('CHEMICAL-REQUIRED', 10); g.perform('POUR', 'CHEMICAL-FLUID', 'FUNNEL-HOLE');
        if (x) g.move('CHEMICAL-FLUID', 'FLASK');
        return true;
      }
      g.tell(`It pours over the ${D(g, prsi)} and evaporates.`); return true;
    }
    // "take medicine" with the word "take" itself (P-VTBL) means eat it.
    if (is(ctx, 'TAKE') && /^\s*take\b/i.test(ctx.text ?? '')) { g.perform('EAT', 'MEDICINE'); return true; }
    return false;
  },

  // GOOD-BOARD-F (comptwo.zil): the shiny board inside the robot hole; NDESCBIT until Floyd hands it over (floyd.js), and
  // not drawn while it is in there (rules.visible below): you only know of it from Floyd, and "You can't see" it.
  'GOOD-BOARD'(g, ctx) {
    if (!obj(ctx)) return false;
    if (g.fsetP('GOOD-BOARD', 'NDESCBIT') && is(ctx, 'TAKE', 'EXAMINE', 'RUB', 'PUSH', 'PULL', 'MOVE', 'LOOK-UNDER') && ctx.prso === 'GOOD-BOARD') { g.tell(`You can't see any ${D(g, ctx.prso)} here.`); return true; }
    if (is(ctx, 'EXAMINE')) { g.tell(EXAMINE_BOARD); return true; }
    return false;
  },
  // BOARD-F: FIRST-BOARD, SECOND-BOARD, THIRD-BOARD, FOURTH-BOARD
  'FIRST-BOARD': board, 'SECOND-BOARD': board, 'THIRD-BOARD': board, 'FOURTH-BOARD': board,
  // FRIED-BOARD-F (comptwo.zil)
  'FRIED-BOARD'(g, ctx) { if (obj(ctx) && is(ctx, 'EXAMINE')) { g.tell(EXAMINE_BOARD + ' This one is a bit blackened around the edges, though.'); return true; } return false; },
  // CRACKED-BOARD-F (compone.zil): starts in the carton in Storage East.
  'CRACKED-BOARD'(g, ctx) { if (obj(ctx) && is(ctx, 'EXAMINE')) { g.tell(EXAMINE_BOARD + " This one looks as though it's been dropped."); return true; } return false; },

  // ACCESS-PANEL-F (comptwo.zil): the socket in Planetary Defense.
  'ACCESS-PANEL'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'OPEN')) {
      if (g.fsetP('ACCESS-PANEL', 'OPENBIT')) alreadyOpen(g);
      else { g.fset('ACCESS-PANEL', 'OPENBIT'); g.tell('The panel swings open.'); g.perform('LOOK-INSIDE', 'ACCESS-PANEL'); }
      return true;
    }
    if (is(ctx, 'CLOSE')) {
      if (g.fsetP('ACCESS-PANEL', 'OPENBIT')) { g.fclear('ACCESS-PANEL', 'OPENBIT'); g.tell('The panel swings closed.'); } else isClosed(g);
      return true;
    }
    if (is(ctx, 'PUT') && ctx.prsi === 'ACCESS-PANEL') {
      if (!g.fsetP('ACCESS-PANEL', 'OPENBIT')) { g.tell('The panel is closed.'); return true; }
      if (g.getg('ACCESS-PANEL-FULL')) { g.tell("There's no room."); return true; }
      if (!haveIt(g, ctx, ctx.prso)) return true;
      if (ctx.prso === 'GOOD-BOARD') {
        g.remove('GOOD-BOARD'); g.move('SECOND-BOARD', 'ACCESS-PANEL'); thisIsIt(g, 'SECOND-BOARD');
        g.setg('DEFENSE-FIXED', true); g.state.score += 6; g.setg('ACCESS-PANEL-FULL', true);
        g.tell(PUT_BOARD + ' The warning lights stop flashing.'); return true;
      }
      if (ctx.prso === 'CRACKED-BOARD' || ctx.prso === 'FRIED-BOARD') {
        g.remove(ctx.prso); thisIsIt(g, 'SECOND-BOARD'); g.move('SECOND-BOARD', 'ACCESS-PANEL'); g.setg('ACCESS-PANEL-FULL', true);
        if (ctx.prso === 'CRACKED-BOARD') g.setg('ITS-CRACKED', true);
        g.tell(PUT_BOARD); return true;
      }
      g.tell(`The ${D(g, ctx.prso)} doesn't fit.`); return true;
    }
    return false;
  },
  // CUBE-F (comptwo.zil): the bedistor socket in Course Control. MUNGEDBIT is set by the chemical fluid (compone.zil).
  CUBE(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'OPEN')) {
      if (g.fsetP('CUBE', 'OPENBIT')) alreadyOpen(g);
      else { g.fset('CUBE', 'OPENBIT'); g.tell('The lid swings open.'); g.perform('LOOK-INSIDE', 'CUBE'); }
      return true;
    }
    if (is(ctx, 'CLOSE')) {
      if (g.fsetP('CUBE', 'OPENBIT')) { g.fclear('CUBE', 'OPENBIT'); g.tell('The lid swings closed.'); } else isClosed(g);
      return true;
    }
    if (is(ctx, 'PUT') && ctx.prsi === 'CUBE') {
      if (!g.fsetP('CUBE', 'OPENBIT')) { g.tell('The cube is closed.'); return true; }
      if (g.isIn('BAD-BEDISTOR', 'CUBE')) { g.tell("There's a fused bedistor in the way."); return true; }
      if (ctx.prso === 'GOOD-BEDISTOR') {
        if (!haveIt(g, ctx, 'GOOD-BEDISTOR')) return true;
        g.move('GOOD-BEDISTOR', 'CUBE');
        if (!g.fsetP('CUBE', 'MUNGEDBIT')) { g.setg('COURSE-CONTROL-FIXED', true); g.fset('GOOD-BEDISTOR', 'TRYTAKEBIT'); g.state.score += 6; g.tell('Done. The warning lights go out and another light goes on.'); }
        else g.tell('Done.');
        return true;
      }
      if (ctx.prso === 'BAD-BEDISTOR') { if (!haveIt(g, ctx, 'BAD-BEDISTOR')) return true; g.move('BAD-BEDISTOR', 'CUBE'); g.tell('Done.'); return true; }
      g.tell(`The ${D(g, ctx.prso)} doesn't fit.`); return true;
    }
    return false;
  },
  // BAD-BEDISTOR-F (comptwo.zil): fused into the cube until the pliers pull it ("take bedistor with pliers" is ZATTRACT).
  'BAD-BEDISTOR'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'TAKE') && g.isIn('BAD-BEDISTOR', 'CUBE')) { g.state.bedistorTried = true; g.tell('It seems to be fused to its socket.'); return true; }   // bedistorTried: the click menu's own state (uses above)
    if (is(ctx, 'ZATTRACT')) {
      if (ctx.prsi === 'PLIERS') { g.move('BAD-BEDISTOR', 'ADVENTURER'); g.fclear('BAD-BEDISTOR', 'TRYTAKEBIT'); g.tell('With a tug, you manage to remove the fused bedistor.'); }
      else g.tell("You can't get a grip on the bedistor with that.");
      return true;
    }
    return false;
  },
  // GOOD-BEDISTOR-F (compone.zil): starts in the carton; lethal to touch once it is carrying current.
  'GOOD-BEDISTOR'(g, ctx) {
    if (obj(ctx) && is(ctx, 'TAKE') && g.getg('COURSE-CONTROL-FIXED')) { g.jigsUp('Kerzap!! You should know better than to touch an active bedistor!'); return true; }
    return false;
  },

  // TERMINAL-F (comptwo.zil): the library index terminal. Typing on it is V-TYPE / LIBRARY-TYPE below.
  TERMINAL(g, ctx) {
    if (!obj(ctx)) return false;
    const on = g.fsetP('TERMINAL', 'ONBIT');
    const screen = () => { g.tell(g.getg('SCREEN-TEXT')); if (g.getg('MENU-LEVEL') > 9) { g.crlf(); g.tell(MORE_INFO); } };
    if (is(ctx, 'EXAMINE')) {
      g.tell('The computer terminal consists of a video display screen, a keyboard with ten keys numbered from zero through nine, and an on-off switch. ' + (on ? 'The screen displays some writing:' : 'The screen is dark.'));
      if (on) screen();
      return true;
    }
    if (is(ctx, 'READ')) { if (on) screen(); else g.tell('The screen is blank.'); return true; }
    if (is(ctx, 'TURN-ON')) {
      if (on) g.tell("It's already on.");
      else { g.fset('TERMINAL', 'ONBIT'); g.fset('TERMINAL', 'TOUCHBIT'); g.setg('SCREEN-TEXT', MAIN_MENU); g.tell('The screen gives off a green flash, and then some writing appears on the screen:'); g.tell(MAIN_MENU); }
      return true;
    }
    if (is(ctx, 'TURN-OFF')) {
      if (on) { g.fclear('TERMINAL', 'ONBIT'); g.setg('MENU-LEVEL', 0); g.tell('The screen goes dark.'); } else g.tell("It isn't on!");
      return true;
    }
    return false;
  },
  // SPOOL-READER-F (comptwo.zil)
  'SPOOL-READER'(g, ctx) {
    if (!obj(ctx)) return false;
    const on = g.fsetP('SPOOL-READER', 'ONBIT'), loaded = g.contents('SPOOL-READER').length > 0;
    if (is(ctx, 'TURN-ON')) {
      if (on) g.tell('The spool reader is already on.');
      else { g.fset('SPOOL-READER', 'ONBIT'); g.fset('SPOOL-READER', 'TOUCHBIT'); g.tell(loaded ? g.getg('SPOOL-TEXT') : 'The machine hums quietly, and the screen lights up with the phrase "Pleez insurt spuul."'); }
      return true;
    }
    if (is(ctx, 'TURN-OFF')) { if (on) { g.fclear('SPOOL-READER', 'ONBIT'); g.tell('The spool reader is now off.'); } else g.tell("It's not on!"); return true; }
    if (is(ctx, 'EXAMINE')) {
      g.tell('The machine has a small screen, and below that, a small circular opening. The screen is currently ' + (on && loaded ? 'displaying some information:' : 'blank.'));
      if (on && loaded) g.tell(g.getg('SPOOL-TEXT'));
      return true;
    }
    if (is(ctx, 'READ')) { g.tell(on && loaded ? g.getg('SPOOL-TEXT') : 'The screen is blank.'); return true; }
    if (is(ctx, 'PUT') && ctx.prsi === 'SPOOL-READER') {
      if (loaded) { g.tell("There's already a spool in the reader."); return true; }
      if (ctx.prso === 'GREEN-SPOOL' || ctx.prso === 'RED-SPOOL') {
        if (!haveIt(g, ctx, ctx.prso)) return true;
        g.setg('SPOOL-TEXT', ctx.prso === 'GREEN-SPOOL' ? GREEN_TEXT : RED_TEXT); g.move(ctx.prso, 'SPOOL-READER'); g.fset(ctx.prso, 'TRYTAKEBIT');
        g.tell(SPOOL_FITS + (on ? SOME_INFO : '')); return true;
      }
      g.tell("It doesn't fit in the circular opening."); return true;
    }
    if (is(ctx, 'CLOSE')) { noClose(g); return true; }
    return false;
  },

  // PRINT-OUT-F (comptwo.zil). The source switches to a fixed font for the report.
  'PRINT-OUT'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'READ', 'EXAMINE')) return false;
    g.tell('The printout is hundreds of pages long. It would take many chrons to read it all. The last page looks pretty interesting, though:\n\n"Daalee Statis Reeport:\nPREELIMINEREE REESURC:  100.000%\nINTURMEEDEEIT REESURC:  100.000%\nFIINUL REESURC:         100.000%\nDRUG PROODUKSHUN:       100.000%\nDRUG TESTEENG:           99.985%\nProojektid tiim tuu reeviivul prooseedzur:  0 daaz, 0.8 kronz\n\n\n*** ALURT! ALURT! ***\nMalfunkshun in Sekshun 384! Sumuneeng reepaar roobot."\n\nThe printout ends at this point.');
    return true;
  },

  // LAB-UNIFORM-F (comptwo.zil)
  'LAB-UNIFORM'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) { g.tell('It is a plain lab uniform. The logo above the pocket depicts a flame burning above some kind of sleep chamber. The pocket is ' + (g.fsetP('LAB-UNIFORM', 'OPENBIT') ? 'open' : 'closed') + '.'); return true; }
    if (is(ctx, 'SEARCH', 'OPEN')) {
      if (g.fsetP('LAB-UNIFORM', 'OPENBIT')) { g.tell('The pocket is already open.'); return true; }
      g.fset('LAB-UNIFORM', 'OPENBIT');
      if (g.getg('UNIFORM-OPENED')) g.tell(g.contents('LAB-UNIFORM').length ? "Opening the uniform's pocket reveals " + printContents(g, 'LAB-UNIFORM') + '.' : 'The pocket is empty.');
      else { g.setg('UNIFORM-OPENED', true); g.tell('You discover a small piece of paper and a teleportation access card in the pocket of the uniform.'); }
      return true;
    }
    if (is(ctx, 'WEAR') && g.fsetP('PATROL-UNIFORM', 'WORNBIT')) { g.tell("It won't fit on top of the Patrol uniform."); return true; }
    return false;
  },
  // COMBINATION-PAPER-F (comptwo.zil): the conference-room combination (NUMBER-NEEDED, compone.zil).
  'COMBINATION-PAPER'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'READ', 'EXAMINE')) return false;
    g.tell(`Week uv 14-Juun--2882. Kombinaashun tuu Konfurins Ruum: ${g.getg('NUMBER-NEEDED')}.`); return true;
  },

  // LAMP-F (comptwo.zil). engine gap: darkness and light sources are not modelled (lit() reads only the
  // room's ONBIT), so the lamp's ONBIT is kept faithfully but lights nothing.
  LAMP(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'TURN-ON')) {
      if (g.fsetP('LAMP', 'ONBIT')) g.tell('It is on.');
      else { g.fset('LAMP', 'ONBIT'); g.fset('LAMP', 'TOUCHBIT'); g.tell('The lamp is now producing a bright light.'); }
      return true;
    }
    if (is(ctx, 'TURN-OFF')) { if (g.fsetP('LAMP', 'ONBIT')) { g.fclear('LAMP', 'ONBIT'); g.tell('The lamp goes dark.'); } else g.tell("It isn't on."); return true; }
    return false;
  },

  // RAD-DOOR-EAST-F / RAD-DOOR-WEST-F (comptwo.zil): the radiation lock's doors; only one may be open at a time.
  'RAD-DOOR-EAST': (g, ctx) => radDoor(g, ctx, 'RAD-DOOR-EAST', 'RAD-DOOR-WEST'),
  'RAD-DOOR-WEST': (g, ctx) => radDoor(g, ctx, 'RAD-DOOR-WEST', 'RAD-DOOR-EAST'),

  // LAB-DESK-F (comptwo.zil): the memo turns up the first time the desk is examined; opening it reveals the gas mask.
  'LAB-DESK'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE', 'SEARCH') && !g.fsetP('LAB-DESK', 'TOUCHBIT')) {
      g.move('MEMO', 'ADVENTURER'); g.fset('LAB-DESK', 'TOUCHBIT');
      g.tell('After inspecting the various papers on the desk, you find only one item of interest, a memo of some sort. The desk itself is ' + (g.fsetP('LAB-DESK', 'OPENBIT') ? 'open' : "closed, but it doesn't look locked") + '.');
      return true;
    }
    if (is(ctx, 'OPEN') && g.isIn('GAS-MASK', 'LAB-DESK')) { thisIsIt(g, 'GAS-MASK'); return false; }
    return false;
  },
  // LIGHT-BUTTON-F / DARK-BUTTON-F / FUNGICIDE-BUTTON-F (comptwo.zil). depends on: I-UNFLOOD (rules/biolab.js)
  'LIGHT-BUTTON'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'PUSH')) return false;
    if (g.getg('LAB-LIGHTS-ON')) g.tell('Nothing happens.'); else { g.setg('LAB-LIGHTS-ON', true); g.tell(FAINT_SOUND); }
    return true;
  },
  'DARK-BUTTON'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'PUSH')) return false;
    if (g.getg('LAB-LIGHTS-ON')) { g.setg('LAB-LIGHTS-ON', false); g.tell(FAINT_SOUND); } else g.tell('Nothing happens.');
    return true;
  },
  'FUNGICIDE-BUTTON'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'PUSH')) return false;
    g.setg('LAB-FLOODED', true); g.queue('I-UNFLOOD', 50); g.tell('You hear a hissing from beyond the door to the west.');
    return true;
  },
};

// Room PSEUDO scenery routines (globals.zil) for the rooms this module owns. Several are shared with rooms in
// other areas (EQUIPMENT-, CABINETS-, TOILET-, IN-BOOTH-, CARPET-PSEUDO); they are the same one-line routines.
// Deliberate deviation (user decision, 2026-09-11, round nine): the platform's description quotes a faded sign, but
// the source gives it no word ("examine sign": "You can't see any sign here!", typed tester, round eight). It only
// repeats the sign's own text.
// Deliberate deviation (user decision, 2026-09-12, round eleven), LIBRARIAN-PSEUDO below: the index terminal prints
// "If yuu reekwiir asistins, kawl xe liibrereein" and neither "call" nor "librarian" was a word, so the one printed
// instruction in the game came back as "I don't know the word". There is no librarian; now the game says so.
export const pseudoWords = {
  'LAWANDA-PLATFORM': [{ word: 'SIGN', routine: 'PLATFORM-SIGN-PSEUDO' }],
  'LIBRARY-LOBBY': [{ word: 'LIBRARIAN', routine: 'LIBRARIAN-PSEUDO' }],
};
export const pseudos = {
  'LIBRARIAN-PSEUDO'(g, ctx) {
    // Round eighteen: the scenery tag's Examine answered "You call for the librarian", so the button said one thing and
    // did another. Examine looks; the call is its own entry (menus below).
    if (obj(ctx) && is(ctx, 'EXAMINE')) { g.tell('There is no librarian here, and from the dust on the carpet there has not been one for a long time.'); return true; }
    if (!obj(ctx) || !is(ctx, 'CALL', 'TALK', 'HELLO', 'LISTEN')) return false;
    g.tell('You call for the librarian. Your voice goes flat against the shelves, and nothing answers: the invitation on the terminal has outlived the last person who could have taken it up.');
    return true;
  },
  'PLATFORM-SIGN-PSEUDO'(g, ctx) {
    if (!obj(ctx) || !is(ctx, 'EXAMINE', 'READ')) return false;
    g.tell('The faded sign reads "Shutul Platform -- Lawanda Staashun."'); return true;
  },
  // ESCALATOR-PSEUDO (Lawanda Platform, Escalator, Fork). "climb escalator" is CLIMB-FOO in the source, CLIMB-ON here.
  'ESCALATOR-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'CLIMB-UP', 'CLIMB-ON')) { if (here(g, 'FORK')) g.tell("You're already at the top of the escalator."); else g.doWalk('UP'); return true; }
    if (is(ctx, 'CLIMB-DOWN')) { if (here(g, 'LAWANDA-PLATFORM')) g.tell("You're already at the bottom of the escalator."); else g.doWalk('DOWN'); return true; }
    if (is(ctx, 'TURN-ON')) { g.tell(g.pickOne(YUKS)); return true; }
    return false;
  },
  // EQUIPMENT-PSEUDO (Infirmary, Repair Room, Physical Plant, Radiation Lab, Systems Monitors)
  'EQUIPMENT-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'EXAMINE', 'RUB', 'TURN-ON', 'TURN-OFF')) { g.tell("The equipment here is so complicated that you couldn't even begin to figure out how to operate it."); return true; } return false; },
  // CABINETS-PSEUDO (Repair Room, Lab Office)
  'CABINETS-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE', 'OPEN')) { g.tell('The cabinets are locked.'); return true; }
    if (is(ctx, 'UNLOCK')) { g.tell("You don't have the correct key."); return true; }
    return false;
  },
  // CARPET-PSEUDO (Library Lobby, Library; the rack in Lab Storage)
  'CARPET-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'EXAMINE')) { g.tell("It's pretty dusty."); return true; } return false; },
  // DESK-PSEUDO (Library)
  'DESK-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'OPEN')) { g.tell('All the drawers are empty.'); return true; }
    if (is(ctx, 'EXAMINE')) { g.tell('It is bare except for the microfilm reader.'); return true; }
    return false;
  },
  // SUPPLIES-PSEUDO (Lab Storage)
  'SUPPLIES-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'TAKE')) { g.tell('These supplies are of absolutely no use.'); return true; } return false; },
  // MURAL-PSEUDO (ProjCon Office): gone once the computer is fixed. "look behind" reaches here as LOOK-UNDER (kalamontee.js).
  'MURAL-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (g.getg('COMPUTER-FIXED')) { anymore(g); return true; }
    if (is(ctx, 'EXAMINE')) { g.tell("It's a gaudy work of orange and purple abstract shapes, reminiscent of the early works of Burstini Bonz. It doesn't appear to fit the decor of the room at all. The mural seems to ripple now and then, as though a breeze were blowing behind it."); return true; }
    if (is(ctx, 'MUNG')) { g.tell("My sentiments also, but let's be civil."); return true; }
    if (is(ctx, 'MOVE', 'LOOK-BEHIND', 'LOOK-UNDER')) { g.tell("It won't budge."); return true; }
    return false;
  },
  // LOGO-PSEUDO (ProjCon Office)
  'LOGO-PSEUDO'(g, ctx) { if (obj(ctx) && is(ctx, 'READ', 'EXAMINE')) { g.tell('The logo shows a flame burning over a sleep chamber of some type. Under that is the phrase "Prajekt Kuntrool."'); return true; } return false; },
  // CRACK-PSEUDO (Radiation Lab; also the Bio Lab side, which looks back the other way)
  'CRACK-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) { g.tell('The crack is too small to go through, but large enough to look through.'); return true; }
    if (is(ctx, 'LOOK-INSIDE')) { g.tell(here(g, 'RADIATION-LAB') ? 'You see a dimly lit Bio Lab. Sinister shapes lurk about within.' : 'You see a laboratory suffused with a pale blue glow.'); return true; }
    return false;
  },
  // TOILET-PSEUDO (SanFac F, and the SanFacs near the dorms)
  'TOILET-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'EXAMINE')) { g.tell('The fixtures are all dry and dusty.'); return true; }
    if (is(ctx, 'FLUSH')) { g.tell('The water seems to be turned off.'); return true; }
    return false;
  },
  // IN-BOOTH-PSEUDO (Booth 3, Auxiliary Booth, and the other booths)
  'IN-BOOTH-PSEUDO'(g, ctx) {
    if (!obj(ctx)) return false;
    if (is(ctx, 'THROUGH', 'BOARD', 'WALK-TO')) { g.tell("You're already in the booth!"); return true; }
    if (is(ctx, 'DROP', 'EXIT', 'DISEMBARK')) { g.doWalk('OUT'); return true; }
    return false;
  },
};

// Click-menu verbs for objects whose traits alone would not offer them (see parser.verbsFor).
// Drawn things hidden for now (parser.isVisible): the good board is out of sight inside the robot hole.
// The mural once it has slid away (round eighteen): the room says so, and its tag stayed on the list. Typed, the word
// still reaches MURAL-PSEUDO, which answers ANYMORE ("You can't see that anymore.") as the source does.
export const visible = { 'GOOD-BOARD': g => !g.isIn('GOOD-BOARD', 'ROBOT-HOLE'), 'MURAL-PSEUDO': g => !g.getg('COMPUTER-FIXED') };

export const menus = {
  TERMINAL: ['TURN-ON', 'TURN-OFF', 'READ', { verb: 'TYPE', number: true }],   // its keyboard: "Type a number", as on the booth's
  // Only the second board comes out (BOARD-F); the others shock you. All four offer Take, so the list does not answer the puzzle.
  'FIRST-BOARD': ['TAKE'], 'THIRD-BOARD': ['TAKE'], 'FOURTH-BOARD': ['TAKE'],
  'SPOOL-READER': ['TURN-ON', 'TURN-OFF', 'READ', { verb: 'CLOSE', when: () => false }],   // SPOOL-READER-F: NO-CLOSE
  LAMP: ['TURN-ON', 'TURN-OFF'],
  'LIGHT-BUTTON': ['PUSH'], 'DARK-BUTTON': ['PUSH'], 'FUNGICIDE-BUTTON': ['PUSH'],
  // The medicine is a liquid in a bottle: its Eat reads "Drink", as the canteen's protein liquid does (survival.js).
  // DRINK is EAT in the source (syntax.zil 122). Round fifteen: "'eat' is an odd verb for a liquid medicine".
  MEDICINE: [{ verb: 'EAT', label: 'Drink' }, 'TASTE'],
  'LIBRARIAN-PSEUDO': ['CALL'],   // round eighteen: "Call librarian", beside its Examine
};

// Two-object click-menu entries (see parser.usesFor): the fused bedistor comes out with the pliers (BAD-BEDISTOR-F ZATTRACT).
export const uses = [
  // Only while it is fused in the cube, and only once a plain Take has found it fused: the entry would otherwise solve
  // the puzzle before it is met (round eight).
  { verb: 'ZATTRACT', prso: ['BAD-BEDISTOR'], prsi: ['PLIERS'], label: 'Take with pliers', when: g => g.isIn('BAD-BEDISTOR', 'CUBE') && !!g.state.bedistorTried },
];

// Verb defaults from verbs.zil that this area's objects rely on and the engine does not provide.
export const verbs = {
  // V-CALL has no source routine: "call" enters the dictionary only because the library terminal tells the player to
  // use it (LIBRARIAN-PSEUDO answers there). Everywhere else it is a polite nothing.
  CALL(g, ctx) { g.tell(`You call out. ${g.fsetP(ctx.prso, 'ACTORBIT') ? `The ${g.name(ctx.prso)} is right here.` : 'Nothing answers.'}`); },
  // V-TYPE. The parser has no numeric literals, so "type 384" arrives with no object: the number (or noun)
  // is read from ctx.text here and P-NUMBER / INTNUM set the way the original parser did. The mini-booth
  // branch straddles the bio-lab area (STATION-384, BEEN-HERE, MINI-ACTIVATED) and is ported in full.
  TYPE(g, ctx) {
    if (!ctx.prso) {
      const words = (ctx.text ?? '').toLowerCase().replace(/[^a-z0-9'\- ]/g, ' ').split(/\s+/).filter(Boolean).slice(1);
      if (words[0] === 'in') words.shift();
      const rest = words.filter(w => !['the', 'a', 'an', 'on'].includes(w));
      if (!rest.length) { g.tell('What do you want to type?'); ctx.fatal = true; return; }
      if (/^\d+$/.test(rest[0])) { g.setg('P-NUMBER', parseInt(rest[0], 10)); g.perform('TYPE', 'INTNUM'); return; }   // "type 384 [on keyboard]": the number is the INTNUM
      const r = resolve(rest, g);
      if (r.error) { g.tell(r.error); ctx.fatal = true; return; }
      thisIsIt(g, r.id); g.perform('TYPE', r.id); return;
    }
    if (here(g, 'MINI-BOOTH')) {
      if (ctx.prso !== 'INTNUM') return numbersOnly(g);
      if (!g.getg('MINI-ACTIVATED')) return g.tell('A recording says "Internal computer repair booth not activated."');
      const n = g.getg('P-NUMBER');
      if (n === 384) { g.tell('You notice the walls of the booth sliding away in all directions, followed by a momentary queasiness in the pit of your stomach...'); g.crlf(); g.goto('STATION-384'); g.setg('BEEN-HERE', true); return; }
      if (n < 10) return g.tell('After a pause a recorded voice says "There are no one-digit computer sectors...clearing entry...please type damaged sector number."');
      if (n > 1024) return g.tell('A recorded voice says "Databanks indicate no computer sector corresponding to that number. Please check with your supervisor."');
      return g.jigsUp('Ooops! You seem to have transported yourself into an active sector of the computer. You are fried by powerful electric currents.');
    }
    if (here(g, 'LIBRARY-LOBBY')) return libraryType(g, ctx);
    g.tell('Type on what???');
  },
  // V-FLUSH
  FLUSH(g, ctx) { g.tell(`Flush ${g.article(ctx.prso)} ${D(g, ctx.prso)}?`); },
};
// Cross-area routines: biolab.js's V-TYPE hands the library lobby to LIBRARY-TYPE.
export const helpers = { 'LIBRARY-TYPE': libraryType, 'NUMBERS-ONLY': numbersOnly };

// Parser phrases from syntax.zil: TYPE / TYPE IN (numbers are parsed by the verb), FLUSH, TURN ON / OFF, TASTE.
export const vocabulary = [
  ['type', 'TYPE', 0], ['type in', 'TYPE', 0],
  ['flush', 'FLUSH', 1],
  ['turn on', 'TURN-ON', 1], ['activate', 'TURN-ON', 1], ['turn off', 'TURN-OFF', 1],   // V-LAMP-ON / V-LAMP-OFF defaults are in floyd.js
  ['call', 'CALL', 1], ['call for', 'CALL', 1], ['summon', 'CALL', 1], ['page', 'CALL', 1],
  ['taste', 'TASTE', 1],                                                                  // V-TASTE default is in survival.js
];

// Globals this area reads (comptwo.zil / compone.zil / verbs.zil defaults).
// Deliberate deviation (user decision, 2026-09-12, round eleven): an emergency ration in the Lawanda Infirmary.
// There is no food or water anywhere in the Lawanda wing -- the goo and the Kitchen dispenser are both back across
// the shuttle tunnel -- so a player who crosses with a full canteen and works through the library, the labs and the
// two repair rooms starves with no reachable answer. Round eleven's typed tester died of it at turn 532, and its
// click tester crossed back and forth three times to eat. The infirmary is where a medical wing would keep one.
// The object is not in the source, so it is built here rather than in the extracted world data.
function addRation(g) {
  if (g.objects['RATION-PACK']) return;
  g.objects['RATION-PACK'] = { id: 'RATION-PACK', name: 'emergency ration', file: null, line: null, location: 'INFIRMARY',
    // The counter line is its FDESC, not an LDESC: an LDESC follows a thing everywhere, so a ration dropped in the
    // Library Lobby "lies on the counter" there (round eighteen). Once taken it is "There is an emergency ration here."
    ldesc: null, fdesc: 'A sealed emergency ration, stamped with a red cross, lies on the counter.', text: null,
    // VOWELBIT: "An emergency ration" in lists, as the source marks its own vowel names (round sixteen: "A emergency ration").
    synonyms: ['RATION', 'PACK', 'FOOD'], adjectives: ['EMERGENCY', 'SEALED', 'RED'], flags: ['TAKEBIT', 'FOODBIT', 'VOWELBIT'],
    traits: ['pickupable'], size: '8', capacity: null, value: null, action: null, contents: [], truncated: false, locationKind: 'room' };
}

export function setup(g) {
  addRation(g);
  if (!g.state.objects['RATION-PACK']) g.state.objects['RATION-PACK'] = { loc: 'INFIRMARY', flags: ['TAKEBIT', 'FOODBIT', 'VOWELBIT'] };
  for (const [k, v] of Object.entries({ 'DEFENSE-FIXED': false, 'COURSE-CONTROL-FIXED': false, 'ACCESS-PANEL-FULL': true, 'ITS-CRACKED': false,
    'MENU-LEVEL': 0, 'SCREEN-TEXT': null, 'SPOOL-TEXT': null, 'LAB-LIGHTS-ON': false, 'LAB-FLOODED': false, 'UNIFORM-OPENED': false, 'MURAL-FLAG': false })) g.setg(k, v);
  for (const k of ['LAZARUS-FLAG', 'COMPUTER-FIXED', 'MINI-ACTIVATED', 'FLOYD-SPOKE', 'FLOYD-FOLLOW']) if (g.getg(k) === undefined) g.setg(k, false);
  for (const k of ['P-NUMBER', 'SICKNESS-LEVEL', 'NUMBER-NEEDED']) if (g.getg(k) === undefined) g.setg(k, 0);
}
