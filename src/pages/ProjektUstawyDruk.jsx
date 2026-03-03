import React, { useEffect } from "react";

const chapters = [
  {
    roman: "I",
    title: "Przepisy ogólne",
    articles: [
      {
        number: "Art. 1.",
        title: "Zakres ustawy",
        content: `Ustawa ustanawia Fundusz Rekompensaty Społecznej, zwany dalej "Funduszem", oraz określa zasady wnoszenia, rozliczania i przekazywania opłaty solidarnościowej, zwanej "AboTax", związanej z przerwaniem ciąży na żądanie. Ustawa nie reguluje przesłanek dopuszczalności przerwania ciąży.`
      },
      {
        number: "Art. 2.",
        title: "Definicje",
        content: `Użyte w ustawie określenia oznaczają: 1) opłata solidarnościowa (AboTax) — opłata publicznoprawna równa 100% kosztu zabiegu przerwania ciąży, odprowadzana przez placówkę medyczną do Funduszu; 2) placówka — podmiot leczniczy wykonujący zabiegi przerwania ciąży na podstawie zezwolenia; 3) etat opiekuna — pełnoetatowe zatrudnienie wychowawcy lub opiekuna w placówce pieczy zastępczej; 4) samorząd — jednostka samorządu terytorialnego (gmina lub powiat) prowadząca lub zamierzająca prowadzić placówkę pieczy zastępczej; 5) wskaźnik kadrowy — stosunek liczby dzieci w placówce do liczby zatrudnionych wychowawców.`
      }
    ]
  },
  {
    roman: "II",
    title: "Fundusz Rekompensaty Społecznej",
    articles: [
      {
        number: "Art. 3.",
        title: "Utworzenie Funduszu",
        content: `Tworzy się Fundusz Rekompensaty Społecznej jako państwowy fundusz celowy w rozumieniu ustawy o finansach publicznych. Dysponentem Funduszu jest minister właściwy do spraw rodziny.`
      },
      {
        number: "Art. 4.",
        title: "Przychody Funduszu",
        content: `Przychodami Funduszu są: 1) opłaty solidarnościowe (AboTax) odprowadzane przez placówki medyczne; 2) dobrowolne darowizny od osób fizycznych i prawnych; 3) odsetki od środków zgromadzonych na rachunku Funduszu.`
      },
      {
        number: "Art. 5.",
        title: "Wydatki Funduszu",
        content: `Środki Funduszu przeznacza się wyłącznie na finansowanie etatów wychowawców i opiekunów w placówkach pieczy zastępczej prowadzonych przez samorządy. Co najmniej 98% przychodów trafia bezpośrednio na wynagrodzenia — koszty administracyjne Funduszu nie mogą przekroczyć 2% rocznych przychodów. Fundusz nie finansuje remontów, wyposażenia ani programów terapeutycznych.`
      },
      {
        number: "Art. 6.",
        title: "Publiczny Rejestr Etatów i transparentność",
        content: `Dysponent prowadzi i publicznie udostępnia Rejestr Etatów zawierający: liczbę etatów sfinansowanych w każdym powiecie, kwoty przekazane poszczególnym samorządom oraz aktualny wskaźnik kadrowy w dofinansowanych placówkach. Rejestr jest aktualizowany co kwartał. Fundusz podlega corocznemu niezależnemu audytowi zewnętrznemu — raport jest publicznie dostępny.`
      }
    ]
  },
  {
    roman: "III",
    title: "Opłata solidarnościowa",
    articles: [
      {
        number: "Art. 7.",
        title: "Wysokość opłaty",
        content: `Wysokość opłaty solidarnościowej jest równa 100% kosztu zabiegu przerwania ciąży. Opłatę uiszcza pacjentka na rzecz placówki wykonującej zabieg. Opłata stanowi rekompensatę solidarnościową — nie jest karą ani podatkiem, lecz wkładem w poprawę warunków opieki nad dziećmi pozbawionymi opieki rodzicielskiej.`
      },
      {
        number: "Art. 8.",
        title: "Faktura z dwiema pozycjami",
        content: `Placówka wystawia pacjentce fakturę zawierającą dwie odrębne pozycje: 1) koszt usługi medycznej (zabiegu); 2) opłata solidarnościowa AboTax. Opłata solidarnościowa nie podlega podatkowi VAT. Na fakturze nie umieszcza się żadnych danych pozwalających na identyfikację pacjentki przez Fundusz.`
      },
      {
        number: "Art. 9.",
        title: "Raty i rozliczenie roczne",
        content: `Pacjentka może opłacić AboTax jednorazowo lub — na podstawie porozumienia z placówką — w ratach rozłożonych na okres do 12 miesięcy od daty zabiegu. Placówka odprowadza zebrane środki do Funduszu w terminie do 31 marca roku następującego po roku, w którym wykonano zabiegi. Ryzyko windykacji należności od pacjentek spoczywa wyłącznie na placówce — Fundusz rozlicza się z placówką, nie z pacjentką. W przypadku braku zapłaty placówka może przekazać sprawę do właściwego urzędu skarbowego lub skierować ją na drogę egzekucji komorniczej we własnym imieniu; w żadnym wypadku nie angażuje w ten proces Funduszu.`
      },
      {
        number: "Art. 10.",
        title: "Raportowanie i anonimowość",
        content: `Placówka przekazuje Funduszowi wyłącznie dane zagregowane: łączną liczbę wykonanych zabiegów w danym roku oraz łączną kwotę należnej opłaty solidarnościowej. Raport nie zawiera żadnych danych osobowych pacjentek — imion, nazwisk, adresów, numerów PESEL ani żadnych innych informacji pozwalających na identyfikację. Fundusz nie przetwarza danych osobowych pacjentek.`
      }
    ]
  },
  {
    roman: "IV",
    title: "Alokacja środków — model samorządowy",
    articles: [
      {
        number: "Art. 11.",
        title: "Wniosek samorządu",
        content: `Samorząd ubiegający się o dofinansowanie etatów składa do Funduszu wniosek zawierający: 1) aktualny wskaźnik kadrowy w placówce lub placówkach; 2) liczbę dzieci przebywających w placówce; 3) potwierdzenie posiadania gotowego lokalu (własnego, komunalnego lub uzyskanego od innego podmiotu publicznego) przystosowanego do prowadzenia domu dziecka; 4) planowaną liczbę etatów do sfinansowania. Fundusz rozpatruje wnioski w kolejności według wskaźnika kadrowego — priorytet mają placówki z najgorszym stosunkiem dzieci do opiekunów.`
      },
      {
        number: "Art. 12.",
        title: "Kryteria alokacji i rezerwa",
        content: `Fundusz kieruje środki tam, gdzie wskaźnik kadrowy jest najgorszy — automatycznie, bez możliwości politycznego wpływu na wybór samorządów. Fundusz utrzymuje rezerwę finansową w wysokości co najmniej 20% rocznych przychodów, aby zapewnić ciągłość finansowania już uruchomionych etatów nawet w przypadku zmienności wpływów.`
      },
      {
        number: "Art. 13.",
        title: "Dofinansowanie i uruchomienie placówki",
        content: `Po pozytywnym rozpatrzeniu wniosku Fundusz zawiera z samorządem umowę wieloletnią o finansowaniu etatów. Samorząd zapewnia lokal i zarządza placówką — Fundusz finansuje wyłącznie wynagrodzenia. Samorząd może przeznaczyć dofinansowanie na: 1) wydzielenie z dużej grupy (do 14 dzieci) mniejszych grup wychowawczych (docelowo 5-7 dzieci) przez zatrudnienie dodatkowych opiekunów; 2) otwarcie nowej placówki i przekierowanie dzieci z przepełnionych domów dziecka.`
      },
      {
        number: "Art. 14.",
        title: "Ciągłość finansowania",
        content: `Raz uruchomione etaty są finansowane przez Fundusz tak długo, jak samorząd spełnia warunki umowy i Fundusz dysponuje środkami. Nowe wnioski samorządów rozpatrywane są dopiero po zabezpieczeniu środków na realizację istniejących umów. Fundusz nie może jednostronnie cofnąć finansowania bez zachowania 12-miesięcznego okresu wypowiedzenia umowy.`
      },
      {
        number: "Art. 15.",
        title: "Warunki utrzymania dofinansowania",
        content: `Samorząd zobowiązany jest do: 1) utrzymania liczby sfinansowanych etatów przez cały okres umowy; 2) składania półrocznych sprawozdań o wskaźniku kadrowym i liczbie dzieci; 3) zapewnienia dostępności lokalu przez cały okres umowy. Naruszenie warunków umowy skutkuje wstrzymaniem wypłat i uruchomieniem postępowania wyjaśniającego.`
      }
    ]
  },
  {
    roman: "V",
    title: "Ochrona danych osobowych",
    articles: [
      {
        number: "Art. 16.",
        title: "Pełna anonimowość pacjentek",
        content: `Fundusz nie gromadzi, nie przetwarza ani nie żąda jakichkolwiek danych osobowych pacjentek. Placówka medyczna jest administratorem danych w zakresie niezbędnym do wykonania umowy z pacjentką — danych tych nie udostępnia Funduszowi. Naruszenie obowiązku anonimizacji przez placówkę podlega karze administracyjnej wymierzanej przez Prezesa Urzędu Ochrony Danych Osobowych.`
      }
    ]
  },
  {
    roman: "VI",
    title: "Przepisy końcowe",
    articles: [
      {
        number: "Art. 17.",
        title: "Warunek stosowania przepisów o opłacie",
        content: `Przepisy dotyczące opłaty solidarnościowej (AboTax) stosuje się wyłącznie po wejściu w życie odrębnych przepisów ustawowych dopuszczających przerwanie ciąży na żądanie kobiety do ukończenia 12. tygodnia ciąży. Do czasu spełnienia tego warunku Fundusz może przyjmować wyłącznie dobrowolne darowizny i prowadzić działalność organizacyjno-przygotowawczą.`
      },
      {
        number: "Art. 18.",
        title: "Wejście w życie",
        content: `Ustawa wchodzi w życie po upływie 3 miesięcy od dnia ogłoszenia, z wyjątkiem art. 7-10, które wchodzą w życie wraz ze spełnieniem warunku określonego w art. 17.`
      }
    ]
  }
];

