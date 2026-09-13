// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Reusable Quiz Engine Component
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 10 September 2026, 10:25:00
// ================================================================

import { store } from '../store.js';
import { appState } from '../state.js';
import { t } from '../data/i18n.js';
import { TtsEngine } from '../engine/tts-engine.js';
import { AudioFx } from '../engine/audio-fx.js';

export class QuizRunner {
  constructor(container, quizData, onComplete) {
    this.container = container;
    this.quiz = quizData;
    this.onComplete = onComplete;
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;
    this.showHint = false;

    this.render();
  }

  render() {
    const lang = appState.get().lang || 'id';
    const q = this.quiz.questions[this.currentIndex];
    const isLast = this.currentIndex === this.quiz.questions.length - 1;
    const isEn = (lang === 'en');

    this.container.innerHTML = `
      <div class="quiz-box">
        <div class="quiz-header">
          <div>
            <span class="subject-badge">${this.quiz.title}</span>
            <div style="font-size:12px; color:var(--muted); margin-top:4px;">
              ${t('practiceQuestionPrefix', lang)} ${this.currentIndex + 1} ${t('of', lang)} ${this.quiz.questions.length}
            </div>
          </div>
          <div style="font-weight:800; color:var(--teal); font-size:13.5px;">
            ${t('scoreLabel', lang)} ${this.score}
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:12px; flex-wrap:wrap;">
          <div class="quiz-question" style="margin:0; flex:1;">${q.q}</div>
          <button class="btn-tts" id="btnTtsQuizQuestion" type="button" title="${isEn ? 'Read question aloud' : 'Dengarkan soal bersuara'}">
            🔊 ${isEn ? 'Listen' : 'Dengarkan'}
          </button>
        </div>

        <div class="quiz-options">
          ${q.options.map(opt => `
            <button class="quiz-opt-btn" data-answer="${opt}" type="button">
              <span>⚪</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>

        ${q.hint ? `
          <button class="btn" id="btnToggleHint" type="button" style="font-size:12px; padding:6px 12px; min-height:36px;">
            ${this.showHint ? t('hideHintBtn', lang) : t('showHintBtn', lang)}
          </button>
          <div class="hint-panel ${this.showHint ? 'show' : ''}" id="hintPanel">
            ${q.hint}
          </div>
        ` : ''}

        <div class="feedback-banner" id="feedbackBanner"></div>

        <div style="margin-top:20px; display:flex; justify-content:flex-end;">
          <button class="btn primary" id="btnNextQuestion" type="button" style="display:none;">
            ${isLast ? t('finishQuizBtn', lang) : t('nextQBtn', lang)}
          </button>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const q = this.quiz.questions[this.currentIndex];
    const optionBtns = this.container.querySelectorAll('.quiz-opt-btn');
    const feedbackBanner = this.container.querySelector('#feedbackBanner');
    const nextBtn = this.container.querySelector('#btnNextQuestion');
    const hintBtn = this.container.querySelector('#btnToggleHint');
    const hintPanel = this.container.querySelector('#hintPanel');
    const ttsBtn = this.container.querySelector('#btnTtsQuizQuestion');

    if (ttsBtn) {
      ttsBtn.addEventListener('click', () => {
        const lang = appState.get().lang || 'id';
        const fullQuestionText = `${q.q}. ${lang === 'en' ? 'Choices are' : 'Pilihan jawabannya'}: ${q.options.join(', ')}`;
        TtsEngine.speak(fullQuestionText, lang, ttsBtn);
      });
    }

    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        this.showHint = !this.showHint;
        hintPanel.classList.toggle('show', this.showHint);
        const curLang = appState.get().lang || 'id';
        hintBtn.textContent = this.showHint ? t('hideHintBtn', curLang) : t('showHintBtn', curLang);
      });
    }

    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.answered) return;

        const selected = btn.getAttribute('data-answer');
        const isCorrect = selected === q.answer;

        optionBtns.forEach(b => {
          b.disabled = true;
          if (b.getAttribute('data-answer') === q.answer) {
            b.classList.add('correct');
            b.querySelector('span').textContent = '✅';
          }
        });

        const currentLang = appState.get().lang || 'id';
        if (isCorrect) {
          this.score++;
          btn.classList.add('correct');
          feedbackBanner.className = 'feedback-banner success show';
          feedbackBanner.innerHTML = t('quizCorrectFeedback', currentLang);
          AudioFx.playSuccess();
          AudioFx.triggerConfetti(this.container);
        } else {
          btn.classList.add('wrong');
          btn.querySelector('span').textContent = '❌';
          feedbackBanner.className = 'feedback-banner warning show';
          feedbackBanner.innerHTML = `${t('quizWrongFeedback', currentLang)} <u>${q.answer}</u>. ${currentLang === 'en' ? 'Keep trying!' : 'Semangat terus!'}`;
          AudioFx.playGentleWrong();
        }

        this.answered = true;
        nextBtn.style.display = 'inline-flex';
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentIndex < this.quiz.questions.length - 1) {
          this.currentIndex++;
          this.answered = false;
          this.showHint = false;
          this.render();
        } else {
          // Kuis Selesai!
          AudioFx.playFanfare();
          AudioFx.triggerConfetti(this.container);
          store.recordQuizResult(this.quiz.id, this.score, this.quiz.questions.length);
          this.showCompletionScreen();
        }
      });
    }
  }

  showCompletionScreen() {
    const currentLang = appState.get().lang || 'id';
    const isPerfect = this.score === this.quiz.questions.length;
    this.container.innerHTML = `
      <div class="quiz-box" style="text-align:center; padding:36px 20px;">
        <div style="font-size:52px; margin-bottom:12px;">${isPerfect ? '🏆' : '🌟'}</div>
        <h3 style="font-size:22px; margin:0 0 8px;">${t('quizFinishedTitle', currentLang)}</h3>
        <p style="font-size:14px; color:var(--muted); margin:0 0 18px;">
          ${isPerfect ? t('quizFinishedPerfect', currentLang) : t('quizFinishedGood', currentLang)}
        </p>
        <div style="font-size:26px; font-weight:850; color:var(--teal); margin-bottom:20px;">
          ${t('scoreLabel', currentLang)} ${this.score} / ${this.quiz.questions.length}
        </div>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <button class="btn" id="btnRetryQuiz" type="button">${t('retryQuizBtn', currentLang)}</button>
          <button class="btn primary" id="btnFinishQuiz" type="button">${t('continueNextSubjectBtn', currentLang)}</button>
        </div>
      </div>
    `;

    const retryBtn = this.container.querySelector('#btnRetryQuiz');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.currentIndex = 0;
        this.score = 0;
        this.answered = false;
        this.showHint = false;
        this.render();
      });
    }

    const finishBtn = this.container.querySelector('#btnFinishQuiz');
    if (finishBtn && this.onComplete) {
      finishBtn.addEventListener('click', () => {
        this.onComplete();
      });
    }
  }
}

