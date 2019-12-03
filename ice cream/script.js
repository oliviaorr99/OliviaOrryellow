"use strict";
var ow_icons_map={
    //clear 
    "01d": "wi-day-sunny",
    "01n": "wi-night-clear",
    //few clouds
    "02d": "wi-day-cloudy",
    "02n": "wi-night-cloudy",
    //scattered clouds
    "03d": "wi-cloud",
    "03n": "wi-cloud",
    //broken clouds
    "04d": "wi-cloudy",
    "04n": "wi-cloudy",
    //shower rain
    "09d": "wi-day-rain",
    "09n": "wi-night-rain",
    //rain
    "10d": "wi-rain",
    "10n": "wi-rain",
    //thunder storm
    "11d": "wi-thunderstorm",
    "11n": "wi-thunderstorm",
    //snow
    "13d": "wi-snow",
    "13n": "wi-snow",
    //mist
    "50d": "wi-day-haze",
    "50n": "wi-cloudy"
};

var bkgrndgif={
	//clear
	"01d": "snow",
    "01n": "snow",
    //few clouds
    "02d": "wind",
    "02n": "wind",
    //scattered clouds
    "03d": "wind",
    "03n": "wind",
    //broken clouds
    "04d": "wind",
    "04n": "wind",
    //shower rain
    "09d": "snow",
    "09n": "snow",
    //rain
    "10d": "snow",
    "10n": "snow",
    //thunder storm
    "11d": "snow",
    "11n": "snow",
    //snow
    "13d": "snow",
    "13n": "snow",
    //mist
    "50d": "snow",
    "50n": "snow"
};

var mock= {
 
  ow: {
    "coord":{
        "lon":17.11,
        "lat":48.15
    },
    "weather":[
        {"id":800,
        "main":"Clear",
        "description": "clear sky",
        "icon":"01d"
        }
    ], //http://openweathermap.org/weather-conditions
    "base":"stations",
    "main":{
        "temp":283.768,  // templota Kelvin
        "pressure":1015.45, //tlak
        "humidity":78, //vlhkost %
        "temp_min":283.768, 
        "temp_max":283.768,
        "sea_level":1030.6,
        "grnd_level":1015.45
    },
    "wind":{
        "speed":2.41, // rychost vetra
        "deg":346.001  // smer vetra
    },
    "clouds":{"all":0}, // percentualna hodnota mraky
    "dt":1475848834,
    "sys":{
        "message":0.0043,
        "country":"SK",
        "sunrise":1475816434,
        "sunset":1475857010
    },
    "id":3060972,
    "name":"Bratislava",
    "cod":200
  }
};

var w_api = {
  resp : {
    "ow": undefined
  },

  lpad: function(s) {
    return ("00"+s).slice(-2);
  },

  format_time: function(d) {
    return this.lpad(d.getHours())+":"+("00"+d.getMinutes()).slice(-2);
  },

  format_epoch_time: function(epoch) {
    var d=new Date(epoch*1000);
    this.format_time(d);
  },

  makeResp: function(r, dst_api) {
     if (dst_api === "ow") {
      this.resp.ow = {
        "city" : r.name,
        "description": r.weather[0].main,
        "temp_c": Math.round(r.main.temp-273.15),
        "temp_f": Math.round((r.main.temp*9)/5-459.67),
        "pressure": r.main.pressure,
        "humidity": r.main.humidity,
        "wind_speed": r.wind.speed*2.237,
        "wind_direction": r.wind.deg,
        "sunrise": this.format_epoch_time(r.sys.sunrise),
        "sunset": this.format_epoch_time(r.sys.sunset),
        "icon": ow_icons_map[r.weather[0].icon],
        "time" : this.format_time(new Date())
      };
      document.body.style.background = "url('"+bkgrndgif[r.weather[0].icon]+".gif') no-repeat center center fixed";
      document.body.style.backgroundSize = "cover";
    }
    else {
      alert("Not implemented"); 
    }
  },

  makeOWResp: function(r) {
    this.makeResp(r, "ow");
    return this.resp.ow;
  },

  getPos: function() {
    var deferred=$.Deferred();
    var geo=navigator.geolocation;
		if (geo) {
			geo.getCurrentPosition(function(position) {
				var pos = {
				  lon:Math.round(position.coords.longitude*1000)/1000,
				  lat:Math.round(position.coords.latitude*1000)/1000
				}
				deferred.resolve(pos);
				
			}, function(error) {
				deferred.reject(undefined, "Position unresolved", error.code + ":" + error.message);
		  });
		}
		else {
			deferred.reject(undefined, "Position unresolved", "Location not supported");
		}
    return deferred.promise();
  },

  getData: function(flag_mock, dst_api) {
    if (flag_mock) {
      this.makeResp(mock[dst_api], dst_api);
    }
    /*if (this.resp[dst_api] === undefined) {*/
	  return this.getPos().then(function(pos) {
		if (dst_api === "ow") {
			if (document.getElementById("newlat").value != "") {
				return $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+document.getElementById("newlat").value+"&lon="+document.getElementById("newlon").value+"&APPID=08c264711f9ddd89e8aadccc26c148db")
					.then(function(r) {
						return w_api.makeOWResp(r);
					});
			}
			else {
				/*alert("http://api.openweathermap.org/data/2.5/weather?lat="+pos.lat+"&lon="+pos.lon+"&APPID=08c264711f9ddd89e8aadccc26c148db");*/
				return $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+pos.lat+"&lon="+pos.lon+"&APPID=08c264711f9ddd89e8aadccc26c148db")
					.then(function(r) {
						return w_api.makeOWResp(r);
					});
			}
		}
	  });
    /*}
    else {
      var deffered=$.Deferred();
      deffered.resolve(this.resp[dst_api]);
      return deffered.promise();
    };*/
  }
};

