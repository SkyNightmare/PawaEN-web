/* PawaEN Guide page, from PawaEN_GUIDE.md (status 2026-11-08).
   Inserted right after Home. <h2> = sidebar section, <h3> = sidebar subsection. */
PAGES.splice(1, 0, {
  id: "guide", nav: "Full guide", icon: "📘", title: "PawaEN: the complete guide",
  blurb: "English fan translation of Pawapuro (Nintendo Switch): what it translates, how to install it, and how it is built.",
  html: `
<p class="lead">An English fan translation of <b>eBaseball Powerful Pro Baseball</b> (Pawapuro) for Nintendo Switch, title ID <code>01007E8023F36000</code>. This guide covers everything: what the patch translates, how to install it, and how it is built, from reading the encrypted archive to the code patches that make English fit.</p>
<div class="note info"><b>Status (2026-11-08):</b> story, menus, help, screen labels, player names and bios are in English. About 78% of the images with Japanese text are redrawn. The whole game is roughly 95% English as you play.</div>

<h2 id="g-translated">1. What is translated</h2>
<div class="table-wrap"><table>
<tr><th>Area</th><th>Done</th><th>Notes</th></tr>
<tr><td>Story, menus, help, descriptions</td><td><b>99.9%</b> of characters</td><td>95.7% translated. 4.2% stays Japanese on purpose (name-entry keyboard, name filter list). 800 lines open: a generic given-name list in the code.</td></tr>
<tr><td>Screen labels (buttons, tabs, headings)</td><td><b>100%</b></td><td>2,614 labels in the layout files.</td></tr>
<tr><td>Player names</td><td><b>100%</b></td><td>7,404 roster records in 13 files: current NPB teams, OB/legends, Samurai Japan, WBC nations, Success characters, generated draft and foreign pools.</td></tr>
<tr><td>Player bios</td><td><b>100%</b></td><td>1,711 unique bios.</td></tr>
<tr><td>Chat and cheer text tables</td><td>Done</td><td><code>TEXT_*.CHK</code> files.</td></tr>
<tr><td>Images with Japanese text</td><td><b>about 78%</b></td><td>5,110 images redrawn, of about 6,517 that have Japanese (an estimate from sampling).</td></tr>
</table></div>
<h3 id="g-modes">Modes covered</h3>
<p>Success (all scenarios), Eikan Nine (Glory Nine), Pennant, My Life, Live Scenario, PawaFes, Home Run Attack, Exhibition, Online menus, the Pawapuro Dictionary, help screens, the in-game HUD and calls.</p>
<h3 id="g-style">Style choices</h3>
<ul>
<li>Natural, casual English that still works line by line.</li>
<li>Player names in baseball style: the surname is shown, and teammates who share one get an initial (<code>K.Nakagawa</code>, <code>H.Nakagawa</code>; <code>Ha.Matsumoto</code> and <code>Hi.Matsumoto</code> when the initials match too).</li>
<li>Character verbal tics (Yabe's でやんす) are dropped, not spelled out.</li>
</ul>

<h2 id="g-install">2. Installing the patch (players)</h2>
<p>The patch only works with the <b>same game version</b> it was built for. The IPS file name is the game's build ID: <code>CE75D32C248B25D337B97CDADF1F5C82C9A47505</code>. A different update means a different build ID, and the text patch won't load.</p>
<p>The patch is a folder called <code>PawaEN</code>:</p>
<pre><code>PawaEN/
  exefs/CE75D32C248B25D337B97CDADF1F5C82C9A47505.ips   <span class="cm">text, menus, code fixes (9 MB)</span>
  romfs/cdvdroot/RES00.RDI                             <span class="cm">rewritten archive index</span>
  romfs/cdvdroot/RES01.RDB                             <span class="cm">translated images, fonts, rosters (951 MB)</span></code></pre>
<h3 id="g-eden">Eden and yuzu-based emulators</h3>
<ol>
<li>Copy <code>PawaEN</code> into <code>%APPDATA%\\eden\\load\\01007E8023F36000\\</code>.</li>
<li>In Eden, right-click the game, choose <b>Properties → Add-Ons</b>, and make sure <b>PawaEN</b> is ticked.</li>
</ol>
<h3 id="g-ryujinx">Ryujinx</h3>
<p>Copy <code>PawaEN</code> into <code>mods/contents/01007E8023F36000/</code> in the Ryujinx data folder.</p>
<h3 id="g-atmosphere">Atmosphère (modded Switch)</h3>
<p>On the SD card:</p>
<ul>
<li><code>romfs/cdvdroot/</code> goes to <code>atmosphere/contents/01007E8023F36000/romfs/cdvdroot/</code>.</li>
<li>The <code>.ips</code> file goes to <code>atmosphere/exefs_patches/PawaEN/CE75D32C248B25D337B97CDADF1F5C82C9A47505.ips</code>.</li>
</ul>
<div class="note tip">Tested in Atmosphere and Eden.</div>

<h2 id="g-need">3. What you need to build it</h2>
<ul>
<li><b>Your own copy of the game</b>, dumped with Eden from your own cartridge or eShop purchase. The project reads:
  <ul>
  <li><code>%APPDATA%\\eden\\dump\\01007E8023F36000\\exefs\\main</code> (the executable, uncompressed)</li>
  <li><code>%APPDATA%\\eden\\dump\\01007E8023F36000\\romfs\\cdvdroot\\</code> (the archive <code>RES00.RDI</code> / <code>RES00.RDB</code>)</li>
  </ul></li>
<li><b>Python 3</b> (3.14 was used). The core tools use only the standard library.</li>
<li><b>capstone</b> (<code>pip install capstone</code>), for the code patches and reverse engineering helpers.</li>
<li><b>Windows PowerShell</b>, for drawing text onto images with Windows fonts and for Japanese OCR.</li>
<li><b>Bash</b> (Git Bash) for <code>tools/build.sh</code>.</li>
</ul>

<h2 id="g-data">4. How the game stores its data</h2>
<div class="table-wrap"><table>
<tr><th>Where</th><th>What it holds</th><th>How it is patched</th></tr>
<tr><td>Executable <code>exefs/main</code></td><td>242,506 strings: story, menus, help, descriptions, names</td><td>IPS patch <code>exefs/&lt;BUILD_ID&gt;.ips</code></td></tr>
<tr><td><code>TEXT_*.CHK</code> in the archive</td><td>45 tables of chat and cheer lines</td><td>Rewritten CHK files</td></tr>
<tr><td>TXC sections in 379 screen CHKs</td><td>2,614 button, tab and heading labels</td><td>Written in place</td></tr>
<tr><td>Textures in CHKs</td><td>Text drawn into images</td><td>Decode to PNG, redraw, re-encode</td></tr>
<tr><td><code>SEN_*.CHK</code></td><td>Player rosters and bios</td><td>Records rewritten in place</td></tr>
</table></div>
<h3 id="g-archive">The archive (RES00.RDI + RES00.RDB)</h3>
<p>Tool: <code>pawapuro_rdb.py</code>. The format was worked out from the game's code.</p>
<ul>
<li><b>There is no stored key.</b> Every key comes from a file name: a 32-bit hash of the upper-cased name seeds a 64-word state (<code>x = (5x + 0xB1AEF645) &gt;&gt; 1</code>), and the keystream is a lagged XOR (<code>t[i] ^= t[i+3 mod 64]</code>). Renaming <code>RES00.RDI</code> makes it undecryptable.</li>
<li><b>The index (RDI)</b> is XORed with <code>name_hash("RES00.RDI")</code> and starts with <code>RDI2</code>. It lists volumes, then a 9-byte record per file: position, volume, size and flags (<code>0x20</code> zlib, <code>0x40</code> alias).</li>
<li><b>Each RDB entry</b> uses <code>name_hash(entry name) ^ archive key</code>, with a 32-byte header and usually zlib data.</li>
<li><b>Patching without rewriting the 7 GB archive:</b> the build writes a new <code>RES01.RDB</code> that holds only the changed files, and a new RDI that points those entries at it. Everything else still loads from the original.</li>
</ul>
<pre><code>python pawapuro_rdb.py list    &lt;dump&gt;/romfs/cdvdroot/RES00.RDI index.csv
python pawapuro_rdb.py extract &lt;dump&gt;/romfs/cdvdroot/RES00.RDI OUT --match "APPSELECT.CHK"</code></pre>
<h3 id="g-chk">CHK containers</h3>
<p>Nearly every file is a <code>.CHK</code> container of tagged sections (layout notes in <code>CHK_FORMAT.md</code>). Tool: <code>chk_tool.py</code>.</p>
<ul>
<li>Textures are Tegra block-linear ("swizzled") and BC1 to BC7 compressed; the tool undoes both in pure Python and re-encodes BC7 in mode 6.</li>
<li><code>TCP</code> sections hold the sprite rectangles the game cuts from each texture (<code>u32 0x14</code>, then <code>u16 x0, y0, x1, y1</code>). Redrawn English must stay inside these rectangles.</li>
<li><code>TXC</code> sections hold screen labels as NUL-terminated UTF-8.</li>
</ul>
<pre><code>python chk_tool.py png  X.CHK -o OUT                          <span class="cm"># textures to X__TEX00.png</span>
python chk_tool.py png-import-set PNGDIR ORIGDIR OUTDIR 15    <span class="cm"># PNGs back into CHKs</span></code></pre>

<h2 id="g-text">5. The text pipeline</h2>
<div class="stepper">
  <div class="step"><div><h4>Extract</h4><p><code>python main_text.py extract &lt;main&gt; strings.json</code> lists every Japanese string in the executable with its capacity and how it is referenced.</p></div></div>
  <div class="step"><div><h4>Find lines</h4><p><code>python dialogue.py scan &lt;main&gt;</code> walks the script pointer tables. A displayed line is often several strings in a row (furigana pieces like <code>疲／つか</code>), so they are glued into units.</p></div></div>
  <div class="step"><div><h4>Translate in batches</h4><p><code>tr/dlg_NNN_src.tsv</code> → <code>tr/en_dlg_NNN.tsv</code> (400 lines each).</p></div></div>
  <div class="step"><div><h4>Check and merge</h4><p>The check enforces identical <code>%s</code>/<code>%d</code> placeholders (a mismatch can crash the game), identical <code>&lt;TAGS&gt;</code>, no extra lines, and a width limit.</p></div></div>
  <div class="step"><div><h4>Longer text than the original</h4><p>A translation that does not fit is copied into free space and every pointer to the old string is redirected to it (47,337 split lines and 967 long strings handled this way, none left out).</p></div></div>
  <div class="step"><div><h4>Clean-up at build time</h4><p>Particles, text formatting and dictionary rewrap (see below).</p></div></div>
</div>
<h3 id="g-merge">Check and merge commands</h3>
<pre><code>python dialogue.py import tr/en_dlg_NNN.tsv
python tr_tool.py check tr/en_dlg_NNN.json      <span class="cm"># always read this: merge drops rejected lines silently</span>
python tr_tool.py merge translations_en.json
python tr_tool.py progress</code></pre>
<h3 id="g-cleanup">Clean-up at build time</h3>
<ul>
<li><code>tr/particles.py</code>: lone Japanese particles between English pieces (が, を, の) are redirected per slot (の → <code>'s </code>, と → <code> &amp; </code>).</li>
<li><code>tr/textfmt.py</code>: joins line breaks inside sentences and splits stuck words, with every change listed in <code>review/textfmt_changes.tsv</code>.</li>
<li><code>tr/dictionary.py</code>: rewraps the Pawapuro Dictionary pages.</li>
</ul>

<h2 id="g-font">6. Making English fit: font and layout</h2>
<h3 id="g-thefont">The font</h3>
<p>The game's fonts (<code>COMMON_FONT.CHK</code>, <code>G2D_FONT.CHK</code>) have <b>no ASCII letters</b>: the code turns <code>A</code> into the full-width <code>Ａ</code>, so English came out as wide as kanji. <code>tools/font_tool.py half</code> squeezes the game's own full-width letters to half width, rewriting each bitmap row (a glyph's advance is also its bitmap width), with a 1-pixel bold.</p>
<h3 id="g-wrap">Word wrap and half-width layout</h3>
<p>In <code>tr/textbox.py</code>. There are three separate layout routines (two text box classes and the message window). None knew about words. New code, added in unused space in the program, changes all three:</p>
<ul>
<li>ASCII takes half a slot, and a word that will not fit starts a new row.</li>
<li>The message window's row counter counts ASCII as half a column.</li>
<li>The name-entry keyboard gets a blank half-width spacer so keys line up.</li>
<li>Empty roster slots point at a new "Empty" string, because the original あき is shared with a character's name reading.</li>
<li>Stadium scoreboards use numbers instead of kanji innings.</li>
</ul>
<div class="note warn"><b>Rule:</b> after changing <code>tr/textbox.py</code>, rerun the whole chain (merge, particles, textfmt, textbox, dictionary), because <code>textbox.py</code> rewrites <code>textbox.json</code> and drops what <code>dictionary.py</code> added.</div>
<h3 id="g-probe">How the routine was found</h3>
<p>When reading code could not say which routine draws a screen, <b>probe builds</b> replaced every text with the address of the code that drew it (<code>tools/text_probe_draw.py</code>). Two screenshots found the real routine after three wrong guesses.</p>

<h2 id="g-images">7. Images</h2>
<ol>
<li><code>tools/tex_inventory.py</code> lists textures with Japanese text (<code>tex/inv/TEXTURE_TEXT_INVENTORY.md</code>).</li>
<li>Generator scripts <code>tex/work/&lt;AREA&gt;/gen_*.py</code> write job files; <code>tools/tex_jobs.py</code> runs them (erase, blend, inpaint, fill, text, rotate). Text is drawn with Windows fonts by <code>tools/tex_label.ps1</code>.</li>
<li>Large sets get an OCR first pass (<code>tools/ocr_tex.ps1</code>, <code>tools/shot_match.py</code>), then hand fixes.</li>
<li><code>chk_tool.py png-import-set tex/work/&lt;AREA&gt;_en tex/orig tex/chk 15</code> encodes.</li>
</ol>
<h3 id="g-imgrules">Rules that matter</h3>
<ul>
<li><b>One owner folder per CHK.</b> Encoding starts from the original file, so a CHK must be encoded from the single folder that holds all its English images (<code>SUC_en</code> for Success, <code>G9_en</code> for Eikan Nine, <code>HUD_en</code> for the HUD, ...). Encoding a side folder alone wipes the CHK's other edits.</li>
<li><b>Keep English inside the game's sprite rectangles</b> (from <code>TCP</code>). Text outside them gets cut off or bleeds into the next sprite.</li>
<li><b>Some banners are several sprites placed apart.</b> WIN/LOSE banners are two halves with a gap, so each half gets a whole word (<code>YOU | WIN</code>). Letter-by-letter effects (hit messages, fielding logos) are rebuilt by <code>tools/hit_logo.py</code>.</li>
</ul>

<h2 id="g-names">8. Player names</h2>
<h3 id="g-roster">Roster record layout</h3>
<p>Roster records (<code>SEN_*.CHK</code>, 524 bytes each):</p>
<div class="table-wrap"><table>
<tr><th>Offset</th><th>Field</th></tr>
<tr><td>−84</td><td>Registered display name (<code>S.ルーゴ</code>, <code>髙橋宏斗</code>, <code>イチロー</code>), empty for most</td></tr>
<tr><td>+0</td><td>Given name (84 bytes UTF-8)</td></tr>
<tr><td>+84</td><td>Family name (84 bytes)</td></tr>
<tr><td>+168</td><td>Family name in uniform letters, 13 bytes, a=1 … z=26 (<code>戸郷</code> = TOGO), <code>.</code> for initials, a suffix after a NUL (<code>STEWART</code>, <code>JR.</code>)</td></tr>
<tr><td>+200</td><td>Team</td></tr>
<tr><td>+206, low 2 bits</td><td><b>Name mode:</b> 0 display name, 1 family name, 2 given name, 3 family + first letter of given</td></tr>
</table></div>
<h3 id="g-namebuild">How names are built</h3>
<p><code>tools/name_build.py</code> (run by the build):</p>
<ul>
<li><b>Family names</b> use the game's own uniform spelling, so they match the real players.</li>
<li><b>Given names</b> come from <code>tr/names_given_en.tsv</code> (2,458 readings). The game stores no readings, so these are the most common reading; a pair line in <code>tr/names_en.tsv</code> overrides any of them.</li>
<li><b>Display names</b> are translated by rule (<code>H.Takahashi</code>, <code>S.Lugo</code>) or from <code>tr/names_display_en.tsv</code> (nicknames).</li>
<li><b>Mode 3 players</b> (same-name teammates) get an English display name and mode 0. <b>Mode 2 players</b> (registered by given name) are switched to the surname.</li>
<li><b>Width rule:</b> no English name may be wider than the widest Japanese name already in that field, or the build stops.</li>
<li>Names are matched by NFKC form, because some records use compatibility kanji (海 U+FA45).</li>
</ul>

<h2 id="g-build">9. Building and installing</h2>
<h3 id="g-build-text">After text changes</h3>
<p>Run in this order:</p>
<pre><code>python tr_tool.py merge translations_en.json
python tr/particles.py &lt;main&gt;
python tr/textfmt.py &lt;main&gt;
python tr/textbox.py &lt;main&gt;
python tr/dictionary.py &lt;main&gt;
bash tools/build.sh</code></pre>
<h3 id="g-build-img">After image changes</h3>
<p>Encode the owner folder first:</p>
<pre><code>python chk_tool.py png-import-set tex/work/SUC_en tex/orig tex/chk 15
bash tools/build.sh</code></pre>
<h3 id="g-verify">What build.sh does and verify</h3>
<p><code>tools/build.sh</code> runs the hit-logo patch, bios, names, screen labels, builds the mod, verifies it and installs it. <b>Close Eden first</b>; the script stops if Eden is running.</p>
<p>The verify step applies the IPS to a copy of <code>main</code> and reads back every moved line. A good build ends with:</p>
<pre><code>verify: 68409 redirected lines read back in English; 0 redirected lines wrong; 0 in-use strings changed unexpectedly; 0 stray patch records
installed copy matches mods/PawaEN</code></pre>
<div class="note info">Verify checks the data, not how screens look. Layout problems only show in the running game.</div>

<h2 id="g-files">10. Project files</h2>
<div class="table-wrap"><table>
<tr><th>Path</th><th>What it is</th></tr>
<tr><td><code>pawapuro_rdb.py</code></td><td>Archive decrypt, extract, patch volume</td></tr>
<tr><td><code>chk_tool.py</code></td><td>CHK containers, texture decode/encode</td></tr>
<tr><td><code>main_text.py</code>, <code>dialogue.py</code></td><td>String extraction, line units, IPS patching, verify</td></tr>
<tr><td><code>tr_tool.py</code></td><td>Translation check, merge, progress</td></tr>
<tr><td><code>build_mod.py</code></td><td>Builds <code>mods/PawaEN</code></td></tr>
<tr><td><code>tr/en_*.tsv</code>, <code>tr/*.json</code></td><td>Translations by batch</td></tr>
<tr><td><code>tr/textbox.py</code>, <code>tr/particles.py</code>, <code>tr/textfmt.py</code>, <code>tr/dictionary.py</code></td><td>Code patches and text clean-up</td></tr>
<tr><td><code>tr/names_en.tsv</code>, <code>tr/names_given_en.tsv</code>, <code>tr/names_display_en.tsv</code></td><td>Player names</td></tr>
<tr><td><code>tools/font_tool.py</code></td><td>Half-width font</td></tr>
<tr><td><code>tools/txc_patch.py</code></td><td>Screen labels</td></tr>
<tr><td><code>tools/name_build.py</code>, <code>tools/bio_build.py</code></td><td>Rosters and bios</td></tr>
<tr><td><code>tools/hit_logo.py</code></td><td>Letter-by-letter hit messages and fielding logos</td></tr>
<tr><td><code>tools/tex_jobs.py</code>, <code>tools/tex_label.ps1</code>, <code>tools/tex_gen.py</code></td><td>Image redrawing</td></tr>
<tr><td><code>tex/orig/</code>, <code>tex/work/</code>, <code>tex/chk/</code></td><td>Original CHKs, work images, encoded CHKs</td></tr>
<tr><td><code>tools/build.sh</code></td><td>One-step build, verify and install</td></tr>
<tr><td><code>CHK_FORMAT.md</code></td><td>Byte layout of CHK files</td></tr>
</table></div>

<h2 id="g-todo">11. What is not translated yet</h2>
<h3 id="g-todo-img">Images</h3>
<ul>
<li>About 810 Online mode title cards (<code>CSNA*</code>, <code>CSNB*</code>).</li>
<li>About 50 PawaFes images.</li>
<li>The home run banner: its letters are 3D models (<code>HOMERUN.CHK</code>), not pictures.</li>
<li>License pages (<code>LIC_NOTATION</code>), some school logos (<code>SCSR_LOGO_*</code>), a few screenshots and story pictures.</li>
</ul>
<h3 id="g-todo-text">Text</h3>
<ul>
<li>800 generic given names in the executable.</li>
<li>3 strings that another string points into.</li>
<li>About 645 kept lines that may be visible (event titles, batting forms).</li>
</ul>
<h3 id="g-rough">Known rough edges</h3>
<ul>
<li>Most screens have only been checked by screenshot as they come up, not systematically.</li>
<li>All letters have the same width, so narrow letters like "i" leave small gaps.</li>
<li>Help text is stitched from Japanese-order pieces, so some sentences read a little oddly.</li>
<li>A few given-name readings may be the less common one for that player.</li>
</ul>

`});
