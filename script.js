// 1. 評語資料庫 (Data Structure)
const keywords = {
    // A: 學習表現 (優點)
    A: [
        '積極發問', '專注課堂', '具批判性思考', '樂於閱讀', '數理邏輯強',
        '語文表達佳', '作業準時且認真', '邏輯組織力佳', '追求卓越', '應用實踐力強',
        '虛心受教', '獨立完成度高',
        // 新增
        '學習態度積極', '善於歸納總結', '善用資源', '善於時間分配', '理解力佳',
        '分析能力強', '書寫整潔', '課堂參與熱烈', '主動檢討修正', '實驗操作穩定'
    ],
    // B: 核心素養 (行為)
    B: [
        '團隊合作', '具同理心', '負責盡職', '時間管理佳', '勇於承擔',
        '解決問題能力', '樂於助人', '熱心參與班級事務', '展現良好社交能力',
        // 新增
        '溝通能力佳', '尊重他人', '守規矩', '積極協調', '領導潛能',
        '願意分享', '遵守承諾', '有禮貌', '支持同儕', '會聆聽'
    ],
    // C: 成長特質 (個性)
    C: [
        '自律性高', '充滿熱忱', '樂觀開朗', '細心觀察', '具服務熱忱',
        '進步顯著', '具備好奇心', '富有創造力', '情緒管理得宜',
        // 新增
        '抗壓性佳', '謙虛有禮', '主動學習', '思維靈活', '責任感強',
        '耐心細緻', '具批判精神', '穩重成熟', '自我反省能力強', '有探索精神'
    ],
    // D: 鼓勵建議 (結尾)
    D: [
        '保持熱情', '挑戰自我', '多與同儕交流', '持續精進表達', '善用時間規劃',
        '再提升細心度', '保持穩定的學習步伐', '勇於嘗試新的學習方式',
        // 新增
        '多參加課外實作', '養成複習習慣', '嘗試跨領域學習', '練習發表技巧',
        '建立學習筆記系統', '培養閱讀多元素材的習慣', '維持良好作息',
        '多向老師請教', '設定具體短期目標', '繼續保持好奇心'
    ]
};

// 2. 評語結構庫 (Sentence Templates)
const sentenceTemplates = {
    // 肯定優點 (A + C) - 第一句
    opening: [
        (A, C) => `ＯＯＯ是位${C}且在學業上${A}的孩子，總能給老師帶來驚喜。`,
        (A, C) => `本學期，我們看到ＯＯＯ不僅${C}，更在${A}方面有亮眼的表現。`,
        (A, C) => `ＯＯＯ具備${C}的特質，並在課業中展現出${A}的能力，令人讚賞。`
    ],
    // 具體事例 (B) - 第二句
    body: [
        (B) => `在班級活動中，他不僅展現出良好的${B}精神，成為同學的好榜樣。`,
        (B) => `面對群體事務，他總是${B}，遇到困難時也表現出成熟的態度。`,
        (B) => `老師特別欣賞他${B}的行為，這顯示了他高尚的品德與素養。`
    ],
    // 未來期許 (D) - 第三句
    closing: [
        (D) => `期待他未來能持續${D}，探索更多學習的可能性！`,
        (D) => `若能持續${D}，相信ＯＯＯ的表現將更臻完美！`,
        (D) => `期盼未來ＯＯＯ能朝著${D}的方向前進，不斷突破自我。`
    ]
};

// 3. 核心功能實現 (Implementation)

let selectedKeywords = { A: [], B: [], C: [], D: [] };

// 3.1. 渲染關鍵字按鈕（含每類別的自訂輸入區）
function renderKeywords() {
    for (const category in keywords) {
        const container = document.getElementById(`category-${category}`);
        if (container) {
            container.innerHTML = ''; // 清空舊內容

            // 列表容器（放按鈕）
            const listDiv = document.createElement('div');
            listDiv.className = 'keyword-list';

            keywords[category].forEach(keyword => {
                const button = document.createElement('button');
                button.className = 'keyword-btn';
                button.textContent = keyword;
                button.setAttribute('data-category', category);
                button.setAttribute('data-keyword', keyword);
                button.addEventListener('click', toggleKeywordSelection);
                listDiv.appendChild(button);
            });

            container.appendChild(listDiv);

            // 自訂輸入區塊（input + 新增按鈕）
            const customDiv = document.createElement('div');
            customDiv.className = 'custom-input';

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `新增自訂關鍵字（類別 ${category}）`;
            input.className = 'custom-keyword-input';
            input.setAttribute('data-category', category);

            const addBtn = document.createElement('button');
            addBtn.className = 'add-custom-btn';
            addBtn.textContent = '新增';

            // 按下新增時的行為
            addBtn.addEventListener('click', () => addCustomKeyword(category, input, listDiv));
            // Enter 鍵也觸發新增
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    addCustomKeyword(category, input, listDiv);
                }
            });

            customDiv.appendChild(input);
            customDiv.appendChild(addBtn);
            container.appendChild(customDiv);
        }
    }
}

