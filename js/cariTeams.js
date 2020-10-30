function cariTeams(item,idParam,loader) {
	save.onclick = function() {
		loader.style.display = 'block';
		//validasi data
		var temu="";
		getAll().then(function(teams) {	
			var cari=parseInt(idParam);
			if(teams.length===0){
			setTimeout(function timer(){
					item.then(function (article) {
						saveForLater(article);
					});
					loader.style.display = 'none';
			},2000);
			}
		teams.forEach(teams => { 
			if(cari===teams.id){
				temu="y";
				M.toast({html: 'Data Sudah Ada'});
				//pesan();
				loader.style.display = 'none';
			} else {
				temu="t";
			}		  
		});
		if(temu==="t"){
			setTimeout(function timer(){
				item.then(function (article) {
					saveForLater(article);
				});
				loader.style.display = 'none';
			},2000);
		}
		});
	  //akhir validasi
	}
}
