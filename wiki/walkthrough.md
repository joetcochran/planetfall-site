# Walkthrough

The whole game, start to finish, in 296 steps. It is the route the test suite plays before every release (`scripts/tests/walkthrough.mjs`), so it is known to finish the game. The step numbers are the ones the checkpoints and the playtest notes use. This page is written from the suite by `scripts/wiki-walkthrough.mjs`.

Each step is shown as the command a typist would enter. A clicker does the same thing from the menus: click the thing, or its name plate, and pick the verb; move with the compass. The two number entries (the laser's dial and the booth's keyboard) open a number pad.

Two things differ from game to game, so read them off the screen rather than these steps:

- **The chemicals.** The Comm Room's lit lamp names the chemical the coolant system wants. The steps below pour what the test game drew (green, then brown).
- **The damaged sector.** The Computer Room's print-out ends "Malfunkshun in Sekshun ...!" with a number from 100 to 999. Type that number in the Miniaturization Booth. The wrong number fries you. Infocom's game always used 384; see [Where we left the original](canon-deviations.md).

The steps assume the test game's luck elsewhere too: when a step says to wait until something happens, keep waiting until it does.

## Deck Nine

The routine day aboard the Feinstein, until the explosion and the escape pod.

1. `look`
2. `examine brush`
3. `inventory`
4. `wait` until "…slides open…"
5. `w`
6. `get in web`
7. `wait` until "…pod lands with a thud…"

## The escape pod

Stand up once the pod has landed, take what it carries, and get out.

8. `stand up`
9. `take towel`
10. `take kit`
11. `open pod door`
12. `out`
13. `up`
14. `up`
15. `up`
16. `up`

## Up to the complex

Climb from the seabed and the cliff into the upper complex, to the dormitory corridor.

17. `up`
18. `up`
19. `up`
20. `n`
21. `ne`
22. `e`
23. `e`

## The long hall and the rift

East along the long hall to the junction, the damaged corridor and the rift.

24. `e`
25. `n`
26. `examine crevice`
27. `take key`
28. `n`
29. `examine rift`
30. `n`
31. `s`
32. `s`
33. `e`

## The upper elevator

Call it and step in. Without its access card the panel does nothing yet.

34. `push blue button`
35. `wait` until "…north end of the room slides open…"
36. `n`
37. `push up button`
38. `out`

## The key in the crevice

The magnet from the tool room fishes the key out of the crevice.

39. `w`
40. `s`
41. `s`
42. `s`
43. `sw`
44. `take magnet`
45. `ne`
46. `n`
47. `n`
48. `n`
49. `n`
50. `take key with magnet`

## The ladder

The key opens the padlocked door with the ladder behind it.

51. `s`
52. `w`
53. `w`
54. `unlock padlock with key`

## Lightening the load

Put down the brush and towel: with eight things in hand you may fumble.

55. `drop brush`
56. `drop towel`
57. `take padlock`
58. `open door`
59. `n`

## Dinner

Eat from the survival kit when the first hunger warning comes. The ladder takes all the load you can carry, so the kit stays.

60. `open kit`
61. `eat red goo`
62. `drop kit`
63. `drop padlock`
64. `drop magnet`
65. `take ladder`
66. `s`
67. `e`
68. `e`
69. `n`
70. `n`

## Across the rift

Lay the ladder across the rift. Fetch the upper elevator and kitchen cards from the small office and the shuttle card from the large office, then ride up to the tower.

71. `drop ladder`
72. `open ladder`
73. `put ladder across rift`
74. `n`
75. `w`
76. `open desk`
77. `take upper card`
78. `take kitchen card`
79. `w`
80. `open desk`
81. `take shuttle card`

## The pocket

The cards not needed until day two go in your uniform's pocket.

82. `put shuttle card in uniform`
83. `e`
84. `e`
85. `s`
86. `s`
87. `s`
88. `e`
89. `n`
90. `slide upper card through slot`
91. `push up button`
92. `wait` until "…elevator door slides open…"
93. `s`
94. `ne`

## The Comm Room

The Feinstein's last message, and the coolant system. The lamp that is lit tells you which chemical to pour first; it is chosen at random each game, so pour what your lamp asks for, not what these steps pour. The flask and the dispenser are down in the Machine Shop.

95. `push playback button`
96. `sw`
97. `n`
98. `slide upper card through slot`
99. `push down button`
100. `wait` until "…elevator door slides open…"
101. `s`
102. `w`
103. `s`
104. `s`
105. `s`
106. `sw`
107. `drop brochure`
108. `drop key`
109. `take flask`
110. `take laser`
111. `e`
112. `put flask under dispenser`
113. `push green button`
114. `take flask`

## The Robot Shop

The lower elevator card is in a compartment of the switched-off robot. Switching him on brings Floyd to life a little later.

115. `e`
116. `search robot`
117. `put lower card in uniform`
118. `turn on robot`
119. `nw`
120. `n`
121. `n`
122. `n`
123. `e`
124. `n`
125. `slide upper card through slot`
126. `push up button`
127. `wait` until "…elevator door slides open…"
128. `s`
129. `ne`
130. `pour fluid into hole`

## Evening, day one

