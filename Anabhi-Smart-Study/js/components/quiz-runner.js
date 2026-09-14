// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Reusable Child-Friendly Question Engine
// Development · Anabhi Dev
// Version   : 2.0 (Interactive Multi-Type & Encouraging Feedback)
// Generated : 13 September 2026, 21:05:00
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
    this.attemptsThisQ = 0;
    this.answered = false;
    this.showHint = false;

    this.render();
  }

  render() {
    const lang = appState.get().lang || 'id';
    const isEn = (lang === 'en');
    const q = this.quiz.questions[this.currentIndex];
    const isLast = this.currentIndex === this.quiz.questions.length - 1;
    const qType = q.type || (q.options && q.options.length === 2 && (q.options.includes('Benar') || q.options.includes('True')) ? 'true-false' : 'multiple-choice');

    this.container.innerHTML = `
      <div class="quiz-box" style="border-radius:18px; box-shadow:var(--shadow-soft);">
        <div class="quiz-header">
          <div>
            <span class="subject-badge" style="font-size:11.5px; font-weight:800;">${this.quiz.title}</span>
            <div style="font-size:12px; color:var(--muted); margin-top:4px; font-weight:600;">
              ${t('practiceQuestionPrefix', lang)} ${this.currentIndex + 1} ${t('of', lang)} ${this.quiz.questions.length}
            </div>
          </div>
          <div style="font-weight:850; color:var(--teal); font-size:14px; background:var(--teal-soft); padding:4px 12px; border-radius:999px;">
            ⭐ ${t('scoreLabel', lang)} ${this.score}
          </div>
        </div>

        ${q.scenario ? `
          <div class="scenario-card-prompt" style="background:var(--paper); border-left:4px solid var(--gold); border-radius:12px; padding:12px 16px; margin:10px 0 14px; font-size:13.5px; line-height:1.6; color:var(--ink);">
            <strong>🎭 ${isEn ? 'Daily Scenario:' : 'Skenario Cerita:'}</strong> ${q.scenario}
          </div>
        ` : ''}

        <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:16px;">
          <div class="quiz-question" style="margin:0; font-size:16px; font-weight:800; line-height:1.5; color:var(--ink); flex:1;">
            ${q.q}
          </div>
          <button class="btn-tts" id="btnTtsQuizQuestion" type="button" title="${isEn ? 'Read question aloud' : 'Dengarkan soal bersuara'}" style="flex:0 0 auto;">
            🔊 ${isEn ? 'Listen' : 'Dengarkan'}
          </button>
        </div>

        ${this.renderQuestionInput(q, qType, isEn)}

        ${q.hint ? `
          <div style="margin-top:12px; display:flex; align-items:center; gap:8px;">
            <button class="btn" id="btnToggleHint" type="button" style="font-size:12px; padding:6px 14px; min-height:36px; border-radius:10px;">
              💡 ${this.showHint ? (isEn ? 'Hide Hint' : 'Tutup Petunjuk') : (isEn ? 'Need a Hint?' : 'Butuh Petunjuk?')}
            </button>
          </div>
          <div class="hint-panel ${this.showHint ? 'show' : ''}" id="hintPanel" style="margin-top:10px; background:var(--paper); border-left:4px solid var(--teal); border-radius:10px; padding:10px 14px; font-size:13px; line-height:1.5;">
            ${q.hint}
          </div>
        ` : ''}

        <div class="feedback-banner" id="feedbackBanner" style="margin-top:16px; border-radius:12px;"></div>

        <div style="margin-top:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <button class="btn" id="btnRetryQuestion" type="button" style="display:none; font-size:12.5px; padding:6px 14px;">
            🔄 ${isEn ? 'Try Again' : 'Coba Lagi'}
          </button>
          <button class="btn primary" id="btnNextQuestion" type="button" style="display:none; margin-left:auto; font-size:13px; font-weight:800; padding:8px 20px;">
            ${isLast ? (isEn ? 'Finish & Collect Stars 🎉' : 'Selesai & Kumpulkan Bintang 🎉') : (isEn ? 'Next Question ➔' : 'Soal Berikutnya ➔')}
          </button>
        </div>
      </div>
    `;

    this.attachEvents(q, qType, isEn);
  }

  renderQuestionInput(q, qType, isEn) {
    if (qType === 'input' || qType === 'number-input') {
      return `
        <div class="quiz-input-block" style="display:flex; gap:10px; margin:16px 0; align-items:center;">
          <input type="text"
                 id="quizCustomInput"
                 class="quiz-text-input"
                 placeholder="${isEn ? 'Type your answer here...' : 'Ketik jawabanmu di sini...'}"
                 autocomplete="off"
                 style="flex:1; max-width:320px; padding:12px 16px; border-radius:12px; border:2px solid var(--line); font-size:15px; font-weight:700; color:var(--ink); background:var(--card); outline:none;">
          <button class="btn primary" id="btnSubmitCustomInput" type="button" style="padding:12px 20px; font-size:14px; font-weight:800;">
            ${isEn ? 'Check Answer' : 'Cek Jawaban'}
          </button>
        </div>
      `;
    }

    if (qType === 'true-false') {
      return `
        <div class="quiz-options true-false-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:16px 0;">
          ${(q.options || ['Benar', 'Salah']).map(opt => {
            const isTrue = opt.toLowerCase().includes('benar') || opt.toLowerCase().includes('true');
            return `
              <button class="quiz-opt-btn tf-btn" data-answer="${opt}" type="button" style="padding:16px 12px; text-align:center; font-size:16px; font-weight:800; border-radius:14px;">
                <span style="font-size:24px; display:block; margin-bottom:4px;">${isTrue ? '👍' : '👎'}</span>
                <span>${opt}</span>
              </button>
            `;
          }).join('')}
        </div>
      `;
    }

    // Default multiple choice
    const options = q.options || [];
    return `
      <div class="quiz-options" style="display:flex; flex-direction:column; gap:10px; margin:16px 0;">
        ${options.map((opt, optIdx) => `
          <button class="quiz-opt-btn" data-answer="${opt}" type="button" style="display:flex; align-items:center; gap:12px; padding:12px 16px; border-radius:14px; text-align:left;">
            <span class="opt-bullet" style="width:26px; height:26px; border-radius:50%; background:var(--surface); display:inline-flex; align-items:center; justify-content:center; font-weight:800; font-size:12px; color:var(--muted);">
              ${String.fromCharCode(65 + optIdx)}
            </span>
            <span class="opt-text" style="font-size:14.5px; font-weight:650; color:var(--ink); flex:1;">${opt}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  attachEvents(q, qType, isEn) {
    const feedbackBanner = this.container.querySelector('#feedbackBanner');
    const nextBtn = this.container.querySelector('#btnNextQuestion');
    const retryBtn = this.container.querySelector('#btnRetryQuestion');
    const hintBtn = this.container.querySelector('#btnToggleHint');
    const hintPanel = this.container.querySelector('#hintPanel');
    const ttsBtn = this.container.querySelector('#btnTtsQuizQuestion');

    // TTS Button
    if (ttsBtn) {
      ttsBtn.addEventListener('click', () => {
        const lang = appState.get().lang || 'id';
        let readText = q.q;
        if (q.scenario) readText = `${q.scenario}. ${readText}`;
        if (q.options && q.options.length > 0) {
          readText += `. ${isEn ? 'Choices are' : 'Pilihannya'}: ${q.options.join(', ')}`;
        }
        TtsEngine.speak(readText, lang, ttsBtn);
      });
    }

    // Hint Toggle
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        this.showHint = !this.showHint;
        if (hintPanel) hintPanel.classList.toggle('show', this.showHint);
        hintBtn.textContent = `💡 ${this.showHint ? (isEn ? 'Hide Hint' : 'Tutup Petunjuk') : (isEn ? 'Need a Hint?' : 'Butuh Petunjuk?')}`;
      });
    }

    // Evaluation Logic
    const evaluateAnswer = (selectedText) => {
      if (this.answered) return;

      const normUser = String(selectedText).trim().toLowerCase();
      const normCorrect = String(q.answer).trim().toLowerCase();
      const isCorrect = normUser === normCorrect || (q.acceptedAnswers && q.acceptedAnswers.map(a => a.toLowerCase()).includes(normUser));

      this.attemptsThisQ++;

      if (isCorrect) {
        if (this.attemptsThisQ === 1) {
          this.score++;
        }
        this.answered = true;
        feedbackBanner.className = 'feedback-banner success show';
        feedbackBanner.innerHTML = `
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:24px;">🎉</span>
            <div>
              <strong>${isEn ? 'Awesome! Correct answer!' : 'Mantap! Jawabanmu benar sekali!'}</strong>
              <div style="font-size:12.5px; opacity:0.9; margin-top:2px;">
                ${q.explanation || (isEn ? 'Great job mastering this concept! ⭐' : 'Hebat, kamu sudah memahami konsep ini! ⭐')}
              </div>
            </div>
          </div>
        `;
        AudioFx.playSuccess();
        AudioFx.triggerConfetti(this.container);
        if (nextBtn) nextBtn.style.display = 'inline-flex';
        if (retryBtn) retryBtn.style.display = 'none';
      } else {
        feedbackBanner.className = 'feedback-banner warning show';
        feedbackBanner.innerHTML = `
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:24px;">💡</span>
            <div>
              <strong>${isEn ? 'Almost there! Give it another try.' : 'Belum tepat. Yuk coba perhatikan lagi!'}</strong>
              <div style="font-size:12.5px; opacity:0.9; margin-top:2px;">
                ${isEn ? 'Take your time, read the hint below to discover the key.' : 'Santai saja, baca petunjuk di bawah untuk menemukan jawabannya.'}
              </div>
            </div>
          </div>
        `;
        AudioFx.playGentleWrong();

        // Auto-show hint after attempt
        if (q.hint && hintPanel && !this.showHint) {
          this.showHint = true;
          hintPanel.classList.add('show');
          if (hintBtn) hintBtn.textContent = `💡 ${isEn ? 'Hide Hint' : 'Tutup Petunjuk'}`;
        }

        if (retryBtn) retryBtn.style.display = 'inline-flex';
      }
    };

    // Multiple Choice & True/False buttons
    const optionBtns = this.container.querySelectorAll('.quiz-opt-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.answered) return;
        const selected = btn.getAttribute('data-answer');

        optionBtns.forEach(b => {
          b.classList.remove('selected', 'correct', 'wrong');
        });

        const normSelected = String(selected).trim().toLowerCase();
        const normAns = String(q.answer).trim().toLowerCase();

        if (normSelected === normAns) {
          btn.classList.add('correct');
          optionBtns.forEach(b => { b.disabled = true; });
        } else {
          btn.classList.add('wrong');
        }

        evaluateAnswer(selected);
      });
    });

    // Custom text/number input
    const inputField = this.container.querySelector('#quizCustomInput');
    const submitInputBtn = this.container.querySelector('#btnSubmitCustomInput');
    if (submitInputBtn && inputField) {
      submitInputBtn.addEventListener('click', () => {
        const val = inputField.value.trim();
        if (!val) return;
        evaluateAnswer(val);
      });
      inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const val = inputField.value.trim();
          if (val) evaluateAnswer(val);
        }
      });
    }

    // Retry Button
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.answered = false;
        feedbackBanner.className = 'feedback-banner';
        feedbackBanner.innerHTML = '';
        retryBtn.style.display = 'none';
        optionBtns.forEach(b => {
          b.disabled = false;
          b.classList.remove('selected', 'correct', 'wrong');
        });
        if (inputField) {
          inputField.value = '';
          inputField.focus();
        }
      });
    }

    // Next Button
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentIndex < this.quiz.questions.length - 1) {
          this.currentIndex++;
          this.attemptsThisQ = 0;
          this.answered = false;
          this.showHint = false;
          this.render();
        } else {
          // Finished Quiz
          AudioFx.playFanfare();
          AudioFx.triggerConfetti(this.container);
          store.recordQuizResult(this.quiz.id, this.score, this.quiz.questions.length);
          this.reportScoreToBackend();
          this.showCompletionScreen();
        }
      });
    }
  }

  reportScoreToBackend() {
    try {
      const gasUrl = localStorage.getItem('anabhi_gas_url') ||
                     (typeof window !== 'undefined' && window.GEMINI_CONFIG && window.GEMINI_CONFIG.GAS_URL) || '';
      if (!gasUrl || !gasUrl.includes('/exec')) return;

      const total = this.quiz.questions.length;
      const score = this.score;
      const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
      const state = (typeof appState !== 'undefined' && appState.get) ? appState.get() : {};
      const subject = state.currentSubjectId || 'Umum';
      const studentName = (store && typeof store.getStudent === 'function') ? store.getStudent() : (localStorage.getItem('anabhi_student_name') || 'Ana');

      fetch(gasUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_score',
          nama: studentName,
          subject: subject,
          quizTitle: this.quiz.title || 'Latihan Interaktif',
          score: score,
          totalQuestions: total,
          accuracy: accuracy,
          duration: 'Selesai mandiri',
          note: 'Latihan di Anabhi Smart Study'
        })
      }).catch(() => {});
    } catch (_) {}
  }

  showCompletionScreen() {
    const currentLang = appState.get().lang || 'id';
    const isEn = (currentLang === 'en');
    const isPerfect = this.score === this.quiz.questions.length;
    const earnedStars = isPerfect ? 10 : Math.max(2, this.score * 2);

    this.container.innerHTML = `
      <div class="quiz-box" style="text-align:center; padding:40px 24px; border-radius:20px; box-shadow:var(--shadow);">
        <div style="font-size:56px; margin-bottom:12px;">${isPerfect ? '🏆' : '🌟'}</div>
        <h3 style="font-size:24px; margin:0 0 8px; font-weight:850; color:var(--ink);">
          ${isPerfect ? (isEn ? 'Sensational Score! 🌟' : 'Luar Biasa, Nilai Sempurna! 🌟') : (isEn ? 'Great Effort, Champion!' : 'Hebat Sekali, Sobat Juara!')}
        </h3>
        <p style="font-size:14.5px; color:var(--muted); margin:0 auto 20px; max-width:480px; line-height:1.6;">
          ${isPerfect 
            ? (isEn ? 'You answered all questions correctly and unlocked maximum stars!' : 'Kamu berhasil menjawab seluruh soal dengan tepat dan meraih bintang prestasi penuh!')
            : (isEn ? 'Every practice makes your mind stronger and more curious. Keep learning!' : 'Setiap latihan membuat pikiranmu semakin tajam dan berani mencoba. Terus semangat!')}
        </p>

        <div style="display:inline-flex; align-items:center; gap:8px; background:var(--card); border:2px solid var(--line); border-radius:16px; padding:12px 24px; margin-bottom:24px;">
          <span style="font-size:28px;">⭐</span>
          <div style="text-align:left;">
            <div style="font-size:11px; font-weight:800; color:var(--muted); text-transform:uppercase;">${isEn ? 'Stars Awarded' : 'Bintang Diperoleh'}</div>
            <strong style="font-size:22px; color:var(--teal); font-weight:900;">+${earnedStars} Stars (${this.score} / ${this.quiz.questions.length})</strong>
          </div>
        </div>

        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <button class="btn" id="btnRetryQuiz" type="button" style="padding:10px 20px; font-size:13.5px; border-radius:12px;">
            🔄 ${t('retryQuizBtn', currentLang)}
          </button>
          <button class="btn primary" id="btnFinishQuiz" type="button" style="padding:10px 24px; font-size:13.5px; font-weight:800; border-radius:12px;">
            ${t('continueNextSubjectBtn', currentLang)} ➔
          </button>
        </div>
      </div>
    `;

    const retryBtn = this.container.querySelector('#btnRetryQuiz');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.currentIndex = 0;
        this.score = 0;
        this.attemptsThisQ = 0;
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
