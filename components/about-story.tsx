import Link from "next/link";
import styles from "./about-story.module.css";

const story = {
  en: {
    heading: "About Us",
    intro: "We’re Matei and Larisa Bumb, a married couple from Romania. Jesus is at the center of our lives. He loved us first, gave His life for us, and rose again. Because of Him, there is forgiveness, new life, and hope. We want people everywhere to hear that good news and come to know Jesus for themselves.",
    ministry: "For us, ministry begins at His feet. We want to stay close to Jesus, listen to Him, and depend on the Holy Spirit in the way we live and serve. Wherever He leads us, our heart is to preach the Gospel and make disciples.",
    discipleship: "The mission doesn’t end when the crowd goes home. We love serving alongside local churches and walking with people as they grow in faith, find a church family, and learn to share the Gospel in their own communities.",
    invitation: "The Great Commission is something we get to carry together. Whether you pray with us, serve alongside us, or ",
    link: "partner with us financially",
    thanks: ", we’re grateful to share in this mission with you.",
    signoff: "Until the whole world hears.",
  },
  ro: {
    heading: "Despre noi",
    intro: "Suntem Matei și Larisa Bumb, un cuplu din România. Isus este în centrul vieții noastre. El ne-a iubit mai întâi, Și-a dat viața pentru noi și a înviat. Prin El avem iertare, o viață nouă și speranță. Ne dorim ca oamenii de pretutindeni să audă vestea aceasta bună și să-L cunoască personal pe Isus.",
    ministry: "Pentru noi, slujirea începe la picioarele Lui. Vrem să rămânem aproape de Isus, să ascultăm de El și să ne lăsăm călăuziți de Duhul Sfânt în felul în care trăim și slujim. Oriunde ne conduce, dorința noastră este să vestim Evanghelia și să facem ucenici.",
    discipleship: "Misiunea nu se încheie când mulțimea pleacă acasă. Ne bucurăm să slujim alături de bisericile locale și să-i însoțim pe oameni în timp ce cresc în credință, își găsesc locul într-o biserică și învață să împărtășească Evanghelia în propriile comunități.",
    invitation: "Marea Trimitere este o lucrare pe care avem bucuria să o ducem la îndeplinire împreună. Fie că te rogi cu noi, slujești alături de noi sau ",
    link: "ne susții financiar",
    thanks: ", suntem recunoscători că putem lua parte la această misiune împreună cu tine.",
    signoff: "Până când întreaga lume va auzi.",
  },
};

export function AboutStory({ locale }: { locale: keyof typeof story }) {
  const copy = story[locale];
  return (
    <main className={styles.page} lang={locale} aria-labelledby="about-title">
      <h1 id="about-title">{copy.heading}</h1>
      <div className={styles.copy}>
        <p>{copy.intro}</p>
        <p>{copy.ministry}</p>
        <p>{copy.discipleship}</p>
        <p>{copy.invitation}<Link href={locale === "ro" ? "/ro/partner" : "/partner"}>{copy.link}</Link>{copy.thanks}</p>
        <p className={styles.signoff}><strong>{copy.signoff}</strong></p>
      </div>
    </main>
  );
}
