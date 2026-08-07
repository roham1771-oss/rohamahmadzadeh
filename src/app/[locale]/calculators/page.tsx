'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { useTranslation } from '@/i18n/hooks';

export default function CalculatorsPage() {
  const { t, locale } = useTranslation();
  const [activeCalc, setActiveCalc] = useState('courtFee');

  return (
    <div className="page-transition">
      <section className="bg-primary-900 dark:bg-primary-950 py-20">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: t('nav.calculators') }]} locale={locale} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">{t('calculators.title')}</h1>
          <p className="text-white/70 mt-4 max-w-2xl">{t('calculators.subtitle')}</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { key: 'courtFee', label: t('calculators.courtFee') },
              { key: 'delayDamages', label: t('calculators.delayDamages') },
              { key: 'attorneyFee', label: t('calculators.attorneyFee') },
              { key: 'dateConversion', label: t('calculators.dateConversion') },
            ].map((calc) => (
              <button
                key={calc.key}
                onClick={() => setActiveCalc(calc.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCalc === calc.key ? 'bg-primary-900 dark:bg-gold-500 text-white dark:text-primary-950' : 'bg-muted hover:bg-muted/80'}`}
              >
                {calc.label}
              </button>
            ))}
          </div>

          {activeCalc === 'courtFee' && <CourtFeeCalculator />}
          {activeCalc === 'delayDamages' && <DelayDamagesCalculator />}
          {activeCalc === 'attorneyFee' && <AttorneyFeeCalculator />}
          {activeCalc === 'dateConversion' && <DateConversionCalculator />}
        </div>
      </section>
    </div>
  );
}

function CourtFeeCalculator() {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const claimAmount = parseFloat(amount) || 0;
    const fee = Math.max(claimAmount * 0.035, 500000);
    setResult(fee);
  };

  return (
    <div className="card p-8 space-y-6">
      <h2 className="text-xl font-bold">محاسبه هزینه دادرسی</h2>
      <div>
        <label className="label">مبلغ خواسته (ریال)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field" placeholder="مثال: 500000000" />
      </div>
      <button onClick={calculate} className="btn-primary">محاسبه</button>
      {result !== null && (
        <div className="p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
          <p className="text-sm text-muted-foreground">هزینه تقریبی دادرسی:</p>
          <p className="text-2xl font-bold gradient-text">{new Intl.NumberFormat('fa-IR').format(result)} ریال</p>
        </div>
      )}
    </div>
  );
}

function DelayDamagesCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('12');
  const [days, setDays] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 12;
    const d = parseInt(days) || 0;
    const damage = p * (r / 100) * (d / 365);
    setResult(damage);
  };

  return (
    <div className="card p-8 space-y-6">
      <h2 className="text-xl font-bold">محاسبه خسارت تاخیر</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label">اصل خواسته (ریال)</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="label">نرخ خسارت تاخیری (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="label">تعداد روز تاخیر</label>
          <input type="number" value={days} onChange={(e) => setDays(e.target.value)} className="input-field" />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary">محاسبه</button>
      {result !== null && (
        <div className="p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
          <p className="text-sm text-muted-foreground">خسارت تاخیر تقریبی:</p>
          <p className="text-2xl font-bold gradient-text">{new Intl.NumberFormat('fa-IR').format(Math.round(result))} ریال</p>
        </div>
      )}
    </div>
  );
}

function AttorneyFeeCalculator() {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const claimAmount = parseFloat(amount) || 0;
    const fee = Math.max(claimAmount * 0.05, 10000000);
    setResult(fee);
  };

  return (
    <div className="card p-8 space-y-6">
      <h2 className="text-xl font-bold">تخمین حق الوکاله</h2>
      <div>
        <label className="label">مبلغ خواسته (ریال)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field" placeholder="مثال: 500000000" />
      </div>
      <button onClick={calculate} className="btn-primary">محاسبه</button>
      {result !== null && (
        <div className="p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
          <p className="text-sm text-muted-foreground">حق الوکاله تقریبی (حداقل تعرفه):</p>
          <p className="text-2xl font-bold gradient-text">{new Intl.NumberFormat('fa-IR').format(result)} ریال</p>
          <p className="text-xs text-muted-foreground mt-2">* تعرفه بر اساس آیین‌نامه حق الوکاله تعیین می‌شود</p>
        </div>
      )}
    </div>
  );
}

function DateConversionCalculator() {
  const [gregorianDate, setGregorianDate] = useState('');
  const [shamsiDate, setShamsiDate] = useState('');

  const gregorianToShamsi = (gYear: number, gMonth: number, gDay: number): string => {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let gy = gYear - 1600;
    let gm = gMonth - 1;
    let gd = gDay - 1;
    let gDayNo = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400) + gd + g_d_m[gm];
    let jDayNo = gDayNo - 79;
    let jNp = Math.floor(jDayNo / 12053);
    jDayNo %= 12053;
    let jY = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461);
    jDayNo %= 1461;
    if (jDayNo >= 366) { jY += Math.floor((jDayNo - 1) / 365); jDayNo = (jDayNo - 1) % 365; }
    let jM, jD;
    if (jDayNo < 186) { jM = 1 + Math.floor(jDayNo / 31); jD = 1 + (jDayNo % 31); }
    else { jM = 7 + Math.floor((jDayNo - 186) / 30); jD = 1 + ((jDayNo - 186) % 30); }
    return `${jY}/${jM.toString().padStart(2, '0')}/${jD.toString().padStart(2, '0')}`;
  };

  const shamsiToGregorian = (sYear: number, sMonth: number, sDay: number): string => {
    let sY = sYear - 979;
    let sM = sMonth - 1;
    let sD = sDay - 1;
    let sDayNo = 365 * sY + Math.floor(sY / 33) * 8 + Math.floor((sY % 33 + 3) / 4) + sD + (sM < 6 ? sM * 31 : (sM - 6) * 30 + 186);
    let gDayNo = sDayNo + 79;
    let gY = 1600 + Math.floor(gDayNo / 365242); gDayNo %= 365242;
    if (gDayNo >= 365242) { gY += Math.floor(gDayNo / 365242); gDayNo %= 365242; }
    if (gDayNo >= 1461) { gY += Math.floor(gDayNo / 365); gDayNo %= 365; }
    if (gDayNo >= 366) { gDayNo -= 1; gY += Math.floor(gDayNo / 365); gDayNo %= 365; }
    let gD = gDayNo + 1;
    let gra = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let gM;
    for (gM = 0; gM < 12; gM++) {
      let cur = gra[gM];
      if (gM === 1 && ((gY % 4 === 0 && gY % 100 !== 0) || gY % 400 === 0)) cur += 1;
      if (gDayNo < cur) break;
      gD -= cur;
    }
    gM += 1;
    return `${gY}-${gM.toString().padStart(2, '0')}-${gD.toString().padStart(2, '0')}`;
  };

  const handleConvertToShamsi = () => {
    if (gregorianDate) {
      const [y, m, d] = gregorianDate.split('-').map(Number);
      setShamsiDate(gregorianToShamsi(y, m, d));
    }
  };

  const handleConvertToGregorian = () => {
    if (shamsiDate) {
      const [y, m, d] = shamsiDate.split('/').map(Number);
      setGregorianDate(shamsiToGregorian(y, m, d));
    }
  };

  return (
    <div className="card p-8 space-y-6">
      <h2 className="text-xl font-bold">تبدیل تقویم میلادی و شمسی</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="label">تاریخ میلادی</label>
          <input type="date" value={gregorianDate} onChange={(e) => setGregorianDate(e.target.value)} className="input-field" />
          <button onClick={handleConvertToShamsi} className="btn-primary w-full">تبدیل به شمسی</button>
          {shamsiDate && <div className="p-3 bg-primary-50 dark:bg-primary-900 rounded-lg text-center font-bold">{shamsiDate}</div>}
        </div>
        <div className="space-y-3">
          <label className="label">تاریخ شمسی (مثال: 1403/04/26)</label>
          <input type="text" value={shamsiDate} onChange={(e) => setShamsiDate(e.target.value)} className="input-field" placeholder="1403/04/26" />
          <button onClick={handleConvertToGregorian} className="btn-primary w-full">تبدیل به میلادی</button>
          {gregorianDate && <div className="p-3 bg-primary-50 dark:bg-primary-900 rounded-lg text-center font-bold" dir="ltr">{gregorianDate}</div>}
        </div>
      </div>
    </div>
  );
}
