$(document).ready(function(){


	$('#searchMe').keyup(function(){
		populateData($(this).val());
	});
	populateData();
});

/*
$('#mozTab a').click(function (mozArg) {
	mozArg.preventDefault();
	$(this).tab('show');
});
*/
function populateData(city){
	$.get('./data', function(data){
		if (data){
			var string = "";
			var months = new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
			var events = data.objects;
			for (var i=0;i<events.length;i++) {
				var event = events[i];
				if(city=="" || typeof city=="undefined" || event.city.toLowerCase().indexOf(city)>=0 || 
					event.city.indexOf(city)>=0) {	
					date = new Date(event.start);
					string+= "<section class=\"event\"><p class=\"calendar event-time\"><time datetime=\"";
					string+= new Date(event.start);
					string+= "\">";
					string+= "<span class=\"calendar-month\">"+months[date.getMonth()]+"</span>";
					string+= "<span class=\"calendar-date\">"+date.getDate()+"</span>";
					string+= "<span class=\"calendar-year\">"+date.getFullYear()+"</span>";
					string+= "</time></p>";
					string+= "<h3><a href=\""+event.event_url+"\">"+event.name+"</a></h3>";
					string+= "<p>"+event.description+"</p>";
					string+= "</section>";
				}
			}

			$("#centfix").html(string);
		}
	});
}
