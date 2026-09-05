// Функция добавления товара в каталог
function addNewItem() {
    const name = document.getElementById('itemName').value.trim();
    const sizes = document.getElementById('itemSizes').value.trim();
    const qty = document.getElementById('itemQty').value.trim();

    if (!name || !sizes || !qty) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    const table = document.getElementById('catalogList');
    const art = Math.floor(1000 + Math.random() * 9000);

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${art}</td>
        <td>${name}</td>
        <td>${sizes}</td>
        <td>${qty} шт.</td>
        <td><button onclick="deleteRow(this)" style="background: #ef4444; padding: 4px 8px; font-size: 11px; width: auto;">Удалить</button></td>
    `;
    
    table.appendChild(row);

    // Очистка полей
    document.getElementById('itemName').value = '';
    document.getElementById('itemSizes').value = '';
    document.getElementById('itemQty').value = '';
}

// Функция удаления строки из таблицы
function deleteRow(btn) {
    const row = btn.closest('tr');
    row.remove();
}

// Функция добавления новой деревни (рейса)
function addVillage() {
    const villageName = document.getElementById('villageName').value.trim();
    const fillPercent = document.getElementById('villageFill').value.trim();

    if (!villageName || !fillPercent) {
        alert('Введите название деревни и процент заполнения!');
        return;
    }

    const container = document.getElementById('tripsContainer');

    const box = document.createElement('div');
    box.className = 'van-box';
    box.innerHTML = `
        <div class="van-header">
            <span>Автолавка (${villageName})</span>
            <span>${fillPercent}% заполнено</span>
        </div>
        <div class="progress-container">
            <div class="progress-bar" style="width: ${fillPercent}%;"></div>
        </div>
        <button onclick="this.parentElement.remove()" style="background: #ef4444; padding: 2px 6px; font-size: 10px; margin-top: 6px; width: auto;">Удалить рейс</button>
    `;

    container.appendChild(box);

    document.getElementById('villageName').value = '';
    document.getElementById('villageFill').value = '';
}
