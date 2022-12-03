function sendGetAsync(serverUrl, handleJson, handleFailMessage) {
  fetch(serverUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      handleFailMessage(reasonFromResponse(response));
      return [];
    })
    .then(handleJson)
    .catch((reason) => handleFailMessage(reason));
}

function sendPostAsync(serverUrl, body, handleSuccess, handleFailMessage, handleFinally) {
  fetch(serverUrl,
    {
      method: 'POST',
      body: body
    })
    .then((response) => {
      if (response.ok) {
        handleSuccess();
      } else {
        handleFailMessage(reasonFromResponse(response));
      }
    })
    .catch((reason) => handleFailMessage(reason))
    .finally(handleFinally);
}

function reasonFromResponse(response) {
  return `${response.status} ${response.statusText}`;
}

export {sendGetAsync, sendPostAsync};
