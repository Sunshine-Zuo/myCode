//自定义HashMap工具类
function HashMap() 
{ 
	var size = 0; 
	var entry = new Object(); 
	
	this.add = function (key , value) 
	{ 
		if(!this.containsKey(key)) 
		{ 
			size ++ ; 
		} 
		entry[key] = value; 
	} 
	
	this.get = function (key) 
	{ 
		return this.containsKey(key) ? entry[key] : null; 
	} 
	
	this.remove = function ( key ) 
	{ 
		if( this.containsKey(key) && ( delete entry[key] ) ) 
		{ 
			size --; 
		} 
	} 
	
	this.containsKey = function ( key ) 
	{ 
		return (key in entry); 
	} 
	
	this.containsValue = function ( value ) 
	{ 
		for(var prop in entry) 
		{ 
			if(entry[prop] == value) 
			{ 
				return true; 
			} 
		} 
		return false; 
	} 
	
	this.getValues = function () 
	{ 
		var values = new Array(); 
		for(var prop in entry) 
		{ 
			values.push(entry[prop]); 
		} 
		return values; 
	} 
	
	this.getKeys = function () 
	{ 
		var keys = new Array(); 
		for(var prop in entry) 
		{ 
			keys.push(prop); 
		} 
		return keys; 
	} 
	
	this.getSize = function () 
	{ 
		return size; 
	} 
	
	this.clear = function () 
	{ 
		size = 0; 
		entry = new Object(); 
	} 
}
//自定义日期工具类
//本工具类中所有输入和输出的月份范围都为0-11
DateUtils = {
	/***  
	* 获得当前日期对象 
	*/
	getCurrentDate : function () {  
		return new Date();  
	},
	/***  
	* 获得本周起止日期  
	*/  
	getCurrentWeek : function () {    
		var startStop = new Array();    
		var currentDate = this.getCurrentDate();  
		//返回date是一周中的某一天    
		var week = currentDate.getDay();  
		//返回date是一个月中的某一天    
		var month = currentDate.getDate();
		//一天的毫秒数    
		var millisecond = 1000 * 60 * 60 * 24;  
		//减去的天数    
		var minusDay = week != 0 ? week - 1 : 6;   
		//本周 周一    
		var monday = new Date(currentDate.getTime() - (minusDay * millisecond));  
		//本周 周日    
		var sunday = new Date(monday.getTime() + (6 * millisecond));   
		startStop.push(this.formatDate(monday));    
		startStop.push(this.formatDate(sunday));    
		return startStop;  
	},
	/***  
	* 获得本月的起止日期  
	*/  
	getCurrentMonth : function () {   
		var startStop = new Array();   
		var currentDate = this.getCurrentDate();  
		//获得当前月份0-11    
		var currentMonth = currentDate.getMonth();  
		//获得当前年份4位年    
		var currentYear = currentDate.getFullYear();  
		//求出本月第一天    
		var firstDay = new Date(currentYear, currentMonth, 1);
		//当为12月的时候年份需要加1    
		//月份需要更新为0 也就是下一年的第一个月    
		if (currentMonth == 11) {  
			currentYear++;  
			currentMonth = 0; //就为    
		} else {  
			//否则只是月份增加,以便求的下一月的第一天    
			currentMonth++;  
		}
		//一天的毫秒数    
		var millisecond = 1000 * 60 * 60 * 24;  
		//下月的第一天    
		var nextMonthDayOne = new Date(currentYear, currentMonth, 1);  
		//求出上月的最后一天    
		var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);   
		startStop.push(this.formatDate(firstDay));  
		startStop.push(this.formatDate(lastDay));   
		return startStop;  
	},
	/**  
	* 获得本季度的起止日期  
	*/  
	getCurrentSeason : function () {   
		var startStop = new Array();    
		var currentDate = this.getCurrentDate();    
		var currentMonth = currentDate.getMonth();    
		var currentYear = currentDate.getFullYear();  
		//获得本季度开始月份    
		var quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth);  
		//获得本季度结束月份    
		var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;
		//获得本季度开始的日期    
		var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);  
		//获得本季度结束的日期    
		var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, this.getMonthDays(currentYear, quarterSeasonEndMonth));   
		startStop.push(this.formatDate(quarterSeasonStartDate));  
		startStop.push(this.formatDate(quarterSeasonEndDate));    
		return startStop;  
	},
	/**  
	* 获得上一周的起止日期  
	* **/  
	getPreviousWeek : function () {    
		var startStop = new Array();    
		var currentDate = this.getCurrentDate();    
		var week = currentDate.getDay();   
		var month = currentDate.getDate();  
		//一天的毫秒数    
		var millisecond = 1000 * 60 * 60 * 24;  
		//减去的天数    
		var minusDay = week != 0 ? week - 1 : 6;  
		//获得当前周的第一天    
		var currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay));  
		//上周最后一天即本周开始的前一天    
		var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);  
		//上周的第一天    
		var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));     
		startStop.push(this.formatDate(priorWeekFirstDay));  
		startStop.push(this.formatDate(priorWeekLastDay));
		return startStop;  
	},
	/**  
	* 获得上一月的起止日期  
	* ***/  
	getPreviousMonth : function () {   
		var startStop = new Array();  
		var currentDate = this.getCurrentDate();    
		var currentMonth = currentDate.getMonth();   
		var currentYear = currentDate.getFullYear();  
		//获得上一个月的第一天    
		var priorMonthFirstDay = this.getPriorMonthFirstDay(currentYear, currentMonth);  
		//获得上一月的最后一天    
		var priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), this.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()));  
		//添加至数组    
		startStop.push(this.formatDate(priorMonthFirstDay));  
		startStop.push(this.formatDate(priorMonthLastDay));  
		//返回    
		return startStop;  
	},
	/**  
	* 得到上季度的起止日期  
	* **/  
	getPreviousSeason : function () {     
		var startStop = new Array();   
		var currentDate = this.getCurrentDate();    
		var currentMonth = currentDate.getMonth();   
		var currentYear = currentDate.getFullYear();  
		//上季度的第一天    
		var priorSeasonFirstDay = this.getPriorSeasonFirstDay(currentYear, currentMonth);  
		//上季度的最后一天    
		var priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2, this.getMonthDays(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2));     
		startStop.push(this.formatDate(priorSeasonFirstDay));  
		startStop.push(this.formatDate(priorSeasonLastDay));  
		return startStop;  
	},
	/**
	 * 得到指定周期的上一个周期，天数相同
	 * @param  begin 开始日期 年月日
	 * @param  end 结束日期 年月日
	 */
	getLastPeriod : function(begin,end){
		var startStop = new Array();
		var millisecond = 1000 * 60 * 60 * 24;
		//天数差
		var minusDay = (new Date(end).getTime() - new Date(begin).getTime())/millisecond + 1;
		//上一周期的第一天
		var lastPeriodBegin = new Date(new Date(begin).getTime() - minusDay*millisecond);
		var lastPeriodend = new Date(new Date(begin).getTime() - 1*millisecond);
		startStop.push(this.formatDate(lastPeriodBegin));  
		startStop.push(this.formatDate(lastPeriodend));  
		return startStop;
	},
	/**
	 * 格式化日期为yyyy-MM-dd
	 */   
	formatDate : function (date) {   
		var myyear = date.getFullYear();   
		var mymonth = date.getMonth()+1;   
		var myweekday = date.getDate();  
		  
		if(mymonth < 10){   
		mymonth = "0" + mymonth;   
		}   
		if(myweekday < 10){   
		myweekday = "0" + myweekday;   
		}   
		return (myyear+"-"+mymonth + "-" + myweekday);   
	},
	/**  
	* 得到指定月份所在季度开始的月份  
	* @param month 需要计算的月份  
	***/  
	getQuarterSeasonStartMonth : function (month) {  
		var quarterMonthStart = 0;  
		var spring = 0; //春    
		var summer = 3; //夏    
		var fall = 6;   //秋    
		var winter = 9; //冬    
		//月份从0-11    
		if (month < 3) {  
			return spring;  
		}
		if (month < 6) {  
			return summer;  
		} 
		if (month < 9) {  
			return fall;  
		}
		return winter;  
	},
	/**  
	* 获得指定月的天数  
	* @param year年份 4位  
	* @param month月份 0-11 
	* */  
	getMonthDays : function (year, month) {  
		//本月第一天 1-31    
		var relativeDate = new Date(year, month, 1);  
		//获得当前月份0-11    
		var relativeMonth = relativeDate.getMonth();  
		//获得当前年份4位年    
		var relativeYear = relativeDate.getFullYear();
		//当为12月的时候年份需要加1，月份需要更新为0 也就是下一年的第一个月   
		if (relativeMonth == 11) {  
			relativeYear++;  
			relativeMonth = 0;  
		} else {  
			//否则只是月份增加,以便求的下一月的第一天    
			relativeMonth++;  
		}  
		//一天的毫秒数    
		var millisecond = 1000 * 60 * 60 * 24;  
		//下月的第一天    
		var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);  
		//返回得到上月的最后一天,也就是本月总天数    
		return new Date(nextMonthDayOne.getTime() - millisecond).getDate();  
	},
	/**  
	* 返回上一个月的第一天Date类型  
	* @param year 年  
	* @param month 月  
	**/  
	getPriorMonthFirstDay : function (year, month) {  
		//月份为0代表是本年的第一月,所以不能减    
		if (month == 0) {  
			month = 11; //月份为上年的最后月份    
			year--; //年份减1    
			return new Date(year, month, 1);  
		}    
		month--;  
		return new Date(year, month, 1); ;  
	},
	/**  
	* 得到指定年月所在季度上一季度的起始日期  
	* year 年份  
	* month 月份  
	* */  
	getPriorSeasonFirstDay : function (year, month) { 
		var spring = 0; //春    
		var summer = 3; //夏    
		var fall = 6;   //秋    
		var winter = 9; //冬    
		//月份从0-11
		if(month<3){
			year--;//如果是第一季度则应该到去年的冬季
			month = winter;
			return new Date(year, month, 1);
		}
		if(month<6){
			month = spring;
			return new Date(year, month, 1);
		}
		if(month<9){
			month = summer;
			return new Date(year, month, 1);
		}
		month = fall;
		return new Date(year, month, 1);  
	}
}