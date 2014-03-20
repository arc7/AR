


function jsonError(response) {
	if (response) console.log(JSON.stringify(response));
    console.error("Erreur");
    alert("Erreur : " + JSON.stringify(response));
    console.log('Not working!');                  
}

function postJson(action, obj, callback, needUserData) {
	
	
	to = obj;
	
	obj = new Object;
	obj.data = to;
	
	obj.params = new Object;
	obj.params.action = action;
	if (needUserData != false) {
		getCurrentUser();
		obj.params.uid = getStorageVal("uid");
		obj.params.token = getStorageVal("token");
	}
	
	console.log(obj);
	
    //jsonTosend = "data="+JSON.stringify(obj);
    jsonTosend = "data="+$.toJSON(obj);
    //jsonTosend = JSON.stringify(obj);
    alert(jsonTosend);
    console.log("http://rb.cerivan.com/app/call/post.php?g=yes&"+jsonTosend);
    
	$.ajax({
	    type       : "POST",
	    url        : "http://rb.cerivan.com/app/call/post.php",
	    data       : jsonTosend,
	    success    : function(response) {
	    	if (response.success == false) {
		    	alert("Operation echoue ! : "+response.success)
			jsonError(response);
		    	return false;
	    	}
	        console.log(JSON.stringify(response));
	        console.log('Works!');
	        alert("Good : "+JSON.stringify(response));

			if (callback) {	        
			
				eval(callback+"(response)");
				// find object
				//var fn = window[fonction];
				 
				// is object a function?
				//if (typeof fn === "function") fn.apply(null, response);
	        }
	        
	        return response;
	    },
	    error      : function() {
		    jsonError(false);
	    }
	}); 
	
}






function getStorageVal(key) {
	value = window.localStorage.getItem(key);
	
	if (value) return value;
	else return false;
}

function setStorageVal(key, value) {
	window.localStorage.setItem(key, value);
}

function removeStorageVal(key) {
	window.localStorage.removeItem(key);
}


// Fonction de génération d'une chaîne aléatoire formées de caractères contenues dans charSet
var charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomString(length) {
	var i = 0;
	var charPos = 0;
	var string = "";
	for(i=0;i<length;i++) {
		charPos = Math.floor(Math.random()*charSet.length);
		//console.log(charPos);
		string = string.concat(charSet.charAt(charPos));
		//console.log(charSet.charAt(charPos));
	}
	return string;
}
			
var salt = randomString(6);
			
// Fonction de salage prenant en paramètres la chaîne à saler et la chaîne utilisée pour le salage
function saler(a,b)
{
	return b.substr(0,3).concat(a,b.substr(3,3));
}
	
// Fonction de test du hashage
function runTest() {
	//var texte_cryptage = $("#texte").val();
	var texte_cryptage = "Bonjour";
	/*$("#test").text("");
	$("#test").append("Numéro a saler et hasher : "+texte_cryptage+"<br />");
	var texte_cryptage_s = saler(texte_cryptage, salt);
	$("#test").append("Salage : "+texte_cryptage_s+"<br />");
	var texte_cryptage_s_h_md5 = hex_md5(texte_cryptage_s);
	$("#test").append("Hashage md5 : "+texte_cryptage_s_h_md5+"<br />");
	var texte_cryptage_s_h_sha1 = hex_sha1(texte_cryptage_s);
	$("#test").append("Hashage sha1 : "+texte_cryptage_s_h_sha1+"<br />");*/
	var results = "";
	results = results.concat("Numéro à saler et hasher : ",texte_cryptage,"<br />");
	var texte_cryptage_s = saler(texte_cryptage, salt);
	results = results.concat("Salage : ",texte_cryptage_s,"<br />");
	var texte_cryptage_s_h_md5 = hex_md5(texte_cryptage_s);
	results = results.concat("Hashage md5 : ",texte_cryptage_s_h_md5,"<br />");
	var texte_cryptage_s_h_sha1 = hex_sha1(texte_cryptage_s);
	results = results.concat("Hashage sha1 : ",texte_cryptage_s_h_sha1);
	alert(results);
}
