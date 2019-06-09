var url = ''
var tags = []

var list = document.createElement('ul')
list.id = 'tagList'

function urlChangeEvent() {
    tags = []
    url = window.location.href
    if(url.indexOf('/watch') == -1) return
    // At davids we had to make sure we grabbed the data before YT removed it from the dom 
    // couldn't be botherd with that so i just AJAX the conent in (this gets the html source without JS running on it so it doesn't alter itself)
    // this means it works in much the same way that the c# program works.
    $.get(url).done(function(data){
        var start = data.indexOf('keywords\\') + 11
        var end = data.indexOf(']', start) + 1
        tags = JSON.parse(data.substring(start, end).replace(/\\/g, ''))
        list.innerHTML = `<li>${tags.join('</li><li>')}</li>`
    });
}

function addTagsToPage() {
    if (tags.length == 0) return
    var tagList = document.getElementById("tagList")
    if(!tagList) {
        var container = document.getElementById("info")
        if(container) {
            container.append(list)
        }
    }
}

setInterval(function(){
    if(url !== window.location.href) urlChangeEvent()
    addTagsToPage() // this is not in the urlChange function as YT edits the element and deletes our content on the initlal load 
}, 500);