$(document).ready(function(){
	document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady(){
	console.log("Device Ready");

	$('#show_more_location').click(function(e){
		e.preventDefault();
		getMoreLocation();
	});

	

	getDate();

	getLocation();

}

function getDate(){
	var currentdate = new Date();
	var datetime = currentdate.getDate() + "/"
				+ (currentdate.getMonth()+1) + "/"
				+ currentdate.getFullYear() + "@"
				+ currentdate.getHours() + ":"
				+ currentdate.getMinutes() + ":"
				+ currentdate.getSeconds();

	$("#datetime_display").html(datetime);

}

function getLocation(){
	console.log("Getting users location...");

	navigator.geolocation.getCurrentPosition(function(position){
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		var city = '';
		var state = '';
		var html = '';

		$.ajax({
			url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon,
			datatype: 'jsonp',
			success: function(response){
				console.log(response);

				city = response.results[0].address_components[2].long_name;
				country = response.results[0].address_components[4].long_name;

				html = '<h1>' + city + ', ' + country + '</h1>';

				$('#myLocation').html(html);

				//Get Weather Info
				getWeather(city, country);
			}
		})

	});

}

function getMoreLocation(){
	
	//Close Dropdown menu
	$('.navbar_toggle').click();

	var html = '';


	navigator.geolocation.getCurrentPosition(function(position){
		html = '<ul id="mode_location_list" class="list-group">' + 
				'<li class="list-group-item"><strong>Latitude: </strong>'+position.coords.latitude+'</li>' +
				'<li class="list-group-item"><strong>Longitude: </strong>'+position.coords.longitude+'</li>' +
				'<li class="list-group-item"><strong>Altitude: </strong>'+position.coords.altitude+'</li>' +
				'<li class="list-group-item"><strong>Accuracy: </strong>'+position.coords.accuracy+'</li>' +
				'</ul>';

		$('#more_location_display').html(html);

	})
}


function getWeather(city, country){
	console.log("getting weather for "+ city);

	var html = '';


	$.ajax({

		url: 'http://api.wunderground.com/api/dd22f9a2c200a1cc/conditions/q/CA/San_Francisco.json',
		datatype: 'jsonp',
		success: function(parsed_json){
			console.log(parsed_json.current_observation);

			weather = parsed_json['current_observation']['weather'];
			temperature_string = parsed_json['current_observation']['temp_c'];
			icon_url = parsed_json['current_observation']['icon_url'];

			html = '<h1 class="text-center"><img src="'+icon_url+'">'+weather+'</h1>' + 
					'<h2 class="text-center">'+temperature_string+'&deg; C</h2>';

			$('#weather').html(html);
		}
	});	
}