export default function ProjektUstawyDruk() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Georgia, 'Times New Roman', serif; background: #f5f3ef; color: #1a2740; }

        .screen-toolbar {
          position: fixed; top: 0; left: 0; right: 0;
          background: #1a365d; color: white;
          padding: 12px 24px; display: flex; align-items: center; justify-content: space-between;
          z-index: 100; box-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .toolbar-left { display: flex; align-items: center; gap: 10px; font-size: 14px; font-family: -apple-system, sans-serif; }
        .toolbar-logo { width: 32px; height: 32px; object-fit: contain; }
        .btn-print { background: #c9a227; color: #1a2740; border: none; padding: 8px 20px; border-radius: 6px; font-weight: 700; font-size: 13px; font-family: -apple-system, sans-serif; cursor: pointer; }
        .btn-print:hover { background: #b8911f; }
        .btn-close { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); padding: 8px 16px; border-radius: 6px; font-size: 13px; font-family: -apple-system, sans-serif; cursor: pointer; margin-left: 8px; }
        .btn-close:hover { background: rgba(255,255,255,0.1); }

        .document { max-width: 760px; margin: 72px auto 60px; background: white; box-shadow: 0 4px 40px rgba(0,0,0,0.12); }

        .doc-header { background: #1a365d; padding: 40px 52px 36px; display: flex; align-items: center; gap: 28px; }
        .header-logo-wrap { width: 80px; flex-shrink: 0; }
        .header-logo-wrap img { width: 100%; height: auto; object-fit: contain; }
        .header-initiative { font-family: -apple-system, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #c9a227; margin-bottom: 6px; }
        .header-title { font-family: Georgia, serif; font-size: 22px; font-weight: 700; color: white; line-height: 1.3; margin-bottom: 4px; }
        .header-subtitle { font-family: -apple-system, sans-serif; font-size: 13px; color: rgba(255,255,255,0.65); }

        .gold-bar { height: 4px; background: linear-gradient(90deg, #c9a227, #e6bc40, #c9a227); }

        .doc-meta { padding: 18px 52px; background: #f8f6f2; border-bottom: 1px solid #e8e3d8; display: flex; gap: 32px; font-family: -apple-system, sans-serif; font-size: 12px; color: #6b7280; }
        .doc-meta span strong { color: #1a365d; font-weight: 600; }

        .doc-body { padding: 40px 52px; }

        .preamble { background: #f8f6f2; border-left: 4px solid #c9a227; border-radius: 0 8px 8px 0; padding: 24px 28px; margin-bottom: 40px; }
        .preamble-label { font-family: -apple-system, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #c9a227; margin-bottom: 10px; }
        .preamble p { font-size: 14px; line-height: 1.8; color: #374151; font-style: italic; }

        .chapter { margin-bottom: 36px; }
        .chapter-header { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; padding-bottom: 10px; border-bottom: 2px solid #1a365d; }
        .chapter-roman { width: 36px; height: 36px; background: #1a365d; color: white; display: flex; align-items: center; justify-content: center; font-family: Georgia, serif; font-size: 13px; font-weight: 700; border-radius: 4px; flex-shrink: 0; }
        .chapter-label { font-family: -apple-system, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #9ca3af; margin-bottom: 2px; }
        .chapter-name { font-family: Georgia, serif; font-size: 17px; font-weight: 700; color: #1a365d; }

        .article { margin-bottom: 16px; display: flex; gap: 16px; align-items: flex-start; }
        .article-number { flex-shrink: 0; min-width: 52px; font-family: -apple-system, sans-serif; font-size: 11px; font-weight: 700; color: #1a365d; background: #eef2f8; border-radius: 4px; padding: 3px 6px; text-align: center; margin-top: 2px; }
        .article-title { font-family: -apple-system, sans-serif; font-size: 12px; font-weight: 700; color: #1a365d; margin-bottom: 5px; }
        .article-content { font-size: 13.5px; line-height: 1.75; color: #374151; text-align: justify; }

        .important-note { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px 24px; margin-top: 32px; }
        .important-note h4 { font-family: -apple-system, sans-serif; font-size: 13px; font-weight: 700; color: #1e40af; margin-bottom: 6px; }
        .important-note p { font-size: 13px; line-height: 1.65; color: #1e3a8a; }

        .doc-footer { background: #1a365d; padding: 24px 52px; display: flex; align-items: center; justify-content: space-between; }
        .footer-left { display: flex; align-items: center; gap: 16px; }
        .footer-logo { width: 64px; height: auto; object-fit: contain; }
        .footer-brand { font-family: Georgia, serif; font-size: 15px; font-weight: 700; color: white; }
        .footer-brand span { color: #c9a227; }
        .footer-right { font-family: -apple-system, sans-serif; font-size: 11px; color: rgba(255,255,255,0.55); text-align: right; line-height: 1.5; }

        @media print {
          .screen-toolbar { display: none !important; }
          body { background: white; }
          .document { max-width: 100%; margin: 0; box-shadow: none; }
          .doc-header { padding: 28px 40px; }
          .doc-meta { padding: 14px 40px; }
          .doc-body { padding: 28px 40px; }
          .doc-footer { padding: 16px 40px; }
          .chapter { page-break-inside: avoid; }
          .article { page-break-inside: avoid; }
          @page { margin: 0; size: A4; }
        }

        @media (max-width: 800px) {
          .doc-header { padding: 24px; flex-direction: column; text-align: center; }
          .doc-meta { padding: 14px 24px; flex-direction: column; gap: 6px; }
          .doc-body { padding: 24px; }
          .doc-footer { padding: 16px 24px; flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <div className="screen-toolbar">
        <div className="toolbar-left">
          <img src="/LOGO_abotax_noBG.png" alt="AboTax" className="toolbar-logo" />
          <span>Projekt ustawy o Funduszu Rekompensaty Spo&#322;ecznej</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn-print" onClick={() => window.print()}>
            &#x2193; Zapisz jako PDF / Drukuj
          </button>
          <button className="btn-close" onClick={() => window.close()}>
            Zamknij
          </button>
        </div>
      </div>

      <div className="document">

        <div className="doc-header">
          <img src="/LOGO_abotax_noBG.png" alt="AboTax" style={{ width: "80px", height: "auto", flexShrink: 0 }} />
          <div>
            <div className="header-initiative">Inicjatywa obywatelska &middot; Projekt ustawy</div>
            <div className="header-title">Ustawa o Funduszu Rekompensaty Spo&#322;ecznej</div>
            <div className="header-subtitle">&#x201E;&#379;ycie za &#380;ycie &mdash; rekompensata, nie kara&#x201D; &middot; abotax.pl</div>
          </div>
        </div>

        <div className="gold-bar" />

        <div className="doc-meta">
          <span><strong>Artyku&#322;y:</strong> 18</span>
          <span><strong>Rozdzia&#322;y:</strong> VI</span>
          <span><strong>Status:</strong> Projekt obywatelski (wersja robocza)</span>
          <span><strong>Inicjator:</strong> Fundacja Destruktura</span>
        </div>

        <div className="doc-body">

          <div className="preamble">
            <div className="preamble-label">Preambu&#322;a</div>
            <p>
              W poczuciu odpowiedzialno&#347;ci za los dzieci pozbawionych opieki rodzicielskiej
              oraz w celu &#322;agodzenia konfliktu spo&#322;ecznego wok&oacute;&#322; przerywania ci&#261;&#380;y
              ustanawia si&#281; mechanizm solidarno&#347;ciowy. Umo&#380;liwia on legalne przerwanie ci&#261;&#380;y
              na &#380;&#261;danie kobiety w okre&#347;lonych granicach, przy czym wprowadza ekonomiczn&#261;
              rekompensatę na rzecz spo&#322;ecze&#324;stwa &mdash; przeznaczon&#261; w ca&#322;o&#347;ci na etaty opiekun&oacute;w
              w domach dziecka. Mechanizm ten zapewnia pe&#322;n&#261; anonimowo&#347;&#263; pacjentek oraz
              przejrzysto&#347;&#263; wydatkowania &#347;rodk&oacute;w poprzez Publiczny Rejestr Etat&oacute;w.
            </p>
          </div>

          {chapters.map((chapter) => (
            <div className="chapter" key={chapter.roman}>
              <div className="chapter-header">
                <div className="chapter-roman">{chapter.roman}</div>
                <div>
                  <div className="chapter-label">Rozdzia&#322; {chapter.roman}</div>
                  <div className="chapter-name">{chapter.title}</div>
                </div>
              </div>
              {chapter.articles.map((article) => (
                <div className="article" key={article.number}>
                  <div className="article-number">{article.number}</div>
                  <div>
                    <div className="article-title">{article.title}</div>
                    <div className="article-content">{article.content}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="important-note">
            <h4>Warunek wej&#347;cia w &#380;ycie (Art. 17)</h4>
            <p>
              Przepisy o op&#322;acie solidarno&#347;ciowej stosuje si&#281; wy&#322;&#261;cznie po wej&#347;ciu w &#380;ycie
              odr&#281;bnych przepis&oacute;w dopuszczaj&#261;cych przerwanie ci&#261;&#380;y na &#380;&#261;danie do 12. tygodnia.
              Do tego czasu Fundusz mo&#380;e przyjmowa&#263; dobrowolne darowizny i prowadzi&#263; dzia&#322;alno&#347;&#263;
              organizacyjno-przygotowawcz&#261;.
            </p>
          </div>

        </div>

        <div className="doc-footer">
          <div className="footer-left">
            <img src="/LOGO_abotax_noBG.png" alt="" className="footer-logo" />
            <div className="footer-brand">Abo<span>Tax</span></div>
          </div>
          <div className="footer-right">
            abotax.pl &middot; petycja@abotax.pl<br />
            Fundacja Destruktura &middot; e-Dor&#281;czenia AE:PL-18803-44688-HHJBV-13
          </div>
        </div>

      </div>
    </>
  );
}
