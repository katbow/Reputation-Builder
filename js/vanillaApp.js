
   // this function takes the question object returned by the StackOverflow request
   // and returns new results to be appended to DOM
var showQuestion = function(question) {
    var xhr = new XMLHttpRequest();
    var response;
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            response = JSON.parse(xhr.responseText);
        }
    };
    xhr.open("GET", "https://api.stackexchange.com/2.2/questions/unanswered?order=desc&sort=activity&site=stackoverflow", true);
    xhr.send();
    var result = response.items;
    return result;
};

showQuestion();

// this function takes the results object from StackOverflow
// and returns the number of results and tags to be appended to DOM
var showSearchResults = function(query, resultNum) {
    var results = resultNum + ' results for <strong>' + query + '</strong>';
    return results;
};


// takes a string from input and searches
// for unanswered questions on StackOverflow API.

var getUnanswered = function(inputTags) {
    var x = showQuestion(); //all questions
    var questionString = '';
    for (var i = 0; i < x.length; i++) { //for each Q get the tags
        console.log(x[i].tags.indexOf("python"));
        if(x[i].tags.indexOf(inputTags) > -1) {
            questionString += x[i].link;
        }
    }
    console.log(questionString);
    return questionString;
};

console.log(getUnanswered());


document.getElementById('unanswered-getter').addEventListener('submit',function(e){
	  e.preventDefault();
	  document.getElementById('results').innerHTML+="";
	  var inputTags = document.getElementById('tags').value;
	  getUnanswered(inputTags);
});