function fill_element(elem, content) {
    if (content !== undefined) {
        //$(elem).html(content + $(elem).html());
        $(elem).html(content);
    }
}

function k2c(k) {
    return Math.round(k-273.15);
}
function k2f(k) {
    return Math.round((k*9)/5-459.67);
}

function init_temperature(value) {
    $("#l_temp_value")
        .attr("data-kelvin", value)
        .attr("data-unit", "C");
    fill_temperature(); //Celsius is default
}

function fill_temperature() {
    var k=$("#l_temp_value").attr("data-kelvin");
    var u=$("#l_temp_value").attr("data-unit");
    if (u==="C") {
        //switch to F
        $("#l_temp_value")
            .html(k2f(k) + ' &deg;F')
            .attr("data-unit", "F");
        $("#l_temp_unit").html(' &deg;C');
    }
    else {
		//switch to C
        $("#l_temp_value")
            .html(k2c(k) + ' &deg;C')
            .attr("data-unit", "C");
        $("#l_temp_unit").html(' &deg;F');
    }
}

$(document).ready(function() {
    $("#err_close").click( function() {
        $("div#error_box").css("display", "none");
    });

    fill_data("wu", false);

});

function close_window() {
    $("div#error_box").hide(500);
}

function fill_data(dst_api, flag_mock) {
    w_api.getData(flag_mock, dst_api)
        .done(function(r) {
            fill_element("#l_city", r.city /*+ ", " + r.time*/);
            fill_element("#l_description",r.description);
            init_temperature(r.temp_c+273.15);
            $("#l_icon").attr("class", "important wi "+r.icon);
            fill_element("#l_pressure",Math.round(r.pressure));
            fill_element("#l_humidity",Math.round(r.humidity));
            fill_element("#l_wind_speed",Math.round(r.wind_speed));
            fill_element("#l_wind_direction",Math.round(r.wind_direction));
            fill_element("#l_sunrise",r.sunrise);
            fill_element("#l_sunset",r.sunset);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus+"&nbsp;"+errorThrown);
            var error="";
            if (textStatus === "Position unresolved") {
                error+="<p>Unable to resolve position. Please check, if location tracking is enabled in Your browser.</p>";
                error+="<p>Error: " + errorThrown+ "</p>";
                $("div#error_header").html("Error resolving position");
            }
            else {
                error += "<p>Error retrieving data from ";
                if (dst_api === "wu") 
                    error += "Weather underground API.</p>";
                else {
                    error += "Open Weather Map API.</p>";
                    error += "<p>Open Weather API is currently used over http. Cross-domain http requests are denied in most browsers, if page is served over https. Currently (10.2016), it is possible to disable this error in Chrome browser.</p>"
                }
                error+="<p>Error: "+textStatus+"&nbsp;"+errorThrown+"</p>";
                $("div#error_header").html("Error getting data from weather API");
            }
            $("div#error_msg").html(error);
            $("div#error_box").show(500);
        });
}

function lonlat() {
	if (event.keyCode === 13) {
		var input = document.getElementById('zip');	
		var newLocation = input.value;
		var xhr = $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + newLocation + '&key=AIzaSyArvuafp78mSgScECq4NL3uGDiXf4RcCH8');
		xhr.done(function(data) {
			newlat.value = Math.round(data.results[0].geometry.location.lat*1000)/1000;
			newlon.value = Math.round(data.results[0].geometry.location.lng*1000)/1000;
		});
		fill_data('ow');
	} 
}

window.onload = fill_data('ow');