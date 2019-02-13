//google maps API https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=AIzaSyBAz-zWRCP-j42_wjHZyvaIV-0Om1gzswA
//

var wayOfCommuting, commutingMode, term, sechedule;
var allCourses = new Set();

function equals(a,b){
	let ka = [];
	let kb = [];
	for(let key in a)
		ka.push(key);
	for(let key in b)
		kb.push(key);
	if(ka.length!=kb.length)
		return false;
	for(k in ka)
		if(a[ka]!=b[ka])
			return false;
	return true;
}

/*
 function getData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    })
    .then(response => response.json()); // parses response to JSON
}
 */

function timeRequiredForTravel(b0, b1, commutingMode, departure_time){
	let request = new XMLHttpRequest();
	request.open("GET", "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+b0.streetAddress+"+ON&destinations="+b1.streetAddress+"+ON&mode="+commutingMode+"&key=AIzaSyBAz-zWRCP-j42_wjHZyvaIV-0Om1gzswA", true);
	request.onload = function(){
		let data = JSON.parse(this.response);
		if(data.status!="OK"||data.rows[0].elements[0].status!="OK")
			return "ERROR";
		return 
	}
	request.send();
}

function Course(title, courseType, sections){
	this.title = title;
	this.catalogNumber = catalogNumber;
	this.courseType = courseType;
	this.credits = credits;
	this.sections = [];
	this.addSection = function(section) {
		this.sections.push(section);
	}
	this.indexOfSection = function(section) {
		for(let i=0;i<sections.length;i++)
			if(equals(section, sections[i])
				return i;
		return -1;
	}
}

function Section(course, online, credits, sessons){
	this.course = course;
	this.online = online;
	this.credits = credits;
	this.sessons = [];
	this.addSesson = function(sesson){
		this.sessons.push(sesson);
	}
	this.indexOfSesson = function(sesson){
		for(let i=0;i<sections.length;i++)
			if(equals(section, sections[i])
				return i;
		return -1;
	}
}


function Sesson(section, type, sectionNumber, building, date, days, starting, ending){
	this.section = section;
	this.type = type;
	this.building = building;
	this.date = date;
	this.days = days;
	this.starting = starting;
	this.ending = ending;
	this.
}

function convertMeetingTime(day, start,end){
	return {Day:day, H:Math.floor(start/6000/60), M:((start/6000)%60)};
}


