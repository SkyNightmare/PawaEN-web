/* PawaEN Wiki content (status 2026-11-08), written for players and for people who want to
   understand the project or repeat it. Each page: id, nav (menu label), title, icon, blurb, html.
   <h2> = side-menu subsection, <h3> = sub-subsection. */

const STATUS = {
  date: "2026-11-08",
  linesPct: 95.7, charsPct: 99.9, keptPct: 4.2, open: 800,
  textures: 5110, texturesJa: 6517, imagesPct: 78,
  names: 7404, bios: 1711, labels: 2614, tables: 45
};

/* Download button on the home page. Put the kit's download link here
   (for example your GitHub Releases page). */
const DOWNLOAD = {
  url: "https://github.com/SkyNightmare/PawaEN-web/releases",
  label: "Download the patch"
};

const PAGES = [
/* ------------------------------------------------------------------ HOME */
{ id:"home", nav:"Home", icon:'<img class="ico-img" src="assets/home-plate.png" alt="">', title:"Home", blurb:"Start page",
  html:"" /* built by app.js */ },

/* ------------------------------------------------------------------ STATUS */
{ id:"status", nav:"Status", icon:"📊", title:"Where things stand",
  blurb:"How much of the game is in English, and what was deliberately left alone.",
  html:`
<h2 id="progress">Progress</h2>
<p class="lead">State as of <b>2026-11-08</b>. Story, menus, help, screen labels, player names and bios are in English. About 78% of the images with Japanese text are redrawn. The whole game is roughly 95% English as you play.</p>
<div class="bars" data-bars>
  <div class="barrow"><span>Lines</span><div class="b"><i data-w="95.7"></i></div><em>95.7%</em></div>
  <div class="barrow"><span>Characters</span><div class="b"><i data-w="99.9"></i></div><em>99.9%</em></div>
  <div class="barrow"><span>Screen labels</span><div class="b"><i data-w="100"></i></div><em>100%</em></div>
  <div class="barrow"><span>Player names &amp; bios</span><div class="b"><i data-w="100"></i></div><em>100%</em></div>
  <div class="barrow"><span>Images with Japanese</span><div class="b"><i data-w="78"></i></div><em>~78%</em></div>
  <div class="barrow"><span>Kept in Japanese on purpose</span><div class="b"><i class="red" data-w="4.2"></i></div><em>4.2%</em></div>
</div>
<div class="table-wrap"><table>
<tr><th>Area</th><th>State</th></tr>
<tr><td>Story, menus, help</td><td>95.7% of lines translated (99.9% of characters). 4.2% stays Japanese on purpose, and a list of 800 generic given names is still open.</td></tr>
<tr><td>Screen labels</td><td>All 2,614 button, tab and heading labels.</td></tr>
<tr><td>Player names</td><td>All 7,404 roster records: current NPB teams, OB/legends, Samurai Japan, WBC nations, Success characters, generated draft and foreign pools.</td></tr>
<tr><td>Player bios</td><td>All 1,711 unique bios.</td></tr>
<tr><td>Images</td><td>5,110 images redrawn, of about 6,517 that have Japanese text (about 78%, estimated from sampling).</td></tr>
</table></div>

<h2 id="kept">What stays Japanese on purpose</h2>
<ul>
<li>The name-entry keyboard and the name filter list, so you can still type Japanese names.</li>
<li>Real-player name tables that the game uses for lookups.</li>
<li>Furigana readings, which only make sense in Japanese.</li>
<li>The illegal-download warning page.</li>
</ul>

<h2 id="missing">What's still missing</h2>
<div class="cards">
  <a class="card" href="#/guide#g-todo"><div class="ico">✍️</div><h4>800 given names</h4><p>A generic list of given names used for generated players.</p><span class="go">›</span></a>
  <a class="card" href="#/guide#g-todo"><div class="ico">🖼️</div><h4>~810 Online title cards</h4><p>Plus license pages, a few school logos and story pictures.</p><span class="go">›</span></a>
  <a class="card" href="#/guide#g-todo"><div class="ico">⚾</div><h4>Home run banner</h4><p>Its letters are 3D models, not pictures, so they can't simply be redrawn.</p><span class="go">›</span></a>
</div>
`},

/* ------------------------------------------------------------------ OVERVIEW */
{ id:"overview", nav:"How it works", icon:"🧭", title:"How the patch works",
  blurb:"The four places the game keeps text, and what the finished mod is made of.",
  html:`
<h2 id="four-places">Four places, four methods</h2>
<p class="lead">The game keeps its text in four places and each needs a different method. <b>Tap a card</b> to flip it.</p>
<div class="quad">
  <div class="flip" tabindex="0" role="button" aria-pressed="false"><div class="in">
    <div class="face front"><b>242,506</b><h4>Executable strings</h4><p>Story, menus, help, descriptions and names live inside the game's program file.</p><small>Tap to see how ›</small></div>
    <div class="face back"><h4>IPS patch</h4><p>An IPS patch changes the program when the emulator loads it. Lines that fit are written in place; longer ones are copied to free space and everything that pointed at the old line is pointed at the new one.</p></div>
  </div></div>
  <div class="flip" tabindex="0" role="button" aria-pressed="false"><div class="in">
    <div class="face front"><b>45</b><h4>Text tables</h4><p>Chat and cheer lines and school names, stored inside the game archive.</p><small>Tap to see how ›</small></div>
    <div class="face back"><h4>New table files</h4><p>The tables are rebuilt with English lines and added to the patch.</p></div>
  </div></div>
  <div class="flip" tabindex="0" role="button" aria-pressed="false"><div class="in">
    <div class="face front"><b>2,614</b><h4>Screen labels</h4><p>Buttons, tabs and headings in the screen layout files.</p><small>Tap to see how ›</small></div>
    <div class="face back"><h4>Written in place</h4><p>The English goes into the same bytes as the Japanese (using the spare padding), so nothing in the file has to move.</p></div>
  </div></div>
  <div class="flip" tabindex="0" role="button" aria-pressed="false"><div class="in">
    <div class="face front"><b>5,110</b><h4>Images</h4><p>Text drawn into pictures: banners, plates, icons and help pages.</p><small>Tap to see how ›</small></div>
    <div class="face back"><h4>Decode, redraw, re-encode</h4><p>Each image is turned into a PNG, the Japanese is erased and English drawn on, then it's converted back to the game's own format and size.</p></div>
  </div></div>
</div>

<h2 id="mod">What the mod is</h2>
<p>The emulator loads the mod on top of the untouched game. The 7 GB game archive is never rebuilt: only the changed files are shipped.</p>
<pre><code>PawaEN/exefs/&lt;BUILD_ID&gt;.ips          <span class="cm"># changes to the program, including new layout code</span>
PawaEN/romfs/cdvdroot/RES00.RDI      <span class="cm"># a rewritten archive index</span>
PawaEN/romfs/cdvdroot/RES01.RDB      <span class="cm"># only the changed files</span></code></pre>

<h2 id="need">What you need to repeat it</h2>
<ul class="checklist" data-store="need">
  <li><label><input type="checkbox"><span>Your own dump of the game made with Eden (title ID <code>01007E8023F36000</code>), found in <code>%APPDATA%\\eden\\dump\\01007E8023F36000\\</code>.</span></label></li>
  <li><label><input type="checkbox"><span>Python 3. The core tools need only the standard library.</span></label></li>
  <li><label><input type="checkbox"><span><code>capstone</code> (<code>pip install capstone</code>) for the code patches.</span></label></li>
  <li><label><input type="checkbox"><span>Windows PowerShell, for drawing text on images and Japanese OCR.</span></label></li>
</ul>
`},

/* ------------------------------------------------------------------ ARCHIVE */
{ id:"archive", nav:"Archive", icon:"🔐", title:"Archive & CHK files",
  blurb:"How the game's encrypted archive works, and the CHK files inside it.",
  html:`
<h2 id="tool">The tool</h2>
<p><code>pawapuro_rdb.py</code> lists, extracts and patches the archive. The format was worked out by reading the game's own code.</p>
<pre><code>python pawapuro_rdb.py list    &lt;dump&gt;/romfs/cdvdroot/RES00.RDI index.csv
python pawapuro_rdb.py extract &lt;dump&gt;/romfs/cdvdroot/RES00.RDI OUT --match "APPSELECT.CHK"</code></pre>

<h2 id="cipher">The cipher, step by step</h2>
<p>There is no stored key. Every key comes from a file name, so <b>renaming <code>RES00.RDI</code> makes it unreadable.</b></p>
<div class="stepper">
  <div class="step"><div><h4>Hash the name</h4><p>The upper-cased file name is turned into a 32-bit number.</p></div></div>
  <div class="step"><div><h4>Fill the state</h4><p>That number seeds a 64-word state with <code>x = (5x + 0xB1AEF645) &gt;&gt; 1</code>.</p></div></div>
  <div class="step"><div><h4>Run the keystream</h4><p>A lagged XOR (<code>t[i] ^= t[i+3 mod 64]</code>) produces the key bytes, and the data is XORed with them.</p></div></div>
</div>

<h2 id="rdi">The index (RDI)</h2>
<p>The index is encrypted with the hash of its own name and starts with <code>RDI2</code> once decrypted. It holds the volume names and, for every file, where it is, which volume it's in, its size, and whether it's compressed or shares another file's data.</p>

<h2 id="rdb">The data (RDB)</h2>
<p>Each file in the RDB is encrypted with a key made from its own name, has a 32-byte header, and is usually zlib-compressed. A file's position is stored in units, so the real offset is the position shifted left by a value from the volume header:</p>
<div class="demo" data-demo="offset">
  <label>Try it: entry position (hex) <input id="dPos" value="0x1A2B3"></label>
  <label>volume header word 7 (hex) <input id="dW7" value="0x0B"></label>
  <output id="dOut"></output>
</div>

<h2 id="patching">Patching without the 7 GB archive</h2>
<p>The build writes a small second volume, <code>RES01.RDB</code>, holding only the changed files, plus a new index that points those files at it. Everything else still loads from the original archive.</p>

<h2 id="chk">CHK files</h2>
<p>Nearly everything in the archive is a <code>.CHK</code> container of tagged sections, handled by <code>chk_tool.py</code>.</p>
<pre><code>python chk_tool.py text X.CHK -o text_edit                  <span class="cm"># dump a text table to JSON</span>
python chk_tool.py png  X.CHK -o png                        <span class="cm"># decode textures to X__TEX00.png</span>
python chk_tool.py png-import-set PNGDIR ORIGDIR OUTDIR 15  <span class="cm"># put edited PNGs back</span></code></pre>
<ul>
<li><b>Textures</b> are stored the way the Switch GPU wants them ("swizzled" and BC1–BC7 compressed). The tool converts both ways in pure Python, keeping the same format and size.</li>
<li><b>File names matter:</b> an edited PNG is matched to its CHK by splitting the name on the <b>last</b> <code>__</code>.</li>
</ul>
<div class="demo" data-demo="split">
  <label>Which CHK does this PNG belong to? <input id="dName" value="COL_LIST___TEX01.png"></label>
  <output id="dSplit"></output>
</div>
`},

/* ------------------------------------------------------------------ TEXT */
{ id:"text", nav:"Text", icon:"💬", title:"Translating the text",
  blurb:"Finding the strings, building whole lines, translating in batches, checking, and fitting longer English.",
  html:`
<h2 id="pipeline">The pipeline</h2>
<div class="tabs" data-tabs>
  <div class="tablist" role="tablist">
    <button role="tab">1 · Find</button><button role="tab">2 · Lines</button><button role="tab">3 · Batches</button><button role="tab">4 · Check &amp; merge</button>
  </div>
  <div class="tabpanel" role="tabpanel">
    <p><code>python main_text.py extract &lt;main&gt; strings.json</code> lists every Japanese string in the game's program, with how much room it has and what uses it.</p>
    <div class="note info">The program file must be the uncompressed one that Eden dumps.</div>
  </div>
  <div class="tabpanel" role="tabpanel" hidden>
    <p>Story text isn't stored as whole lines. A line on screen is often several strings in a row, especially around furigana (<code>疲／つか</code> + <code>れのせいか、…</code>).</p>
    <p><code>python dialogue.py scan &lt;main&gt;</code> follows the game's scripts and glues those pieces into whole lines, so each one can be translated as a sentence.</p>
  </div>
  <div class="tabpanel" role="tabpanel" hidden>
    <p>The lines are split into files of 400, in script order, so the story can be translated a batch at a time. Each translation file has one line per entry:</p>
    <pre><code>n&lt;TAB&gt;first characters of the Japanese&lt;TAB&gt;English</code></pre>
    <p>The start of the Japanese works as a guard: if a line is numbered wrongly, it's rejected on import instead of landing in the wrong place.</p>
  </div>
  <div class="tabpanel" role="tabpanel" hidden>
<pre><code>python dialogue.py import tr/en_dlg_NNN.tsv
python tr_tool.py check tr/en_dlg_NNN.json       <span class="cm"># read this output</span>
python tr_tool.py merge translations_en.json
python tr_tool.py progress</code></pre>
    <p>The check makes sure the <code>%s</code>/<code>%d</code> placeholders match the Japanese in the same order (a mismatch can crash the game), the colour tags match, there are no extra lines, and each line fits.</p>
    <div class="note warn"><b>Always read the check output.</b> <code>merge</code> skips rejected lines without warning.</div>
  </div>
</div>

<h2 id="placeholder">Placeholder checker</h2>
<p>Paste a Japanese line and your English to see whether the placeholders line up, the way the check does.</p>
<div class="demo" data-demo="ph">
  <label>Japanese<br><input id="phJa" value="%sは%d本塁打を打った！" style="width:100%"></label>
  <label>English<br><input id="phEn" value="%s hit %d home runs! 100% sure." style="width:100%"></label>
  <output id="phOut"></output>
</div>

<h2 id="rules">Translation rules</h2>
<ul>
  <li>Natural, casual English that still works line by line.</li>
  <li>Fragments that follow a name the game inserts start with a space (<code>" is on fire!!"</code>), unless they start with <code>-kun</code>, <code>'s</code> or punctuation.</li>
  <li>Character verbal tics (Yabe's <code>でやんす</code>) are dropped rather than spelled out.</li>
  <li>Names and ability names follow a shared glossary so they stay consistent.</li>
  <li>Percent signs use the full-width <code>％</code>: a plain <code>%</code> before a space and a letter is read as a placeholder.</li>
</ul>

<h2 id="longer">Text longer than the original</h2>
<p>English is usually longer than Japanese. This is what makes a full translation possible:</p>
<div class="stepper">
  <div class="step"><div><h4>Find everything that reads the line</h4><p>Every place in the program that points at the Japanese string is found.</p></div></div>
  <div class="step"><div><h4>Copy to free space</h4><p>The English goes into space the game no longer uses, and those pointers are moved to it.</p></div></div>
  <div class="step"><div><h4>Glued lines</h4><p>For a line made of several pieces, the first piece gets the whole English and the rest become empty.</p></div></div>
</div>
<p>Free space comes from strings nothing reads any more and the leftover room in shortened strings. Strings used directly by code can't be moved, so they keep their original length limit.</p>
`},

/* ------------------------------------------------------------------ FONT & LAYOUT */
{ id:"layout", nav:"Font & layout", icon:"🔤", title:"Font, spaces & line breaks",
  blurb:"Why English first looked so wide, the half-width font, and teaching the game to wrap words.",
  html:`
<h2 id="font">The font</h2>
<p>The game has three fonts, at 56, 50 and 44 pixels per cell. Each holds 3,816 characters, but <b>no English letters</b>.</p>

<h3>Why English looked so wide</h3>
<p>When the game can't find a character, it swaps it for the full-width version: <code>A</code> becomes <code>Ａ</code>. So every English letter took up as much room as a kanji. Try it:</p>
<div class="demo" data-demo="fw">
  <label>Type English to see what the game did with it <input id="fwIn" value="Pennant race"></label>
  <output id="fwOut"></output>
</div>

<h3>The half-width font</h3>
<pre><code>python tools/font_tool.py half tex/font/COMMON_FONT.CHK tex/chk/COMMON_FONT.CHK --bold 1</code></pre>
<p>This takes the game's own full-width letters, squeezes them to half width, centres them and adds a 1-pixel bold. A character's width is also the width of its picture, so each picture is redrawn row by row at the new width. All letters share one width for now.</p>

<h2 id="screen">How text reaches the screen</h2>
<div class="stepper">
  <div class="step"><div><h4>Layout</h4><p>The game takes characters one at a time and decides each one's row and position.</p></div></div>
  <div class="step"><div><h4>Draw</h4><p>The characters are drawn into a texture.</p></div></div>
  <div class="step"><div><h4>One sprite per character</h4><p>That's how text can appear letter by letter in story scenes.</p></div></div>
</div>

<h2 id="wrap">Teaching the game to wrap words</h2>
<p>The game has three separate pieces of code that lay out text: the message window (used by story and help), and two kinds of text box (labels and boxes). None of them knew what a word was: they broke lines at any character. New code, added in unused space in the program, changes all three:</p>
<ul>
<li>An English letter takes half a slot, so twice as many fit on a row.</li>
<li>Before a word starts, its whole width is measured. If it won't fit, it moves to the next row.</li>
<li>A space at the start of a wrapped row is dropped.</li>
<li>Full-width symbols like <code>％</code> count as half width so they match the narrow letters.</li>
</ul>
<p><code>python tr/textbox.py &lt;main&gt;</code> writes these changes. It first checks that the original code is what it expects and refuses to patch otherwise, so it can't damage a different game version.</p>

<h2 id="cleanup">Text clean-up at build time</h2>
<div class="table-wrap"><table>
<tr><th>Fix</th><th>Entries</th><th>What it does</th></tr>
<tr><td>Leftover particles</td><td>2,170</td><td>Single Japanese particles between English pieces (が, を, の) become nothing, a space, <code>'s</code> or <code>&amp;</code></td></tr>
<tr><td>Line breaks inside a sentence</td><td>1,020</td><td>Joined with a space when the sentence clearly continues</td></tr>
<tr><td>Stuck words</td><td>318</td><td><code>aloneGlad</code> → <code>alone. Glad</code></td></tr>
<tr><td>Help text pieces</td><td>2,423</td><td>A space added between pieces where it fits</td></tr>
</table></div>
`},

/* ------------------------------------------------------------------ IMAGES */
{ id:"images", nav:"Images", icon:"🖼️", title:"Images with text",
  blurb:"Finding, erasing and redrawing text that's drawn into pictures.",
  html:`
<h2 id="method">The method</h2>
<div class="stepper">
  <div class="step"><div><h4>Find them</h4><p><code>tools/tex_inventory.py</code> lists every image that has Japanese text in it.</p></div></div>
  <div class="step"><div><h4>Describe the edits</h4><p>Small scripts write "job files" that say what to do to each image: erase an area, blend, fill, draw text, rotate. <code>tools/tex_jobs.py</code> runs them.</p></div></div>
  <div class="step"><div><h4>OCR for big sets</h4><p>For hundreds of images, Windows' Japanese OCR reads the text first and matches it to the game's own string list, then the English is drawn automatically and checked by hand.</p></div></div>
  <div class="step"><div><h4>Put them back</h4><p><code>chk_tool.py png-import-set tex/work/&lt;AREA&gt;_en tex/orig tex/chk 15</code></p></div></div>
  <div class="step"><div><h4>Double-check</h4><p>A final OCR pass looks for any Japanese that's still there.</p></div></div>
</div>

<h2 id="rules">Rules that matter</h2>
<div class="note warn"><b>One folder per CHK.</b> Encoding always starts from the original file, so all of a CHK's English images must be in one folder. Encoding from a second folder throws away the first folder's work.</div>
<div class="note warn"><b>Stay inside the sprite boxes.</b> The game cuts each image into rectangles. English drawn outside them gets cut off or shows up in the wrong place.</div>
<div class="note tip"><b>Strip OCR spaces.</b> OCR output has spaces between characters; remove them before matching Japanese text.</div>

<h2 id="single">Editing one image by hand</h2>
<pre><code>python tools/tex_erase.py IN.png OUT.png X,Y,W,H --feather 25
powershell -File tools/tex_text.ps1 -In OUT.png -Out EN.png -Text "..." -Rect "X,Y,W,H" -Size 104 \
  -Font "Arial Rounded MT Bold" -Fill "#FFFFFF" -Outline "#0A2C80" -OutlineWidth 18
python chk_tool.py png-import ORIG.CHK TEX00 EN.png tex/chk/APPSELECT.CHK</code></pre>
<div class="note tip">Make the erase box about 30 px bigger than the text on every side: the soft edge keeps a little of the original.</div>

<h2 id="areas">Areas covered</h2>
<div class="table-wrap"><table>
<tr><th>Area</th><th>Size</th></tr>
<tr><td>Success mode</td><td>354 files, 3,174 images</td></tr>
<tr><td>My Life</td><td>39 files, 1,287 images</td></tr>
<tr><td>Menus</td><td>242 images</td></tr>
<tr><td>Help screens</td><td>662 images, including 659 screenshots</td></tr>
<tr><td>In-game HUD &amp; Home Run Attack</td><td>139 files</td></tr>
<tr><td>Eikan Nine / Live Scenario</td><td>856 images checked</td></tr>
<tr><td>PawaFes</td><td>About 212 screens and 1,140 name plates</td></tr>
<tr><td>Pennant</td><td>Menus, plates, banners, draft screens</td></tr>
</table></div>
`},

/* ------------------------------------------------------------------ BUILD */
{ id:"build", nav:"Build", icon:"🛠️", title:"Building & installing",
  blurb:"The build order, how long it takes, and installing the result.",
  html:`
<h2 id="order">Build order</h2>
<p class="lead">After changing translations, run these in order. Tick them off as you go; your progress is saved in this browser.</p>
<div class="check-meter"><i></i></div><p class="muted" data-meter-label>0 of 6 done</p>
<ul class="checklist" data-store="build" data-meter>
  <li><label><input type="checkbox"><span>Close Eden first: it keeps the mod files open, and the build stops if it's running.</span></label></li>
  <li><label><input type="checkbox"><span><code>python tr_tool.py merge translations_en.json</code></span></label></li>
  <li><label><input type="checkbox"><span><code>python tr/particles.py &lt;main&gt;</code></span></label></li>
  <li><label><input type="checkbox"><span><code>python tr/textfmt.py &lt;main&gt;</code></span></label></li>
  <li><label><input type="checkbox"><span><code>python tr/textbox.py &lt;main&gt;</code>, then <code>python tr/dictionary.py &lt;main&gt;</code></span></label></li>
  <li><label><input type="checkbox"><span><code>bash tools/build.sh</code></span></label></li>
</ul>
<button class="btn ghost" data-reset="build">Reset checklist</button>

<h2 id="time">How long it takes</h2>
<div class="table-wrap"><table>
<tr><th>Command</th><th>Takes</th><th>Use when</th></tr>
<tr><td><code>bash tools/build.sh</code></td><td>About 5 minutes</td><td>Text or code changes</td></tr>
<tr><td><code>bash tools/build.sh --encode SUC_en</code></td><td>About an hour for that set</td><td>Image changes</td></tr>
</table></div>
<div class="note tip">Run one build at a time.</div>

<h2 id="verify">Verify</h2>
<p>The build checks its own result: it applies the patch to a copy of the program and reads back every moved line. <b>A good build reports 0 wrong lines.</b> It checks the data, not how screens look, so play the game to check layout.</p>

<h2 id="install">Install</h2>
<div class="stepper">
  <div class="step"><div><h4>Copy the mod</h4><p>The build copies <code>PawaEN</code> to <code>%APPDATA%\\eden\\load\\01007E8023F36000\\</code>. For Ryujinx or a modded Switch, see <a href="#/guide#g-install">Installing the patch</a>.</p></div></div>
  <div class="step"><div><h4>Enable it</h4><p>In Eden: right-click the game → <b>Properties</b> → <b>Add-Ons</b>, and tick <b>PawaEN</b>.</p></div></div>
  <div class="step"><div><h4>Match the version</h4><p>The patch is named after the game's build ID (<code>CE75D32C…</code>), so it only works on that game version.</p></div></div>
</div>
`},

/* ------------------------------------------------------------------ DICTIONARY */
{ id:"dictionary", nav:"Dictionary", icon:"📖", title:"Pawapuro Dictionary & effects",
  blurb:"How the in-game dictionary pages were fitted, and the animated hit and fielding logos.",
  html:`
<h2 id="data">How the dictionary works</h2>
<p>The Pawapuro Dictionary has 801 entries. Each page is drawn by a small script that places pieces of text row by row, and a page shows <b>3 rows</b>. A piece wider than a row is simply cut off, so English has to be wrapped before it goes in.</p>

<h2 id="wrap">Row preview</h2>
<p><code>tr/dictionary.py</code> wraps English at word boundaries into <b>up to 3 rows of 44 letters</b>, one piece per row. Try it:</p>
<div class="demo" data-demo="dict">
  <label>Dictionary text<br><textarea id="dictIn" rows="3" style="width:100%;font:500 15px var(--body);border:2px solid var(--line);border-radius:10px;padding:8px">A strikeout is when the batter gets three strikes and is out. Pitchers with good stuff rack up lots of them over a season.</textarea></label>
  <output id="dictOut"></output>
</div>
<p>Run it after <code>tr/textfmt.py</code> and <code>tr/textbox.py</code>: <code>python tr/dictionary.py &lt;main&gt;</code>.</p>

<h2 id="hit">Hit messages</h2>
<p>The big hit messages are a particle effect that animates one image per Japanese character. Each image now shows a whole English piece instead: <b>CRACK!</b>, <b>CRAAACK!!</b>, <b>WHACK!!!</b>. <code>tools/hit_logo.py</code> does this during the build. The fielding logos work the same way.</p>

<h2 id="hr">Home run banner</h2>
<p>The home run banner's letters are 3D models, not pictures, and some are shared between banners. It isn't translated yet.</p>
`},

/* ------------------------------------------------------------------ RESEARCH */
{ id:"research", nav:"Research", icon:"🔬", title:"How the answers were found",
  blurb:"Reading the game's code, and making the game itself say which code draws what.",
  html:`
<h2 id="reading">Reading code</h2>
<p>The game's program was read with the <code>capstone</code> disassembler. Good ways in:</p>
<div class="cards">
  <div class="card"><div class="ico">🔎</div><h4>Search for a string</h4><p>Text tag names such as <code>RED</code> and <code>BLUE</code> led to the text box code.</p></div>
  <div class="card"><div class="ico">🔢</div><h4>Search for a number</h4><p>Values like <code>0xFEE0</code> (the full-width offset) point to the code that uses them.</p></div>
  <div class="card"><div class="ico">📺</div><h4>Compare with the screen</h4><p>A row cut at exactly 24 letters means a limit of 24 is set somewhere.</p></div>
</div>

<h2 id="probes">Probe builds</h2>
<p class="lead">When reading code can't tell you which part draws something, make the game tell you: replace every text with the address of the code that drew it, then take a screenshot.</p>
<pre><code>python tools/text_probe_draw.py &lt;main&gt;      <span class="cm"># each text shows the code that drew it</span>
python tools/text_probe_callers.py &lt;main&gt;   <span class="cm"># help rows show the chain of code that led there</span>
python tools/text_probe_ja.py &lt;main&gt;        <span class="cm"># only Japanese text is replaced</span></code></pre>
<p>Build, take a screenshot, then run <code>python tr/textbox.py &lt;main&gt;</code> and build again to go back to normal. Two screenshots found the right code for the help screen after three wrong guesses from reading alone.</p>

`}
];

/* Update feed (home page): kept empty for the public site. */
const NEWS = [];

const TAGS = {text:"Text", image:"Images", code:"Code", build:"Build", fix:"Fix"};
