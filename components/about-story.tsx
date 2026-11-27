import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./about-story.module.css";

type Locale = "en" | "ro";
const portrait = "/images/scroll/01-matei-larisa-portrait.jpg";

const copy = {
  "en": {
    "eyebrow": "Matei & Larisa Bumb",
    "title": "We’re following Jesus",
    "accent": "together.",
    "intro": "Jesus Christ is the center of our lives and the reason we go. We’re Matei and Larisa Bumb, a married couple who want people to hear the Gospel, encounter Jesus, and learn to follow Him.",
    "photoAlt": "Matei and Larisa Bumb together",
    "faithLabel": "Why we go",
    "faithTitle": "It begins with Jesus.",
    "faith": [
      "Jesus loved us first. He gave His life for us and rose again. Because of Him, there is forgiveness, new life, and hope for every person. That’s the good news we want to share, wherever He leads us.",
      "We want to stay close to Jesus in prayer, listen to Him, and let His love shape the way we serve. The work begins at His feet. From there, we go to share the Gospel and walk with people as they grow in faith."
    ],
    "verse": "Luke 10:38–42 · 1 John 4:19",
    "journeyLabel": "Our journey",
    "journeyTitle": "The story is still being written.",
    "moments": [
      [
        "2018",
        "The beginning of a calling",
        "Matei came to faith in Jesus. Over time, his desire to share the Gospel grew into a calling to evangelism and discipleship."
      ],
      [
        "2025 · Orlando & Thailand",
        "Learning and going",
        "We began training at Christ for All Nations School of Ministry in Orlando. That same year, we went to Thailand to share the Gospel."
      ],
      [
        "2026 · Germany & United States",
        "Serving where He leads",
        "In Frankfurt we served in discipleship and small groups. We also served at Nations Church in the United States and with Teen Challenge in northern Germany."
      ],
      [
        "Looking ahead",
        "Wherever He leads next",
        "We’re looking ahead to Bootcamp training, evangelistic work in Tanzania, and future ministry in Asia. We want to take the next step with Jesus, wherever He leads."
      ]
    ],
    "invitationLabel": "The Great Commission",
    "invitationTitle": "We want people to know Jesus.",
    "invitation": "We preach the Gospel, make disciples, and come alongside local churches as people take their next steps in faith. If you’d like to pray with us, follow the journey, or get in touch, we’d love to hear from you.",
    "journal": "Read our Journal",
    "contact": "Get in touch",
    "discipleship": "Be discipled"
  },
  "ro": {
    "eyebrow": "Matei și Larisa Bumb",
    "title": "Îl urmăm pe Isus",
    "accent": "împreună.",
    "intro": "Isus Hristos este în centrul vieții noastre. El este motivul pentru care mergem. Suntem Matei și Larisa Bumb, soț și soție. Dorința noastră este ca oamenii să audă Evanghelia, să-L întâlnească pe Isus și să învețe să-L urmeze.",
    "photoAlt": "Matei și Larisa Bumb împreună",
    "faithLabel": "De ce mergem",
    "faithTitle": "Totul începe cu Isus.",
    "faith": [
      "Isus ne-a iubit mai întâi. Și-a dat viața pentru noi și a înviat. Prin El, fiecare om poate primi iertare, o viață nouă și speranță. Aceasta este vestea bună pe care vrem să o împărtășim oriunde ne conduce El.",
      "Vrem să rămânem aproape de Isus în rugăciune, să-L ascultăm și să lăsăm dragostea Lui să ne modeleze slujirea. Slujirea începe la picioarele Lui. De acolo pornim să vestim Evanghelia și să fim alături de oameni pe măsură ce cresc în credință."
    ],
    "verse": "Luca 10:38–42 · 1 Ioan 4:19",
    "journeyLabel": "Călătoria noastră",
    "journeyTitle": "Povestea continuă să fie scrisă.",
    "moments": [
      [
        "2018",
        "Începutul unei chemări",
        "Matei a venit la credința în Isus. În timp, dorința de a vesti Evanghelia a devenit o chemare la evanghelizare și ucenicizare."
      ],
      [
        "2025 · Orlando și Thailanda",
        "De la pregătire la misiune",
        "Am început pregătirea la Școala de Slujire Christ for All Nations din Orlando. În același an am mers în Thailanda să vestim Evanghelia."
      ],
      [
        "2026 · Germania și Statele Unite",
        "Slujim acolo unde ne conduce El",
        "La Frankfurt am slujit în ucenicizare și în grupuri mici. Am slujit și la Nations Church în Statele Unite și alături de Teen Challenge în nordul Germaniei."
      ],
      [
        "Privind înainte",
        "Oriunde ne va conduce",
        "Privim înainte la pregătirea din Bootcamp, la lucrarea de evanghelizare din Tanzania și la slujirea în Asia. Vrem să facem următorul pas cu Isus, oriunde ne va conduce."
      ]
    ],
    "invitationLabel": "Marea Trimitere",
    "invitationTitle": "Vrem ca oamenii să-L cunoască pe Isus.",
    "invitation": "Vestind Evanghelia și făcând ucenici, slujim alături de bisericile locale pentru a-i sprijini pe oameni în următorii pași ai credinței lor. Dacă vrei să te rogi împreună cu noi, să ne urmărești călătoria sau să ne scrii, ne-am bucura să auzim de tine.",
    "journal": "Citește jurnalul",
    "contact": "Scrie-ne",
    "discipleship": "Ucenicizare"
  }
} as const;