// 新增自訂關鍵字的處理
function addCustomKeyword(category, inputEl, listDiv) {
    const val = inputEl.value.trim();
    if (!val) {
        alert('請輸入關鍵字後再按新增。');
        return;
    }

    // 避免重複
    if (keywords[category].includes(val)) {
        alert('此關鍵字已存在於此類別中。');
        inputEl.value = '';
        return;
    }

    // 新增到資料庫
    keywords[category].push(val);

    // 建立按鈕（和其他按鈕一致）
    const button = document.createElement('button');
    button.className = 'keyword-btn';
    button.textContent = val;
    button.setAttribute('data-category', category);
    button.setAttribute('data-keyword', val);
    button.addEventListener('click', toggleKeywordSelection);

    listDiv.appendChild(button);

    // 清空輸入框（不自動選取，讓使用者決定是否選中）
    inputEl.value = '';
}

// 3.2. 處理點擊事件
function toggleKeywordSelection(event) {
    const btn = event.target;
    const category = btn.getAttribute('data-category');
    const keyword = btn.getAttribute('data-keyword');

    // 切換選中狀態
    btn.classList.toggle('selected');

    if (btn.classList.contains('selected')) {
        // 如果被選中，加入選取列表（避免重複）
        if (!selectedKeywords[category].includes(keyword)) {
            selectedKeywords[category].push(keyword);
        }
    } else {
        // 如果取消選中，從列表移除
        selectedKeywords[category] = selectedKeywords[category].filter(k => k !== keyword);
    }
}

// 3.3. 生成評語
function generateCommentary() {
    const A = selectedKeywords.A;
    const B = selectedKeywords.B;
    const C = selectedKeywords.C;
    const D = selectedKeywords.D;
    const resultBox = document.getElementById('result-text');
    let comment = [];

    // 檢查是否每個類別都有選取 (A, B, C, D 至少選一個)
    if (A.length === 0 || B.length === 0 || C.length === 0 || D.length === 0) {
        resultBox.textContent = '❌ 請在「學習表現」、「核心素養」、「成長特質」和「鼓勵建議」四個類別中，至少各選取一個關鍵字。';
        return;
    }

    // 隨機選取關鍵字 (如果選了多個，隨機取一個來組句)
    const randA = A[Math.floor(Math.random() * A.length)];
    const randB = B[Math.floor(Math.random() * B.length)];
    const randC = C[Math.floor(Math.random() * C.length)];
    const randD = D[Math.floor(Math.random() * D.length)];

    // 隨機選擇句子模板
    const openingTemplate = sentenceTemplates.opening[Math.floor(Math.random() * sentenceTemplates.opening.length)];
    const bodyTemplate = sentenceTemplates.body[Math.floor(Math.random() * sentenceTemplates.body.length)];
    const closingTemplate = sentenceTemplates.closing[Math.floor(Math.random() * sentenceTemplates.closing.length)];

    // 組合句子
    comment.push(openingTemplate(randA, randC));
    comment.push(bodyTemplate(randB));
    comment.push(closingTemplate(randD));

    // 輸出結果 (以換行符分隔)
    resultBox.textContent = comment.join('\n\n');
}

// 3.4. 複製評語
function copyCommentary() {
    const resultBox = document.getElementById('result-text');
    const textToCopy = resultBox.textContent;

    if (textToCopy === '點擊上方關鍵字後，按下「生成評語」按鈕。' || textToCopy.startsWith('❌')) {
        alert('請先生成有效的評語！');
        return;
    }

    // 嘗試使用 Clipboard API 複製
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('評語已成功複製到剪貼簿！');
    }).catch(err => {
        // 舊瀏覽器或權限問題時使用 fallback
        console.error('無法使用 Clipboard API 複製: ', err);
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        alert('評語已複製 (傳統方式)。');
    });
}


// 4. 網頁加載完畢後執行
document.addEventListener('DOMContentLoaded', () => {
    // 渲染所有關鍵字按鈕（含自訂輸入）
    renderKeywords();

    // 綁定生成按鈕
    const genBtn = document.getElementById('generate-btn');
    if (genBtn) genBtn.addEventListener('click', generateCommentary);

    // 綁定複製按鈕
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) copyBtn.addEventListener('click', copyCommentary);
});
