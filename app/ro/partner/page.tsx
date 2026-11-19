import Link from "next/link";
import type { Metadata } from "next";
import { GivingMethods } from "@/components/giving-methods";

export const metadata: Metadata = {title:"Devino partener",description:"Fii partener în vestirea Evangheliei alături de Matei și Larisa Bumb.",alternates:{canonical:"/ro/partner",languages:{en:"/partner",ro:"/ro/partner"}}};

export default function Partner(){
  return <main className="partner-page" lang="ro">
    <section className="partner-hero">
      <span className="eyebrow">DEVINO PARTENER · MAREA TRIMITERE</span>
      <h1><span className="partner-headline-first">Nu căutăm donatori,</span><br/><em>ci parteneri.</em></h1>
      <p className="partner-hero-lead">Ne dorim oameni care împărtășesc aceeași viziune și vor să ducă mai departe aceeași misiune alături de noi.</p>
      <p className="partner-hero-body">Oameni care cred în vestirea Evangheliei, în câștigarea celor pierduți pentru Hristos și în facerea de ucenici printre națiuni. Nu este vorba doar despre a susține financiar o cauză, ci despre a sta împreună în credință, rugăciune și acțiune.</p>
    </section>
    <section className="partner-giving" id="giving" aria-labelledby="partner-giving-title">
      <span className="eyebrow">MODALITĂȚI DE SUSȚINERE</span>
      <h2 id="partner-giving-title">Fii partener în vestirea Evangheliei.</h2>
      <p className="partner-giving-lead">Alege modalitatea de susținere care ți se potrivește cel mai bine. Fiecare gest de susținere ne ajută să mergem mai departe.</p>
      <GivingMethods locale="ro"/>
    </section>
    <section className="partner-vision" aria-labelledby="partner-vision-title">
      <span className="eyebrow">O SINGURĂ VIZIUNE · O SINGURĂ MISIUNE</span>
      <h2 id="partner-vision-title">Cum poți deveni partener</h2>
      <p>Poți fi alături de noi prin rugăciune, susținere financiară și împărtășirea viziunii de a duce Evanghelia printre națiuni.</p>
      <div className="partner-ways">
        <article><span className="eyebrow">01 / RUGĂCIUNE</span><h3>Susține-ne în rugăciune.</h3><p>Roagă-te împreună cu noi pentru uși deschise, îndrăzneală și roade care să rămână în fiecare loc în care slujim.</p></article>
        <article><span className="eyebrow">02 / SUSȚINERE FINANCIARĂ</span><h3>Ajută-ne să mergem.</h3><p>Prin susținerea ta financiară, contribui la realizarea evanghelizărilor, acoperirea cheltuielilor de călătorie și continuarea lucrării de slujire.</p></article>
        <article><span className="eyebrow">03 / VIZIUNE</span><h3>Du mai departe viziunea alături de noi.</h3><p>Împărtășește această misiune și fii parte din ceea ce face Dumnezeu printre națiuni.</p></article>
      </div>
    </section>
    <section className="partner-closing">
      <span className="eyebrow">ÎMPREUNĂ</span>
      <h2>Să ducem Evanghelia mai departe, împreună.</h2>
      <p>Ai o întrebare sau dorești să discutăm personal despre parteneriat? Ne-ar face plăcere să auzim de la tine.</p>
      <Link href="/contact" className="button">Contactează-ne <span aria-hidden="true">↗</span></Link>
    </section>
  </main>;
}
