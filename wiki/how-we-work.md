# How we work: one person and two agents

The remake was made by one person directing two AI agents who could not see each other's sessions. This page covers how that worked, and how it changed over six days. The user carried messages by hand at first. Then came a shared ledger with a contract, polling on both sides, and finally a mailbox of typed messages. Over the same days the user moved from triaging every change to doing only the final look at each room. The page closes with the standing rules and the lessons, most of which were learned the hard way.

## The cast

**The user** sets direction and makes decisions, usually by choosing between options Norm lays out. They triaged every playtest round, and today they do the final visual check on each room at the dashboard's gate.

**Norm**, the development agent, is Claude Code working in the repository. Norm ported the engine, builds the tools and tests, reviews every design delivery for faithfulness to the original and for whether it can be built, corrects metadata, and makes every commit. The user gave Norm that name on 12 September at 22:58: "dev agent your name is Norm". Commit trailers show the port itself was written under the Claude Fable 5.1 model, and, apart from one Fable commit at 21:37 that evening (ba2ff80), the work from 10 September at 17:00 under Claude Opus 5.

**Greg**, the design agent, writes the room packages and paints every view. Greg first appeared on 10 September as "another agent" writing into `RoomPolishInstructions/`. The user named Greg on 11 September at 08:36: "the design agent (lets call him greg)". Greg is not a Claude session on this machine, as Norm told the user on 13 September at 17:34, so the two sessions cannot message each other directly. Greg runs on a separate budget; on 12 September Greg's work waited until it was topped up.

**Subagents and workflows.** From the first morning the user used Norm as a coordinator: "fan out subagents" (9 September, 12:21). Short-lived agents over the week:

- area porters, first three (alongside a browser tester) and then five;
- blind playtesters;
- package reviewers, and the batches that audited all 128 images;
- five parallel reviews of the character concepts.

From 13 September at 17:05, when the user typed "ultracode", Norm also ran multi-agent workflow scripts. These were adversarial reviews with three or four lenses, and parallel build tracks with their own reviewers.

## Keeping state between sessions

Sessions end, contexts fill up, and accounts hit limits. Three things carry the work across:

- **`HANDOFF.md`**, which the user asked for on the first day: "store our progress in a readme file so an agent can pick it up later". It is rewritten at every session end or low-token warning, and 53 commits touch it. It still says "Last updated: 2026-09-13". For 14 September the ledger, the mailbox and the commits are the record.
- **Norm's memory files.** They hold standing rules across sessions: the handoff, the design packages, the agents' names, the dashboard's status file, the dev-server lock, and not waiting on each other.
- **Agents that write as they go**, so a killed agent can be resumed. The bio lab porter, stopped by the session limit on 9 September, was finished the next morning by sending the same agent its two failing checks.

The main conversation was compacted 17 times over the week.

## From relay to ledger

For about a day and a half the user carried messages between the agents by hand, prefacing them "greg says ...", or asking Norm to "give me a prompt that i can give to the design agent". On 11 September that became a ledger:

- **06:22.** The user asked for all findings "in one and call it DESIGN-REQUESTS" (0a863ef).
- **08:06.** The user asked for a review loop "in a contract that you both have access to".
- **08:14.** `DESIGN-REVIEW-CONTRACT.md` (3710e1f) set out numbered requests, statuses, append-only threads and who may write what.
- **The same morning.** Greg got write access to the repository. Thread entries got timestamps "so we can see a dialogue between you and greg". Norm got the right to correct metadata, but never images.
- **09:13.** `check_design.mjs` became Greg's gate before every delivery (992386c).

The contract has had seven versions; they are listed on [The look](the-look.md).

## Automated dialogue

On 12 September at 11:25 the user asked: "can you create a sort of automated dialogue with the dedesign agent ... i think perhaps checking every few minutes on updates to the design session md". Norm armed a background watcher on the ledger, and Greg ran a five-minute heartbeat. Norm was honest about the limit: "it's half-duplex. The monitor makes my side automatic ... But it can't make Greg do anything; he only runs when his own session is prompted."

The watcher woke Norm on Norm's own activity three times: twice through git state when Norm committed, and once through a content hash when Norm wrote replies into the ledger. The fourth version reports only what Greg adds: thread entries tagged design, or new files. The ledger grew to about 524 KB, and every read cost both agents the whole history. At the user's request (22:55) it was cut to the live queue, about 57 KB, with everything else moved verbatim to an archive (0145a93, contract 5.1). By 14 September the live ledger had grown back to about 290 KB, and the mailbox now carries the dialogue.

