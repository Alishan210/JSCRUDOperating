let users = [];
let userId = 1;

document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const usernameInput = document.getElementById('username');
    const ageInput = document.getElementById('age');
    const userIdInput = document.getElementById('userId');

    const username = usernameInput.value.trim();
    const age = parseInt(ageInput.value);

    if (!username) return;

    // here, Age validition check : must be between 18 and 50
    if (age < 18 || age > 50) {
        alert('Age must be between 18 and 50');
        return;
    }

    if (userIdInput.value) {
        // Update user
        const id = parseInt(userIdInput.value);
        updateUser(id, username, age);
    } else {
        // Create new user
        createUser(username, age);
    }

    usernameInput.value = '';
    ageInput.value = '';
    userIdInput.value = '';
});

function createUser(name, age) {
    users.push({ id: userId++, name, age });
    renderUserTable();
}

function readUsers() {
    return users;
}

function updateUser(id, name, age) {
    const user = users.find(user => user.id === id);
    if (user) {
        user.name = name;
        user.age = age;
        renderUserTable();
    }
}

function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    renderUserTable();
}

function editUser(id) {
    const user = users.find(user => user.id === id);
    if (user) {
        document.getElementById('username').value = user.name;
        document.getElementById('age').value = user.age;
        document.getElementById('userId').value = user.id;
    }
}

function renderUserTable() {
    const userTableBody = document.querySelector('#userTable tbody');
    userTableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;

        userTableBody.appendChild(row);
    });
}

renderUserTable();
