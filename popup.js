function updateList() {
    chrome.storage.sync.get({ whitelist: [] }, function (data) {
        const whitelist = data.whitelist;
        const listContainer = document.getElementById("list-container");

        listContainer.innerHTML = "";

        whitelist.forEach(function (item) {
            const listItem = document.createElement("div");
            listItem.textContent = item;
            listContainer.appendChild(listItem);
        });
    });
}

function saveList(whitelist) {
    chrome.storage.sync.set({ whitelist: whitelist });
}

document.addEventListener("DOMContentLoaded", function () {
    updateList();

    document.getElementById("add-button").addEventListener("click", function () {
        const newItem = document.getElementById("new-item").value.trim();
        if (newItem !== "") {
            chrome.storage.sync.get({ whitelist: [] }, function (data) {
                const whitelist = data.whitelist;
                whitelist.push(newItem);
                saveList(whitelist);
                updateList();
            });
        }
    });

    document.getElementById("remove-button").addEventListener("click", function () {
        const selectedItem = document.getElementById("selected-item").value.trim();
        if (selectedItem !== "") {
            chrome.storage.sync.get({ whitelist: [] }, function (data) {
                const whitelist = data.whitelist.filter(item => item !== selectedItem);
                saveList(whitelist);
                updateList();
            });
        }
    });
});