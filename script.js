// ============================================
// Absolventský Velehrad 2027 - Main Script
// Standalone (no jQuery)
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // === PARALLAX ===
    const layers = document.querySelectorAll("[data-type='parallax']");
    const layerDepths = Array.from(layers).map(layer => ({
        element: layer,
        depth: parseFloat(layer.getAttribute('data-depth'))
    }));

    let lastScrollY = 0;
    let ticking = false;

    const applyTransforms = () => {
        layerDepths.forEach(({ element, depth }) => {
            const movement = -(lastScrollY * depth);
            element.style.transform = `translate3d(0, ${movement}px, 0)`;
        });
        ticking = false;
    };

    const handleScroll = () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            requestAnimationFrame(applyTransforms);
            ticking = true;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // === NAV SCROLL EFFECT ===
    const mainNav = document.getElementById('main-nav');
    const updateNavScroll = () => {
        if (mainNav) {
            mainNav.classList.toggle('scrolled', window.scrollY > 50);
        }
    };
    window.addEventListener('scroll', updateNavScroll, { passive: true });
    updateNavScroll();

    // === MOBILE NAV ===
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }

    // === PROGRAM SCHEDULE ACCORDION ===
    const dayToggles = document.querySelectorAll('#program-akce .day-toggle');
    dayToggles.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;

            if (this.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // === THEMATIC ACCORDION ===
    const themeToggles = document.querySelectorAll('.theme-day-toggle');
    themeToggles.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;

            if (this.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // === LECTURER MODAL ===
    const lecturerData = {
        'pavel-pola': {
            name: 'P. Mgr. Pavel Pola, Ph.D. OCD',
            title: 'Modlitba a solidarita v těžkých časech',
            image: 'img/speakers/pavel_pola.jpeg',
            description: '<p>Jak může osobní duchovní život posilovat vnitřní odolnost a inspirovat k hlubší lidské sounáležitosti. Přednáška ukazuje, že modlitba není únikem z reality, ale způsobem, jak si uchovat odvahu a otevřené srdce. Je určena všem, kdo hledají smysluplný způsob, jak žít svou spiritualitu v náročných nebo nejistých časech.</p>',
            about: '<h3 class="modal-section-title">O přednášejícím</h3><p>Pavel Pola je kněz, teolog, člen Řádu bosých karmelitánů a rektor kostela Pražského Jezulátka. Absolvoval sebezkušenostní výcvik psychodynamického směru a doktorské studium v oboru spirituální a ekumenické teologie. Vede kurzy meditace a věnuje se duchovnímu doprovázení.</p>'
        },
        'klara-malinakova': {
            name: 'Mgr. Bc. Klára Maliňáková, Ph.D.',
            title: 'Obraz Boha „v hlavě" a „v srdci"',
            image: 'img/speakers/klara_malinakova.jpg',
            description: '<p>Výzkumy ukazují, že zkušenosti z našich raných vztahů významně ovlivňují i vztah k Bohu. Naše emocionální prožívání v této oblasti se tedy může výrazně lišit od toho, jak o Bohu přemýšlíme a mluvíme. Jak oba tyto obrazy více sladit? Jak opravovat naše pokřivené obrazy Boha a jak žít vztah k Němu, aby byl pro náš život opravdu životodárný?</p>',
            about: '<h3 class="modal-section-title">O přednášející</h3><p>Vystudovala biologii a genetiku na Masarykově univerzitě a teologii na Univerzitě Palackého. Působí jako akademický a vědecký pracovník na Cyrilometodějské teologické fakultě UP. V rámci své výzkumné činnosti se zaměřuje zejména na oblast spirituality a zdraví, vysokou citlivost a prožívání hanby a viny. Věnuje se také psychoterapeutické práci a duchovnímu doprovázení.</p>'
        },
        'jakub-guttner': {
            name: 'Jakub a Dagmar Güttnerovi',
            title: 'Kariéra? Rodina? Služba?',
            image: 'img/speakers/jakub_guttner.png',
            description: '<p>Trh práce vás chce mít na sto procent. Děti vás potřebují na sto procent. Partner po vás touží na sto procent. A církev by taky něco ráda, ani nemluvě o dalších lidech kolem vás. Jak se v tom neztratit, co by v takové situaci asi udělal Pán Ježíš?</p>',
            about: '<h3 class="modal-section-title">O přednášejících</h3><p>Jsou manželé téměř 25 let a mají 4 děti ve věku 14 - 23 let. Mají za sebou kariéru na fakultě, v consultingu, domácí škole i vedení firmy. Jakub je kazatelem, Dagmar psychoterapeutkou a diakonkou. Společně se věnují koordinaci kurzů Manželské večery a Příprava na manželství v České republice.</p>'
        },
        'finance-panel': {
            name: 'Milan Janás, Karel Nedvěd, Antonín Ettler',
            title: 'Finance a finanční gramotnost',
            image: '',
            description: '<p>Přednáška se zaměřením na různá odvětví finančního světa, od kryptoměn přes akcie a podílové fondy až po hypotéky a nemovitosti.</p>',
            about: '<h3 class="modal-section-title">O přednášejících</h3><div class="panel-speaker-profile"><div class="panel-speaker-photo"><img src="img/speakers/milan_janas.jpg" alt="Milan Janás"></div><div class="panel-speaker-bio"><h4>Milan Janás (Kryptoměny)</h4><p>Podnikatel, který se kromě svého oboru dlouhé roky točí kolem světa kryptoměn. Jeho přednáška je úvodem do světa kryptoměn pro naprosté začátečníky.</p></div></div><div class="panel-speaker-profile"><div class="panel-speaker-photo"><img src="img/speakers/karel_nedved.jpg" alt="Karel Nedvěd"></div><div class="panel-speaker-bio"><h4>Karel Nedvěd (Akcie a podílové fondy)</h4><p>Vedoucí oddělení Investičního výzkumu Fio banka a analytik. Ve své přednášce si poví, jaký je rozdíl mezi investováním, spekulováním a gamblingem a kam dává smysl dlouhodobě investovat.</p></div></div><div class="panel-speaker-profile"><div class="panel-speaker-photo"><img src="img/speakers/antonin_ettler.jpg" alt="Antonín Ettler"></div><div class="panel-speaker-bio"><h4>Antonín Ettler (Hypotéky a nemovitosti)</h4><p>Finanční poradce věnující se komplexnímu majetkovému a finančnímu poradenství se zaměřením na investice a hypotéky. Aktivně se podílí na projektu "Bible a finance".</p></div></div>'
        },
        'finance-panel-workshop': {
            name: 'Milan Janás, Karel Nedvěd, Antonín Ettler',
            title: 'Finance a finanční gramotnost (Workshop)',
            image: '',
            description: '<p>Workshop se zaměřením na různá odvětví finančního světa, od kryptoměn přes akcie a podílové fondy až po hypotéky a nemovitosti.</p>',
            about: '<h3 class="modal-section-title">O přednášejících</h3><div class="panel-speaker-profile"><div class="panel-speaker-photo"><img src="img/speakers/milan_janas.jpg" alt="Milan Janás"></div><div class="panel-speaker-bio"><h4>Milan Janás (Kryptoměny)</h4><p>Podnikatel, který se kromě svého oboru dlouhé roky točí kolem světa kryptoměn. Jeho přednáška je úvodem do světa kryptoměn pro naprosté začátečníky.</p></div></div><div class="panel-speaker-profile"><div class="panel-speaker-photo"><img src="img/speakers/karel_nedved.jpg" alt="Karel Nedvěd"></div><div class="panel-speaker-bio"><h4>Karel Nedvěd (Akcie a podílové fondy)</h4><p>Vedoucí oddělení Investičního výzkumu Fio banka a analytik. Ve své přednášce si poví, jaký je rozdíl mezi investováním, spekulováním a gamblingem a kam dává smysl dlouhodobě investovat.</p></div></div><div class="panel-speaker-profile"><div class="panel-speaker-photo"><img src="img/speakers/antonin_ettler.jpg" alt="Antonín Ettler"></div><div class="panel-speaker-bio"><h4>Antonín Ettler (Hypotéky a nemovitosti)</h4><p>Finanční poradce věnující se komplexnímu majetkovému a finančnímu poradenství se zaměřením na investice a hypotéky. Aktivně se podílí na projektu "Bible a finance".</p></div></div>'
        },
        'manzelstvi-panel': {
            name: 'Manželé Pixovi a Vejmělkovi',
            title: 'Manželství - stojí nám to za to?',
            image: '',
            description: '<p>Panelová diskuze dvou manželských párů z různých denominací i rozličných začátků a zkušeností v manželství. Diskuze se dotkne témat, jako je hledání nové rovnováhy ve vztahu po těžkých životních obdobích, odvaze jednoho páru vstoupit do druhého manželství, a také sdílení života v patchworkové rodině.</p>',
            about: '<h3 class="modal-section-title">O diskutujících</h3><div class="panel-speaker-profile"><div class="panel-speaker-photo"><img src="img/speakers/vejmelkovi.jpg" alt="Manželé Vejmělkovi"></div><div class="panel-speaker-bio"><h4>Jakub a Monika Vejmělkovi</h4><p>Manželský pár, který se věnuje podpoře mladých lidí v oblasti partnerských vztahů. Jakub je ředitelem v Křesťanské akademii mladých, Monika je maminkou, fotografkou a učitelkou. Jsou známí díky svému podcastu "Láska a jiné srandy" a napsali několik knih, např. "Modlím se za svou milou / svého milého".</p></div></div><div class="panel-speaker-profile"><div class="panel-speaker-photo"><img src="img/speakers/pixovi.jpg" alt="Manželé Pixovi"></div><div class="panel-speaker-bio"><h4>Jaroslav a Adéla Pixovi</h4><p>Jsou spolu 10 let, oba v druhém manželství, a dohromady mají 7 dětí. Jaroslav pracuje ve vydavatelství Doron, Adéla v Místní akční skupině Sdružení Růže. Ve farnosti i na širší úrovni se angažují v pořádání mnoha akcí, jako jsou Tříkrálová sbírka nebo Manželské večery.</p></div></div>'
        },
        'marek-drapal': {
            name: 'Ing. et Ing. Marek Drápal, PhD.',
            title: 'Křesťan a životní prostředí',
            image: 'img/speakers/marek_drapal.jpg',
            description: '<p>Přednáška se bude zabývat teologickými východisky a pnutím mezi lidskými potřebami a přírodou, vztahem člověka ke zvířatům, encyklikou Laudato si\' a praktickými kroky k šetrnému životu ve farnostech a domácnosti.</p>',
            about: '<h3 class="modal-section-title">O přednášejícím</h3><p>Vystudoval biomedicínské inženýrství (ČVUT), postgraduál na 1. lékařské fakultě UK a ekologické zemědělství (ČZU). Žije na úpatí Jizerských hor stylem ohleduplným k přírodě. Založil a řídí Českou křesťanskou environmentální síť a zabývá se otázkami ochrany Božího stvoření v Českobratrské církvi evangelické.</p>'
        },
        'michael-martinek': {
            name: 'Mgr. Michael Martinek, Th.D.',
            title: 'O čem Ježíš nemluvil',
            image: 'img/speakers/michael_martinek.jpg',
            description: '<p>Rovnováha mezi spiritualitou a náboženstvím. Jak uvést v soulad své duchovní potřeby, otázky či touhy, a požadavky svého náboženství, své víry či církve?</p>',
            about: '<h3 class="modal-section-title">O přednášejícím</h3><p>Katolický kněz, člen řeholní kongregace Salesiáni Dona Boska (SDB), provinciální delegát pro salesiánskou rodinu, učitel na VOŠ JABOK v Praze a bývalý vězeňský kaplan.</p>'
        },
        'daniela-kucova': {
            name: 'Daniela Kucová',
            title: 'Skrze krizi k víře',
            image: '',
            description: '<p>Duchovní krize není známkou selhání – je přirozenou součástí víry. Může být obtížná, ale i proměňující. Jak krizí projít co nejlépe a neztratit rovnováhu? Jak doprovázet ty, kteří si krizí právě procházejí? Pojďme tyto otázky společně otevřít a hledat, co nám chce Bůh skrze krize říci.</p>',
            about: '<h3 class="modal-section-title">O přednášející</h3><p>Vystudovala teologii a pastoraci. V současnosti působí jako lektorka na pastoračním kurzu Kompost, kde propojuje terapeutický přístup s křesťanským duchovním formováním. Vyrostla v křesťanské rodině, přesto si k osobnímu vztahu s Ježíšem musela najít cestu sama. Ve volném čase se věnuje tvůrčímu psaní a cestování.</p>'
        },
        'jana-biescad': {
            name: 'Mgr. Jana Bieščad, PhD.',
            title: 'Sexualita: problém anebo výzva?',
            image: 'img/speakers/jana_biescad.jpg',
            description: '<p>Mohlo by se zdát, že zdrženlivost, o kterou se mladí věřící snaží, jde proti lidské přirozenosti a může být zdrojem psychických či vztahových problémů. Neradi zápasí s vlastní sexualitou mnohem více než nevěřící vrstevníci. Může vzniknout pokušení ztotožnit oblast sexuality s hříchem a 6. přikázáním. Sexualita však je a měla by být krásná.</p>',
            about: '<h3 class="modal-section-title">O přednášející</h3><p>Psycholožka, lektorka a odborná asistentka na Katedře psychologie Trnavské univerzity. Je absolventkou dlouhodobého psychoterapeutického výcviku v logoterapii a existenciální analýze, výcvikového programu v rodinné terapii se zaměřením na vztahovou vazbu, v terapii hrou a metodě EMDR zaměřené na zpracování traumatické zkušenosti.</p>'
        },
        'petr-havlicek': {
            name: 'Ing. Petr Havlíček',
            title: 'Rovnováha v sobě, rovnováha v jídle',
            image: 'img/speakers/petr_havlicek.jpeg',
            description: '<p>Jak naše tělo reflektuje to, kým uvnitř jsme? Jak se nutriční výživa a denní stravování odráží v sebepřijetí a jak se to projevuje ve vztahu k našemu okolí?</p>',
            about: '<h3 class="modal-section-title">O přednášejícím</h3><p>Český odborník a poradce přes výživu a zdravý životní styl. Působil jako poradce řady českých vrcholových sportovců, například Kateřiny Neumannové, Tomáše Dvořáka a Romana Šebrleho. V Praze založil a vede poradenské Centrum Petra Havlíčka. Je také známým moderátorem televizních pořadů jako "Jste to, co jíte".</p>'
        },
        'pavel-pokorny': {
            name: 'Pavel Pokorný',
            title: 'Kde máme těžiště?',
            image: 'img/speakers/pavel_pokorny.jpg',
            description: '<p>Jak autenticky křesťansky žít v sekulárním prostředí? Jak unést rozdíly uvnitř své církve, mezi církvemi a mezi lidmi vůbec? Přednáška se zaměří na vztah mezi vírou, osobní spiritualitou, naukou církve a životem konkrétního společenství.</p>',
            about: '<h3 class="modal-section-title">O přednášejícím</h3><p>Český evangelický farář, nemocniční kaplan a synodní senior Českobratrské církve evangelické. Vystudoval Komenského evangelickou bohosloveckou fakultu a od roku 1999 působí jako farář ve sboru v Praze-Střešovicích. V roce 2021 byl zvolen synodním seniorem na šestileté volební období 2021–2027.</p>'
        },
        'pavel-vosoba': {
            name: 'Pavel Vosoba',
            title: 'Zrození duchovní osobnosti',
            image: 'img/speakers/pavel_vosoba.jpg',
            description: '<p>Jak v dnešní době plné šablon a cizích cest jít vlastní cestou v souladu se svými hodnotami a postoji? Kde vzít odvahu je dodržovat i tam, kde jsou překážky a odmítnutí většiny?</p>',
            about: '<h3 class="modal-section-title">O přednášejícím</h3><p>Pavel většinu svého života zasvětil učitelství. Dnes přednáší na strojní fakultě ČVUT. Je spoluvlastníkem poradenské firmy M.C.TRITON, která letos oslavila 35 let existence. Posledních třicet let se věnuje koučinku a napsal řadu knih, včetně třídílné knihy "Zrození osobnosti".</p>'
        },
        'mikulas-vymetal': {
            name: 'Mikuláš Vymětal, Th.D.',
            title: 'Mosty místo zdí: Mezináboženský dialog a solidarita',
            image: 'img/speakers/mikulas_vymetal.jpg',
            description: '<p>V době napětí a polarizace je schopnost naslouchat a spojovat různé světy víry důležitější než kdy dřív. Jak mezináboženská komunikace pomáhá najít cesty, jak v křesťanském duchu stát po boku menšin? Jak čelit xenofobii, úzkosti, nenávisti a žít solidaritu bez předsudků?</p>',
            about: '<h3 class="modal-section-title">O přednášejícím</h3><p>Farář Českobratrské církve evangelické, který se věnuje humanitárním aktivitám, menšinám a sociálně vyloučeným lidem. Studoval evangelickou teologii v Praze a v Izraeli. Věnuje se mezináboženskému dialogu a otázkám národnostních a jiných menšin, od roku 2001 se také angažuje v otázce LGBT věřících.</p>'
        },
        'terezie-tuckova': {
            name: 'Mgr. Terezie Tučková',
            title: 'Potřeba těla vztahovat se a být v propojení',
            image: 'img/speakers/terezie_tuckova.jpeg',
            description: '<p>Pohled na vztahy a intimitu z hlediska toho, co se děje v našem těle na úrovni nervové soustavy. Jak zlepšit spojení se sebou a druhými a žít s pocitem, že jsem součástí a v pořádku v dnešní době, která naši pozornost od vnímání vlastního těla neustále odvádí?</p>',
            about: '<h3 class="modal-section-title">O přednášející</h3><p>Absolvovala pětiletý výcvik ve Společnosti pro logoterapii a existenciální analýzu (SLEA) a navázala vzděláním v práci s traumatem. Věnuje se péči o traumatizované klienty a individuální psychoterapii dospělých a dospívajících.</p>'
        }
    };

    const modal = document.getElementById('lecturerModal');
    const modalBody = document.getElementById('modal-content-body');
    const closeModal = document.querySelector('.close-button');
    const lecturerLinks = document.querySelectorAll('#program-akce .event-list-item-link');

    lecturerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lecturerId = this.getAttribute('data-lecturer');
            const data = lecturerData[lecturerId];

            if (data) {
                const photoHtml = data.image
                    ? '<div class="modal-lecturer-photo"><img src="' + data.image + '" alt="Fotka ' + data.name + '"></div>'
                    : '';

                modalBody.innerHTML =
                    '<div class="modal-lecturer-header">' +
                        photoHtml +
                        '<div class="modal-lecturer-details">' +
                            '<p class="modal-lecturer-name">' + data.name + '</p>' +
                        '</div>' +
                    '</div>' +
                    '<div class="modal-lecture-body">' +
                        '<h2>' + data.title + '</h2>' +
                        data.description +
                        data.about +
                    '</div>';
                modal.style.display = 'block';
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // === ESCAPE KEY - close any open modal ===
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modal && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        }
    });

    // === GALLERY ===
    initializeGallery();

    // === INLINE VIDEO - scroll-triggered autoplay ===
    const videoIframe = document.getElementById('youtubeVideo');
    if (videoIframe) {
        var videoLoaded = false;
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !videoLoaded) {
                    videoIframe.setAttribute('src', videoIframe.getAttribute('data-src'));
                    videoLoaded = true;
                }
            });
        }, { threshold: 0.3 });
        observer.observe(videoIframe);
    }
});

