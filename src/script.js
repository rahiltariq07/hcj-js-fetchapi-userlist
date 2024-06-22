'use strict';

const userTableBody = document.querySelector('.user-table tbody');

const renderUserRow = function (user) {
    const html = `
    <tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
    </tr>
  `;
    userTableBody.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
    const html = `<tr><td colspan="4">${msg}</td></tr>`;
    userTableBody.insertAdjacentHTML('beforeend', html);
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
        return response.json();
    });
};

const fetchUserData = function () {
    getJSON('https://jsonplaceholder.typicode.com/users')
        .then(users => users.forEach(user => renderUserRow(user)))
        .catch(err => renderError(`Something went wrong: ${err.message}`));
};

document.addEventListener('DOMContentLoaded', fetchUserData);