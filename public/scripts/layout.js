document.addEventListener("DOMContentLoaded", function () {
  // Page has finished loading. Now, do things.
  loadLayoutByPetraPixel();

  // Add any custom JavaScript code here...
});

function loadLayoutByPetraPixel() {
  const mainEl = document.querySelector("main");
  if (!mainEl) return;
  mainEl.insertAdjacentHTML("beforebegin", headerHTML());
  mainEl.insertAdjacentHTML("afterend", footerHTML());
  giveActiveClassToCurrentPage();
}

const nesting = getNesting();

function headerHTML() {
  // ${nesting} outputs "./" or "../" depending on current page depth.
  // You can use it to refer to images etc.
  // Example: <img src="${nesting}img/logo.png"> might output <img src="../img/logo.png">

  return `
  
      <!-- =============================================== -->
      <!-- HEADER -->
      <!-- =============================================== -->

      <header>

        <div class="header-content">
	        <div class="header-title">Gabi's Omellette</div>
	        
	        <!-- NAVIGATION -->
	        <nav>
	          <ul>
	            <li><a href="/">Home</a></li>
	            <li><a href="/page1">Projects</a></li>
	            <li><a href="/page2">Newsletter</a></li>
	            <li><a href="/page3">Inspo</a></li>
	            <li>
	                <strong>Submenu (hover to show)</strong>
	                <ul>
	                  <li><a href="/page-a">Buttons</a></li>
	                  <li><a href="/page-b">Page B</a></li>
	                  <li><a href="/page-c">Page C</a></li>
	                  <li><a href="/page-d">Page D</a></li>
	                  <li><a href="/page-e">Page E</a></li>
	                </ul>
	            </li>
	          </ul>
	        </nav>
        	
        </div>
      </header>

	  
        
      <!-- =============================================== -->
      <!-- LEFT SIDEBAR -->
      <!-- =============================================== -->

      <aside class="left-sidebar">

        <div class="sidebar-section">
          <div class="sidebar-title">Links</div>
          <ul>
            <li><a href="https://github.com/gabrielle-barnes" target="_blank">GitHub</a></li>
            <li><a href="https://www.goodreads.com/user/show/171387956-gabrielle-barnes" target="_blank">Books I enjoy</a></li>
            <li><a href="https://gabrielle-barnes.github.io/" target="_blank">Serious website</a></li>
          </ul>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">Currently Into:</div>
          <p>The process of emotions, especially when tied to a specific event or goal. Like in Dorian Gray when
          his soon to be fiance fails one performance and he no longer believes in love.</p>
          <p>Scandi style sweaters and olive green ballet flats from Ganni <3</p>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">Quote of the Week:</div>
          <blockquote>
            <p>The fresh morning air seemed to drive away all his sombre passions. He thought only of Sibyl. 
            A faint echo of his love came back to him.</p>
            <p><em>The Picture of Dorian Gray by Oscar Wilde</em></p>
          </blockquote>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">Section Title</div>
          <marquee>
          	<img src="https://cyber.dabamos.de/88x31/doghouse1.gif" alt="doghouse"></a>
          	<img src="https://cyber.dabamos.de/88x31/finger-logo-cat.gif" alt="finger-logo-cat"></a>
          	<img src="https://cyber.dabamos.de/88x31/fingerofgod.gif" alt="fingerofgod"></a>
          	<img src="https://cyber.dabamos.de/88x31/macmade3.gif" alt="macmade"></a>
          </marquee>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-title">Listening To:</div>
          <p>Smooth Operator -<em>Sade</em></p>
          <p>Performance, Gothic Writing, and Experimentation with Leigh Stein -<em>Hot Literati</em></p>
        </div>
      </aside>
	
      `;
}

function footerHTML() {
  // ${nesting} outputs "./" or "../" depending on current page depth.
  // You can use it to refer to images etc.
  // Example: <img src="${nesting}img/logo.png"> might output <img src="../img/logo.png">

  return `


      <!-- =============================================== -->
      <!-- FOOTER -->
      <!-- =============================================== -->

      <footer>
            <div>Footer Text. <a href="/">Link.</a> Template generated with <a href="https://petrapixel.neocities.org/coding/layout-generator.html">petrapixel's layout generator</a>.</div>
      </footer>`;
}

/* Do not edit anything below this line unless you know what you're doing. */

function giveActiveClassToCurrentPage() {
  const els = document.querySelectorAll("nav a");
  [...els].forEach((el) => {
    const href = el.getAttribute("href").replace(".html", "").replace("#", "");
    const pathname = window.location.pathname.replace("/public/", "");
    const currentHref = window.location.href.replace(".html", "") + "END";

    /* Homepage */
    if (href == "/" || href == "/index.html") {
      if (pathname == "/") {
        el.classList.add("active");
      }
    } else {
      /* Other pages */
      if (currentHref.includes(href + "END")) {
        el.classList.add("active");

        /* Subnavigation: */

        if (el.closest("details")) {
          el.closest("details").setAttribute("open", "open");
          el.closest("details").classList.add("active");
        }

        if (el.closest("ul")) {
          if (el.closest("ul").closest("ul")) {
            el.closest("ul").closest("ul").classList.add("active");
          }
        }
      }
    }
  });
}

function getNesting() {
  const numberOfSlashes = window.location.pathname.split("/").length - 1;
  if (numberOfSlashes == 1) return "./";
  return "../".repeat(numberOfSlashes - 1);
}
