"use strict";

{
    const startBtn = document.getElementById('start-btn');
    const container = document.getElementById('container');
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const answerResult = document.getElementById('answer-result');
    const answerResultLabel = document.querySelector('#answer-result > p');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');
    const mask = document.getElementById('mask');

    const quizSet = shuffle([
        { q: '日本の首都は次のうちどれ?', c: ['東京都', '神奈川県', '北海道'] },
        { q: 'マークアップ言語は次のうちどれ?', c: ['HTML', 'CSS', 'PHP'] },
        { q: '汽水魚は次のうちどれ?', c: ['スズキ', 'ヤマメ', 'カサゴ'] },
    ]);

    let currentNum = 0;
    let isAnswered;
    let score = 0;

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    function checkAnswer(li) {
        if (isAnswered) {
            return;
        }
        isAnswered = true;
        if (li.textContent === quizSet[currentNum].c[0]) {
            answerResult.style.borderColor = '#423eb3';
            answerResultLabel.textContent = '正解 !';
            answerResultLabel.style.color = '#423eb3';
            answerResult.classList.remove('hidden');
            score++;
        } else {
            answerResult.style.borderColor = '#b3423e';
            answerResultLabel.textContent = '不正解 !';
            answerResultLabel.style.color = '#b3423e';
            answerResult.classList.remove('hidden');
        }
        btn.classList.remove('disabled');
    }

    function setQuiz() {
        isAnswered = false;
        question.textContent = quizSet[currentNum].q;
        while (choices.firstChild) {
            choices.firstChild.remove();
        };

        const shuffleChoices = shuffle([...quizSet[currentNum].c]);
        shuffleChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
        });
        
        if (currentNum === quizSet.length - 1) {
            btn.textContent = '結果を見る';
        }
    }
    setQuiz();

    startBtn.addEventListener('click', () => {
        startBtn.classList.add('hide');
        container.classList.add('show');
        mask.classList.remove('hide');
    });

    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) {
            return;
        }
        btn.classList.add('disabled');
        if (currentNum === quizSet.length - 1) {
            scoreLabel.textContent = `${score} / ${quizSet.length} 問正解!`;
            result.classList.remove('hidden');
            answerResult.classList.add('none');
            mask.classList.remove('hide');
            container.classList.add('hide');
        } else {
            answerResult.classList.add('hidden');
            currentNum++;
            setQuiz();
        }
    });
}