The sleep clock has started, so the second chemical waits for the morning. Fill the canteen in the kitchen and sleep in a dormitory bunk.

131. `sw`
132. `n`
133. `slide upper card through slot`
134. `push down button`
135. `wait` until "…elevator door slides open…"
136. `s`
137. `w`
138. `w`
139. `w`
140. `s`
141. `take canteen`
142. `open canteen`
143. `slide kitchen card through slot`
144. `s`
145. `put canteen in dispenser`
146. `press button`
147. `take canteen`
148. `close canteen`
149. `n`
150. `n`
151. `e`
152. `n`
153. `get in bed`
154. `wait` until "…SEPTEM 7, 11344…"

## Day two

Everything you held is on the floor beside the bunk. Breakfast first.

155. `stand up`
156. `take canteen`
157. `open canteen`
158. `drink liquid`
159. `take laser`
160. `take flask`
161. `take upper card`

## Finishing the coolant repair

The good bedistor from the carton in Storage East, the pliers from the Tool Room, the second chemical from the Machine Shop, and up to the Comm Room.

162. `s`
163. `e`
164. `s`
165. `e`
166. `take good bedistor`
167. `w`
168. `s`
169. `s`
170. `sw`
171. `take pliers`
172. `e`
173. `put flask under dispenser`
174. `push brown button`
175. `take flask`
176. `n`
177. `n`
178. `n`
179. `n`
180. `e`
181. `n`
182. `slide upper card through slot`
183. `push up button`
184. `wait` until "…elevator door slides open…"
185. `s`
186. `ne`
187. `pour fluid into hole`
188. `drop flask`
189. `sw`
190. `n`
191. `slide upper card through slot`
192. `push down button`
193. `wait` until "…elevator door slides open…"
194. `s`
195. `drop upper card`

## The shuttle to Lawanda

Down to the Kalamontee platform and ride the shuttle. The tunnel is 24 marks, one a turn: accelerate to 40, coast to the halfway mark, then brake so the car is stopped when it reaches the far platform.

196. `push red button`
197. `wait` until "…south end of the room slides open…"
198. `s`
199. `slide lower card through slot`
200. `push down button`
201. `wait` until "…elevator door slides open…"
202. `n`
203. `e`
204. `s`
205. `e`
206. `slide shuttle card through slot`
207. `push lever`
208. `look` until "…Limit 45…"
209. `pull lever`
210. `look` until "…Hafwaa Mark…"
211. `pull lever`
212. `look` until "…glides into the station and comes to rest…"
213. `w`
214. `n`
215. `drop lower card`
216. `drop shuttle card`
217. `up`
218. `up`

## Lawanda

The course control bedistor, the Infirmary's medicine, and Floyd's discovery of the broken computer.

219. `ne`
220. `e`
221. `e`
222. `n`
223. `open cube`
224. `take fused bedistor`
225. `take fused bedistor with pliers`
226. `put good bedistor in cube`
227. `drop pliers`
228. `drop fused bedistor`
229. `s`
230. `w`
231. `w`
232. `nw`
233. `take bottle`
234. `open bottle`
235. `eat medicine`
236. `se`
237. `e`
238. `e`
239. `s`
240. `s`
241. `s`
242. `wait` until "…Computer is broken…"

## The miniaturization card

The new battery from Lab Storage, then the bio-lock: Floyd fetches the miniaturization card.

243. `ne`
244. `s`
245. `take new battery`
246. `n`
247. `open bio-lock door`
248. `se`
249. `e`
250. `wait` until "…Floyd will get card…"
251. `open lab door`
252. `close lab door`
253. `wait`
254. `open lab door`
255. `close lab door`
256. `take mini card`
257. `w`
258. `open bio-lock door`
259. `w`
260. `sw`

## Into the computer

Read the print-out in the Computer Room: its last line names the damaged sector ("Malfunkshun in Sekshun ..."). The number is different in every game (Infocom's was always 384), and it is the number to type in the Miniaturization Booth. Then the fresh battery, the laser on its finest setting, and the speck in the relay.

261. `read printout`
262. `s`
263. `drop old battery`
264. `put new battery in laser`
265. `set dial to 1`
266. `slide mini card through slot`
267. `type` the sector number from the print-out
268. `e`
269. `n`
270. `n`
271. `shoot laser at speck` until "…vaporizes into a fine cloud of ash…"

## The microbe

A microbe blocks the way back along the strip. Heat the laser on it, then throw the laser off the strip.

272. `set dial to 6`
273. `s`
274. `shoot laser at microbe` until "…laser beam strikes the microbe…"
275. `throw laser off strip`
276. `s`
277. `w`

## The way out

Through the Lab Office and the Bio Lab with the fungicide mist and the gas mask, then run from the mutants to the cryo-elevator.

278. `n`
279. `examine desk`
280. `open desk`
281. `take mask`
282. `wear mask`
283. `push fungicide button`
284. `open office door`
285. `w`
286. `open lab door`
287. `w`
288. `w`
289. `open bio-lock door`
290. `w`
291. `sw`
292. `w`
293. `s`
294. `push button`
295. `wait` until "…opens onto a room to the north…"
296. `n`