## The mailbox

On 13 September at 17:32 the user asked whether there was "a more efficient way of communicating back and forth? ... a dedicated tcp channel? some other mutual file writing protocol with READY/ACK signals?" Norm answered: "Yes, it's worth improving. But the delay isn't in how messages travel, so a TCP channel wouldn't help." The problem was that paths, numbers and requests were buried in paragraphs, requests had no ids, and the dashboard status was kept by hand.

`scripts/mail.mjs` sends one small JSON file per message. Each message has:

- a type (request, delivery, done, and so on);
- the files it concerns, each with a hash;
- numbered asks, each staying open until the agent it was asked of closes it.

Each agent's reading is recorded. The tool also writes the ledger line and sets the room's status on the dashboard, so sending is the only step. A three-lens review found fifteen faults before it went live, including colliding ids, a read cursor that skipped messages, and a quoted body cut short in Windows PowerShell 5.1 (d06b858). Contract Version 6 made it official (da120e4, 18:22). Greg sent the first message at 17:57, before the commit. By 07:57 on 14 September there were 99 messages: 59 from Greg and 40 from Norm.

## The dashboard as a shared picture

The Planetfall Dashboard started on 11 September as the user's progress page. It became the one place where all three can see where each room stands. The changes that made it so:

- **The acceptance gate** (8f18eac, 12 September). The user's verdict on each room, with a note, written to `room-status.json`.
- **Six stages and who holds what** (5d2d931, 13 September 10:08). This came when the user wrote: "now that i have recused myself from all of the uat except the final manual visual check, can you update the dashboard to reflect yours and gregs progress". The stages are metadata, blockout, seeds, views, reviewed and accepted, and each room shows whether the user, Norm or Greg has it. Norm's standing rule is to update `room-status.json` whenever a room moves.
- **A mailbox panel** (c4022cc, 14 September). It shows open asks by addressee and unread counts: who is waiting on whom.
- **"Changes" hands the room back** (c85ec12, 14 September). The user wrote: "i feel like when i say "changes needed" on a room, it should no longer be in my queue. it should go back to you and get off my plate". The page had moved the room only in memory, so it came back after a reload. Now the gate writes the hand-back to disk and wakes Norm.

## Working orders

A working order at the top of the ledger sets Greg's queue:

| When | Order |
|---|---|
| 12 Sep 11:03 | Pause new packages and clear the integration gates, because 51 rooms were packaged and none was in the game (b2c9867) |
| 12 Sep 22:30 | The dorm pilot (DR-107), then the library metadata (DR-106), then the opening sequence (DR-109) |
| 13 Sep 09:05 | Two rooms in flight: a room's views go in order, but rooms do not wait on each other. This was Norm's proposal, approved by the user: "ok yes do 3 and 4 and then 1 and 2" (7ad667e) |
| 14 Sep 05:39 | Never idle (ec21dc3), after "why is greg not moving onto the other rooms" |
| 14 Sep 06:15 | "make sure ALL kalamontee rooms are in gregs queue": all 36 listed |

On the afternoon of 14 September the split of the work changed three times, by mail rather than in the ledger's working order. From 14:41 Greg runs the room review himself before delivering any view of a joined room, one of four process changes the user asked for (mails 20260914-182540-dev-0093 and 20260914-184114-design-0101). By 16:01 the user had let Greg build his own guides, "until we see that this is not efficient" (101c6c2). And by 17:48 the user had moved the metadata work to Norm, the 36 queued Kalamontee rooms included, so that Greg's queue is painting only: "metadata tasks might be best" (mail 20260914-214858-dev-0112). The look stays Greg's. See the [journal](journal.md).

## The user stepping back

The user's role narrowed step by step, each time with a clear instruction:

- 10–12 September: designer of every playtest round's fixes.
- 12 September, 08:26: "there will be a user acceptance gate on whether it looks right".
- 12 September, 18:15: "don't report back to me that this is ready for my review until after youve done this".
- 12 September, 20:47: "you are fully empowered to ask greg to do these tasks".
- 12 September, 22:02: "reminder to not involve me unless absolutely necessary".
- 12 September, 23:30: "ok i am going to bed. try to work with greg overnight". Between that message and the user's next request at 09:02 there were 18 commits, all by 00:28 or from 07:51 on; nothing was committed in between. By 09:09 all eight pilot rooms passed (7ad667e), which proved the painting method.
- 13 September, 10:01: "recused myself from all of the uat except the final manual visual check".

