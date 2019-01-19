async location(){

	promise = new Promise((resolve, reject) =>{
		setTimeout(()=>{
			$.getJSON("https://jsonip.com/?callback=?",(data)=>{
				ip = data[0].ip;
				return ip;
			})
		}, 3000);
	});

	let response = await promise;
	return response
}

locationip = location()

var data = $('#form').serializeArray().reduce(function(object,item){
	object[item.name] = item.value;
},{});
data.ip = locationip;
$.ajax({
	url:"http://localhost:3000",
	data:JSON.stringify(data)
})