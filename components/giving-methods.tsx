"use client";

import { useState } from "react";
import { Check, Copy, ArrowUpRight } from "lucide-react";

const accounts = {
  RON: "RO72BTRLRONCRT0355709001",
  EUR: "RO22BTRLEURCRT0355709001",
  USD: "RO26BTRLUSDCRT0355709001",
} as const;
type Currency = keyof typeof accounts;
const SWIFT = "BTRLRO22";
const methods = [
  { name:"PayPal", description:"Give through PayPal", href:"https://www.paypal.me/MateiGBumb", logo:"https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/paypal.svg", kind:"paypal" },
  { name:"Wise", description:"Give through Wise", href:"https://wise.com/pay/me/mateigabrielb", logo:"https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/wise.svg", kind:"wise" },
  { name:"Revolut", description:"Give through Revolut", href:"https://revolut.me/mateibumb", logo:"https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/revolut.svg", kind:"revolut" },
  { name:"Cash App", description:"Give through Cash App", href:"https://cash.app/$LarisaBumb", logo:"https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/cashapp.svg", kind:"cashapp" },
] as const;

export function GivingMethods({locale="en"}:{locale?:"en"|"ro"}) {
  const ro = locale === "ro";
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [copied, setCopied] = useState<string>("");
  async function copy(value:string, key:string) {
    try { await navigator.clipboard.writeText(value); setCopied(key); }
    catch { setCopied("error"); }
  }
  return <div className="giving-content">
    <div className="giving-method-grid">
      {methods.map(method=><a className="giving-method-card" href={method.href} target="_blank" rel="noopener noreferrer" key={method.name} aria-label={ro ? "Susține-ne prin "+method.name : method.description}>
        <div className={"giving-method-logo giving-logo-"+method.kind}><img src={method.logo} alt={method.name} width={44} height={44}/></div>
        <div><h3>{method.name}</h3><p>{ro ? "Susține-ne prin "+method.name : method.description}</p></div>
        <ArrowUpRight size={19} aria-hidden="true"/>
      </a>)}
    </div>
    <div className="giving-bank-card" id="bank-transfer">
      <div className="giving-bank-top"><div><span className="eyebrow">{ro ? "TRANSFER BANCAR" : "BANK TRANSFER"}</span><div className="giving-bank-brand"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Banca_Transilvania_Logo.svg" alt="" width={48} height={48}/><h3>Banca Transilvania</h3></div></div></div>
      <div className="giving-currency-switch" role="group" aria-label={ro ? "Alege moneda contului" : "Choose bank account currency"}>
        {(["EUR","RON","USD"] as const).map(c=><button key={c} type="button" className={currency===c?"active":""} aria-pressed={currency===c} onClick={()=>{setCurrency(c);setCopied("");}}>{c==="EUR"?"EUR €":c==="RON"?"RON lei":"USD $"}</button>)}
      </div>
      <div className="giving-bank-details">
        <div className="giving-detail"><span>{ro ? "Bancă" : "Bank"}</span><strong>Banca Transilvania</strong></div>
        <div className="giving-detail"><span>{currency} IBAN</span><div className="giving-copy-line"><strong>{accounts[currency]}</strong><button type="button" onClick={()=>copy(accounts[currency],"iban")} aria-label={(ro ? "Copiază " : "Copy ")+currency+" IBAN"}>{copied==="iban"?<Check size={17}/>:<Copy size={17}/>} {copied==="iban"?(ro?"Copiat":"Copied"):(ro?"Copiază":"Copy")}</button></div></div>
        <div className="giving-detail"><span>{ro ? "SWIFT / BIC (toate monedele)" : "SWIFT / BIC (all currencies)"}</span><div className="giving-copy-line"><strong>{SWIFT}</strong><button type="button" onClick={()=>copy(SWIFT,"swift")} aria-label={ro ? "Copiază codul SWIFT" : "Copy SWIFT code"}>{copied==="swift"?<Check size={17}/>:<Copy size={17}/>} {copied==="swift"?(ro?"Copiat":"Copied"):(ro?"Copiază":"Copy")}</button></div></div>
        <div className="giving-detail"><span>BT Pay</span><div className="giving-copy-line"><strong>+40 746 467 016</strong><button type="button" onClick={()=>copy("+40746467016","btpay")} aria-label={ro ? "Copiază numărul BT Pay" : "Copy BT Pay phone number"}>{copied==="btpay"?<Check size={17}/>:<Copy size={17}/>} {copied==="btpay"?(ro?"Copiat":"Copied"):(ro?"Copiază":"Copy")}</button></div></div>
      </div>
      {copied==="error"&&<p className="giving-copy-error" role="alert">{ro ? "Copierea a eșuat. Selectează și copiază manual datele." : "Copy failed. Please select and copy the details manually."}</p>}
      <p className="giving-bank-note">{ro ? "Verifică moneda și datele contului înainte de a efectua transferul." : "Please check the currency and account details before making a transfer."}</p>
    </div>
  </div>;
}
