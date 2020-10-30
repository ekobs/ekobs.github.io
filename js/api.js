
const base_url = "https://api.football-data.org/v2/";


//Blok Kode Request API Key
const myHeaders = new Headers();
	myHeaders.append("X-Auth-Token", "c376496e14554c128121c3545f30cf0a");
	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
	}
	
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTeams() {
	if ('caches' in window) {
		caches.match(base_url + "teams", requestOptions).then(function(response) {
		  if (response) {
			response.json().then(function (data) {
			  var articlesHTML = "";
			  data.teams.forEach(function(teams) {
				articlesHTML += `
					  <div class="card">
						<a href="./article.html?id=${teams.id}">
						  <div class="card-image waves-effect waves-block waves-light">
							<img src="${teams.crestUrl}" onerror="this.onerror=null;this.src='./broken.png'"/>
						  </div>
						</a>
						<div class="card-content">
						  <span class="card-title truncate">${teams.name}</span>
							  <ul>
								<li>Name : ${teams.name}</li>
								<li>Short Name : ${teams.shortName}</li>
								<li>Address : ${teams.address}</li>
								<li>Email : ${teams.email}</li>
								<li>Phone : ${teams.phone}</li>
								<li>Website : ${teams.website}</li>
								<li>Venue : ${teams.venue}</li>
							  </ul>
						</div>
					  </div>
					`;
			  });
			  // Sisipkan komponen card ke dalam elemen dengan id #content
			  document.getElementById("teams").innerHTML = articlesHTML;
			})
		  }
		})
	  }

  fetch(base_url + "teams", requestOptions)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.teams.forEach(function(teams) {
        articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${teams.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${teams.crestUrl}" onerror="this.onerror=null;this.src='./broken.png'"/>
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${teams.name}</span>
				  <ul>
					<li>Name : ${teams.name}</li>
					<li>Short Name : ${teams.shortName}</li>
					<li>Address : ${teams.address}</li>
					<li>Email : ${teams.email}</li>
					<li>Phone : ${teams.phone}</li>
					<li>Website : ${teams.website}</li>
					<li>Venue : ${teams.venue}</li>
				  </ul>
                </div>
              </div>
            `;
      });
	  
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getTeamsById() {
	return new Promise(function(resolve, reject) {
	  // Ambil nilai query parameter (?id=)
	  var urlParams = new URLSearchParams(window.location.search);
	  var idParam = urlParams.get("id");

	  if ("caches" in window) {
		caches.match(base_url + "teams/" + idParam, requestOptions).then(function(response) {
		  if (response) {
			response.json().then(function(data) {
			  var articleHTML = `
				<div class="card">
				  <div class="card-image waves-effect waves-block waves-light">
					<img src="${data.crestUrl}" onerror="this.onerror=null;this.src='./broken.png'"/>
				  </div>
				  <div class="card-content">
					<span class="card-title truncate">${data.name}</span>
					  <ul>
						<li>Name : ${data.name}</li>
						<li>Short Name : ${data.shortName}</li>
						<li>Address : ${data.address}</li>
						<li>Email : ${data.email}</li>
						<li>Phone : ${data.phone}</li>
						<li>Website : ${data.website}</li>
						<li>Venue : ${data.venue}</li>
					  </ul>
				  </div>
				</div>
			  `;
			  // Sisipkan komponen card ke dalam elemen dengan id #content
			  document.getElementById("body-content").innerHTML = articleHTML;
			   resolve(data);
			});
		  }
		});
	  }

	  fetch(base_url + "teams/" + idParam, requestOptions)
		.then(status)
		.then(json)
		.then(function(data) {
		  // Objek JavaScript dari response.json() masuk lewat variabel data.
		  console.log(data);
		  // Menyusun komponen card artikel secara dinamis
		  var articleHTML = `
			  <div class="card">
				<div class="card-image waves-effect waves-block waves-light">
				  <img src="${data.crestUrl}" onerror="this.onerror=null;this.src='./broken.png'"/>
				</div>
				<div class="card-content">
					<span class="card-title truncate">${data.name}</span>
					  <ul>
						<li>Name : ${data.name}</li>
						<li>Short Name : ${data.shortName}</li>
						<li>Address : ${data.address}</li>
						<li>Email : ${data.email}</li>
						<li>Phone : ${data.phone}</li>
						<li>Website : ${data.website}</li>
						<li>Venue : ${data.venue}</li>
					  </ul>	 
				</div>
			  </div>
			`;
		  // Sisipkan komponen card ke dalam elemen dengan id #content
		  document.getElementById("body-content").innerHTML = articleHTML;
		   resolve(data);
		});
	});
}

function getSavedTeams() {
  getAll().then(function(teams) {
	if(teams.length===0){
		M.toast({html: 'Data Kosong'});
		document.getElementById("body-content").innerHTML ="";
		/*var pesanHTML="";
		pesanHTML=`
				<div class="card">
					<div class="center-align">
					<i class="large material-icons red-text text-red" id="warning">warning</i>
					<h3 class="card-content">Data Kosong</h3>
					</div>
				</div>
		`;
		document.getElementById("body-content").innerHTML = pesanHTML;*/
	} else {
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    teams.forEach(function(teams) {
      var description = teams.name;
      articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${teams.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${teams.crestUrl}" onerror="this.onerror=null;this.src='./broken.png'"/>
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${teams.name}</span>
						  <ul>
							<li>Name : ${teams.name}</li>
							<li>Short Name : ${teams.shortName}</li>
							<li>Address : ${teams.address}</li>
							<li>Email : ${teams.email}</li>
							<li>Phone : ${teams.phone}</li>
							<li>Website : ${teams.website}</li>
							<li>Venue : ${teams.venue}</li>
						  </ul>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
	}
  });
}

function getSavedTeamsById() {
  
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  
  getById(parseInt(idParam)).then(function(teams) {
    articleHTML = '';
	var i,x = '';
	var z=0;
	for (i in teams.squad) {
	  z=z+1;
	  x += `
		<tr>
			<td>${z}</td>
			<td>${teams.squad[i].name}</td>
			<td>${teams.squad[i].position}</td>
		</tr>
		`;
	}
	
    var articleHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${teams.crestUrl}" onerror="this.onerror=null;this.src='./broken.png'"/>
      </div>
      <div class="card-content">
        <span class="card-title truncate">${teams.name}</span>
			<ul>
				<li><b>Name :</b> ${teams.name}</li>
				<li><b>Short Name :</b> ${teams.shortName}</li>
				<li><b>Address : </b>${teams.address}</li>
				<li><b>Email : </b>${teams.email}</li>
				<li><b>Phone : </b>${teams.phone}</li>
				<li><b>Website : </b>${teams.website}</li>
				<li><b>Venue : </b>${teams.venue}</li>
			</ul>
			<p>Squad : </p>
			<table border="1">
			<tr>
				<th>No</th>
				<th>Name</th>
				<th>Position</th>
			</tr>${x}
			</table>
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}

function getDelTeams() {
  getAll().then(function(teams) {
	
	if(teams.length===0){
		M.toast({html: 'Data Kosong'});
		document.getElementById("body-content").innerHTML ="";
		/*var pesanHTML="";
		pesanHTML=`
				<div class="card">
					<div class="center-align">
					<i class="large material-icons red-text text-red" id="warning">warning</i>
					<h3 class="card-content">Data Kosong</h3>
					</div>
				</div>
		`;
		document.getElementById("body-content").innerHTML = pesanHTML;*/
	} else{
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    teams.forEach(function(teams) {
      var description = teams.name;
      articlesHTML += `
                  <div class="card">
                    <a href="./articleDel.html?id=${teams.id}&delete=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${teams.crestUrl}" onerror="this.onerror=null;this.src='./broken.png'"/>
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${teams.name}</span>
						  <ul>
							<li>Name : ${teams.name}</li>
							<li>Short Name : ${teams.shortName}</li>
							<li>Address : ${teams.address}</li>
							<li>Email : ${teams.email}</li>
							<li>Phone : ${teams.phone}</li>
							<li>Website : ${teams.website}</li>
							<li>Venue : ${teams.venue}</li>
						  </ul>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
	}
  });
  
}