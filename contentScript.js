

function sortEmailsBySubject() {
    var classes = new Array();
    var athletics = new Array();
    var clubs = new Array();
    var studentNews = new Array();
    var  community= new Array();
    var  other= new Array();

    scrapeSubject();

    for (var i = 0; i < classes.length; i++){//could do a different way by putting key words in an if and then the email in an array
        if (srcTxt.conatins(classes[i])){
            //put into either other array or to html
        }
    }
    
    
}

var badSender = new Array();
var dncFooter = new Array();
var ofaFooter = new Array();

function nonSpamSorter(){
    var matches = GmailApp.getInboxMatches();
    for (var i = 0; i < matches.length; i++) {
        var match = matches[i];
        Utlilities.sleep(100);
        var messages = matches.getMessages();
        for(var j = 0; j < messages.length; j++){
            var message = messages[0];
            var from = message.getFrom();
            var subject = message.getSubject();
            Logger.log("Message from: %s \n Message subject: %s", from, subject);
            if(from.indexOf("Quora Digest") != -1 || from.indexOf("noreply@quora.com") != -1){
                var lebel = GmailApp.getUserLabelByName("Quora");
                label.addToMatch(match);
                match.markUnimportant();
                match.moveToArchive();
            }
            else if(from.indexOf("Benihana") != -1){
                var label = GmailApp.getUserLabelByName("Benihana");
                label.addToMatch(match);
                match.markUnimportant();
                match.moveToArchive();
            }
            else if(from.indexOf("CodeProject") != -1 || from.indexOf("Freelancer.com") != -1){
                var label = GmailApp.getUserLabelByName("Programming");
                label.addToMatch(match);
                match.markUnimportant();
                match.moveToArchive();
            }
            else if(from.indexOf("Seeking Alpha") != -1 || from.indexOf("account@seekingalpha.com") != -1){
                var label = GmailApp.getUserLabelByName("Buisness/Investing");
                label.addToMatch(match);
                match.markUnimportant();
                match.moveToArchive();
            }
            else if(from.indexOf("Fiverr.com") != -1){
                var label = GmailApp.getUserLabelByName("Buisness/Fiverr");
                label.addToMatch(match);
                match.markUnimportant();
                match.moveToArchive();
            }
            else if(from.indexOf("info@twitter.com") != -1){
                var label = GmailApp.getUserLabelByName("MySpam/Twitter");
                label.addToMatch(match);
                match.markUnimportant();
                match.moveToArchive();
            }
            else{
                if(subject.indexOf("[HBRobotics]") != -1){
                    var label = GmailApp.getUserLabelByName("Robotics");
                    label.addToMatch(match);
                    match.markUnimportant();
                    match.moveToArchive();
                }
              
            } 
        }  
    }
}

function subjectFilter(){
    var matches = GmailApp.getInboxThreads();
    var label = GmailApp.getUserLabelByName("Community/PVForum");
    for (var i = 0; i < matches.length; i++) {
        var match = matches[i]
        var firstSubject = thread.getFirstMesageSubject();
        if(firstSubject.indexOf("[PvForum]") != -1){
            label.addToThread(match);
            match.markUnimportant();
            match.moveToArchive();
        }
    }
}
function dncFilter(){
    var matches = GmailApp.getInboxThreads();
    for(var i = 0; i < matches.length; i++){
        Utilities.sleep(100)
        var match = matches[i];
        var messages = match.getMessages();
        for(var j = 0; j < messages.length; j++){
            var message = message[j];
            var message = messages [0];
            var msgPlainTxt = "";
            try{
                msgPlainTxt = message.getRawContent();
            }
            catch(err){
                msgPlainTxt = message.getRawContent();
            }
            if(msgPlainTxt != null && (msgPlainTxt.indexOf(dncFooter) != -1 || msgPlainTxt.indexOf(ofaFooter) != -1)){
                var folderSpam = "MySpam/DNC";
                var spamLabel = GmailApp.getUserLabelByName(folderSpam);
                if(spamLabel == null){
                    spamLabel = GmailApp.createLabel(folderSpam);
                }
                spamLabel.addToThread(match);
                match.markUnimportant();
                match.moveToArchive();
            }
        }
    }
}

function spamsenderfilter(){
    var matches = GmailApp.getInboxMatches();
    for (var i = 0; i < matches.length; i++){
        var match = matches = matches[i];
        var messages = match.getMessages();
        for(var k = 0; k < messages.length; k++){
            var message = messages[k];
            for(var j = 0; j < badSenders.length; j++){
                var currentSender = badSender[j];
                try{
                    Logger.log("iter");
                    var from = message.getFrom();
                    Logger.log(from);
                    if(from.indexOf(currentSender) =! -1){
                        var folderSpam = "MySpam/" + currentSender;
                        var spamLabel = GmailApp.createLabelByName(folderSpam);
                        if(spamLabel == null){
                            spamLabel = GmailApp.createLabel(folderSpam);
                        }
                        spamLabel.addToMatch(match);
                        match.markUnimportant();
                        match.moveToArchive();
                        break;
                    }
                }
                catch(err){
                    Logger.log("undefined message");
                }
            }
        }
    }
}