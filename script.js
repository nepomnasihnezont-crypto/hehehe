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
    `;
    
    table.appendChild(row);

    document.getElementById('itemName').value = '';
    document.getElementById('itemSizes').value = '';
    document.getElementById('itemQty').value = '';
}
