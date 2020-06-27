const socket = io();

socket.on('User Connected', currentUserData => {
    console.log(currentUserData);
    
    $('#box-footer box-comments').append($('<li>')).html(currentUserData)
    // outputData(currentUserData)
});

function outputData(currentUserData){
    const div = document.createElement('div');
    div.classList.add('box-comment');
    div.innerHTML = `<div class="comment-text">
        <span class="username">
            Maria Gonzales
            <span class="text-muted pull-right">8:03 PM Today</span>
        </span>
        ${currentUserData}
    </div>`;
    document.querySelector('.box-footer box-comments').appendChild(div);
};