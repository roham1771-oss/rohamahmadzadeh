import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ─── Admin User ───────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("Admin@123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@vakilahmadzadeh.ir" },
    update: {},
    create: {
      email: "admin@vakilahmadzadeh.ir",
      password: hashedPassword,
      name: "مدیر سیستم",
      role: "ADMIN",
      phone: "+989120000000",
      isActive: true,
    },
  });
  console.log("Admin user created:", admin.email);

  // ─── Practice Area Services ───────────────────────────────────────────
  const services = [
    {
      titleEn: "Family Law",
      titleFa: "خانواده",
      slug: "family-law",
      descriptionEn:
        "Comprehensive legal services for family matters including divorce, custody, alimony, and marriage contracts.",
      descriptionFa:
        "خدمات حقوقی جامع در امور خانواده شامل طلاق، حضانت فرزند، نفقه و عقود ازدواج.",
      icon: "family",
      category: "family",
      features: "Divorce,Custody,Alimony,Marriage Contract,Inheritance",
      isActive: true,
      sortOrder: 1,
    },
    {
      titleEn: "Criminal Defense",
      titleFa: "کیفری",
      slug: "criminal-defense",
      descriptionEn:
        "Expert criminal defense representation for all types of criminal charges and proceedings.",
      descriptionFa:
        "نمایندگی تخصصی دفاع کیفری برای انواع اتهامات و رسیدگی‌های کیفری.",
      icon: "gavel",
      category: "criminal",
      features: "Defense,Appeal,Bail,Investigation,Litigation",
      isActive: true,
      sortOrder: 2,
    },
    {
      titleEn: "Civil Litigation",
      titleFa: "civil-litigation",
      slug: "civil-litigation",
      descriptionEn:
        "Professional civil litigation services for disputes, contracts, and personal injury claims.",
      descriptionFa:
        "خدمات حرفه‌ای دعاوی حقوقی برای اختلافات، قراردادها و دعاوی ضرر و زیان.",
      icon: "scale",
      category: "civil",
      features: "Contracts,Disputes,Personal Injury,Property,Debt Recovery",
      isActive: true,
      sortOrder: 3,
    },
    {
      titleEn: "Commercial Law",
      titleFa: "تجاری",
      slug: "commercial-law",
      descriptionEn:
        "Legal advisory and representation for business formation, contracts, and commercial disputes.",
      descriptionFa:
        "مشاوره و وکالت حقوقی در زمینه تأسیس شرکت، قراردادها و اختلافات تجاری.",
      icon: "briefcase",
      category: "commercial",
      features: "Business Formation,Contracts,Trademark,Bankruptcy,Arbitration",
      isActive: true,
      sortOrder: 4,
    },
    {
      titleEn: "Real Estate Law",
      titleFa: "املاک",
      slug: "real-estate-law",
      descriptionEn:
        "Expert legal services for real estate transactions, disputes, and property management.",
      descriptionFa:
        "خدمات حقوقی تخصصی در معاملات ملکی، اختلافات و مدیریت املاک.",
      icon: "building",
      category: "real-estate",
      features: "Purchase/Sale,Lease,Dispute,Registration,Construction",
      isActive: true,
      sortOrder: 5,
    },
    {
      titleEn: "Immigration Law",
      titleFa: "مهاجرت",
      slug: "immigration-law",
      descriptionEn:
        "Assistance with visa applications, residency permits, and immigration-related legal matters.",
      descriptionFa:
        "کمک در درخواست ویزا، مجوز اقامت و امور حقوقی مرتبط با مهاجرت.",
      icon: "globe",
      category: "immigration",
      features: "Visa,Residency,Citizenship,Work Permit,Study Permit",
      isActive: true,
      sortOrder: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }
  console.log(`${services.length} services created`);

  // ─── FAQ Items ────────────────────────────────────────────────────────
  const faqs = [
    {
      questionEn: "How do I schedule a consultation?",
      questionFa: "چگونه وقت مشاوره رزرو کنم؟",
      answerEn:
        "You can schedule a consultation by calling our office at 09357770066, filling out the contact form on our website, or sending us an email at vakilahmadzadeh@gmail.com. Our team will respond within 24 hours.",
      answerFa:
        "می‌توانید با تماس با دفتر ما به شماره ۰۹۳۵۷۷۷۰۰۶۶، پر کردن فرم تماس در وب‌سایت ما، یا ارسال ایمیل به vakilahmadzadeh@gmail.com وقت مشاوره رزرو کنید. تیم ما ظرف ۲۴ ساعت پاسخ خواهد داد.",
      category: "consultation",
      sortOrder: 1,
      isActive: true,
    },
    {
      questionEn: "What are your consultation fees?",
      questionFa: "هزینه مشاوره شما چقدر است؟",
      answerEn:
        "Initial consultations are available at a reduced rate. Please contact us for current pricing. We offer flexible payment plans for ongoing cases.",
      answerFa:
        "مشاوره‌های اولیه با نرخ کاهش یافته در دسترس هستند. لطفاً برای قیمت‌های فعلی با ما تماس بگیرید. ما برنامه‌های پرداخت انعطاف‌پذیر برای پرونده‌های جاری ارائه می‌دهیم.",
      category: "fees",
      sortOrder: 2,
      isActive: true,
    },
    {
      questionEn: "How long does a typical case take?",
      questionFa: "یک پرونده معمولاً چقدر طول می‌کشد؟",
      answerEn:
        "The duration varies depending on the type and complexity of the case. Simple matters may be resolved in weeks, while complex litigation can take months or years. We provide realistic timelines during your consultation.",
      answerFa:
        "مدت زم�� بستگی به نوع و پیچیدگی پرونده دارد. مسائل ساده ممکن است در عرض چند هفته حل شوند، در حالی که دعاوی پیچیده ممکن است ماه‌ها یا سال‌ها طول بکشد. ما جدول زمانی واقع‌بینانه را در مشاوره شما ارائه می‌دهیم.",
      category: "process",
      sortOrder: 3,
      isActive: true,
    },
    {
      questionEn: "Do you handle cases in English?",
      questionFa: "آیا پرونده‌ها به زبان انگلیسی هم رسیدگی می‌کنید؟",
      answerEn:
        "Yes, we provide bilingual legal services in both Farsi and English. Our team includes attorneys fluent in both languages.",
      answerFa:
        "بله، ما خدمات حقوقی دوزبانه به فارسی و انگلیسی ارائه می‌دهیم. تیم ما شامل وکلایی است که به هر دو زبان مسلط هستند.",
      category: "services",
      sortOrder: 4,
      isActive: true,
    },
    {
      questionEn: "What documents should I bring to my first meeting?",
      questionFa: "چه مدارکی باید به اولین جلسه بیاورم؟",
      answerEn:
        "Please bring any relevant documents related to your case, including contracts, correspondence, identification documents, and any court papers you may have received.",
      answerFa:
        "لطفاً هر مدارک مرتبط مربوط به پرونده خود را بیاورید، از جمله قراردادها، مکاتبات، مدارک هویتی و هر اسناد دادگاهی که ممکن است دریافت کرده باشید.",
      category: "process",
      sortOrder: 5,
      isActive: true,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }
  console.log(`${faqs.length} FAQ items created`);

  // ─── Articles ─────────────────────────────────────────────────────────
  const articles = [
    {
      titleEn: "Understanding Divorce Law in Iran",
      titleFa: "آشنایی با قانون طلاق در ایران",
      slug: "understanding-divorce-law-iran",
      contentEn:
        "Divorce in Iran is governed by the Islamic Civil Code. This article provides an overview of the legal framework, including types of divorce, rights of spouses, and the procedural requirements. Understanding these fundamentals is essential for anyone navigating the divorce process in Iran. The law distinguishes between different forms of divorce and provides specific rights and obligations for each party involved.",
      contentFa:
        "طلاق در ایران توسط قانون مدنی اسلامی اداره می‌شود. این مقاله مروری بر چارچوب حقوقی ارائه می‌دهد، از جمله انواع طلاق، حقوق زوجین و الزامات رویه‌ای. درک این مبانی برای هر کسی که در فرآیند طلاق در ایران قدم می‌گذارد ضروری است. قانون بین اشکال مختلف طلاق تمایز قائل می‌شود و حقوق و تعهدات خاصی برای هر یک از طرفین در نظر می‌گیرد.",
      excerptEn:
        "A comprehensive guide to understanding divorce laws and procedures in Iran.",
      excerptFa:
        "راهنمای جامع برای درک قوانین و رویه‌های طلاق در ایران.",
      category: "family-law",
      tags: "divorce,family law,iran,legal guide",
      authorId: admin.id,
      status: "PUBLISHED",
      viewCount: 142,
      publishedAt: new Date("2025-01-15"),
    },
    {
      titleEn: "Your Rights in Criminal Defense Cases",
      titleFa: "حقوق شما در پرونده‌های دفاع کیفری",
      slug: "rights-criminal-defense-cases",
      contentEn:
        "Being accused of a crime can be overwhelming. This article explains your fundamental rights during criminal proceedings in Iran, including the right to legal representation, the presumption of innocence, and protection against self-incrimination. Knowing your rights is the first step in building a strong defense.",
      contentFa:
        "متهم شدن به جرم می‌تواند طاقت‌فرسا باشد. این مقاله حقوق اساسی شما در طول رسیدگی‌های کیفری در ایران را توضیح می‌دهد، از جمله حق نمایندگی حقوقی، فرض برائت و محافظت در برابر خودافشایی. دانستن حقوق شما اولین قدم در ساختن یک دفاع قوی است.",
      excerptEn:
        "Know your rights when facing criminal charges in Iran.",
      excerptFa:
        "حقوق خود را در مواجهه با اتهامات کیفری در ایران بشناسید.",
      category: "criminal-law",
      tags: "criminal law,defense rights,legal rights",
      authorId: admin.id,
      status: "PUBLISHED",
      viewCount: 98,
      publishedAt: new Date("2025-02-20"),
    },
    {
      titleEn: "Commercial Contract Essentials for Businesses",
      titleFa: "اصول قراردادهای تجاری برای کسب‌وکارها",
      slug: "commercial-contract-essentials",
      contentEn:
        "Well-drafted commercial contracts are the foundation of successful business relationships. This article covers the essential elements that every commercial contract should include, common pitfalls to avoid, and the importance of professional legal review before signing. Protect your business interests with proper contractual arrangements.",
      contentFa:
        "قراردادهای تجاری خوب تنظیم شده پایه روابط تجاری موفق هستند. این مقاله عناصر ضروری که هر قرارداد تجاری باید شامل شود، دام‌های رایج برای اجتناب و اهمیت بررسی حقوقی حرفه‌ای قبل از امضا را پوشش می‌دهد. منافع تجاری خود را با ترتیبات قراردادی مناسب محافظت کنید.",
      excerptEn:
        "Key elements every business contract should include.",
      excerptFa:
        "عناصر کلیدی که هر قرارداد تجاری باید شامل شود.",
      category: "commercial-law",
      tags: "contracts,business law,commercial",
      authorId: admin.id,
      status: "PUBLISHED",
      viewCount: 76,
      publishedAt: new Date("2025-03-10"),
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }
  console.log(`${articles.length} articles created`);

  // ─── System Settings ──────────────────────────────────────────────────
  const settings = [
    {
      key: "site_name",
      value: "وکیل احمدزاده",
      category: "general",
      description: "Website name in Persian",
    },
    {
      key: "site_name_en",
      value: "Vakil Ahmadzadeh",
      category: "general",
      description: "Website name in English",
    },
    {
      key: "site_description",
      value: "دفتر حقوقی وکیل احمدزاده - خدمات حقوقی تخصصی",
      category: "general",
      description: "Website description in Persian",
    },
    {
      key: "contact_email",
      value: "vakilahmadzadeh@gmail.com",
      category: "contact",
      description: "Primary contact email",
    },
    {
      key: "contact_phone",
      value: "09357770066",
      category: "contact",
      description: "Primary contact phone (office)",
    },
    {
      key: "office_address",
      value: "کرج، میدان معلم، ابتدای خیابان درختی، پلاک ۳۶۵، ساختمان ۱۱۷، واحد ۴",
      category: "contact",
      description: "Office address in Persian",
    },
    {
      key: "office_hours",
      value: "شنبه تا پنجشنبه ۹ صبح تا ۵ بعدازظهر",
      category: "general",
      description: "Office working hours",
    },
    {
      key: "footer_text",
      value: "© ۱۴۰۵ دفتر حقوقی وکیل احمدزاده. تمامی حقوق محفوظ است.",
      category: "general",
      description: "Footer copyright text",
    },
    {
      key: "social_instagram",
      value: "https://instagram.com/vakilahmadzadeh",
      category: "social",
      description: "Instagram profile URL",
    },
    {
      key: "social_whatsapp",
      value: "https://wa.me/989357770066",
      category: "social",
      description: "WhatsApp direct link",
    },
    {
      key: "social_eitaa",
      value: "https://eitaa.com/vakilahmadzadeh",
      category: "social",
      description: "Eitaa channel URL",
    },
    {
      key: "social_baleh",
      value: "https://ble.ir/vakli\u200Cahmadzadeh",
      category: "social",
      description: "Baleh channel URL",
    },
    {
      key: "social_telegram",
      value: "https://t.me/vakilahmadzadeh",
      category: "social",
      description: "Telegram channel URL",
    },
    {
      key: "consultation_fee",
      value: "500000",
      category: "pricing",
      description: "Initial consultation fee in IRR",
    },
    {
      key: "tax_rate",
      value: "0.09",
      category: "pricing",
      description: "Tax rate for invoices (9%)",
    },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log(`${settings.length} settings created`);

  // ─── Legal Resources ──────────────────────────────────────────────────
  const legalResources = [
    {
      titleEn: "Iranian Civil Code Overview",
      titleFa: "مروری بر قانون مدنی ایران",
      slug: "iranian-civil-code-overview",
      contentEn:
        "The Iranian Civil Code is the primary body of law governing civil matters in Iran. It covers contracts, obligations, property, family law, and inheritance. This resource provides a comprehensive overview of the code's structure and key provisions.",
      contentFa:
        "قانون مدنی ایران مجموعه اصلی قوانین حاکم بر امور مدنی در ایران است. این قانون شامل قراردادها، تعهدات، اموال، خانواده و ارث است. این منبع مروری جامع بر ساختار قانون و مفاد کلیدی ارائه می‌دهد.",
      category: "civil-law",
      subCategory: "general",
      lawReference: "قانون مدنی",
      articleNumber: "۱ تا ۱۳۴۹",
      isActive: true,
    },
    {
      titleEn: "Family Law Protections",
      titleFa: "حمایت‌های حقوق خانواده",
      slug: "family-law-protections",
      contentEn:
        "This resource covers the legal protections available under Iranian family law, including rights related to marriage, divorce, child custody, and alimony provisions.",
      contentFa:
        "این منبع حمایت‌های حقوقی موجود تحت قانون خانواده ایران را پوشش می‌دهد، از جمله حقوق مرتبط با ازدواج، طلاق، حضانت فرزند و مقررات نفقه.",
      category: "family-law",
      subCategory: "protections",
      lawReference: "قانون حمایت خانواده",
      articleNumber: "۱ تا ۶۸",
      isActive: true,
    },
    {
      titleEn: "Criminal Procedure Code",
      titleFa: "قانون آیین دادرسی کیفری",
      slug: "criminal-procedure-code",
      contentEn:
        "An overview of the Iranian Criminal Procedure Code, covering investigation procedures, trial process, and defendant rights.",
      contentFa:
        "مروری بر قانون آیین دادرسی کیفری ایران، شامل رویه‌های تحقیق، فرآیند محاکمه و حقوق متهم.",
      category: "criminal-law",
      subCategory: "procedure",
      lawReference: "قانون آیین دادرسی کیفری",
      articleNumber: "۱ تا ۱۱۳۳",
      isActive: true,
    },
    {
      titleEn: "Commercial Law Fundamentals",
      titleFa: "مبانی قانون تجارت",
      slug: "commercial-law-fundamentals",
      contentEn:
        "Essential knowledge about Iranian commercial law, including business entities, commercial contracts, and trade regulations.",
      contentFa:
        "دانش ضروری در مورد قانون تجارت ایران، شامل شخصیت‌های تجاری، قراردادهای تجاری و مقررات تجاری.",
      category: "commercial-law",
      subCategory: "fundamentals",
      lawReference: "قانون تجارت",
      articleNumber: "۱ تا ۳۹۶",
      isActive: true,
    },
    {
      titleEn: "Real Estate Transaction Guide",
      titleFa: "راهنمای معاملات ملکی",
      slug: "real-estate-transaction-guide",
      contentEn:
        "A comprehensive guide to real estate transactions in Iran, covering property registration, purchase agreements, and rental laws.",
      contentFa:
        "راهنمای جامع معاملات ملکی در ایران، شامل ثبت ملک، قراردادهای خرید و قوانین اجاره.",
      category: "real-estate",
      subCategory: "transactions",
      lawReference: "قانون ثبت اسناد و املاک",
      articleNumber: "۱ تا ۱۲۱",
      isActive: true,
    },
    {
      titleEn: "Labor Law Protections",
      titleFa: "حمایت‌های قانون کار",
      slug: "labor-law-protections",
      contentEn:
        "Understanding employee rights and employer obligations under Iranian labor law, including wages, working hours, and termination.",
      contentFa:
        "درک حقوق کارمندان و تعهدات کارفرمایان تحت قانون کار ایران، شامل دستمزد، ساعات کار و فسخ قرارداد.",
      category: "labor-law",
      subCategory: "protections",
      lawReference: "قانون کار",
      articleNumber: "۱ تا ۱۶۶",
      isActive: true,
    },
    {
      titleEn: "Intellectual Property Rights",
      titleFa: "حقوق مالکیت فکری",
      slug: "intellectual-property-rights",
      contentEn:
        "An overview of intellectual property protection in Iran, including patents, trademarks, and copyrights.",
      contentFa:
        "مروری بر حمایت مالکیت فکری در ایران، شامل اختراعات، علائم تجاری و حق تکثیر.",
      category: "ip-law",
      subCategory: "general",
      lawReference: "قانون ثبت اختراعات",
      articleNumber: "۱ تا ۱۵۰",
      isActive: true,
    },
    {
      titleEn: "Environmental Law Regulations",
      titleFa: "مقررات زیست‌محیطی",
      slug: "environmental-law-regulations",
      contentEn:
        "Key environmental regulations and compliance requirements for businesses operating in Iran.",
      contentFa:
        "مقررات زیست‌محیطی کلیدی و الزامات انطباق برای کسب‌وکارهای فعال در ایران.",
      category: "environmental-law",
      subCategory: "regulations",
      lawReference: "قانون حفاظت محیط زیست",
      articleNumber: "۱ تا ۵۰",
      isActive: true,
    },
    {
      titleEn: "Tax Law Essentials",
      titleFa: "اصول قانون مالیات",
      slug: "tax-law-essentials",
      contentEn:
        "Understanding the Iranian tax system, including income tax, VAT, and corporate tax obligations.",
      contentFa:
        "درک سیستم مالیاتی ایران، شامل مالیات بر درآمد، مالیات بر ارزش افزوده و تعهدات مالیات شرکت‌ها.",
      category: "tax-law",
      subCategory: "essentials",
      lawReference: "قانون مالیات‌های مستقیم",
      articleNumber: "۱ تا ۳۱۶",
      isActive: true,
    },
    {
      titleEn: "International Arbitration Guide",
      titleFa: "راهنمای داوری بین‌المللی",
      slug: "international-arbitration-guide",
      contentEn:
        "A guide to international arbitration options available to Iranian businesses and individuals.",
      contentFa:
        "راهنمای گزینه‌های داوری بین‌المللی در دسترس کسب‌وکارها و افراد ایرانی.",
      category: "international-law",
      subCategory: "arbitration",
      lawReference: "قانون داوری تجاری بین‌المللی",
      articleNumber: "۱ تا ۳۶",
      isActive: true,
    },
  ];

  for (const resource of legalResources) {
    await prisma.legalResource.upsert({
      where: { slug: resource.slug },
      update: {},
      create: resource,
    });
  }
  console.log(`${legalResources.length} legal resources created`);

  // ─── Court Decisions ──────────────────────────────────────────────────
  const courtDecisions = [
    {
      titleEn: "Supreme Court Ruling on Family Custody Dispute",
      titleFa: "رای دیوان عالی کشور در دعوای حضانت خانوادگی",
      slug: "supreme-court-family-custody-ruling",
      contentEn:
        "The Supreme Court ruled in favor of shared custody arrangements when both parents demonstrate suitable living conditions and parenting capabilities. This landmark decision established new precedents for child welfare considerations in custody disputes.",
      contentFa:
        "دیوان عالی کشور به نفع ترتیبات حضانت مشترک رای داد، زمانی که هر دو والدین شرایط زندگی مناسب و توانایی والدینی را نشان می‌دهند. این تصمیم پیشگام معیارهای جدیدی برای ملاحظات رفاه کودک در اختلافات حضانت ایجاد کرد.",
      courtType: "Supreme Court",
      caseNumber: "۱۴۰۳/۱۲۳۴",
      decisionDate: new Date("2024-06-15"),
      topics: "custody,family law,child welfare",
      keywords: "custody,shared custody,child welfare,parental rights",
    },
    {
      titleEn: "Commercial Contract Enforcement Precedent",
      titleFa: "پیشینه اجرای قراردادهای تجاری",
      slug: "commercial-contract-enforcement-precedent",
      contentEn:
        "This court decision established important guidelines for enforcing commercial contracts, particularly regarding good faith obligations and penalty clauses in Iranian commercial law.",
      contentFa:
        "این تصمیم دادگاه دستورالعمل‌های مهمی برای اجرای قراردادهای تجاری، به ویژه در مورد تعهدات حسن نیت و شروط جریمه در قانون تجارت ایران ایجاد کرد.",
      courtType: "Commercial Court",
      caseNumber: "۱۴۰۳/۵۶۷۸",
      decisionDate: new Date("2024-08-22"),
      topics: "commercial law,contract enforcement",
      keywords: "contract,good faith,penalty,commercial",
    },
    {
      titleEn: "Criminal Appeal Acquittal Decision",
      titleFa: "رای برائت تجدیدنظر کیفری",
      slug: "criminal-appeal-acquittal",
      contentEn:
        "An appellate court overturned a lower court conviction due to insufficient evidence and procedural irregularities during the investigation phase. This decision reinforced the importance of due process.",
      contentFa:
        "دادگاه تجدیدنظر حکم دادگاه بدوی را به دلیل شواهد ناکافی و بی‌نظمی‌های رویه‌ای در مرحله تحقیق لغو کرد. این تصمیم اهمیت آیین دادرسی عادلانه را تقویت کرد.",
      courtType: "Appeal Court",
      caseNumber: "۱۴۰۳/۹۰۱۲",
      decisionDate: new Date("2024-11-10"),
      topics: "criminal law,appeal,due process",
      keywords: "acquittal,evidence,due process,appeal",
    },
    {
      titleEn: "Real Estate Ownership Dispute Resolution",
      titleFa: "حل اختلاف مالکیت ملکی",
      slug: "real-estate-ownership-dispute",
      contentEn:
        "The court ruled on a complex property dispute involving multiple claimants and established clear criteria for determining legitimate ownership rights based on historical records and documentation.",
      contentFa:
        "دادگاه در مورد یک اختلاف ملکی پیچیده شامل ادعاهای متعدد رای داد و معیارهای روشنی برای تعیین حقوق مالکیت مشروع بر اساس سوابق تاریخی و مستندات ایجاد کرد.",
      courtType: "Civil Court",
      caseNumber: "۱۴۰۳/۳۴۵۶",
      decisionDate: new Date("2024-09-05"),
      topics: "real estate,property ownership,dispute resolution",
      keywords: "property,ownership,documentation,title",
    },
    {
      titleEn: "Labor Rights Violation Decision",
      titleFa: "رای نقض حقوق کار",
      slug: "labor-rights-violation-decision",
      contentEn:
        "The court found in favor of an employee who was wrongfully terminated, establishing important precedent for worker protections and employer obligations regarding notice periods and severance pay.",
      contentFa:
        "دادگاه به نفع کارمندی که به طور نادرست اخراج شده بود رای داد و پیشینه مهمی برای حمایت از کارگران و تعهدات کارفرمایان در مورد دوره‌های اخطار و حق سنوات ایجاد کرد.",
      courtType: "Labor Court",
      caseNumber: "۱۴۰۳/۷۸۹۰",
      decisionDate: new Date("2024-12-01"),
      topics: "labor law,worker rights,termination",
      keywords: "labor,termination,severance,worker rights",
    },
  ];

  for (const decision of courtDecisions) {
    await prisma.courtDecision.upsert({
      where: { slug: decision.slug },
      update: {},
      create: decision,
    });
  }
  console.log(`${courtDecisions.length} court decisions created`);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
