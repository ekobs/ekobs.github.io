const dbPromised = idb.open("sepakbola", 1, function(upgradeDb) {
  const articlesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(article) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(article);
      store.add(article);
      return tx.complete;
    })
    .then(function() {
      M.toast({html: 'Data Berhasil Disimpan'});
	  //console.log("Artikel berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(teams) {
	    console.log(teams);
        resolve(teams);
      });
  });
}

function delById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        return store.delete(id);
      })
      .then(function(teams) {
		M.toast({html: 'Data Berhasil Dihapus'});
	    //console.log("berhasil dihapus");
        resolve(teams);
      });
  });
}