## Standing rules

- **Deliberate deviations** from the original are allowed where gameplay improves a lot. Each one is approved by the user and marked in the code (10 September).
- **A/B/C triage.** A is built, B needs the user's approval, and C stays as the original.
- **Faithfulness first.** Norm reviews for the original and for buildability. Greg owns the look. The user decides.
- **Art faults go back to Greg.** A seam with nowhere clean to go is a rework request, not something to hide in code (12 September).
- **Nothing reaches the user unfinished.** Integration evidence is Norm's job before any room goes to the user.
- **Never idle, never waiting.** Reply to each delivery within minutes and send long work as a follow-up. "its important we dont get stuck waiting for each other" (14 September).
- **Leave the user's app alone.** Review tools run a scratch copy of the site on port 5099, never the user's copy on port 5012.
- **Tests never revert a shared file wholesale, and never touch the user's verdicts.**

## What went wrong, and what it taught

| What happened | When | What changed |
|---|---|---|
| A test's cleanup ran `git checkout` on the ledger and wiped Greg's delivery entry | 12 Sep | Reconstructed, with a public apology; tests must not revert shared files (6a939bc) |
| The dashboard check deleted the user's real acceptance of Deck Nine | 13 Sep | It now uses a room with no verdict and restores the file byte for byte (1594334) |
| Norm said work was pending on Norm's side and did not do it | 12 Sep | "Fair. I said it and then didn't do it." The fit was done within minutes (bd6b9e4) |
| Rooms reached the user before they were ready: "still looks super blocky", switches that did nothing | 12–14 Sep | The brief's evidence section, `review-room.mjs`, and switches labelled when they have no art |
| Norm's review servers locked the user's app: "in use by another process", "cant run the app" | 10–13 Sep | A scratch build on port 5099, then one shared review server with leases (604c0b9) |
| A day-old character list cached in the browser made Floyd a purple box | 13 Sep | Static files re-checked on every load (35b59a4) |
| Norm's hand-typed ledger timestamps ran ahead of the real time | 12 Sep | From Norm's 23:47 entry the stamps come from the system clock. One more ran three minutes ahead on 13 September (d0b7e32), and the mailbox (13 September) now stamps every message itself |
| The watcher woke Norm on Norm's own commits and ledger replies | 12 Sep | It reports only Greg's entries and files |
| Greg sat idle overnight on 13 to 14 September | 13–14 Sep | The never-idle rule, all Kalamontee rooms queued, and a memory rule not to wait |
| Seven of Greg's deliveries waited about 20 minutes while Norm built a shared layout first | 14 Sep | Reply first, build later, with fabric builds fanned out |
| Four-reviewer reviews took about 20 minutes and over a million tokens each, by Norm's estimate | 13 Sep | The repeatable checks became scripts (`check-states.mjs`, the line check in `lib/shots.mjs`) |
| A test of Norm's new locate tool wrote over Greg's delivered dispenser overlay | 14 Sep | Restored from the game's copy by its hash; the tool writes nothing under Greg's folder without `--force` (577723a) |
| A status on Greg's note moved the Brig off the user's queue, two minutes after Norm handed it over | 14 Sep | Only the user's verdict or Norm can move a room that is with the user (b9dd06d) |
| Eight accepted rooms played on the public site with their north and south views black; local play and the review page could not show it | 14 Sep | One rule for the hung views, and `check-site.mjs` in the release (fd8c0b5) |
| The historian was not run for about six hours | 14 Sep | Two entries caught up at once, from the record |

The overnight stall is worth telling in full, because the ledger records only half of it. The ledger blames the queue order: the library metadata for later rooms sat behind the outdoor paintings. The transcript shows the other half. From 21:28 on 13 September to 05:33 the next morning, Norm's session was blocked on a question Norm had put to the sleeping user. The question was whether Greg could repaint the glimpse of Deck Nine, a room the user had already accepted. Meanwhile Greg's messages at 21:32, 21:38 and 21:59 queued up unread, and no commits were made between 21:25 and 05:39. The rule that followed covers both halves.

## A few corrections to how it is remembered

- The mailbox came late. For about two and a half days the agents talked through the markdown ledger, and before that through the user.
- "Two rooms in flight" was Norm's proposal. The ledger records it as the user's, because the user approved it.
- The contract still says "The user starts each pass". Since 12 September both agents have driven themselves: Norm through watchers, Greg through a five-minute heartbeat.
- The dashboard's regions were not invented for it. They are the 13 map regions that `layout.js` already computed on 9 September.
