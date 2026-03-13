// lang.js
function setLang(lang) {
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-ja]").forEach(el => {

    // ① テキスト切り替え（HTML対応）
el.innerHTML =
  lang === "ja" ? el.dataset.ja :
  lang === "en" ? el.dataset.en || el.dataset.ja :
  el.dataset.zh || el.dataset.ja;


    // ② aタグならリンク先も切り替え
    if (el.tagName === "A") {
      const key = "url" + lang;
      if (el.dataset[key]) {
        el.href = el.dataset[key];
      }
    }

  });
}

// ページ読み込み時に実行
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "ja";
  setLang(lang);
});

function updateCalendarText() {
  const lang = getCurrentLang();

  // ターム名
  document.getElementById("term1").textContent = calendarText[lang].terms[0];
  document.getElementById("term2").textContent = calendarText[lang].terms[1];
  document.getElementById("term3").textContent = calendarText[lang].terms[2];
}


// ===============================
// カレンダー用 多言語テキスト
// ===============================
const calendarText = {
  ja: {
    months: [
      "1月","2月","3月","4月","5月","6月",
      "7月","8月","9月","10月","11月","12月"
    ],
    weekdays: ["日","月","火","水","木","金","土"],
    terms: [
      "1ターム（1/8〜3/19）",
      "2ターム（4/9〜7/16）",
      "3ターム（9/3〜12/17）"
    ]
  },

  en: {
    months: [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ],
    weekdays: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    terms: [
      "Term 1 (Jan 8 – Mar 19)",
      "Term 2 (Apr 9 – Jul 16)",
      "Term 3 (Sep 3 – Dec 17)"
    ]
  },

  zh: {
    months: [
      "1月","2月","3月","4月","5月","6月",
      "7月","8月","9月","10月","11月","12月"
    ],
    weekdays: ["日","一","二","三","四","五","六"],
    terms: [
      "第1期（1月8日–3月19日）",
      "第2期（4月9日–7月16日）",
      "第3期（9月3日–12月17日）"
    ]
  }
};

// お問い合わせフォーム（言語別URL）
const contactFormLinks = {
  ja: "https://docs.google.com/forms/d/e/1FAIpQLScDxFXeTerUpsMJ8LOn1NtE_nb_sJBv48EjlSa2bQPo4sLjpg/viewform?usp=sharing&ouid=104705695837082457581",
  en: "https://docs.google.com/forms/d/e/1FAIpQLSfecnvmNYAzSysv06tJ8Bs_emlNQ2g7Jc2xZolf9ijw6HPCjg/viewform?usp=sharing&ouid=104705695837082457581",
  zh: "https://docs.google.com/forms/d/e/1FAIpQLScSLKwoUDaxIdNWXg8Ojv937o1a3EY88zA0Gi82SHZoPzOk1w/viewform?usp=sharing&ouid=104705695837082457581"
};

function openContactForm(lang) {
  const url = contactFormLinks[lang] || contactFormLinks.ja;
  window.open(url, "_blank");
}

// ===============================
// 言語ボタンのクリックイベント
// ===============================
function attachLangEvents() {
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      setLang(btn.dataset.lang);
    });
  });
}