var fs = require('fs');

var casper = require('casper').create({
    clientScripts: ["includes/jquery.js"],
    logLevel:"verbose",
    debug:true
});
var x = require('casper').selectXPath;
var links;
var table
var exportLinks;

var letter = 'g';

casper.start('http://www.basketball-reference.com/players/' + letter + '/');

casper.then(function getLinks(){

    links = this.evaluate(function(){
        var links = document.querySelectorAll('#players tr td strong a');
        links = Array.prototype.map.call(links,function(link){
            return 'http://www.basketball-reference.com' + link.getAttribute('href');
        });
        return links;
    });

});

casper.then(function(){

    console.log('links: ', links);

    this.each(links,function(self,link){

        casper.thenOpen(link,function(){
            console.log(this.getCurrentUrl());
        });

        var gamelog = link.split('.html')[0] + '/gamelog/2015/';

        casper.thenOpen(gamelog,function(){
            console.log('gameLog page: ', this.getCurrentUrl());
        });

        casper.then(function(){

            this.waitForSelector(x('//span[text()="Switch to Advanced Game Log"]'), function () {
                this.clickLabel('Switch to Advanced Game Log', 'span');
                console.log('clicked advanced game log');

            }, function() {
                console.log('timed out :(');
            }, 20000);

        });
        /*
        casper.then(function(){

            this.waitForSelector('#div_pgl_advanced', function () {
                console.log('waited for advanced table')
            }, function() {
                console.log('timed out :(');
            }, 20000);

        });
        */
        casper.then(function(){

            this.waitForSelector(x('//span[text()="CSV"]'), function () {
                this.clickLabel('CSV', 'span');
                console.log('cliecked csv');

                var csvGameLogAd = this.evaluate(function() {
                    var num = $("#csv_pgl_advanced").html();
                    return num;
                });

                console.log('gameLogAd: ', csvGameLogAd);

                var filepath = gamelog.split('http://www.basketball-reference.com/')[1];
                fs.write(filepath + 'gamelog-ad.csv', csvGameLogAd, 'a');

            }, function() {
                console.log('timed out :(');
            }, 20000);

        });

    });

});

casper.run(function(){
    this.exit();
});