var fs = require('fs');

var casper = require('casper').create({
    clientScripts: ["includes/jquery.js"],
    logLevel:"verbose",
    debug:true
});
var x = require('casper').selectXPath;
var links;
var exportLinks;

casper.start('http://www.basketball-reference.com/players/b/');

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
    //TODO: Get player's position, from/to values from players/a list

    this.each(links,function(self,link){

        casper.thenOpen(link,function(){
            console.log(this.getCurrentUrl());
        });

        casper.then(function(){

            this.waitForSelector(x('//span[text()="Export"]'), function () {
                this.clickLabel('Export', 'span');
            });

            var exportNum = this.evaluate(function() {
                var num = $("span:contains('Export')");
                return num.length;
            });

        });

        /*** URL SCHEMA ****
            http://www.basketball-reference.com/players/a/anthoca01.html
            http://www.basketball-reference.com/players/a/anthoca01/gamelog/2015/
        *****/

        casper.then(function(){

            this.waitForSelector(x('//span[text()="CSV"]'), function () {
                this.clickLabel('CSV', 'span');

                var csvTotals = this.evaluate(function() {
                    var num = $("#csv_totals").html();
                    return num;
                });

                var filepath = link.split('http://www.basketball-reference.com/')[1].split('.html')[0];
                fs.write(filepath + '/totals.csv', csvTotals, 'a');

            });
        });

        var gamelog = link.split('.html')[0] + '/gamelog/2015/';

        casper.thenOpen(gamelog,function(){
            console.log('gameLog page: ', this.getCurrentUrl());
        });

        casper.then(function(){

            this.waitForSelector(x('//span[text()="CSV"]'), function () {
                this.clickLabel('CSV', 'span');

                var csvGameLog = this.evaluate(function() {
                    var num = $("#csv_pgl_basic").html();
                    return num;
                });

                var filepath = gamelog.split('http://www.basketball-reference.com/')[1];
                fs.write(filepath + 'gamelog.csv', csvGameLog, 'a');

            }, function() {
                console.log('timed out :(');
            }, 20000);
        });

    });

});
casper.run(function(){
    this.exit();
});