App.factory('Utils', function($log){

	var Utils = {
		convertDateTimeToDateAndTime: function(datetime){
			if(datetime!=undefined){
				var elementsDate = datetime.split('T')[0].split('-');
				var elementsTime = datetime.split('T')[1].split('.')[0];
				return elementsDate[2]+'/'+elementsDate[1]+'/'+elementsDate[0]+' à '+elementsTime;
			}
			else{
				return '';
			}
		},
		convertDateTimeToDate: function(datetime){
			if(datetime!=undefined){
				var elements = datetime.split('T')[0].split('-');
				return elements[2]+'/'+elements[1]+'/'+elements[0];
			}
			else{
				return '';
			}
		}
	};

	return Utils;
});