export function aboutMetadata(locale: Locale): Metadata {
  const ro = locale === "ro";
  const canonical = ro ? "/ro/about" : "/about";
  const title = ro ? "Despre noi" : "About Us";
  const description = ro
    ? "Povestea lui Matei și Larisa Bumb: Îl urmăm pe Isus, vestim Evanghelia și facem ucenici."
    : "The story of Matei and Larisa Bumb: following Jesus, sharing the Gospel, and making disciples.";
  return {
    title,
    description,
    alternates: { canonical, languages: { en: "/about", ro: "/ro/about" } },
    openGraph: { title, description, url: canonical, locale: ro ? "ro_RO" : "en_US", images: [{ url: portrait, alt: copy[locale].photoAlt }] },
  };
}

export function AboutStory({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const root = locale === "ro" ? "/ro" : "";

  return (
    <main className={styles.page} lang={locale}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title} <em>{t.accent}</em></h1>
          <p className={styles.lead}>{t.intro}</p>
        </div>
        <figure className={styles.portrait}>
          <Image src={portrait} alt={t.photoAlt} fill priority sizes="(max-width: 760px) 92vw, 40vw" />
        </figure>
      </header>
      <section className={styles.section} aria-labelledby="about-faith">
        <div>
          <p className="eyebrow">{t.faithLabel}</p>
          <h2 id="about-faith">{t.faithTitle}</h2>
        </div>
        <div className={styles.prose}>
          {t.faith.map((p) => <p key={p}>{p}</p>)}
          <p className={styles.scripture}>{t.verse}</p>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="about-journey">
        <div>
          <p className="eyebrow">{t.journeyLabel}</p>
          <h2 id="about-journey">{t.journeyTitle}</h2>
        </div>
        <ol className={styles.timeline}>
          {t.moments.map(([date, title, description]) => (
            <li key={date}>
              <p className={styles.date}>{date}</p>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.invitation} aria-labelledby="about-invitation">
        <p className="eyebrow">{t.invitationLabel}</p>
        <h2 id="about-invitation">{t.invitationTitle}</h2>
        <p className={styles.lead}>{t.invitation}</p>
        <div className="actions">
          <Link className="button" href={root + "/journal"}>{t.journal}</Link>
          <Link className="button secondary" href={root + "/contact"}>{t.contact}</Link>
          <a className="button secondary" href="https://calltoreset.site/">{t.discipleship}</a>
        </div>
      </section>
    </main>
  );
}
