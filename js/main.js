


function jsonError(response) {
	if (response) console.log(JSON.stringify(response));
    console.error("Erreur");
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
	
	
    jsonTosend = "data="+$.toJSON(obj);
    alert(jsonTosend);
    console.log("http://rb.cerivan.com/app/call/post.php?g=yes&"+jsonTosend);
    
	$.ajax({
	    type       : "POST",
	    url        : "http://rb.cerivan.com/app/call/post.php",
	    data       : jsonTosend,
	    dataType   : 'json',
	    success    : function(response) {
	    	if (response.success == false) {
		    	jsonError(response);
		    	return false;
	    	}
	        console.log(JSON.stringify(response));
	        console.log('Works!');

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


// Fonction de g�n�ration d'une cha�ne al�atoire form�es de caract�res contenues dans charSet
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
			
// Fonction de salage prenant en param�tres la cha�ne � saler et la cha�ne utilis�e pour le salage
			function saler(a,b)
			{
				return b.substr(0,3).concat(a,b.substr(3,3));
			}
	
// Fonction de test du hashage
function runTest() {
	//var texte_cryptage = $("#texte").val();
	var texte_cryptage = "Bonjour";
	/*$("#test").text("");
	$("#test").append("Num�ro a saler et hasher : "+texte_cryptage+"<br />");
	var texte_cryptage_s = saler(texte_cryptage, salt);
	$("#test").append("Salage : "+texte_cryptage_s+"<br />");
	var texte_cryptage_s_h_md5 = hex_md5(texte_cryptage_s);
	$("#test").append("Hashage md5 : "+texte_cryptage_s_h_md5+"<br />");
	var texte_cryptage_s_h_sha1 = hex_sha1(texte_cryptage_s);
	$("#test").append("Hashage sha1 : "+texte_cryptage_s_h_sha1+"<br />");*/
	var results = "";
	results+="Num�ro � saler et hasher : "+texte_cryptage+"<br />";
	var texte_cryptage_s = saler(texte_cryptage, salt);
	results+="Salage : "+texte_cryptage_s+"<br />";
	var texte_cryptage_s_h_md5 = hex_md5(texte_cryptage_s);
	results+="Hashage md5 : "+texte_cryptage_s_h_md5+"<br />";
	var texte_cryptage_s_h_sha1 = hex_sha1(texte_cryptage_s);
	results+="Hashage sha1 : "+texte_cryptage_s_h_sha1;
	
}
