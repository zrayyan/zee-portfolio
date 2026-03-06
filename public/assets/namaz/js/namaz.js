



	var XMLHttpRequestObject = false;
	if (window.XMLHttpRequest) {
		XMLHttpRequestObject = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
	}
	function getData(dataSource, divID) {
		
		
		
		
		
		
		
		
		
		if (XMLHttpRequestObject) {
			var obj = document.getElementById(divID);
			XMLHttpRequestObject.open("GET", dataSource,true);
			XMLHttpRequestObject.onreadystatechange = function() {
				if (XMLHttpRequestObject.readyState == 4
						&& XMLHttpRequestObject.status == 200) {
	
					obj.innerHTML = XMLHttpRequestObject.responseText;
				}
			}
			XMLHttpRequestObject.send(null);
		}
	}
	
		

	function setdata(){
		
		var obj2 = document.getElementById("targetDiv2");		

		var latitude = document.getElementById("latti").value;
		var longitude = document.getElementById("longi").value;
		var year = document.getElementById("year").value;
		var timezone = document.getElementById("timezone").value;
		var method = document.getElementById("method").value;
				var methodJuristic = document.getElementById("methodJuristic").value;
		var daylight = document.getElementById("daylight").value;
		
		
		var fileName = 'pray.php?latitude='+latitude+'&longitude='+longitude+'&year='+year+'&timezone='+timezone+'&method='+method+'&methodJuristic='+methodJuristic+'&daylight='+daylight;
		getData(fileName,"targetDiv1");
		
		//obj2.innerHTML = fileName;
	}	
	
	
	
	