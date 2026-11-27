import styles from "./journal-mission-notes.module.css";

const copy = {
  en: {
    eyebrow: "Mission notes",
    heading: "Where the call leads.",
    intro: "Every journey has a purpose: to share Jesus, serve people, and strengthen the work of the local church.",
    items: [
      { title: "Training & preparation", place: "Orlando, United States", text: "A season of ministry training with Christ for All Nations, preparing for evangelism and outreach." },
      { title: "Tanzania outreach", place: "Tanzania", text: "We’re looking ahead to evangelistic outreach, including gatherings for young people and local communities, alongside ministry partners." },
      { title: "Looking toward Asia", place: "Asia", text: "We’re praying, building relationships, and exploring ways to serve communities with limited access to the Gospel." },
    ],
  },
  ro: {
    eyebrow: "Din misiune",
    heading: "Unde ne poartă chemarea.",
    intro: "Fiecare călătorie are un scop: să-L vestim pe Isus, să le slujim oamenilor și să întărim lucrarea bisericii locale.",
    items: [
      { title: "Formare și pregătire", place: "Orlando, Statele Unite", text: "O perioadă de pregătire pentru slujire, evanghelizare și misiune la Christ for All Nations School of Ministry." },
      { title: "Evanghelizare în Tanzania", place: "Tanzania", text: "Privim înainte spre lucrări de evanghelizare alături de parteneri locali, inclusiv întâlniri pentru tineri și comunități." },
      { title: "Cu gândul la Asia", place: "Asia", text: "Ne rugăm, construim relații și căutăm moduri de a sluji în comunități unde puțini oameni au ocazia să audă Evanghelia." },
    ],
  },
};

export function JournalMissionNotes({ locale = "en" }: { locale?: keyof typeof copy }) {
  const notes = copy[locale];
  return (
    <section className={styles.section} aria-labelledby="mission-notes-title">
      <span className="eyebrow">{notes.eyebrow}</span>
      <h2 id="mission-notes-title">{notes.heading}</h2>
      <p className="lead">{notes.intro}</p>
      <div className={styles.grid}>
        {notes.items.map(({ title, place, text }) => (
          <article key={title}>
            <span className="eyebrow">{place}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
