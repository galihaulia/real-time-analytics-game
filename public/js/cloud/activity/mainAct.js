const message = document.getElementById('message')

const socket = io();

// socket.on('User Connect', data)

socket.on('LogAction', data => {
    console.log(data);
    outputData(data)

    message.scrollTop = message.scrollHeight;
});

function outputData(data){
    const div = document.createElement('div');
    div.classList.add('box-comment');
    div.innerHTML = `<div class="comment-text">
        <span class="username">
            ${data.id}
            <span class="text-muted pull-right">${data.time}</span>
        </span>
        ${data.text}
    </div>`;
    document.getElementById('message').appendChild(div);
};