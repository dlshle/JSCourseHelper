//google maps API https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=AIzaSyBAz-zWRCP-j42_wjHZyvaIV-0Om1gzswA

var leastInterval, mostInterval, commutingMode, term, sechedule;
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
		for(let i=0;i<this.sections.length;i++)
			if(equals(section, this.sections[i])
				return i;
		return -1;
	}
}

function Section(course, online, credits, sessions){
	this.course = course;
	this.online = online;
	this.credits = credits;
	this.sessions = [];
	this.addSesson = function(session){
		this.sessions.push(sesson);
	}
	this.indexOfSesson = function(session){
		for(let i=0;i<this.sessions.length;i++)
			if(equals(section, this.sessions[i])
				return i;
		return -1;
	}
}

let DAY_MAPPING = {"M":0,"T":1, "W":2, "R":3, "F": 4, "SA", 5, "SU", 6};
function Session(section, type, sectionNumber, building, room, date, days, starting, ending){
	this.section = section;
	this.type = type;
	this.meetings = [];
	//if there's more than 1 meeting for the week, add'em
	for(day in days){
		meeting.push(new Meeting(this, this.building, this.room, DAY_MAPPING[day], this.starting, this.ending));
	}
	this.date = date;
}

function Meeting(session, building, room, day, start, end){
	this.session = session;
	this.building = building;
	this.room = room;
	this.day = day;
	this.start = start;
	this.end = end;
}

function isConflict(meeting0, meeting1, commutingMode, leastInterval, mostInterval){
	if(meeting0.start.time - meeting1.start.time == 0)
		//exactly the same starting... no way
		return true;
	if(meeting0.start.time - meeting1.start.time >= 0)
		//the premise is to assume meeting0 is before meeting1
		return isConflict(meeting1, meeting0, commutingMode, leastInterval, mostInterval);	
	let interval = meeting1.start.time - meeting0.end.time; 
	if(interval < leastInterval || interval > mostInterval)
		return true;
	interval = timeRequiredForTravel(meeting0.session.building, meeting1.session.building, commutingMode, meeting0.start);
	if(interval < leastInterval || interval > mostInterval)
		return true;
	return false;
}

function Schedule(commutingMode, leastInterval, mostInterval){
	this.commutingMode = commutingMode;
	this.leastInterval = leastInterval;
	this.mostInterval = mostInterval;
	this.week = [[],[],[],[],[],[],[]];

	this.addSection = function(section){
		for(let i=0;i<section.sessions.length;i++){
			if(!this.addSession(section.sessions[i]){
				for(let j=0;j<i;j++){
					this.removeSession(section.sessions[j]);
				}
				return false;
			}
		}
		return true;
	}

	this.removeSection = function(section){
		for(session in section.sessions)
			this.removeSession(session);
	}

	this.addSession = function(session){
		//sorta inefficient algorithm, will edit later...
		for(meeting in session.meetings)
			for(m in this.week[m.days])
				if(isConflict(m, meeting))
					return false;
		for(meeting in session.meetings)
			this.week[meeting.day].push(meeting);
		return true;
	}

	this.removeSession = function(session){
		for(meeting in session.meetings){
			for(let i=0;i<this.week[meeting.day].length;i++){
				//linear searching the specific meeting
				if(equals(this.week[meeting.day][i], meeting))
					//remove that specific meeting from the week[meeting.day]
					this.week[meeting.day].splice(i,1);
			}
		}
	}

}

function convertMeetingTime(time){
	return {time: time, h:Math.floor(start/6000/60), m:((start/6000)%60)};
}

function getSchedule(allCourses, commutingMode, leastInterval, mostInterval){
	let schedule = new Schedule(commutingMode, leastInterval, mostInterval);
	//TODO:make a function that tries every combination and finds the best one
}

