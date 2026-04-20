document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const testSelector = document.getElementById('test-selector');
    const pdfToggle = document.getElementById('pdf-toggle');
    const pdfViewer = document.getElementById('pdf-viewer');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    const zoomValueText = document.getElementById('zoom-value');
    const audioSource = document.getElementById('audio-source');
    const audioPlayer = document.getElementById('audio-player');
    const answerSheet = document.getElementById('answer-sheet');
    const gradeBtn = document.getElementById('grade-btn');
    const scoreDisplay = document.getElementById('score-display');
    const scoreValue = document.getElementById('score-value');
    const scoreListening = document.getElementById('score-listening');
    const scoreReading = document.getElementById('score-reading');

    const hubModal = document.getElementById('learning-hub-modal');
    const hubBtn = document.getElementById('vocabulary-btn');
    const closeHub = document.getElementById('close-hub');
    const hubTabBtns = document.querySelectorAll('.hub-tab-btn');
    const hubTabPanes = document.querySelectorAll('.hub-tab-pane');

    const vocabInput = document.getElementById('vocab-input');
    const dictSearchBtn = document.getElementById('dict-search-btn');
    const addVocabBtn = document.getElementById('add-vocab-btn');
    const notesList = document.getElementById('notes-list');
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const generalNotesList = document.getElementById('general-notes-list');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');

    const timerText = document.getElementById('timer-text');
    const timerTextMobile = document.getElementById('timer-text-mobile');
    const timerTextDrawer = document.getElementById('timer-drawer-text');
    const timerToggleBtn = document.getElementById('timer-toggle-btn');
    const timerToggleBtnMobile = document.getElementById('timer-toggle-btn-mobile');
    const audioPlayBtn = document.getElementById('audio-play-btn');
    const audioPlayBtnMobile = document.getElementById('audio-play-btn-mobile');
    
    // Mobile Elements
    const menuBtn = document.getElementById('menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const closeMenu = document.getElementById('close-menu');
    const testSelectorMobile = document.getElementById('test-selector-mobile');
    const pdfToggleMobile = document.getElementById('pdf-toggle-mobile');
    const vocabBtnMobile = document.getElementById('vocabulary-btn-mobile');
    const gradeBtnMobile = document.getElementById('grade-btn-mobile');
    const jumpIndexGrid = document.getElementById('jump-index-grid');
    const gradeBtnFooter = document.getElementById('grade-btn-mobile-footer');
    const nextQBtn = document.getElementById('next-q-btn');
    const prevQBtn = document.getElementById('prev-q-btn');
    const currentQNumSpan = document.getElementById('current-q-num');

    // --- State ---
    const BASE_PATH = "LiveABC題庫(新)-20260330T200106Z-3-001/LiveABC題庫(新)/";
    const answersDb = {"test1": ["B", "A", "B", "D", "B", "D", "A", "C", "C", "B", "A", "C", "B", "A", "C", "B", "B", "C", "B", "A", "C", "A", "C", "C", "C", "B", "C", "C", "D", "C", "D", "C", "B", "D", "B", "C", "C", "C", "D", "B", "A", "D", "C", "C", "A", "C", "B", "C", "D", "A", "B", "C", "B", "A", "D", "C", "C", "B", "B", "D", "A", "D", "D", "B", "C", "A", "D", "C", "C", "D"], "test2": ["A", "B", "C", "D", "C", "D", "A", "B", "B", "B", "C", "A", "C", "C", "B", "B", "C", "B", "C", "D", "B", "B", "D", "C", "A", "B", "C", "D", "B", "B", "D", "A", "D", "B", "C", "D", "B", "D", "C", "A", "C", "A", "C", "D", "B", "D", "C", "B", "A", "D", "A", "C", "B", "C", "C", "C", "A", "D", "C", "A", "D", "B", "A", "B", "B", "B", "C", "C", "B", "A"], "test3": ["D", "C", "C", "D", "C", "A", "B", "D", "D", "D", "B", "C", "D", "C", "A", "C", "B", "B", "C", "A", "A", "D", "A", "D", "B", "C", "B", "D", "D", "B", "A", "C", "D", "A", "C", "B", "A", "D", "A", "B", "B", "C", "B", "B", "A", "B", "A", "B", "C", "A", "B", "D", "B", "C", "A", "B", "A", "B", "A", "D", "B", "D", "B", "D", "D", "B", "B", "C", "A", "C"], "test4": ["C", "C", "B", "A", "C", "D", "B", "B", "D", "A", "B", "D", "A", "C", "B", "D", "A", "C", "C", "C", "D", "A", "B", "C", "B", "A", "D", "C", "B", "B", "C", "C", "D", "A", "B", "B", "A", "C", "C", "C", "D", "A", "C", "C", "D", "A", "C", "C", "A", "A", "D", "A", "C", "C", "B", "B", "D", "C", "A", "C", "C", "B", "C", "C", "D", "C", "D", "D", "C", "B"]};
    
    let userAnswers = {};
    let currentTest = "1";
    let isGraded = false;
    let timerInterval = null;
    let timeRemaining = 120 * 60;
    let isTimerRunning = false;
    let isFormalSession = false;
    let currentZoom = 100;
    let currentQIndex = 1;

    // --- Init ---
    if (timerToggleBtn) timerToggleBtn.classList.add('pulse-ready');
    initMobileControls();
    renderGeneralNotes();
    
    // Defer initial test load to prevent hosting platforms from redirecting to PDF immediately
    setTimeout(() => {
        loadTest(currentTest);
    }, 500);
    
    updateTimerDisplay();

    // --- Mobile Exclusive Logic ---
    function initMobileControls() {
        if (testSelectorMobile) {
            testSelectorMobile.innerHTML = testSelector.innerHTML;
            testSelectorMobile.onchange = (e) => {
                testSelector.value = e.target.value;
                loadTest(e.target.value);
                sideMenu.classList.remove('active');
            };
        }
        if (pdfToggleMobile) {
            pdfToggleMobile.onchange = (e) => {
                pdfToggle.checked = e.target.checked;
                pdfViewer.src = getPdfUrl(currentTest, e.target.checked);
                sideMenu.classList.remove('active');
            };
        }
        if (menuBtn) menuBtn.onclick = () => sideMenu.classList.add('active');
        if (closeMenu) closeMenu.onclick = () => sideMenu.classList.remove('active');
        if (vocabBtnMobile) vocabBtnMobile.onclick = () => openHub('vocab');
        if (gradeBtnMobile) gradeBtnMobile.onclick = () => { gradeTest(); sideMenu.classList.remove('active'); };
        if (gradeBtnFooter) gradeBtnFooter.onclick = () => gradeTest();
        
        generateJumpIndex();

        if (nextQBtn) nextQBtn.onclick = () => { if(currentQIndex < 70) { currentQIndex++; updateMobileView(); } };
        if (prevQBtn) prevQBtn.onclick = () => { if(currentQIndex > 1) { currentQIndex--; updateMobileView(); } };
    }

    function generateJumpIndex() {
        if (!jumpIndexGrid) return;
        jumpIndexGrid.innerHTML = '';

        const createSection = (title, start, end) => {
            const header = document.createElement('div');
            header.className = 'drawer-sub-header';
            header.innerText = title;
            jumpIndexGrid.appendChild(header);
            
            const grid = document.createElement('div');
            grid.className = 'jump-index-subgrid';
            for (let i = start; i <= end; i++) {
                const btn = document.createElement('div');
                btn.className = 'jump-btn';
                // Display relative number (1-35) for reading section
                const displayNum = i > 35 ? i - 35 : i;
                btn.innerText = displayNum;
                btn.onclick = () => {
                    currentQIndex = i;
                    updateMobileView();
                    sideMenu.classList.remove('active');
                };
                grid.appendChild(btn);
            }
            jumpIndexGrid.appendChild(grid);
        };

        createSection('🎧 聽力部分 (Listening)', 1, 35);
        createSection('📖 閱讀部分 (Reading)', 36, 70);
    }

    function updateMobileView() {
        const rows = document.querySelectorAll('.question-row');
        rows.forEach((row, i) => {
            row.classList.toggle('active', (i + 1) === currentQIndex);
        });
        if (currentQNumSpan) currentQNumSpan.innerText = currentQIndex;
        
        // Update grid active state
        document.querySelectorAll('.jump-btn').forEach((btn, i) => {
            btn.classList.toggle('active', (i + 1) === currentQIndex);
            btn.classList.toggle('answered', !!userAnswers[i + 1]);
        });
    }

    // --- PDF & Audio Logic ---
    function getPdfUrl(testNum, isSolution) {
        const type = isSolution ? "解析" : "題目";
        const relativePath = `${BASE_PATH}第${testNum}回 ${type}.pdf`;
        const directUrl = encodeURI(relativePath);
        
        // Detect if user is on mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Only use Google Viewer on MOBILE + DEPLOYED environment to prevent hijacking
        const isLocal = window.location.hostname === "localhost" || 
                        window.location.hostname === "127.0.0.1" || 
                        window.location.protocol === "file:";

        if (isMobile && !isLocal && window.location.hostname !== "") {
            const origin = window.location.origin;
            const path = window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
            const fullUrl = origin + path + directUrl;
            return `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true`;
        }
        
        // Use native viewer for Desktop and Local testing
        return directUrl;
    }

    function getAudioUrl(testNum) {
        return encodeURI(`${BASE_PATH}第${testNum}回 聽力.mp3`);
    }

    function loadTest(testNum) {
        currentTest = testNum;
        userAnswers = {};
        isGraded = false;
        isFormalSession = false;
        currentQIndex = 1;

        stopTimer();
        timeRemaining = 120 * 60;
        updateTimerDisplay();

        scoreDisplay.style.display = 'none';
        pdfToggle.checked = false;
        if(pdfToggleMobile) pdfToggleMobile.checked = false;
        gradeBtn.innerText = "自動批改";
        pdfViewer.src = getPdfUrl(testNum, false);
        audioSource.src = getAudioUrl(testNum);
        audioPlayer.load();
        const numQs = answersDb[`test${testNum}`].length;
        renderAnswerSheet(numQs);
        updateMobileView();
    }

    function updateZoom(newZoom) {
        currentZoom = Math.max(100, Math.min(200, newZoom));
        if (pdfViewer) {
            pdfViewer.style.width = `${currentZoom}%`;
            if (currentZoom > 100) {
                pdfViewer.style.minHeight = "150vh"; // Expand height slightly to maintain aspect feel
            } else {
                pdfViewer.style.minHeight = "";
            }
        }
    }

    if (zoomInBtn) zoomInBtn.onclick = () => updateZoom(currentZoom + 10);
    if (zoomOutBtn) zoomOutBtn.onclick = () => updateZoom(currentZoom - 10);

    function renderAnswerSheet(numQs) {
        answerSheet.innerHTML = '';
        for (let i = 1; i <= numQs; i++) {
            if (i === 1) {
                const div = document.createElement('div');
                div.className = 'section-divider';
                div.innerHTML = `<span>🎧 聽力測驗 (Listening)</span>`;
                answerSheet.appendChild(div);
            }
            if (i === 36) {
                const div = document.createElement('div');
                div.className = 'section-divider';
                div.innerHTML = `<span>📖 閱讀測驗 (Reading)</span>`;
                answerSheet.appendChild(div);
            }
            const row = document.createElement('div');
            row.className = 'question-row';
            row.id = `q-row-${i}`;
            const displayNum = i > 35 ? i - 35 : i;
            row.innerHTML = `<div class="q-num">${displayNum}.</div><div class="q-options"></div><div class="result-mark" id="result-mark-${i}"></div>`;
            const optCont = row.querySelector('.q-options');
            ['A', 'B', 'C', 'D'].forEach(opt => {
                const btn = document.createElement('div');
                btn.className = 'option-btn';
                btn.innerText = opt;
                btn.onclick = () => selectOption(i, opt, btn);
                optCont.appendChild(btn);
            });
            answerSheet.appendChild(row);
        }
    }

    function selectOption(qNo, opt, btn) {
        if (isGraded) return;
        userAnswers[qNo] = opt;
        btn.parentElement.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        if (window.innerWidth <= 768 && qNo < 70) {
            setTimeout(() => {
                currentQIndex = qNo + 1;
                updateMobileView();
            }, 300);
        }
    }

    function gradeTest(isReapplying = false) {
        if (isGraded && !isReapplying) return;
        const correctAnswers = answersDb[`test${currentTest}`];
        let lCorrect = 0, rCorrect = 0;
        for (let i = 1; i <= correctAnswers.length; i++) {
            const userAns = userAnswers[i];
            const correctAns = correctAnswers[i - 1];
            const row = document.getElementById(`q-row-${i}`);
            const mark = document.getElementById(`result-mark-${i}`);
            if (userAns === correctAns) {
                if (i <= 35) lCorrect++; else rCorrect++;
                row.classList.add('correct');
                mark.innerText = '✓';
                row.querySelectorAll('.option-btn').forEach(b => { if(b.innerText === userAns) b.classList.add('correct-ans'); });
            } else {
                row.classList.add('incorrect');
                mark.innerText = '❌';
                row.querySelectorAll('.option-btn').forEach(b => {
                    if(b.innerText === userAns) b.classList.add('wrong-ans');
                    if(b.innerText === correctAns) b.classList.add('correct-ans');
                });
            }
        }
        scoreValue.innerText = lCorrect + rCorrect;
        scoreListening.innerText = lCorrect;
        scoreReading.innerText = rCorrect;
        scoreDisplay.style.display = 'flex';
        pdfToggle.checked = true;
        if(pdfToggleMobile) pdfToggleMobile.checked = true;
        pdfViewer.src = getPdfUrl(currentTest, true);
        gradeBtn.innerText = "重新測驗";
        isGraded = true;
        stopTimer();
        if (!isReapplying) saveHistory(lCorrect, rCorrect, isFormalSession);
    }

    function saveHistory(l, r, isFormal) {
        const history = JSON.parse(localStorage.getItem('liveabc_history') || '[]');
        history.unshift({ timestamp: Date.now(), test: currentTest, l: l, r: r, total: l + r, isFormal: isFormal });
        localStorage.setItem('liveabc_history', JSON.stringify(history.slice(0, 50)));
        renderHistory();
    }

    function renderHistory() {
        const history = JSON.parse(localStorage.getItem('liveabc_history') || '[]');
        if (history.length === 0) {
            historyList.innerHTML = '<div class="empty-msg">尚無紀錄</div>';
            return;
        }
        historyList.innerHTML = history.map(h => {
            const dateObj = h.timestamp ? new Date(h.timestamp) : new Date(h.date);
            const dateStr = dateObj.toLocaleDateString();
            const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const typeLabel = h.isFormal ? "正式模擬" : "一般練習";
            return `
                <div class="history-item">
                    <div class="h-info"><h4>第 ${h.test} 回 ${typeLabel}</h4><span>📅 ${dateStr} <br> 🕒 ${timeStr}</span></div>
                    <div class="h-stats"><div class="h-score">${h.total} / 70</div><div class="h-details">聽力:${h.l} 閱讀:${h.r}</div></div>
                </div>
            `;
        }).join('');
    }

    hubBtn.onclick = () => openHub('history');
    closeHub.onclick = () => hubModal.classList.remove('active');
    
    function openHub(tabId) {
        hubModal.classList.add('active');
        switchTab(tabId);
        if (tabId === 'history') renderHistory();
        if (tabId === 'vocab') renderVocab();
        if (tabId === 'notes') renderGeneralNotes();
    }

    function switchTab(tabId) {
        hubTabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
        hubTabPanes.forEach(pane => pane.classList.toggle('active', pane.id === `tab-${tabId}`));
        sideMenu.classList.remove('active');
    }

    hubTabBtns.forEach(btn => btn.onclick = () => switchTab(btn.dataset.tab));

    function renderGeneralNotes() {
        const notes = JSON.parse(localStorage.getItem('liveabc_general_notes_list') || '[]');
        if (!generalNotesList) return;
        generalNotesList.innerHTML = notes.length ? notes.map((n, i) => `
            <div class="note-item"><div class="note-content"><span class="note-word">${n.text}</span><span class="note-time">${n.time}</span></div><button class="icon-btn" onclick="deleteGeneralNote(${i})">✕</button></div>
        `).join('') : '<div class="empty-msg">還沒有筆記喔，新增一筆吧！</div>';
    }

    if (addNoteBtn) {
        addNoteBtn.onclick = () => {
            const text = noteInput.value.trim();
            if (text) {
                let notes = JSON.parse(localStorage.getItem('liveabc_general_notes_list') || '[]');
                const now = new Date();
                notes.unshift({ text: text, time: now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
                localStorage.setItem('liveabc_general_notes_list', JSON.stringify(notes));
                renderGeneralNotes(); noteInput.value = '';
            }
        };
    }

    window.deleteGeneralNote = (index) => {
        let notes = JSON.parse(localStorage.getItem('liveabc_general_notes_list') || '[]');
        notes.splice(index, 1);
        localStorage.setItem('liveabc_general_notes_list', JSON.stringify(notes));
        renderGeneralNotes();
    };

    function renderVocab() {
        const notes = JSON.parse(localStorage.getItem('liveabc_notes') || '[]');
        if (!notesList) return;
        notesList.innerHTML = notes.length ? notes.map(w => `
            <div class="note-item"><span class="note-word">${w}</span><button class="icon-btn" onclick="deleteVocab('${w}')">✕</button></div>
        `).join('') : '<div class="empty-msg">尚無記錄</div>';
    }
    window.deleteVocab = (w) => {
        let notes = JSON.parse(localStorage.getItem('liveabc_notes') || '[]');
        localStorage.setItem('liveabc_notes', JSON.stringify(notes.filter(n => n !== w)));
        renderVocab();
    };
    if (addVocabBtn) {
        addVocabBtn.onclick = () => {
            const w = vocabInput.value.trim();
            if (w) {
                let notes = JSON.parse(localStorage.getItem('liveabc_notes') || '[]');
                if(!notes.includes(w)) notes.unshift(w);
                localStorage.setItem('liveabc_notes', JSON.stringify(notes));
                renderVocab(); vocabInput.value = '';
            }
        };
    }
    if (dictSearchBtn) {
        dictSearchBtn.onclick = () => {
            const w = vocabInput.value.trim();
            if (w) {
                const url = `https://tw.dictionary.search.yahoo.com/search?p=${encodeURIComponent(w)}`;
                const width = 450; const height = 700;
                const left = (window.screen.width / 2) - (width / 2);
                const top = (window.screen.height / 2) - (height / 2);
                window.open(url, 'YahooDict', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=no,toolbar=no,menubar=no,location=no`);
            }
        };
    }

    function updateTimerDisplay() {
        const m = Math.floor(timeRemaining / 60);
        const s = timeRemaining % 60;
        const formatted = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        if (timerText) timerText.innerText = formatted;
        if (timerTextMobile) timerTextMobile.innerText = `⏳ ${formatted}`;
        if (timerTextDrawer) timerTextDrawer.innerText = `⏳ ${formatted}`;
    }
    function stopTimer() { 
        clearInterval(timerInterval); isTimerRunning = false; 
        const label = "開始";
        if (timerToggleBtn) timerToggleBtn.innerText = label;
        if (timerToggleBtnMobile) timerToggleBtnMobile.innerText = label + "測驗";
        timerToggleBtn.classList.add('pulse-ready'); 
    }

    function updateAudioUI(icon) {
        if (audioPlayBtn) audioPlayBtn.innerText = icon;
        if (audioPlayBtnMobile) audioPlayBtnMobile.innerText = icon;
    }

    // --- Audio Control Logic ---
    function toggleAudio() {
        if (audioPlayer.paused) {
            audioPlayer.play().then(() => {
                updateAudioUI("⏸️");
            }).catch(e => console.log("Play blocked"));
        } else {
            audioPlayer.pause();
            updateAudioUI("▶️");
        }
    }
    if (audioPlayBtn) audioPlayBtn.onclick = toggleAudio;
    if (audioPlayBtnMobile) audioPlayBtnMobile.onclick = toggleAudio;
    audioPlayer.onended = () => updateAudioUI("▶️");

    function startTimerLogic() {
        if (isTimerRunning) stopTimer();
        else {
            isTimerRunning = true; isFormalSession = true; 
            const label = "暫停";
            if (timerToggleBtn) timerToggleBtn.innerText = label;
            if (timerToggleBtnMobile) timerToggleBtnMobile.innerText = label;
            
            if (timerToggleBtn.classList.contains('pulse-ready')) {
                timerToggleBtn.classList.remove('pulse-ready');
            }
            
            audioPlayer.play().then(() => {
                updateAudioUI("⏸️");
            }).catch(e => console.log("Audio block"));

            timerInterval = setInterval(() => {
                timeRemaining--; updateTimerDisplay();
                if (timeRemaining <= 0) { stopTimer(); alert("時間到！"); gradeTest(); }
            }, 1000);
        }
    }

    if (timerToggleBtn) timerToggleBtn.onclick = startTimerLogic;
    if (timerToggleBtnMobile) timerToggleBtnMobile.onclick = startTimerLogic;

    testSelector.onchange = (e) => loadTest(e.target.value);
    pdfToggle.onchange = (e) => pdfViewer.src = getPdfUrl(currentTest, e.target.checked);
    gradeBtn.onclick = () => {
        if (isGraded) loadTest(currentTest);
        else gradeTest();
    };
    if (clearHistoryBtn) {
        clearHistoryBtn.onclick = () => {
            if (confirm("確定要清除所有練習紀錄嗎？")) { localStorage.removeItem('liveabc_history'); renderHistory(); }
        };
    }
});
