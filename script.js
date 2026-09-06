let currentEditRow = null;

// Переключение между вкладками деревень
function switchVillage(villageId, event) {
    document.querySelectorAll('.village-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    const targetPanel = document.getElementById(villageId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    event.currentTarget.classList.add('active');
}

// Добавление или сохранение товара на центральном складе
function saveItem() {
    const name = document.getElementById('itemName').value.trim();
    const sizes = document.getElementById('itemSizes').value.trim();
    const qty = document.getElementById('itemQty').value.trim();

    if (!name || !sizes || !qty) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    const table = document.getElementById('centralStockList');

    if (currentEditRow) {
        currentEditRow.cells[1].innerText = name;
        currentEditRow.cells[2].innerText = sizes;
        currentEditRow.cells[3].innerText = qty + ' шт.';
        currentEditRow = null;
        document.getElementById('formTitle').innerText = 'Добавить товар на склад';
        document.getElementById('saveBtn').innerText = 'Добавить в каталог';
    } else {
        const art = Math.floor(1000 + Math.random() * 9000);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${art}</td>
            <td>${name}</td>
            <td>${sizes}</td>
            <td>${qty} шт.</td>
            <td>
                <button class="btn-sm" onclick="editRow(this)">Изм</button>
                <button class="btn-sm btn-danger" onclick="deleteRow(this)">Уд</button>
            </td>
        `;
        table.appendChild(row);
    }

    document.getElementById('itemName').value = '';
    document.getElementById('itemSizes').value = '';
    document.getElementById('itemQty').value = '';
}

function deleteRow(btn) {
    btn.closest('tr').remove();
}

function editRow(btn) {
    const row = btn.closest('tr');
    currentEditRow = row;

    document.getElementById('itemName').value = row.cells[1].innerText;
    document.getElementById('itemSizes').value = row.cells[2].innerText;
    document.getElementById('itemQty').value = parseInt(row.cells[3].innerText);

    document.getElementById('formTitle').innerText = 'Редактировать товар';
    document.getElementById('saveBtn').innerText = 'Сохранить изменения';
}

// Добавление товара на точку конкретной деревни
function addItemToVillage(tableId, nameId, sizeId, qtyId) {
    const name = document.getElementById(nameId).value.trim();
    const size = document.getElementById(sizeId).value.trim();
    const qty = document.getElementById(qtyId).value.trim();

    if (!name || !size || !qty) {
        alert('Заполните поля для товара!');
        return;
    }

    const table = document.getElementById(tableId);
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${size}</td>
        <td>${qty} шт.</td>
        <td><button class="btn-sm btn-danger" onclick="this.closest('tr').remove()">Убрать</button></td>
    `;
    table.appendChild(row);

    document.getElementById(nameId).value = '';
    document.getElementById(sizeId).value = '';
    document.getElementById(qtyId).value = '';
}

// Динамическое создание нового населенного пункта
function addNewVillage() {
    const vName = document.getElementById('newVillageName').value.trim();
    const opName = document.getElementById('newOperatorName').value.trim();

    if (!vName || !opName) {
        alert('Введите название поселка и имя оператора!');
        return;
    }

    const villageId = 'village_' + Date.now();
    const tableId = villageId + 'Table';
    const nameInputId = villageId + 'Name';
    const sizeInputId = villageId + 'Size';
    const qtyInputId = villageId + 'Qty';

    // Создаем вкладку
    const tabsContainer = document.getElementById('villageTabs');
    const newTabBtn = document.createElement('button');
    newTabBtn.className = 'tab-btn';
    newTabBtn.innerText = vName;
    newTabBtn.onclick = function(event) { switchVillage(villageId, event); };
    tabsContainer.appendChild(newTabBtn);

    // Создаем панель управления точкой
    const panelsContainer = document.getElementById('dynamicPanelsContainer');
    const newPanel = document.createElement('div');
    newPanel.id = villageId;
    newPanel.className = 'village-panel';
    newPanel.innerHTML = `
        <div class="operator-meta">
            <div>Оператор на точке: <strong>${opName}</strong></div>
            <div class="status-badge">Точка подключена</div>
        </div>
        <div class="table-responsive">
            <table id="${tableId}">
                <tr>
                    <th>Товар</th>
                    <th>Размер</th>
                    <th>В наличии</th>
                    <th>Действие</th>
                </tr>
            </table>
        </div>
        <div class="inline-controls">
            <input type="text" id="${nameInputId}" placeholder="Товар">
            <input type="text" id="${sizeInputId}" placeholder="Размер">
            <input type="number" id="${qtyInputId}" placeholder="Шт">
            <button class="btn-add-inline" onclick="addItemToVillage('${tableId}', '${nameInputId}', '${sizeInputId}', '${qtyInputId}')">+</button>
        </div>
    `;
    panelsContainer.appendChild(newPanel);

    document.getElementById('newVillageName').value = '';
    document.getElementById('newOperatorName').value = '';

    alert('Населенный пункт успешно добавлен!');
}

// Обработка отправки вопросов в ИИ-чат
function handleChatPress(e) {
    if (e.key === 'Enter') {
        sendToAI();
    }
}

function sendToAI() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    const chatContainer = document.getElementById('chatContainer');

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.innerText = text;
    chatContainer.appendChild(userMsg);

    input.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'chat-msg ai';
        
        const lower = text.toLowerCase();
        if (lower.includes('сосновк') || lower.includes('довезти') || lower.includes('остатк')) {
            aiMsg.innerText = 'Анализ остатков: в Поселке Сосновка мало ходовых размеров. Рекомендую сформировать партию на догрузку с центрального склада.';
        } else if (lower.includes('калиновк')) {
            aiMsg.innerText = 'Поселок Калиновка: текущих остатков достаточно, срочных отправок не требуется.';
        } else {
            aiMsg.innerText = 'Я проанализировал данные платформы. Все активные пункты и локальные операторы передали актуальные сведения об остатках.';
        }

        chatContainer.appendChild(aiMsg);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 500);
}
