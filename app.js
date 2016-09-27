var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.json());

//Exports moduls

Genre = require('./models/genre');
Book = require('./models/book');

//Connect to Mongoose

mongoose.connect("mongodb://localhost/bookstore");
var db = mongoose.connection;

app.get('/', function(req, res){
	res.send('Hello World!');
});

//Get genres

app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){
		if(err){
			throw err;
		}
		res.json(genres);
	})
});

//Add genres

app.post('/api/genres', function(req, res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	})
});

//Update genres

app.put('/api/genres/:_id', function(req, res){
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	})
});

//Delete genres

app.delete('/api/genres/:_id', function(req, res){
	var id = req.params._id;
	Genre.removeGenre(id, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	})
});

//Get books

app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	})
});

//Get book

app.get('/api/books:id', function(req, res){
	Book.getBookById(req.params._id, function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	})
});

//Add Book

app.post('/api/books', function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

//Update books

app.put('/api/books/:_id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	})
});

//Delete books

app.delete('/api/books/:_id', function(req, res){
	var id = req.params._id;
	Book.removeBook(id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	})
});

app.listen(3000);
console.log("Running on port 3000...");