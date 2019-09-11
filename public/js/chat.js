const socket=io()


var typing=false
socket.on('NewMsg',(msg)=>{
    typing=false
    const activities=document.getElementsByClassName('activity')
    activities[activities.length-1].innerHTML=""
    const previousChat=document.getElementById("chatbox").innerHTML
    const newContent="<div class='row'><div class='col-md-6' id='usermsg'><img  id='usericon' src='../img/user.png'>"+msg+"</div></div>"
    document.getElementById("chatbox").innerHTML =previousChat+ newContent
    var objDiv = document.getElementById("chatbox");
    objDiv.scrollTop = objDiv.scrollHeight;
})

socket.on('Location',(loc)=>{
    const previousChat=document.getElementById("chatbox").innerHTML
    document.getElementById("chatbox").innerHTML =previousChat+ "<br><iframe src="+loc+"></iframe>"
})


socket.on('UserActivity',(msg)=>{
    const previousChat=document.getElementById("chatbox").innerHTML
    document.getElementById("chatbox").innerHTML =previousChat+ "<br><div class='activity'>"+msg+"</div>"
})

document.getElementById("btn").addEventListener("click", function(event){
    event.preventDefault()
    const msg=document.getElementById("msgToSent").value
    socket.emit('SentMsg',msg)
    const previousChat=document.getElementById("chatbox").innerHTML
    const newContent="<div class='row'><div class='col-md-6'></div><div class='col-md-6 ' id='mymsg'><img  id='usericon' src='../img/me.jpg'>"+msg+"</div>"
    document.getElementById("chatbox").innerHTML =previousChat+ newContent
    var objDiv = document.getElementById("chatbox");
    objDiv.scrollTop = objDiv.scrollHeight;
})

document.getElementById("locbtn").addEventListener("click", function(event) {
    event.preventDefault()
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            socket.emit('SentLoc',{latitude:position.coords.latitude,longitude:position.coords.longitude})
            const previousChat=document.getElementById("chatbox").innerHTML
            const loc='https://www.google.com/maps/embed/v1/place?key=AIzaSyD09F8FplxMPti1C4ePgGwbnoWqMxz9y0s%20&q='+position.coords.latitude+','+position.coords.longitude
            document.getElementById("chatbox").innerHTML =previousChat+ "<br><iframe src="+loc+"></iframe>"
        })
    }
})


document.getElementById("clear").addEventListener("click", function(event) {
    const result=confirm("Are you sure ?",)
    console.log(result)
    if(result)
        document.getElementById("chatbox").innerHTML=" <div style=\"text-align: center;border-bottom: 2px solid black\"><h4>Chat Box</h4></div>"
})


const userTyping=()=>{
    if(typing === false) {
        socket.emit('UserTyping')
        typing=true
    }
}