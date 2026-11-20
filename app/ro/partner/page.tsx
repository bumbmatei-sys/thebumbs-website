import Link from "next/link";
import type { Metadata } from "next";
import { GivingMethods } from "@/components/giving-methods";

export const metadata: Metadata = {title:"Devino partener",description:"Fii partener în vestirea Evangheliei alături de Matei și Larisa Bumb.",alternates:{canonical:"/ro/partner",languages:{en:"/partner",ro:"/ro/partner"}}};

export default function Partner(){
  return <main className="partner-page" lang="ro">
    <section className="partner-hero">
      <span className="eyebrow">DEVINO PARTENER · MAREA TRIMITERE</span>
      <h1><span className="partner-headline-first">Nu căutăm donatori,</span><br/><em>ci parteneri.</em></h1>
      <p className="partner-hero-lead">Credem că Marea Trimitere nu a fost menită să fie împlinită de unul singur.</p>
      <p className="partner-hero-body">Căutăm oameni care împărtășesc dorința noastră de a-i ajunge pe cei pierduți, de a vesti Evanghelia și de a face ucenici printre națiuni. Nu doar să susțină o cauză, ci să stea alături de noi în credință, rugăciune și acțiune.</p>
    </section>
    <section className="partner-vision" aria-labelledby="partner-heart-title">
      <span className="eyebrow">INIMA DIN SPATELE MISIUNII</span>
      <h2 id="partner-heart-title">Mai mult decât un moment.</h2>
      <p>Ne dorim nu doar ca oamenii să-L întâlnească pe Isus, ci să vedem viețile lor transformate. De la vestirea Evangheliei la însoțirea noilor credincioși, vrem să-i vedem crescând în relația lor cu Dumnezeu și pregătiți să-i ajungă pe alții.</p>
      <p><strong>Pentru că misiunea nu se încheie atunci când mulțimea pleacă acasă.</strong></p>
    </section>
    <section className="partner-giving" id="giving" aria-labelledby="partner-giving-title">
      <span className="eyebrow">MODALITĂȚI DE SUSȚINERE</span>
      <h2 id="partner-giving-title">Fii partener în vestirea Evangheliei.</h2>
      <p className="partner-giving-lead">Fie că alegi să dăruiești o singură dată sau regulat, generozitatea ta ne ajută să continuăm lucrarea pe care Dumnezeu ne-a pus-o pe inimă.</p>
      <GivingMethods locale="ro"/>
    </section>
    <section className="partner-vision" aria-labelledby="partner-vision-title">
      <span className="eyebrow">TREI MODURI DE A FI PARTENER</span>
      <h2 id="partner-vision-title">Să ducem Evanghelia împreună.</h2>
      <div className="partner-ways">
        <article><span className="eyebrow">01 / RUGĂCIUNE</span><h3>Roagă-te împreună cu noi.</h3><p>Susține-ne în rugăciune pentru uși deschise, îndrăzneală și roade care să rămână oriunde ne conduce Dumnezeu.</p></article>
        <article><span className="eyebrow">02 / DĂRUIRE</span><h3>Ajută-ne să mergem.</h3><p>Generozitatea ta face posibile evanghelizările, călătoriile și ucenicizarea.</p></article>
        <article><span className="eyebrow">03 / VIZIUNE</span><h3>Împărtășește viziunea.</h3><p>Ajută-ne să ne conectăm cu oameni care au aceeași dorință de a duce Evanghelia mai departe.</p></article>
      </div>
    </section>
    <section className="partner-closing">
      <span className="eyebrow">ÎMPREUNĂ, PENTRU SLAVA LUI</span>
      <h2>Pentru că Isus este vrednic, iar oamenii au nevoie să-L cunoască.</h2>
      <Link href="/ro/contact" className="button">Contactează-ne <span aria-hidden="true">↗</span></Link>
    </section>
  </main>;
}