// === GALLERY INITIALIZATION ===
function initializeGallery() {
    const galleryContainer = document.getElementById('gallery');
    if (!galleryContainer) return;

    const keywords = ['Společenství', 'Workshopy', 'Přednášky', 'Víra', 'Koncerty', 'Tanec', 'Hudba', 'Rozhovory', 'Speeddating', 'Setkání', 'Modlitba', 'Odpočinek', 'V rovnováze', 'Velehrad'];
    const themeColors = ['#336778', '#b65d46', '#deb551', '#32779c'];

    const imagePaths = [];
    for (let i = 1; i <= 34; i++) {
        imagePaths.push('img/gallery/full/f' + i + '.jpg');
    }

    const galleryItems = [];

    const createImageItem = (imageSrc, index) => {
        const thumbSrc = imageSrc.replace('/full/', '/thumb/');
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.dataset.src = imageSrc;
        item.dataset.thumb = thumbSrc;

        const img = document.createElement('img');
        img.src = thumbSrc;
        img.loading = 'lazy';
        img.alt = 'Fotografie z Absolventského Velehradu ' + (index + 1);
        img.width = 400;
        img.height = 300;
        item.appendChild(img);
        return item;
    };

    const createKeywordItem = (keyword, color) => {
        const item = document.createElement('div');
        item.classList.add('gallery-item', 'keyword-item');
        item.style.backgroundColor = color;
        item.style.color = '#FFFFFF';
        item.style.fontFamily = 'Russo One, sans-serif';
        item.style.fontSize = '28px';

        const randomHeight = Math.floor(Math.random() * 150) + 150;
        item.style.height = randomHeight + 'px';

        const span = document.createElement('span');
        span.textContent = keyword;
        item.appendChild(span);
        return item;
    };

    const shuffledKeywords = keywords.sort(() => 0.5 - Math.random());
    const shuffledColors = themeColors.sort(() => 0.5 - Math.random());
    const interval = Math.floor(imagePaths.length / shuffledKeywords.length);

    let keywordIndex = 0;
    imagePaths.forEach((imagePath, i) => {
        const imageItem = createImageItem(imagePath, i);
        galleryItems.push(imageItem);

        if (keywordIndex < shuffledKeywords.length && (i + 1) % interval === 0) {
            const keyword = shuffledKeywords[keywordIndex];
            const color = shuffledColors[keywordIndex % shuffledColors.length];
            const keywordItem = createKeywordItem(keyword, color);
            galleryItems.push(keywordItem);
            keywordIndex++;
        }
    });

    galleryItems.forEach(item => galleryContainer.appendChild(item));

    // Lazy-load lightGallery scripts when gallery scrolls into view
    const loadLightGallery = () => {
        const scripts = [
            'https://cdn.jsdelivr.net/npm/lightgallery@2.7.2/lightgallery.min.js',
            'https://cdn.jsdelivr.net/npm/lightgallery@2.7.2/plugins/thumbnail/lg-thumbnail.min.js',
            'https://cdn.jsdelivr.net/npm/lightgallery@2.7.2/plugins/zoom/lg-zoom.min.js'
        ];
        let loaded = 0;
        const onAllLoaded = () => {
            if (typeof lightGallery !== 'undefined') {
                lightGallery(galleryContainer, {
                    selector: '.gallery-item:not(.keyword-item)',
                    plugins: [lgThumbnail, lgZoom],
                    thumbnail: true,
                    zoom: true,
                    actualSize: true,
                    preload: 2,
                });
            }
        };
        scripts.forEach(src => {
            const s = document.createElement('script');
            s.src = src;
            s.onload = () => { loaded++; if (loaded === scripts.length) onAllLoaded(); };
            document.body.appendChild(s);
        });
    };

    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadLightGallery();
                galleryObserver.disconnect();
            }
        });
    }, { rootMargin: '200px' });
    galleryObserver.observe(galleryContainer);
}
