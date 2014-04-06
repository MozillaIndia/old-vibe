$(document).ready(function(){
	$.get('./data', function(data){
		if (data){
			var string = "";
			events = data.objects;
			for (var i=0;i<events.length;i++) {
				event = events[i];
				date = new Date(event.start);
				string+= "<section class=\"event\"><p class=\"calendar event-time\"><time datetime=\"";
				string+= new Date(event.start);
				string+= "\">";
				string+= "<span class=\"calendar-month\">"+date.getMonth()+"</span>";
				string+= "<span class=\"calendar-date\">"+date.getDate()+"</span>";
				string+= "<span class=\"calendar-year\">"+date.getYear()+"</span>";
				string+= "</time></p>";
				string+= "<h3><a href=\""+event.event_url+"\">"+event.name+"</a></h3>";
				string+= "<p>"+event.description+"</p>";
				string+= "</section>";
			}
			debugger
			$(".span8").html(string);
		}
	})
});