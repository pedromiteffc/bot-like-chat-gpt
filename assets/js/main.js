const chatLog = document.getElementById('chat-log')
const userInput = document.getElementById('user-input')
const sendButton = document.getElementById('send-button')
const buttonIcon = document.getElementById('button-icon')
const info = document.querySelector('.info')

sendButton.addEventListener('click', sendMessage)
userInput.addEventListener('keydown', (event) => 
{
    if (event.key === 'Enter') 
    {
        sendMessage();
    }
});

function sendMessage() 
{
    const message = userInput.value.trim()
    if (message === '') 
    {
        return;
    }
    // if message = developer - show our message
    else if (message === 'developer') 
    {
        userInput.value = ''
        appendMessage('user', message)
        setTimeout(() => 
        {
            appendMessage('bot', 'Desarrollado por Pedro Miteff \nIG : @pedro.miteff')
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane')
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse')
        }, 2000)
        return
    }

    appendMessage('user', message)
    userInput.value = ''

    const options = 
    {
        method: 'POST',
        headers: 
        {
            'content-type': 'application/json',
		    'X-RapidAPI-Key': 'b6f9c4122bmshf3e8be8604977e3p1e15d4jsnfe8bb92a8cf1',
		    'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
        },
        body: `{"messages":[{"role":"user","content":"${message}"}]}`
    }

    fetch('https://chatgpt53.p.rapidapi.com/', options).then((response) => response.json()).then((response) => 
    {
        appendMessage('bot', response.choices[0].message.content)
        buttonIcon.classList.add('fa-solid', 'fa-paper-plane')
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse')
    }).catch((err) => 
    {
        if (err.name === 'TypeError') 
        {
            appendMessage('bot', 'Error : Checkea la KEY de la API!')
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane')
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse')
        }
    });
}

function appendMessage(sender, message) 
{
    info.style.display = "none"
    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane')
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse')

    const messageElement = document.createElement('div')
    const iconElement = document.createElement('div')
    const chatElement = document.createElement('div')
    const icon = document.createElement('i')

    chatElement.classList.add("chat-box")
    iconElement.classList.add("icon")
    messageElement.classList.add(sender)
    messageElement.innerText = message

    if (sender === 'user') 
    {
        icon.classList.add('fa-regular', 'fa-user')
        iconElement.setAttribute('id', 'user-icon')
    } else 
    {
        icon.classList.add('fa-solid', 'fa-robot')
        iconElement.setAttribute('id', 'bot-icon')
    }

    iconElement.appendChild(icon)
    chatElement.appendChild(iconElement)
    chatElement.appendChild(messageElement)
    chatLog.appendChild(chatElement)
    chatLog.scrollTo = chatLog.scrollHeight

}
